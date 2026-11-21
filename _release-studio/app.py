"""Single-instance release console with persistent queue and private media."""
import asyncio
import base64
import binascii
import hashlib
import hmac
import json
import logging
import os
import re
import secrets
import subprocess
import threading
import time
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse

import native

HERE = Path(__file__).resolve().parent
DATA = Path(os.getenv("DATA_DIR", HERE / "data"))
LOOP = DATA / "default_loop.mp4"
HISTORY = DATA / "releases.json"
BASE = os.getenv("BASE_URL", "").rstrip("/")
PASSWORD = os.getenv("STUDIO_PASSWORD", "")
USER = os.getenv("STUDIO_USER", "nate")
REFRESH = DATA / "youtube.refresh"
OAUTH = {}
LIMIT = 95 * 1024**2
TARGETS = {
    "youtube": ("youtube", "landscape", 0, None),
    "instagram": ("instagram", "portrait", 3, 900),
    "tiktok": ("tiktok", "portrait", 3, 600),
    "facebook": ("facebook", "portrait", 3, 90),
    "shorts": ("youtube", "portrait", 0, 180),
}
SIZES = {"landscape": "1920:1080", "portrait": "1080:1920"}
AUDIO_FORMATS = {".mp3": "mp3", ".wav": "wav", ".flac": "flac"}
LOG = logging.getLogger(__name__)
lock = threading.RLock()
stop = threading.Event()
jobs = {}


def write_history():
    pending = HISTORY.with_suffix(".tmp")
    with pending.open("w") as handle:
        json.dump(jobs, handle)
        handle.flush()
        os.fsync(handle.fileno())
    pending.replace(HISTORY)


def probe(path, stream):
    demuxer = "mov" if stream == "v" else AUDIO_FORMATS[path.suffix]
    result = subprocess.run(
        ["ffprobe", "-f", demuxer, "-v", "error", "-protocol_whitelist", "file,pipe", "-select_streams",
         f"{stream}:0", "-show_entries", "stream=duration,codec_name:format=duration",
         "-of", "json", str(path)],
        check=True, capture_output=True, timeout=30,
    )
    metadata = json.loads(result.stdout)
    track = metadata["streams"][0]
    seconds = track.get("duration", "N/A")
    return float(metadata["format"]["duration"] if seconds == "N/A" else seconds)


def render(audio, visual, path, seconds, layout, instagram=False):
    partial = path.with_suffix(".partial.mp4")
    size = SIZES[layout]
    filters = (
        f"fps=24,scale={size}:force_original_aspect_ratio=decrease:"
        "force_divisible_by=2,setsar=1,"
        f"pad={size}:(ow-iw)/2:(oh-ih)/2:black"
    )
    encoding = ["-b:a", "128k", "-bf", "0", "-use_editlist", "0"] if instagram else ["-b:a", "320k"]
    try:
        subprocess.run(
            ["ffmpeg", "-nostdin", "-v", "error", "-y", "-filter_threads", "2",
             "-protocol_whitelist", "file,pipe", "-f", "mov", "-stream_loop", "-1", "-i", str(visual),
             "-protocol_whitelist", "file,pipe", "-f", AUDIO_FORMATS[audio.suffix], "-i", str(audio),
             "-map", "0:v:0", "-map", "1:a:0", "-map_metadata", "-1", "-map_chapters", "-1",
             "-vf", filters, "-c:v", "libx264", "-threads", "2", "-preset", "veryfast",
             "-pix_fmt", "yuv420p", "-crf", "22", "-c:a", "aac", "-ar", "48000",
             "-ac", "2", "-g", "48", *encoding, "-t", str(seconds), "-movflags", "+faststart",
             str(partial)],
            check=True, timeout=7200, capture_output=True,
        )
        partial.replace(path)
    finally:
        partial.unlink(missing_ok=True)


def signature(jid, asset, expires):
    return hmac.new(PASSWORD.encode(), f"media:{jid}:{asset}:{expires}".encode(), hashlib.sha256).hexdigest()


def provider_url(job, asset):
    expires = int(time.time()) + 3600
    jid = job["id"]
    return f"{BASE}/upload/media/{jid}/{asset}/{expires}/{signature(jid, asset, expires)}.mp4"


