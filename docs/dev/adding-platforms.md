# Guide: Adding a New Platform

Reelspot is designed to be easily extensible. To add support for a new social media platform (e.g., Reddit, Pinterest), follow these steps:

## 1. Define Constants

Add the new platform name to `src/constants/index.js`.

```javascript
export const PLATFORMS = {
  // ...
  REDDIT: "reddit",
};
```

## 2. Platform Detection

Update `src/services/platformDetector.js` to recognize URLs from the new platform and extract the media ID.

```javascript
if (cleanUrl.includes("reddit.com")) {
  // Extraction logic...
  return {
    platform: PLATFORMS.REDDIT,
    mediaType: MEDIA_TYPES.VIDEO,
    mediaId: id,
    isValid: !!id,
    cleanUrl,
  };
}
```

## 3. Create Service Strategy

Create a new service file in `src/services/platforms/` (e.g., `reddit.service.js`). This function should call your API and return the [standardized data format](file:///Users/arshverma/GitHub/REELSPOT/docs/dev/api.md).

```javascript
import { registerPlatform } from "./registry";

const fetchRedditData = async (url, apiKey) => {
  // API logic...
  return {
    title: "...",
    thumbnail: "...",
    formats: [{ url: "...", quality: "...", ext: "..." }],
  };
};

registerPlatform("reddit", fetchRedditData);
```

## 4. UI Integration

- **Icons**: Update `PlatformIcon` in `DownloadForm.jsx` and `ApiKeyCard.jsx` to include the new platform icon.
- **Branding**: Add brand colors to `DownloadForm.jsx` for the type badge.

## 5. Persistence

The `historyService` and `DownloadContext` will automatically handle saving the new platform data to Supabase as long as you use the `PLATFORMS` constant.

---

> [!IMPORTANT]
> Always verify that your new strategy returns the standardized format to ensure the UI renders correctly.
