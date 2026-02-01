import { PLATFORMS, MEDIA_TYPES } from '../constants/index.js';

/**
 * Validates and extracts platform information from a social media URL.
 * Supports Instagram, YouTube, Facebook, and TikTok.
 * 
 * @param {string} url - The URL to analyze
 * @returns {Object} { platform, mediaType, mediaId, isValid, cleanUrl }
 */
export const detectPlatform = (url) => {
    if (!url) return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };

    try {
        const urlObj = new URL(url);
        const cleanUrl = urlObj.origin + urlObj.pathname;
        
        // Instagram
        const igHosts = ['instagram.com', 'www.instagram.com'];
        if (igHosts.includes(urlObj.hostname)) {
            const pathSegments = urlObj.pathname.split('/').filter(Boolean);
            const type = pathSegments[0]; // 'p', 'reel', 'tv', 'stories'
            const id = pathSegments[1];
            
            let mediaType = MEDIA_TYPES.POST;
            if (type === 'reels' || type === 'reel') mediaType = MEDIA_TYPES.REEL;
            if (type === 'tv') mediaType = MEDIA_TYPES.VIDEO;
            if (type === 'stories') mediaType = MEDIA_TYPES.STORY;

            return { platform: PLATFORMS.INSTAGRAM, mediaType, mediaId: id, isValid: !!id, cleanUrl };
        }

        // YouTube
        const ytHosts = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];
        if (ytHosts.includes(urlObj.hostname)) {
            let id = urlObj.searchParams.get('v');
            let mediaType = MEDIA_TYPES.VIDEO;

            if (urlObj.hostname === 'youtu.be') {
                id = urlObj.pathname.slice(1);
            } else if (urlObj.pathname.includes('/shorts/')) {
                id = urlObj.pathname.split('/shorts/')[1]?.split('/')[0];
                mediaType = MEDIA_TYPES.SHORTS;
            }

            return { platform: PLATFORMS.YOUTUBE, mediaType, mediaId: id, isValid: !!id, cleanUrl };
        }

        // Facebook
        const fbHosts = ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.watch'];
        if (fbHosts.includes(urlObj.hostname)) {
            let id = urlObj.searchParams.get('v');
            if (!id && urlObj.pathname.includes('/reels/')) {
                id = urlObj.pathname.split('/reels/')[1]?.replace(/\//g, '');
            }
            return { platform: PLATFORMS.FACEBOOK, mediaType: MEDIA_TYPES.VIDEO, mediaId: id, isValid: !!id, cleanUrl };
        }

        // TikTok
        const ttHosts = ['tiktok.com', 'www.tiktok.com', 'm.tiktok.com'];
        if (ttHosts.includes(urlObj.hostname)) {
            const id = urlObj.pathname.split('/video/')[1]?.split('?')[0];
            return { platform: PLATFORMS.TIKTOK, mediaType: MEDIA_TYPES.VIDEO, mediaId: id, isValid: !!id, cleanUrl };
        }

    } catch (e) {
        console.error("Platform detection failed:", e.message);
    }

    return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };
};

/**
 * Utility to extract Media ID from various URL patterns if direct detection fails.
 * @param {string} platform 
 * @param {string} url 
 * @returns {string|null}
 */
export const extractMediaId = (platform, url) => {
    const { mediaId } = detectPlatform(url);
    return mediaId;
};
