# API Integration Guide

This guide explains how Reelspot integrates with external RapidAPI services to fetch video data.

## Utility Layer

All API logic is centralized in `src/utils/apiUtils.js` (or `fetchUtils.js`). This layer handles:

1.  **URL Parsing**: Determining which platform a URL belongs to.
2.  **Key Retrieval**: Fetching the correct API key from `ApiKeyContext`.
3.  **Request Construction**: Building the Axios request with headers (`X-RapidAPI-Key`, `X-RapidAPI-Host`).
4.  **Response Normalization**: Converting divergent API responses into a standard `VideoData` object.

## Standardized Data Format

Regardless of the source API (Instagram, YouTube, etc.), the application expects a normalized object:

```javascript
{
    id: "unique_id",
    title: "Video Title",
    thumbnail: "https://url.to/image.jpg",
    author: "Channel Name",
    platform: "youtube",
    type: "video",
    downloads: [
        { quality: "1080p", url: "https://...", size: 1024000, ext: "mp4" },
        { quality: "720p", url: "https://...", size: 512000, ext: "mp4" }
    ]
}
```

## Adding a New Platform

1.  **Update Config**:
    Add the platform logic to `fetchVideoData` switch case.
2.  **Configuration**:
    Add the `X-RapidAPI-Host` constant for the new service.

3.  **Mapping Function**:
    Create a helper function (e.g., `mapTwitterResponse`) to transform the raw API response into the Standardized Data Format.

4.  **UI Update**:
    Add the platform icon/option in `ApiKeyCard` and Filters.