def update(job, result=None, **values):
    with lock:
        (job if result is None else result).update(values)
        write_history()


def configured():
    return {
        "youtube": bool(native.GOOGLE_ID and REFRESH.is_file()),
        "instagram": bool(BASE.startswith("https://") and native.IG_TOKEN and native.IG_ID.isdecimal()),
        "facebook": bool(BASE.startswith("https://") and native.FB_TOKEN and native.FB_ID.isdecimal()),
    }


def send(job, target, path, asset):
    result = job["targets"][target]
    name = f"{job['artist']} — {job['title']}"
    if target in ("youtube", "shorts"):
        return native.google_upload(
            path, job, target, REFRESH, result.get("session"),
            lambda session: update(job, result, session=session),
        )
    if target == "instagram":
        return native.instagram_start(name, provider_url(job, asset))
    return native.facebook_start(
        name, provider_url(job, asset),
        lambda receipt: update(job, result, receipt=receipt),
    )


def reconcile(job, target, item):
    receipt = item["receipt"]
    if target in ("youtube", "shorts"):
        video = native.youtube_status(receipt, REFRESH)
        status = video.get("status", {})
        encoding = video.get("processingDetails", {}).get("processingStatus")
        link = f"https://www.youtube.com/watch?v={receipt}"
        if status.get("uploadStatus") in ("failed", "rejected", "deleted") or encoding in ("failed", "terminated"):
            update(job, item, state="failed", receipt=None, session=None,
                   message=f"YouTube rejected processing: {status.get('rejectionReason') or status.get('failureReason') or encoding}.")
            return
        if status.get("uploadStatus") == "processed" or encoding == "succeeded":
            visibility = status.get("privacyStatus", "unknown")
            if visibility != job["visibility"]:
                update(job, item, state="review", url=link,
                       message=f"YouTube saved the video as {visibility}. Check visibility and project audit in YouTube Studio.")
            else:
                update(job, item, state="published" if visibility == "public" else "uploaded",
                       url=link, message=f"YouTube visibility: {visibility}.")
            return
    elif target == "instagram":
        if item.get("media_id"):
            try:
                url = native.graph("instagram", item["media_id"], fields="permalink").get("permalink", "")
            except native.Rejected:
                url = ""
            update(job, item, state="published", url=url if urlsplit(url).scheme == "https" else "", message="")
            return
        status = native.graph("instagram", receipt, fields="status_code").get("status_code")
        if status == "FINISHED":
            update(job, item, state="finalizing")
            media_id = native.graph("instagram", native.IG_ID+"/media_publish", form={"creation_id": receipt})["id"]
            update(job, item, state="processing", media_id=media_id, next_poll=0)
            return
        if status in ("EXPIRED", "ERROR"):
            update(job, item, state="failed", receipt=None, message=f"Instagram processing returned {status}.")
            return
        if status == "PUBLISHED":
            update(job, item, state="review", message="Instagram confirms publication. Check the account for the Reel link.")
            return
    else:
        response = native.graph("facebook", receipt, fields="status,permalink_url")
        stages = response.get("status", {})
        phase = stages.get("publishing_phase", {}).get("status")
        if phase == "complete":
            url = response.get("permalink_url") or f"https://www.facebook.com/reel/{receipt}"
            if url.startswith("/") and not url.startswith("//"):
                url = "https://www.facebook.com" + url
            update(job, item, state="published", url=url if urlsplit(url).scheme == "https" else "", message="")
            return
        if stages.get("video_status") == "error" or phase == "error":
            update(job, item, state="review", message="Facebook reported a publishing error. Check the Page before retrying.")
            return
    update(job, item, next_poll=time.time() + 40)


