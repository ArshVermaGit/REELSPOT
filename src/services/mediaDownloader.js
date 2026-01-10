import axios from 'axios';
import { supabase } from './supabase';

/**
 * Core Media Downloader Service
 */

// Helper to determine best quality
const determineQuality = (formats, targetQuality) => {
    // This is a simplified logic. Real APIs return complex format objects.
    if (!formats || formats.length === 0) return null;
    
    // formats assumed to be array of objects: { quality: '1080p', url: '...' }
    // Sort high to low
    const sorted = formats.sort((a, b) => {
         const qA = parseInt(a.quality) || 0;
         const qB = parseInt(b.quality) || 0;
         return qB - qA;
    });

    const selected = sorted.find(f => f.quality === targetQuality) || sorted[0];
    return selected;
};

// History Tracker
const saveToHistory = async (userId, metadata) => {
    if (!userId) return;
    try {
        const { error } = await supabase.from('download_history').insert({
            user_id: userId,
            ...metadata,
            created_at: new Date().toISOString()
        });
        if (error) console.error('Failed to save history:', error);
    } catch (err) {
        console.error('History API error:', err);
    }
};

// File Downloader (Blob)
const downloadFile = async (url, onProgress) => {
    try {
        const response = await axios.get(url, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total;
                const loaded = progressEvent.loaded;
                if (total) {
                    const percentage = Math.round((loaded * 100) / total);
                    onProgress({
                        loaded,
                        total,
                        percentage,
                        speed: 'Calculating...', // Calculating speed is complex without state of prev timestamp
                        timeRemaining: 'Calculating...'
                    });
                }
            }
        });
        return { success: true, blob: response.data, size: response.data.size };
    } catch (error) {
        console.error("Blob download failed", error);
        return { success: false, error: error.message };
    }
};

// Platform Handlers
const handlers = {
    instagram: async (args) => {
        // Mock Implementation due to lack of real API key/Token for context
        // Real implementation would use: axios.get(`https://graph.instagram.com/${args.mediaId}?fields=...&access_token=${args.apiKey}`)
        
        await new Promise(r => setTimeout(r, 1000)); // Simulate API call
        if (!args.apiKey) throw new Error("Invalid API Key");

        // Simulate fetching details
        return {
             url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4", // Mock video
             quality: '720p',
             format: 'mp4',
             size: 1024 * 1024
        };
    },
    youtube: async (args) => {
        // Mock implementation
         await new Promise(r => setTimeout(r, 1500));
         if (!args.apiKey) throw new Error("Invalid API Key");
         
         return {
             url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
             quality: '1080p',
             format: 'mp4',
             size: 5 * 1024 * 1024
         };
    },
    facebook: async (args) => {
        await new Promise(r => setTimeout(r, 1200));
        if (!args.apiKey) throw new Error("Invalid API Key");
        return {
             url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
             quality: 'HD',
             format: 'mp4',
             size: 2 * 1024 * 1024
         };
    },
    tiktok: async (args) => {
        await new Promise(r => setTimeout(r, 800));
        if (!args.apiKey) throw new Error("Invalid API Key");
        return {
             url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
             quality: 'Original',
             format: 'mp4',
             size: 3 * 1024 * 1024
         };
    }
};

/**
 * Main Download Function
 */
export const downloadMedia = async ({
    url,
    platform,
    mediaId,
    apiKey,
    format = 'mp4',
    quality = '1080p',
    onProgress,
    userId
}) => {
    try {
        if (!platform || !handlers[platform]) {
            throw new Error("Unsupported platform");
        }

        // 1. Fetch Metadata/Direct Link
        const mediaInfo = await handlers[platform]({ url, mediaId, apiKey, format, quality });
        
        // 2. Download File Blob
        // Note: In browser, direct downloading from some domains behaves differently (CORS).
        // If 'downloadFile' fails due to CORS, we might return the URL for the user to open.
        const downloadResult = await downloadFile(mediaInfo.url, onProgress);
        
        if (!downloadResult.success) {
             throw new Error("Download failed - CORS or Network Error. Link: " + mediaInfo.url);
        }

        // 3. Create Browser Download Link
        const blobUrl = window.URL.createObjectURL(downloadResult.blob);
        const fileName = `${platform}_${mediaId}_${Date.now()}.${format}`;
        
        // 4. Trigger Download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        // 5. Save History
        await saveToHistory(userId, {
            platform,
            media_url: url,
            media_type: 'video', // simplified for now
            format,
            quality: mediaInfo.quality,
            file_size: downloadResult.size,
            download_status: 'completed'
        });

        return { success: true };

    } catch (error) {
        console.error("Download pipeline error:", error);
         // Save failed history
         await saveToHistory(userId, {
            platform,
            media_url: url,
            media_type: 'unknown',
            download_status: 'failed',
            error_message: error.message
        });

        return { success: false, error: error.message };
    }
};
