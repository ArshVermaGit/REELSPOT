# Platform Integration Guide

Reelspot uses the **Strategy Pattern** to handle media downloads from different platforms. This architecture allows us to add new platforms without modifying the core downloader logic (`download.service.js`).

## Directory Structure

All platform-specific logic resides in `src/services/platforms/`.

```
src/services/platforms/
├── instagram.service.js  # Strategy for Instagram
├── youtube.service.js    # Strategy for YouTube
├── facebook.service.js   # Strategy for Facebook
├── tiktok.service.js     # Strategy for TikTok
├── registry.js           # Central registry (Map)
└── README.md             # This guide
```

## How to Add a New Platform

### 1. Create the Service File

Create a new file, e.g., `twitter.service.js`. It **must** export a function that accepts `(url, apiKey)` and returns a standard object.

```javascript
// src/services/platforms/twitter.service.js
import { MediaError } from "../download.service"; // Import error class if needed (managed via dependency injection or direct import)

export const fetchTwitterData = async (url, apiKey) => {
  // 1. Validate
  if (!url.includes("twitter.com") && !url.includes("x.com")) {
    throw new Error("Invalid URL");
  }

  // 2. Fetch Data (Mock or Real API)
  // const data = await axios.get(...)

  // 3. Return Standardized Object
  return {
    title: "Tweet Title",
    thumbnail: "https://...",
    author: "@username",
    duration: null, // null for images/text provided as video
    formats: [{ type: "video", quality: "720p", ext: "mp4", url: "..." }],
  };
};
```

### 2. Update Constants

Add the new platform key to `src/constants/index.js`.

```javascript
export const PLATFORMS = {
  // ...
  TWITTER: "twitter",
  // ...
};
```

### 3. Update Platform Detector

Update `src/services/platformDetector.js` to recognize the new URL pattern and return the correct `PLATFORMS` key.

### 4. Register the Strategy

Import and register your new service in `src/services/download.service.js`.

```javascript
import { fetchTwitterData } from "./platforms/twitter.service.js";

// ...
registerPlatform(PLATFORMS.TWITTER, fetchTwitterData);
```

## Contracts

All platform strategies must return a Promise that resolves to:

```typescript
interface MediaResult {
  title: string;
  thumbnail: string;
  author: string;
  duration?: string;
  formats: Array<{
    type: "video" | "audio";
    quality: string;
    ext: string;
    url: string;
  }>;
}
```

If an error occurs, throw a `MediaError`.
