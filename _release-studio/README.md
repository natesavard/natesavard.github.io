# Nate Savard Release Studio

The studio runs on your computer using Python and FFmpeg, without a paid publisher or hosting subscription. The supplied NLS visual has a short fade at each end to smooth the loop and contains no audio. The studio maps only the uploaded track into each MP4. Render Only saves landscape and portrait copies without contacting any platform. Portrait exports preserve the full visual in a 9:16 frame.

## Run on Windows

1. Install Python 3.11+ and FFmpeg, including ffprobe, and make sure `py`, `ffmpeg`, and `ffprobe` work in PowerShell.
2. Extract the studio package. In PowerShell, open the `_release-studio` folder and run `./Start-Studio.ps1`. The first run installs Python dependencies. Enter a password of at least 16 characters at the hidden prompt. The login username is `nate`.
3. Open [the local studio](http://localhost:10000/upload). Audio, the saved visual, release history, and exports are stored in `data/`. Keep the window and computer running until rendering and posting finish. The package includes the daily-use visual in `data/default_loop.mp4`.

The studio accepts up to 95 MiB per uploaded file and renders audio up to an hour. Use FLAC or MP3 for large masters. Back up `data/` privately. The service runs one process and one work queue. Completed exports are kept until you remove them. A failed POST with an uncertain outcome is flagged for review to help prevent duplicate releases.

## Put the studio at natesavard.com/upload

Use the free Cloudflare Tunnel and Worker plans with the existing domain. Set up and verify a named Tunnel endpoint, such as `studio-origin.natesavard.com`, to the computer's `http://127.0.0.1:10000`. Install `cloudflared` on the workstation and keep it running. The existing apex DNS record must be proxied by Cloudflare for the Worker to run. Keep GitHub Pages as its upstream origin. Preserve the site's DNS records and HTTPS while configuring Cloudflare, and verify the homepage and journal before and after enabling the route.

Deploy `edge/` with Wrangler using the domain owner's Cloudflare account. Set Worker variable `STUDIO_ORIGIN` to the HTTPS Tunnel endpoint. Set the studio's `BASE_URL=https://natesavard.com` in a private local `.env` copied from `.env.example`, then restart. Verify that the apex upload page returns a password prompt, login can open the console, and that the homepage and both journal URLs still respond.

The Worker forwards only `/upload` and its subpaths to the studio. The studio authenticates downloads and API calls. Meta can fetch individual videos with expiring signed links. The tunnel origin is separately password protected by the same server. File data, tokens, the visual and passwords belong on the workstation and should never be committed to GitHub. Keep the provider and Cloudflare accounts under Nate's control.

## Connect publishing accounts

- **YouTube and Shorts.** In Google Cloud, enable YouTube Data API v3 and make a Web application OAuth client. Register `https://natesavard.com/upload/oauth/youtube/callback` for the domain or `http://localhost:10000/upload/oauth/youtube/callback` for local use. Add Nate as a test user if required. Set the client credentials in the private `.env`, restart and click **Connect or reconnect YouTube**. Select the intended channel in Google's consent flow. Run the first test with Private visibility, then verify how YouTube handles your project's public uploads. If the video lands at a different visibility, the studio displays the actual visibility and links to the upload. If the refresh token expires, reconnect the account.
- **Instagram Reels.** Use an Instagram professional account. In Meta's developer UI, authorize the Instagram Login API with `instagram_business_basic` and `instagram_business_content_publishing`. Put the resulting token and Instagram professional account ID into the private configuration. Meta must be able to fetch the signed MP4 over HTTPS. Refresh or replace expiring credentials through Meta.
- **Facebook Reels.** Use a Facebook Page and a Meta app authorized to manage Page posts and read Page engagement. Obtain the correct Page access token and ID through Meta's developer interface. Enter them in the private configuration. Verify the account permissions and pending status in Meta if a release stalls.
- **TikTok.** The built-in portrait export is available for upload in TikTok. TikTok's Direct Post guidelines exclude a private utility that uploads to accounts you manage. This setup therefore has no automatic TikTok publication.

The dashboard sends the full master wherever the endpoint supports it. The checked limits are 180 seconds for YouTube Shorts, 900 for Instagram Reels and 90 for Facebook Reels through the Reels endpoint. If one of those targets exceeds its limit, the full export remains available and the studio offers a shorter version only with explicit approval. A publication is marked complete only after the platform confirms it, and a private YouTube upload is marked Uploaded.

The application is under `_release-studio/` so a standard GitHub Pages/Jekyll build does not serve its files. The homepage and journal require no edits. If GitHub write access is granted later, apply the included source patch from the repository root and review the staged changes before pushing. The patch excludes the workstation's visual and data.
