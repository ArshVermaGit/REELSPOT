/**
 * Global Constants for Reelspot
 * Centralizing these makes the project more scalable and easier to contribute to.
 */

export const PLATFORMS = {
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    FACEBOOK: 'facebook',
    TIKTOK: 'tiktok',
    UNKNOWN: 'unknown'
};

export const MEDIA_TYPES = {
    VIDEO: 'video',
    REEL: 'reel',
    STORY: 'story',
    POST: 'post',
    SHORT: 'short',
    UNKNOWN: 'unknown'
};

// Comprehensive Regex Patterns
export const PATTERNS = {
    // Instagram: Matches /p/, /reel/, /reels/, /tv/, /stories/
    INSTAGRAM: /(?:instagr\.am|instagram\.com)\/(p|reel|reels|stories|tv)\/([a-zA-Z0-9_-]+)/,
    
    // YouTube: Matches watch?v=, youtu.be/, shorts/, embed/
    YOUTUBE: /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
    YOUTUBE_SHORTS: /(?:youtube\.com\/shorts\/)([^"&?/\s]{11})/,
    
    // Facebook: Matches watch, videos, reel, stories
    FACEBOOK: /(?:facebook\.com|fb\.watch)\/(?:watch\/?\?v=|videos\/|reel\/|stories\/|groups\/[^/]+\/posts\/)([^/?&]+)/,
    
    // TikTok: Matches @user/video/ID, v/ID, vt.tiktok.com/ID
    TIKTOK: /(?:tiktok\.com\/)(?:@[\w.-]+\/video\/|v\/)([\d]+)|(?:vt\.tiktok\.com\/)([\w]+)/
};
