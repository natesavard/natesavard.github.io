"""Official provider API calls for a single artist's studio."""
import base64
import hashlib
import json
import os
import re
import secrets
import time
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

GOOGLE_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
IG_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN", "")
IG_ID = os.getenv("INSTAGRAM_ACCOUNT_ID", "")
FB_TOKEN = os.getenv("FACEBOOK_PAGE_TOKEN", "")
FB_ID = os.getenv("FACEBOOK_PAGE_ID", "")
META_VERSION = os.getenv("META_API_VERSION", "v27.0")
GOOGLE_SCOPE = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly"


class Rejected(Exception):
    """Provider explicitly rejected a request."""


def call(url, *, token="", payload=None, form=None, body=None, method=None, headers=None, allow_partial=False):
    headers = dict(headers or {})
    if token:
        headers["Authorization"] = "Bearer " + token
    if form is not None:
        body = urlencode(form).encode()
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    if payload is not None:
        body = json.dumps(payload).encode()
        headers["Content-Type"] = "application/json"
    request = Request(url, data=body, headers=headers, method=method)
    try:
        with urlopen(request, timeout=90) as response:
            return json.loads(response.read() or "{}"), response.headers
    except HTTPError as error:
        if allow_partial and error.code == 308:
            return None, error.headers
        if 400 <= error.code < 500 and error.code != 408:
            try:
                detail = json.load(error).get("error", {})
            except ValueError:
                detail = {}
            message = detail.get("message", "") if isinstance(detail, dict) else str(detail)
            message = re.sub(r"https?://\S+", "[link omitted]", message)
            raise Rejected(f"HTTP {error.code}: {message[:300]}") from None
        raise


def auth_url(base, state, verifier):
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).decode().rstrip("=")
    return "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode({
        "client_id": GOOGLE_ID, "redirect_uri": base + "/upload/oauth/youtube/callback",
        "response_type": "code", "scope": GOOGLE_SCOPE, "state": state,
        "access_type": "offline", "prompt": "consent", "code_challenge": challenge,
        "code_challenge_method": "S256",
    })


def exchange(**fields):
    response, _ = call("https://oauth2.googleapis.com/token", form={
        "client_id": GOOGLE_ID, "client_secret": GOOGLE_SECRET, **fields,
    })
    return response


def save_refresh(path, refresh):
    temporary = path.with_name("youtube-" + secrets.token_hex(8) + ".tmp")
    with os.fdopen(os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), "w") as handle:
        handle.write(refresh)
    temporary.replace(path)


def access(refresh_file):
    return exchange(grant_type="refresh_token", refresh_token=refresh_file.read_text())["access_token"]


def google_upload(asset, job, target, refresh_file, session, set_session):
    token = access(refresh_file)
    size = asset.stat().st_size
    base_title = f"{job['artist']} — {job['title']}"
    title = base_title[:100]
    description = base_title + ("\n#Shorts" if target == "shorts" else "")
    position = 0
    if not session:
        _, headers = call(
            "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet%2Cstatus&uploadType=resumable",
            token=token, headers={"X-Upload-Content-Length": str(size), "X-Upload-Content-Type": "video/mp4"},
            payload={"snippet": {"title": title, "description": description, "categoryId": "10"},
                     "status": {"privacyStatus": job["visibility"]}},
        )
        session = headers["Location"]
        set_session(session)
    else:
        response, headers = google_chunk(session, token, size, b"", 0)
        if response is not None:
            return response["id"]
        position = next_position(headers)
    with asset.open("rb") as video:
        while position < size:
            video.seek(position)
            chunk = video.read(8 * 1024**2)
            response, headers = google_chunk(session, token, size, chunk, position)
            if response is not None:
                return response["id"]
            offset = next_position(headers)
            if offset <= position:
                raise OSError("Upload did not advance")
            position = offset
    raise OSError("Missing upload receipt.")


def google_chunk(session, token, size, chunk, position):
    location = urlsplit(session)
    if location.scheme != "https" or location.netloc != "www.googleapis.com":
        raise Rejected("YouTube returned an unexpected upload address.")
    span = f"{position}-{position + len(chunk) - 1}" if chunk else "*"
    return call(session, token=token, body=chunk, method="PUT", allow_partial=True, headers={
        "Content-Type": "video/mp4", "Content-Range": f"bytes {span}/{size}",
    })


def next_position(headers):
    match = re.fullmatch(r"bytes=0-(\d+)", headers.get("Range", ""))
    return int(match[1]) + 1 if match else 0


def youtube_status(video_id, refresh_file):
    result, _ = call(
        "https://www.googleapis.com/youtube/v3/videos?" + urlencode({"id": video_id, "part": "status,processingDetails"}),
        token=access(refresh_file),
    )
    return result["items"][0]


def graph(platform, path, *, fields=None, form=None):
    host, token = ("graph.instagram.com", IG_TOKEN) if platform == "instagram" else ("graph.facebook.com", FB_TOKEN)
    if not re.fullmatch(r"v\d+\.\d+", META_VERSION):
        raise Rejected("Configure a valid Meta Graph API version.")
    query = "?" + urlencode({"fields": fields}) if fields else ""
    response, _ = call(f"https://{host}/{META_VERSION}/{path}{query}", token=token, form=form)
    return response


def instagram_start(title, url):
    return graph("instagram", IG_ID + "/media", form={
        "media_type": "REELS", "video_url": url, "caption": title, "share_to_feed": "true",
    })["id"]


def facebook_start(title, url, record):
    response = graph("facebook", FB_ID + "/video_reels", form={"upload_phase": "start"})
    video_id = response["video_id"]
    endpoint = urlsplit(response["upload_url"])
    if endpoint.scheme != "https" or endpoint.netloc != "rupload.facebook.com":
        raise Rejected("Facebook returned an unexpected upload address.")
    result, _ = call(response["upload_url"], method="POST", body=b"",
                     headers={"Authorization": "OAuth " + FB_TOKEN, "file_url": url})
    if result.get("success") is not True:
        raise Rejected("Facebook could not ingest the export.")
    record(video_id)
    result = graph("facebook", FB_ID + "/video_reels", form={
        "upload_phase": "finish", "video_id": video_id, "video_state": "PUBLISHED",
        "description": title,
    })
    if result.get("success") is not True:
        raise Rejected("Facebook could not finish publishing this Reel.")
    return video_id