def work(job, target):
    item = job["targets"][target]
    folder = DATA / job["id"]
    _, layout, minimum, maximum = TARGETS[target]
    try:
        seconds = job.get("duration") or probe(folder / job["source"], "a")
        if not 0 < seconds <= 3600:
            raise ValueError("Choose an audio track up to 60 minutes.")
        update(job, duration=seconds)
        clip = item.get("clip")
        length = clip or seconds
        name = "instagram" if target == "instagram" and not job["render_only"] else layout
        asset = f"{name}-{clip}" if clip else name
        output = folder / f"{asset}.mp4"
        if item["state"] != "processing":
            update(job, item, state="rendering", message="")
            if not output.exists():
                render(folder / job["source"], folder / "visual.mp4", output, length, layout, name == "instagram")
            update(job, item, asset=asset, full_asset=item.get("full_asset", asset))
            if not job["render_only"] and (length < minimum or (maximum and length > maximum)):
                update(job, item, state="restricted", max_clip=maximum if maximum and length > maximum else None,
                       message=f"Full-length export ready. This destination accepts {minimum}–{maximum} seconds.")
                return
            if job["render_only"]:
                update(job, item, state="rendered")
                return
            if target == "tiktok":
                update(job, item, state="manual", message="Download the portrait MP4 and post in TikTok.")
                return
            if not configured().get(TARGETS[target][0]):
                update(job, item, state="failed", message="Connect this account in Studio Setup, then retry.")
                return
            update(job, item, state="submitting")
            receipt = send(job, target, output, asset)
            update(job, item, state="processing", receipt=receipt, session=None, next_poll=time.time() + 15)
            return
        reconcile(job, target, item)
    except native.Rejected as error:
        if item["state"] == "processing":
            update(job, item, next_poll=time.time() + 120, message=str(error))
        elif item["state"] == "finalizing" or (item.get("session") and str(error).startswith("HTTP 404")):
            update(job, item, state="review", message="The provider could not confirm the upload. Check the account before reposting.")
        elif target == "facebook" and item.get("receipt"):
            update(job, item, state="review", message=str(error))
        else:
            update(job, item, state="failed", message=str(error))
    except Exception as error:
        LOG.warning("Release %s %s failed (%s)", job["id"], target, type(error).__name__)
        if item["state"] == "submitting" and item.get("session"):
            update(job, item, state="failed", message="YouTube transfer interrupted. Retry to resume this upload.")
        elif item["state"] in ("submitting", "finalizing"):
            update(job, item, state="review", message="Submission outcome unknown. Check the platform before reposting.")
        elif item["state"] == "processing":
            update(job, item, next_poll=time.time() + 60, message="Publisher status temporarily unavailable.")
        else:
            update(job, item, state="failed", message="Could not read audio or render this export. Verify the files and retry.")


def worker():
    while not stop.is_set():
        with lock:
            available = [
                (job, target) for job in jobs.values() for target, item in job["targets"].items()
                if item["state"] == "queued"
                or (item["state"] == "processing" and item.get("next_poll", 0) <= time.time())
            ]
        if available:
            work(*available[0])
        else:
            stop.wait(1)


@asynccontextmanager
async def lifespan(app):
    DATA.mkdir(mode=0o700, parents=True, exist_ok=True)
    if HISTORY.exists():
        jobs.update(json.loads(HISTORY.read_text()))
    for job in jobs.values():
        for item in job["targets"].values():
            if item["state"] == "rendering":
                item["state"] = "queued"
            elif item["state"] == "submitting" and item.get("session"):
                item["state"] = "queued"
            elif item["state"] in ("submitting", "finalizing"):
                item.update(state="review", message="Server restarted during submission. Check the destination before reposting.")
    write_history()
    stop.clear()
    thread = threading.Thread(target=worker, daemon=True)
    thread.start()
    try:
        yield
    finally:
        stop.set()
        thread.join(timeout=2)


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)


@app.middleware("http")
async def private_routes(request, call_next):
    path = request.url.path
    if path == "/health" or path.startswith("/upload/media/"):
        return await call_next(request)
    header = request.headers.get("authorization", "")
    supplied = b""
    if header.lower().startswith("basic "):
        try:
            supplied = base64.b64decode(header[6:], validate=True)
        except binascii.Error:
            pass
    if len(PASSWORD) < 16 or not secrets.compare_digest(supplied, f"{USER}:{PASSWORD}".encode()):
        return JSONResponse({"detail": "Studio sign-in required."}, status_code=401, headers={
            "WWW-Authenticate": 'Basic realm="Nate Savard Release Studio", charset="UTF-8"',
            "Cache-Control": "no-store",
        })
    if request.method == "POST" and request.headers.get("x-release-studio") != "1":
        return JSONResponse({"detail": "Invalid studio request."}, status_code=403)
    content_length = request.headers.get("content-length")
    if request.method == "POST" and (
        not content_length or not content_length.isdecimal() or int(content_length) > LIMIT + 65536
    ):
        return JSONResponse({"detail": "Uploads must be under 95 MiB."}, status_code=413)
    response = await call_next(request)
    response.headers["Cache-Control"] = "private, no-store"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    return response


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/upload")
@app.get("/upload/")
def home():
    return FileResponse(HERE / "templates/index.html", media_type="text/html")


