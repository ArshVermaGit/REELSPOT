import axios from 'axios';
import { supabase } from './supabase';

/**
 * Advanced Media Downloader Service
 */

// --- Mock Data Generators ---

const getMockFormats = (platform) => {
    if (platform === 'instagram' || platform === 'tiktok') {
        return [
            { type: 'video', quality: '1080p', ext: 'mp4', size: '12.5 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
            { type: 'video', quality: '720p', ext: 'mp4', size: '8.2 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
            { type: 'audio', quality: 'Original', ext: 'mp3', size: '3.1 MB', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
        ];
    }
    if (platform === 'youtube') {
        return [
            { type: 'video', quality: '1080p', ext: 'mp4', size: '45.2 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
            { type: 'video', quality: '720p', ext: 'mp4', size: '22.1 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
            { type: 'video', quality: '480p', ext: 'mp4', size: '12.5 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
            { type: 'audio', quality: '320kbps', ext: 'mp3', size: '5.2 MB', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
        ];
    }
    return [
         { type: 'video', quality: 'HD', ext: 'mp4', size: '15.0 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
         { type: 'video', quality: 'SD', ext: 'mp4', size: '5.0 MB', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' }
    ];
};

// --- Core Functions ---

/**
 * Analyzes the URL and returns available formats and metadata.
 */
export const getMediaInfo = async ({ url, platform, apiKey }) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));

    // Basic Validation (in real app, use apiKey to fetch from provider)
    if (!url) throw new Error("URL is required");

    // Return Mock Metadata
    return {
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Media`,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // Generic placeholder
        duration: '0:30',
        author: '@sample_user',
        formats: getMockFormats(platform)
    };
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
        // NOTE: In a real scenario, big files or CORS restrictions need a proxy.
        // For this demo, we use axios. 
        const response = await axios.get(url, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total;
                const loaded = progressEvent.loaded;
                if (total) {
                    const percentage = Math.round((loaded * 100) / total);
                    // Estimate speed (rough)
                    // In a real app we'd keep track of start time or last chunk time
                    onProgress({
                        loaded,
                        total,
                        percentage,
                        speed: 'MB/s', 
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

/**
 * Main Download Function
 * Now simpler: takes a direct downloadUrl (extracted from getMediaInfo formats)
 */
export const downloadMedia = async ({
    downloadUrl,
    platform,
    format,
    quality,
    onProgress,
    userId,
    mediaTitle // For history/filename
}) => {
    try {
        if (!downloadUrl) throw new Error("No download URL provided");
        
        // 1. Download
        const result = await downloadFile(downloadUrl, onProgress);
        
        if (!result.success) {
             throw new Error("Download failed - Network Error.");
        }

        // 2. Create Link
        const blobUrl = window.URL.createObjectURL(result.blob);
        const ext = format || 'mp4';
        const safeTitle = (mediaTitle || 'download').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `${platform}_${safeTitle}_${Date.now()}.${ext}`;
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        // 3. Save History
        await saveToHistory(userId, {
            platform,
            media_url: '...', // Should pass actual URL or url prop
            media_type: ext === 'mp3' ? 'audio' : 'video',
            format: ext,
            quality: quality,
            file_size: result.size,
            download_status: 'completed',
            // New Fields
            title: mediaTitle,
            // We would need thumbnail/author passed in options to save them here
            // For now, these are optional in schema
        });

        return { success: true };

    } catch (error) {
        console.error("Download pipeline error:", error);
         await saveToHistory(userId, {
            platform,
            download_status: 'failed',
            error_message: error.message
        });
        return { success: false, error: error.message };
    }
};
