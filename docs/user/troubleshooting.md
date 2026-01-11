# Troubleshooting & FAQ

## Common Issues

### 1. "Download Failed" or "Error Resolving URL"

- **Cause**: Invalid link, private post, or API issue.
- **Solution**:
  - Ensure the link is public (not from a private account).
  - Check if your API Key for that platform is valid and has remaining quota (Settings > API Credentials).
  - Refresh the page and try again.

### 2. "API Key Invalid"

- **Cause**: The key stored in settings is incorrect or expired.
- **Solution**:
  - Go to Settings.
  - Click "Edit" on the platform card.
  - Re-enter your RapidAPI key carefully.
  - Click "Test" to verify connectivity.

### 3. Video Downloads but No Sound

- **Cause**: Some platforms separate video/audio streams, or the source file has no audio.
- **Solution**: Reelspot typically merges streams. If this persists on a specific platform (e.g., Reddit/Twitter via generic handlers), try a different source link.

### 4. Application is Slow/Laggy

- **Cause**: High browser memory usage or slow connection.
- **Solution**:
  - Clear browser cache.
  - Ensure Hardware Acceleration is enabled in your browser settings.

---

## Frequently Asked Questions (FAQ)

**Q: Is Reelspot free?**
A: The Reelspot interface is free to use. However, the underlying APIs (RapidAPI) may have free or paid tiers depending on your usage volume.

**Q: Can I download private Instagram posts?**
A: Generally, no. Most APIs only support public content. Downloading private content requires authentication, which Reelspot does not support for privacy reasons.

**Q: Where are my files saved?**
A: Files are saved to your browser's default download location (usually the `Downloads` folder on your computer).

**Q: Does Reelspot store my data?**
A: Your download history is stored locally or in your personal cloud database (Supabase) if configured. We do not track your usage for advertising. See our [Privacy Policy](./legal.md).

**Q: How do I clear my history?**
A: Go to **Settings > Data & Privacy** and click "Clear All History". You can also delete individual items from the **History** page.