@app.get("/upload/api/status")
def status():
    with lock:
        return {
            "visual": LOOP.is_file(),
            "jobs": [{**{k: v for k, v in job.items() if k != "targets"}, "targets": {
                target: {k: v for k, v in item.items() if k not in ("session", "receipt")}
                for target, item in job["targets"].items()
            }} for job in reversed(list(jobs.values()))],
        }


@app.get("/upload/api/accounts")
def accounts():
    return {
        "connected": [platform for platform, ready in configured().items() if ready],
        "youtube_setup": bool(native.GOOGLE_ID and native.GOOGLE_SECRET and BASE),
    }


@app.get("/upload/connect/youtube")
def connect_youtube():
    if not (native.GOOGLE_ID and native.GOOGLE_SECRET and BASE):
        raise HTTPException(409, "Configure your Google OAuth client first.")
    state = secrets.token_urlsafe(32)
    verifier = secrets.token_urlsafe(48)
    with lock:
        for key, (expires, _) in list(OAUTH.items()):
            if expires <= time.time():
                OAUTH.pop(key)
        OAUTH[state] = (time.time() + 600, verifier)
    return RedirectResponse(native.auth_url(BASE, state, verifier))


@app.get("/upload/oauth/youtube/callback")
def youtube_callback(state: str = "", code: str = ""):
    with lock:
        entry = OAUTH.pop(state, None)
    if not entry or entry[0] <= time.time() or not code:
        raise HTTPException(400, "YouTube sign-in expired or was canceled.")
    try:
        response = native.exchange(grant_type="authorization_code", code=code, code_verifier=entry[1],
                                   redirect_uri=BASE + "/upload/oauth/youtube/callback")
        native.save_refresh(REFRESH, response["refresh_token"])
    except (OSError, ValueError, native.Rejected, KeyError):
        raise HTTPException(400, "YouTube authorization failed. Confirm the OAuth settings and reconnect.") from None
    return RedirectResponse("/upload")


async def store_upload(upload, path):
    if upload.size == 0 or (upload.size is not None and upload.size > LIMIT):
        raise HTTPException(413, "Choose a file under 95 MiB.")
    size = 0
    with path.open("wb") as handle:
        while chunk := await upload.read(1024 * 1024):
            size += len(chunk)
            if size > LIMIT:
                raise HTTPException(413, "Choose a file under 95 MiB.")
            handle.write(chunk)


@app.post("/upload/api/visual")
async def set_visual(visual: UploadFile = File(...)):
    if Path(visual.filename or "").suffix.lower() not in (".mov", ".mp4"):
        raise HTTPException(400, "Choose the original NLS MOV or silent MP4.")
    temporary = DATA / f"visual-{secrets.token_hex(8)}.mp4"
    source = temporary.with_suffix(".source")
    try:
        await store_upload(visual, source)
        length = await asyncio.to_thread(probe, source, "v")
        if not 1 <= length <= 1800:
            raise ValueError("Visual length out of range.")
        # A short fade at each end avoids a jump between dissimilar end frames.
        fade = f"fade=t=in:d=0.4,fade=t=out:st={length-0.4}:d=0.4"
        await asyncio.to_thread(
            subprocess.run,
            ["ffmpeg", "-nostdin", "-v", "error", "-protocol_whitelist", "file,pipe",
             "-f", "mov", "-i", str(source), "-map", "0:v:0", "-map_metadata", "-1", "-an",
             "-vf", fade, "-preset", "veryfast",
             "-c:v", "libx264", "-pix_fmt", "yuv420p", "-threads", "2",
             "-movflags", "+faststart", str(temporary)],
            check=True, timeout=600, capture_output=True,
        )
        with lock:
            temporary.replace(LOOP)
    except (subprocess.SubprocessError, OSError, ValueError, IndexError, KeyError):
        raise HTTPException(422, "FFmpeg could not prepare this video.")
    finally:
        source.unlink(missing_ok=True)
        temporary.unlink(missing_ok=True)
    return {"visual": True}


