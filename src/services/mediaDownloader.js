import axios from 'axios';
import { supabase } from './supabase';

/**
 * Advanced Media Downloader Service
 * Handles media analysis, downloading, and history tracking.
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
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        duration: '0:30',
        author: '@sample_user',
        formats: getMockFormats(platform)
    };
};

/**
 * Saves download record to history with all metadata.
 */
const saveToHistory = async (userId, metadata) => {
    if (!userId) {
        console.warn('No userId provided, skipping history save');
        return null;
    }
    
    try {
        const record = {
            user_id: userId,
            platform: metadata.platform || 'unknown',
            media_url: metadata.mediaUrl || metadata.media_url || '',
            media_type: metadata.mediaType || metadata.media_type || 'video',
            format: metadata.format || 'mp4',
            quality: metadata.quality || 'unknown',
            file_size: metadata.fileSize || metadata.file_size || 0,
            download_status: metadata.downloadStatus || metadata.download_status || 'completed',
            error_message: metadata.errorMessage || metadata.error_message || null,
            title: metadata.title || 'Untitled',
            thumbnail_url: metadata.thumbnailUrl || metadata.thumbnail_url || null,
            author: metadata.author || null,
            duration: metadata.duration || null,
            metadata: metadata.extraMetadata || {},
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('download_history')
            .insert(record)
            .select()
            .single();
            
        if (error) {
            console.error('Failed to save history:', error);
            return null;
        }
        
        console.log('History saved:', data?.id);
        return data;
    } catch (err) {
        console.error('History API error:', err);
        return null;
    }
};

/**
 * Downloads file as blob with progress tracking.
 */
const downloadFile = async (url, onProgress) => {
    try {
        const startTime = Date.now();
        let lastLoaded = 0;
        let lastTime = startTime;
        
        const response = await axios.get(url, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total || 0;
                const loaded = progressEvent.loaded;
                
                if (total > 0) {
                    const percentage = Math.round((loaded * 100) / total);
                    
                    // Calculate speed
                    const now = Date.now();
                    const timeDiff = (now - lastTime) / 1000; // seconds
                    const byteDiff = loaded - lastLoaded;
                    
                    let speed = '0 MB/s';
                    if (timeDiff > 0.1) {
                        const bytesPerSec = byteDiff / timeDiff;
                        if (bytesPerSec > 1024 * 1024) {
                            speed = `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
                        } else if (bytesPerSec > 1024) {
                            speed = `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
                        } else {
                            speed = `${bytesPerSec.toFixed(0)} B/s`;
                        }
                        lastLoaded = loaded;
                        lastTime = now;
                    }
                    
                    // Calculate time remaining
                    const elapsed = (now - startTime) / 1000;
                    const estimatedTotal = (elapsed / (loaded / total));
                    const remaining = Math.max(0, estimatedTotal - elapsed);
                    let timeRemaining = '--';
                    if (remaining < 60) {
                        timeRemaining = `${Math.round(remaining)}s`;
                    } else if (remaining < 3600) {
                        timeRemaining = `${Math.round(remaining / 60)}m`;
                    } else {
                        timeRemaining = `${Math.round(remaining / 3600)}h`;
                    }
                    
                    onProgress({
                        loaded,
                        total,
                        percentage,
                        speed,
                        timeRemaining
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
 * Formats file size for display.
 */
const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Main Download Function
 * Handles the complete download pipeline: fetch, save, and track.
 */
export const downloadMedia = async ({
    downloadUrl,
    platform,
    format,
    quality,
    onProgress,
    userId,
    mediaTitle,
    mediaThumbnail,
    mediaUrl, // Original source URL
    author,
    duration
}) => {
    try {
        if (!downloadUrl) throw new Error("No download URL provided");
        
        // 1. Download the file
        const result = await downloadFile(downloadUrl, onProgress);
        
        if (!result.success) {
             throw new Error(result.error || "Download failed - Network Error.");
        }

        // 2. Create download link and trigger download
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

        // 3. Save to history with all metadata
        await saveToHistory(userId, {
            platform,
            mediaUrl: mediaUrl || downloadUrl,
            mediaType: ext === 'mp3' ? 'audio' : 'video',
            format: ext,
            quality: quality,
            fileSize: result.size,
            downloadStatus: 'completed',
            title: mediaTitle,
            thumbnailUrl: mediaThumbnail,
            author: author,
            duration: duration
        });

        return { success: true, fileName, size: formatFileSize(result.size) };

    } catch (error) {
        console.error("Download pipeline error:", error);
        
        // Save failed attempt to history
        await saveToHistory(userId, {
            platform,
            mediaUrl: mediaUrl || downloadUrl,
            mediaType: format === 'mp3' ? 'audio' : 'video',
            format: format,
            quality: quality,
            downloadStatus: 'failed',
            errorMessage: error.message,
            title: mediaTitle
        });
        
        return { success: false, error: error.message };
    }
};
