/**
 * Advanced Platform Detection & URL Validation Service
 * Handles regex matching for Instagram, YouTube, Facebook, and TikTok.
 */

const PLATFORMS = {
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    FACEBOOK: 'facebook',
    TIKTOK: 'tiktok',
    UNKNOWN: 'unknown'
};

const MEDIA_TYPES = {
    VIDEO: 'video',
    REEL: 'reel',
    STORY: 'story',
    POST: 'post',
    SHORT: 'short',
    UNKNOWN: 'unknown'
};

// Comprehensive Regex Patterns
const PATTERNS = {
    // Matches: /p/ID, /reel/ID, /reels/ID, /tv/ID, /stories/user/ID
    INSTAGRAM: /(?:instagr\.am|instagram\.com)\/(p|reel|reels|stories|tv)\/([a-zA-Z0-9_-]+)/,
    
    // Matches: youtube.com/watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID
    YOUTUBE: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    YOUTUBE_SHORTS: /(?:youtube\.com\/shorts\/)([^"&?\/\s]{11})/,
    
    // Matches: facebook.com/watch?v=ID, /videos/ID, /reel/ID, fb.watch/ID
    FACEBOOK: /(?:facebook\.com|fb\.watch)\/(?:watch\/?\?v=|videos\/|reel\/|stories\/|groups\/[^/]+\/posts\/)([^/?&]+)/,
    // Note: FB regex is tricky due to many formats. fb.watch often redirects.
    
    // Matches: tiktok.com/@user/video/ID, tiktok.com/v/ID, vt.tiktok.com/ID
    TIKTOK: /(?:tiktok\.com\/)(?:@[\w.-]+\/video\/|v\/)([\d]+)|(?:vt\.tiktok\.com\/)([\w]+)/
};

/**
 * Validates the URL structure and protocol
 * @param {string} url 
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateUrl = (url) => {
    if (!url) return { isValid: false, error: 'URL is required' };
    
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return { isValid: false, error: 'Invalid protocol. Use http or https.' };
        }
        return { isValid: true, error: null };
    } catch (e) {
        return { isValid: false, error: 'Invalid URL format' };
    }
};

/**
 * Extracts the media ID from the URL based on the platform
 * @param {string} url 
 * @param {string} platform 
 * @returns {string|null}
 */
export const extractMediaId = (url, platform) => {
    try {
        let match = null;
        switch (platform) {
            case PLATFORMS.INSTAGRAM:
                match = url.match(PATTERNS.INSTAGRAM);
                // Group 2 is usually the ID, but for stories/username/id logic might differ
                // Our regex: (p|reel|...)\/([ID])
                // For /stories/username/12345, the regex needs to be smarter or we handle it here.
                // Current regex captures "stories" as group 1.
                if(match && match[1] === 'stories' && url.includes('/stories/')) {
                     // Try to grab the last numeric part
                     const parts = url.split('/').filter(p => p);
                     return parts[parts.length - 1]; 
                }
                return match ? match[2] : null;

            case PLATFORMS.YOUTUBE:
                match = url.match(PATTERNS.YOUTUBE_SHORTS) || url.match(PATTERNS.YOUTUBE);
                return match ? match[1] : null;

            case PLATFORMS.FACEBOOK:
                match = url.match(PATTERNS.FACEBOOK);
                return match ? match[1] : null;

            case PLATFORMS.TIKTOK:
                match = url.match(PATTERNS.TIKTOK);
                // Group 1 is ID for standard, Group 2 for vt.tiktok (shortened)
                return match ? (match[1] || match[2]) : null;
            
            default:
                return null;
        }
    } catch (e) {
        console.warn('Error extracting media ID:', e);
        return null;
    }
};

/**
 * Detects the platform and extracts metadata
 * @param {string} url 
 * @returns {{platform: string, mediaType: string, mediaId: string|null, isValid: boolean}}
 */
export const detectPlatform = (url) => {
    // 1. Basic Validation
    const validation = validateUrl(url);
    if (!validation.isValid) {
        return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };
    }

    const cleanUrl = url.trim();

    // 2. Instagram Detection
    if (PATTERNS.INSTAGRAM.test(cleanUrl)) {
        const match = cleanUrl.match(PATTERNS.INSTAGRAM);
        const typeStr = match[1];
        let type = MEDIA_TYPES.POST;
        if (['reel', 'reels'].includes(typeStr)) type = MEDIA_TYPES.REEL;
        else if (typeStr === 'stories') type = MEDIA_TYPES.STORY;
        else if (typeStr === 'tv') type = MEDIA_TYPES.VIDEO;

        const id = extractMediaId(cleanUrl, PLATFORMS.INSTAGRAM);
        return { platform: PLATFORMS.INSTAGRAM, mediaType: type, mediaId: id, isValid: true };
    }

    // 3. YouTube Detection
    if (cleanUrl.match(PATTERNS.YOUTUBE) || cleanUrl.match(PATTERNS.YOUTUBE_SHORTS)) {
        const isShort = PATTERNS.YOUTUBE_SHORTS.test(cleanUrl);
        const id = extractMediaId(cleanUrl, PLATFORMS.YOUTUBE);
        return { 
            platform: PLATFORMS.YOUTUBE, 
            mediaType: isShort ? MEDIA_TYPES.SHORT : MEDIA_TYPES.VIDEO, 
            mediaId: id, 
            isValid: true 
        };
    }

    // 4. Facebook Detection
    if (PATTERNS.FACEBOOK.test(cleanUrl)) {
        let type = MEDIA_TYPES.VIDEO;
        if (cleanUrl.includes('/reel/')) type = MEDIA_TYPES.REEL;
        else if (cleanUrl.includes('/stories/')) type = MEDIA_TYPES.STORY;
        
        const id = extractMediaId(cleanUrl, PLATFORMS.FACEBOOK);
        return { platform: PLATFORMS.FACEBOOK, mediaType: type, mediaId: id, isValid: true };
    }

    // 5. TikTok Detection
    if (PATTERNS.TIKTOK.test(cleanUrl)) {
        const id = extractMediaId(cleanUrl, PLATFORMS.TIKTOK);
        return { platform: PLATFORMS.TIKTOK, mediaType: MEDIA_TYPES.VIDEO, mediaId: id, isValid: true };
    }

    return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };
};
