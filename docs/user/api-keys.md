# API Key Configuration Guide

Reelspot relies on RapidAPI services to process downloads from various platforms. To ensure seamless functionality, you need to configure API keys for the supported services.

> **Note**: You will need a RapidAPI account to obtain these keys.

## General Steps (RapidAPI)

1.  **Sign Up/Login**: Go to [RapidAPI](https://rapidapi.com/) and create an account.
2.  **Subscribe**: Find the specific API (links below) and subscribe to a plan (many use the Basic/Free plan).
3.  **Copy Key**: Go to the "Endpoints" tab of the API page. Copy the value of `X-RapidAPI-Key`.
4.  **Configure in Reelspot**:
    - Open **Reelspot Settings**.
    - Find the usage card for the specific platform.
    - Click **Setup** or **Edit**.
    - Paste your key and click **Save**.

---

## Instagram

For Instagram Reels, Stories, and Post downloads.

- **Recommended API**: [Instagram Downloader V2](https://rapidapi.com/mahn1/api/instagram-downloader-v2) (Example) OR any compatible Instagram API supported by the backend service.
- **Setup**:
  1.  Subscribe to the API.
  2.  Copy keys.
  3.  Enter in Reelspot under **Instagram**.

## YouTube

For YouTube Videos and Shorts.

- **Recommended API**: [YouTube Media Downloader](https://rapidapi.com/) (Search for top rated).
- **Setup**:
  1.  Subscribe to the API.
  2.  Copy keys.
  3.  Enter in Reelspot under **YouTube**.

## Facebook

For Facebook public videos and reels.

- **Recommended API**: [Facebook Downloader](https://rapidapi.com/).
- **Setup**:
  1.  Subscribe.
  2.  Enter Key in Reelspot under **Facebook**.

## TikTok

For TikTok videos (Watermark-free) and slideshows.

- **Recommended API**: [TikTok Downloader](https://rapidapi.com/).
- **Setup**:
  1.  Subscribe.
  2.  Enter Key in Reelspot under **TikTok**.

---

## Troubleshooting Keys

- **Invalid Key Error**: Double-check you copied the full string. Ensure you are subscribed to the API.
- **Quota Exceeded**: Free plans have daily/monthly limits. Check your RapidAPI dashboard usage.
- **Platform Not Working**: APIs change occasionally. Check the [Support Page](./support.md) for updated API recommendations.