@app.post("/upload/api/releases", status_code=202)
async def release(audio: UploadFile = File(...), title: str = Form(...),
                  mode: str = Form("publish"), visibility: str = Form("public"),
                  destinations: list[str] = Form(default=[])):
    title = title.strip()
    if not 1 <= len(title) <= 100 or visibility not in ("public", "unlisted", "private"):
        raise HTTPException(400, "Enter a title up to 100 characters and valid YouTube visibility.")
    if mode not in ("render", "publish"):
        raise HTTPException(400, "Invalid release mode.")
    selected = list(dict.fromkeys(destinations)) if mode == "publish" else ["youtube", "shorts"]
    if not selected or any(target not in TARGETS for target in selected):
        raise HTTPException(400, "Select at least one publishing destination.")
    if mode == "publish" and not all(target == "tiktok" or configured().get(TARGETS[target][0]) for target in selected):
        raise HTTPException(409, "Connect the selected accounts or use Render Only.")
    extension = Path(audio.filename or "").suffix.lower()
    if extension not in AUDIO_FORMATS:
        raise HTTPException(400, "Choose an MP3, WAV, or FLAC.")
    jid = secrets.token_hex(16)
    folder = DATA / jid
    folder.mkdir(mode=0o700)
    source = "audio" + extension
    try:
        with lock:
            if not LOOP.is_file():
                raise HTTPException(409, "Add the NLS visual first.")
            os.link(LOOP, folder / "visual.mp4")
        await store_upload(audio, folder / source)
        try:
            duration = await asyncio.to_thread(probe, folder / source, "a")
        except (subprocess.SubprocessError, ValueError, IndexError, KeyError):
            raise HTTPException(422, "Could not detect a playable audio track.")
        if not 0 < duration <= 3600:
            raise HTTPException(422, "Choose a track up to 60 minutes.")
    except Exception:
        for path in folder.iterdir():
            path.unlink()
        folder.rmdir()
        raise
    with lock:
        jobs[jid] = {
            "id": jid, "source": source, "title": title, "artist": "Nate Savard",
            "visibility": visibility, "render_only": mode == "render", "duration": duration,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "targets": {target: {"state": "queued"} for target in selected},
        }
        write_history()
    return {"id": jid}


@app.post("/upload/api/releases/{jid}/{target}/retry", status_code=202)
def retry(jid: str, target: str, clip: int = Form(0)):
    with lock:
        job = jobs.get(jid, {})
        item = job.get("targets", {}).get(target)
        if not item or item["state"] not in ("failed", "restricted"):
            raise HTTPException(409, "This destination cannot be retried.")
        if item["state"] == "restricted" and not clip:
            raise HTTPException(400, "Approve a compatible clip length to continue.")
        if clip and not (TARGETS[target][2] <= clip <= (item.get("max_clip") or 0)):
            raise HTTPException(400, "Choose a compatible clip length.")
        update(job, item, state="queued", message="", clip=clip or item.get("clip"), receipt=None)
    return {"queued": True}


def asset_path(jid, asset):
    if not re.fullmatch(r"[0-9a-f]{32}", jid) or not re.fullmatch(r"(landscape|portrait|instagram)(-\d{1,3})?", asset):
        raise HTTPException(404)
    path = DATA / jid / f"{asset}.mp4"
    if not path.is_file():
        raise HTTPException(404, "Export not available.")
    return path


@app.get("/upload/api/releases/{jid}/{asset}/download")
def download(jid: str, asset: str):
    return FileResponse(asset_path(jid, asset), filename=f"Nate-Savard-{jid[:8]}-{asset}.mp4", media_type="video/mp4")


@app.api_route("/upload/media/{jid}/{asset}/{expires}/{token}.mp4", methods=["GET", "HEAD"])
def publisher_media(jid: str, asset: str, expires: int, token: str):
    if (not PASSWORD or not int(time.time()) < expires <= time.time() + 86400
            or not secrets.compare_digest(token, signature(jid, asset, expires))):
        raise HTTPException(404)
    return FileResponse(asset_path(jid, asset), media_type="video/mp4", headers={"Cache-Control": "private, no-store"})
