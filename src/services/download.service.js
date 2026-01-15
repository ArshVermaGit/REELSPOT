import axios from 'axios';
import { supabase } from './supabase.js';
import { PLATFORMS } from './platformDetector.js';

// Platform Strategy Imports
import { fetchInstagramData } from './platforms/instagram.service.js';
import { fetchYoutubeData } from './platforms/youtube.service.js';
import { fetchFacebookData } from './platforms/facebook.service.js';

/**
 * Advanced Media Downloader Service
 * Modularized version using platform-specific strategies.
 */

// Error Classes
export class MediaError extends Error {
    constructor(message, code, retryable = false) {
        super(message);
        this.name = 'MediaError';
        this.code = code;
        this.retryable = retryable;
    }
}

// --- Core Logic ---

const getMediaInfo = async ({ url, platform, apiKey }) => {
    if (!url) throw new MediaError('URL is required', 'MISSING_URL');

    try {
        switch (platform) {
            case PLATFORMS.INSTAGRAM:
                return await fetchInstagramData(url, apiKey);
            case PLATFORMS.YOUTUBE:
                return await fetchYoutubeData(url, apiKey);
            case PLATFORMS.FACEBOOK:
                return await fetchFacebookData(url, apiKey);
            case PLATFORMS.TIKTOK:
                throw new MediaError('TikTok downloading is not yet configured for production.', 'NOT_CONFIGURED');
            default:
                throw new MediaError('Unsupported platform', 'UNSUPPORTED');
        }
    } catch (error) {
        throw error instanceof MediaError ? error : new MediaError(error.message, 'UNKNOWN_ERROR');
    }
};

const checkFileSize = async (url) => {
    try {
        const response = await axios.head(url);
        const size = parseInt(response.headers['content-length'], 10);
        if (size && size > 2 * 1024 * 1024 * 1024) { // 2GB Limit
            throw new MediaError('File too large (> 2GB)', 'FILE_TOO_LARGE');
        }
        return size;
    } catch (e) {
        console.warn("Could not check file size via HEAD request");
        return 0;
    }
};

const downloadFileWithRetry = async (url, onProgress, retries = 3) => {
    let attempt = 0;
    while (attempt <= retries) {
        attempt++;
        try {
            await checkFileSize(url);

            const startTime = Date.now();
            let lastLoaded = 0;
            let lastTime = startTime;

            const response = await axios.get(url, {
                responseType: 'blob',
                timeout: 30000,
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total || 0;
                    const loaded = progressEvent.loaded;
                    if (total > 0) {
                        const percentage = Math.round((loaded * 100) / total);
                        const now = Date.now();
                        const timeDiff = (now - lastTime) / 1000;
                        const byteDiff = loaded - lastLoaded;

                        if (timeDiff > 0.1) {
                            let speed = '0 MB/s';
                            if (byteDiff > 0) {
                                const bytesPerSec = byteDiff / timeDiff;
                                speed = bytesPerSec > 1024 * 1024 
                                    ? `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s` 
                                    : `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
                            }
                            
                            const elapsed = (now - startTime) / 1000;
                            const estimatedTotal = (elapsed / (loaded / total));
                            const remaining = Math.max(0, estimatedTotal - elapsed);
                            const timeRemaining = remaining < 60 ? `${Math.round(remaining)}s` : `${Math.round(remaining / 60)}m`;

                            onProgress({ loaded, total, percentage, speed, timeRemaining });
                            lastLoaded = loaded;
                            lastTime = now;
                        }
                    }
                }
            });
            return { success: true, blob: response.data, size: response.data.size };
        } catch (error) {
            console.warn(`Download Attempt ${attempt} failed:`, error.message);
            if (attempt > retries) {
                return { success: false, error: error.message };
            }
            await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
    }
};

const saveToHistory = async (userId, data) => {
    if (!userId) return;
    try {
        await supabase.from('download_history').insert({
            user_id: userId,
            ...data,
            created_at: new Date().toISOString()
        });
    } catch (e) {
        console.error('Failed to save history:', e);
    }
};

const downloadMedia = async (options) => {
    const {
        downloadUrl, platform, format, quality, onProgress, userId,
        mediaTitle, mediaThumbnail, mediaUrl, author, duration
    } = options;

    try {
        if (!downloadUrl) throw new MediaError('No download link', 'NO_LINK');

        const result = await downloadFileWithRetry(downloadUrl, onProgress);
        if (!result.success) throw new MediaError(result.error, 'DOWNLOAD_FAILED');

        const blobUrl = window.URL.createObjectURL(result.blob);
        const fileName = `${platform}_${(mediaTitle||'media').replace(/\W/g, '_').substring(0,20)}_${Date.now()}.${format || 'mp4'}`;
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        await saveToHistory(userId, {
            platform, media_url: mediaUrl, media_type: 'video',
            format, quality, file_size: result.size,
            download_status: 'completed', title: mediaTitle,
            thumbnail_url: mediaThumbnail, author, duration
        });

        return { success: true, fileName };
    } catch (error) {
        if (userId) {
            await saveToHistory(userId, {
                platform, media_url: mediaUrl, download_status: 'failed',
                error_message: error.message, title: mediaTitle
            });
        }
        return { success: false, error: error.message };
    }
};

export const MediaDownloader = {
    getMediaInfo,
    downloadMedia
};
