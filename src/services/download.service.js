import { PLATFORMS } from '../constants/index.js';
import { registerPlatform, getPlatformStrategy } from './platforms/registry.js';
import axios from 'axios';
import { supabase } from './supabase.js';

// Platform Strategy Imports
import { fetchInstagramData } from './platforms/instagram.service.js';
import { fetchYoutubeData } from './platforms/youtube.service.js';
import { fetchFacebookData } from './platforms/facebook.service.js';
import { fetchTikTokData } from './platforms/tiktok.service.js';

// Initialize Core Strategies
registerPlatform(PLATFORMS.INSTAGRAM, fetchInstagramData);
registerPlatform(PLATFORMS.YOUTUBE, fetchYoutubeData);
registerPlatform(PLATFORMS.FACEBOOK, fetchFacebookData);
registerPlatform(PLATFORMS.TIKTOK, fetchTikTokData);

/**
 * Custom Error Class for Media extraction and download issues.
 * @extends Error
 */
export class MediaError extends Error {
    /**
     * @param {string} message - Human readable error message
     * @param {string} code - Internal error code (e.g., 'MISSING_URL')
     * @param {boolean} [retryable=false] - Whether the operation can be retried
     */
    constructor(message, code, retryable = false) {
        super(message);
        this.name = 'MediaError';
        this.code = code;
        this.retryable = retryable;
    }
}

/**
 * @typedef {Object} MediaInfo
 * @property {string} title - Title of the media
 * @property {string} thumbnail - URL to the thumbnail image
 * @property {string} downloadUrl - Direct link to the media file
 * @property {string} [author] - Name of the content creator
 * @property {number} [duration] - Duration in seconds
 * @property {Array} [formats] - Available download formats/qualities
 */

/**
 * Fetches media information using the registered strategy for the detected platform.
 * 
 * @param {Object} params
 * @param {string} params.url - The source URL of the media
 * @param {string} params.platform - The detected platform (e.g., 'instagram')
 * @param {string} [params.apiKey] - Optional RapidAPI key for the platform
 * @returns {Promise<MediaInfo>}
 * @throws {MediaError}
 */
const getMediaInfo = async ({ url, platform, apiKey }) => {
    if (!url) throw new MediaError('URL is required', 'MISSING_URL');

    const fetchStrategy = getPlatformStrategy(platform);
    
    if (!fetchStrategy) {
        throw new MediaError(`Unsupported or unconfigured platform: ${platform}`, 'UNSUPPORTED');
    }

    try {
        return await fetchStrategy(url, apiKey);
    } catch (error) {
        throw error instanceof MediaError ? error : new MediaError(error.message, 'UNKNOWN_ERROR');
    }
};

/**
 * Checks the size of a file before downloading to prevent memory overflow or quota exit.
 * @param {string} url 
 * @returns {Promise<number>} Size in bytes
 */
const checkFileSize = async (url) => {
    try {
        const response = await axios.head(url);
        const size = parseInt(response.headers['content-length'], 10);
        if (size && size > 2 * 1024 * 1024 * 1024) { // 2GB Limit
            throw new MediaError('File too large (> 2GB)', 'FILE_TOO_LARGE');
        }
        return size;
    } catch {
        console.warn("Could not check file size via HEAD request. Proceeding with caution.");
        return 0;
    }
};

/**
 * Downloads a file with exponential backoff retry logic.
 * 
 * @param {string} url - Direct download URL
 * @param {Function} onProgress - Callback for download progress
 * @param {number} [retries=3] - Maximum number of retries
 * @returns {Promise<{success: boolean, blob?: Blob, size?: number, error?: string}>}
 */
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
                    } else {
                        // Indeterminate progress
                        onProgress({ loaded, total: 0, percentage: 0, speed: '---', timeRemaining: '---' });
                    }
                }
            });
            return { success: true, blob: response.data, size: response.data.size };
        } catch (error) {
            console.warn(`Download Attempt ${attempt} failed:`, error.message);
            if (attempt > retries) {
                return { success: false, error: error.message };
            }
            // Exponential backoff
            await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
        }
    }
    return { success: false, error: 'Max retries exceeded' };
};

/**
 * Saves a download record to the user's history in Supabase.
 * @param {string} userId - UUID of the authenticated user
 * @param {Object} data - Metadata about the download
 */
const saveToHistory = async (userId, data) => {
    if (!userId) return;
    try {
        const { error } = await supabase.from('download_history').insert({
            user_id: userId,
            ...data,
            created_at: new Date().toISOString()
        });
        if (error) throw error;
    } catch (e) {
        console.error('Failed to save history to database:', e.message);
    }
};

/**
 * High-level method to handle the entire media download process.
 * Includes fetching, progress tracking, file saving, and history logging.
 * 
 * @param {Object} options
 * @returns {Promise<{success: boolean, fileName?: string, error?: string}>}
 */
const downloadMedia = async (options) => {
    const {
        downloadUrl, platform, format, quality, onProgress, userId,
        mediaTitle, mediaThumbnail, mediaUrl, author, duration
    } = options;

    try {
        if (!downloadUrl) throw new MediaError('No download link provided', 'NO_LINK');

        const result = await downloadFileWithRetry(downloadUrl, onProgress);
        if (!result.success) throw new MediaError(result.error || 'Download failed after retries', 'DOWNLOAD_FAILED');

        const blobUrl = window.URL.createObjectURL(result.blob);
        const fileName = `${platform}_${(mediaTitle||'media').replace(/\W/g, '_').substring(0,20)}_${Date.now()}.${format || 'mp4'}`;
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        // Background history logging
        saveToHistory(userId, {
            platform, media_url: mediaUrl, media_type: 'video',
            format, quality, file_size: result.size,
            download_status: 'completed', title: mediaTitle,
            thumbnail_url: mediaThumbnail, author, duration
        });

        return { success: true, fileName };
    } catch (error) {
        console.error("Downloader Service Error:", error);
        if (userId) {
            saveToHistory(userId, {
                platform, media_url: mediaUrl, download_status: 'failed',
                error_message: error.message, title: mediaTitle
            });
        }
        return { success: false, error: error.message };
    }
};

/**
 * Exports for individual service methods to enable tree-shaking
 */
export const getMediaInfoExport = getMediaInfo;
export const downloadMediaExport = downloadMedia;

export { getMediaInfo, downloadMedia };

export const MediaDownloader = {
    getMediaInfo,
    downloadMedia
};
