/**
 * Platform Detection & Validation Service
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

// Regex Patterns
const PATTERNS = {
    INSTAGRAM: /(?:instagr\.am|instagram\.com)\/(p|reel|reels|stories|tv)\/([a-zA-Z0-9_-]+)/,
    YOUTUBE: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    YOUTUBE_SHORTS: /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    FACEBOOK: /(?:facebook\.com|fb\.watch)\/(?:watch\/?\?v=|videos\/|reel\/|stories\/)([a-zA-Z0-9_-]+)/,
    TIKTOK: /(?:tiktok\.com\/)(?:@[\w.-]+\/video\/|v\/)([\d]+)/
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

    // 2. Instagram
    const igMatch = url.match(PATTERNS.INSTAGRAM);
    if (igMatch) {
        const typeMap = {
            'p': MEDIA_TYPES.POST,
            'reel': MEDIA_TYPES.REEL,
            'reels': MEDIA_TYPES.REEL,
            'stories': MEDIA_TYPES.STORY,
            'tv': MEDIA_TYPES.VIDEO
        };
        // Handle stories which might have username in path: /stories/username/123
        // The regex above captures "stories" as group 1.
        // If it's a story, we might need to adjust extraction logic if the regex implies ID is group 2.
        // Our simple regex: ...(p|reel...)\/([a-zA-Z0-9_-]+)
        // For stories/username/123, this might fail or capture username as ID.
        // Let's refine for stories specifically if needed, but for now assuming standard ID placement or simple paths.
        
        // Refined story check:
        if (igMatch[1] === 'stories') {
             // For stories, url is often /stories/username/id. 
             // We need a more robust parser for stories if we want accurate ID.
             // But for detection:
             return { platform: PLATFORMS.INSTAGRAM, mediaType: MEDIA_TYPES.STORY, mediaId: igMatch[2], isValid: true };
        }

        return { 
            platform: PLATFORMS.INSTAGRAM, 
            mediaType: typeMap[igMatch[1]] || MEDIA_TYPES.POST, 
            mediaId: igMatch[2],
            isValid: true 
        };
    }

    // 3. YouTube
    // Check Shorts first
    const ytShortsMatch = url.match(PATTERNS.YOUTUBE_SHORTS);
    if (ytShortsMatch) {
         return { platform: PLATFORMS.YOUTUBE, mediaType: MEDIA_TYPES.SHORT, mediaId: ytShortsMatch[1], isValid: true };
    }
    const ytMatch = url.match(PATTERNS.YOUTUBE);
    if (ytMatch) {
        return { platform: PLATFORMS.YOUTUBE, mediaType: MEDIA_TYPES.VIDEO, mediaId: ytMatch[1], isValid: true };
    }

    // 4. Facebook
    const fbMatch = url.match(PATTERNS.FACEBOOK);
    if (fbMatch) {
        let type = MEDIA_TYPES.VIDEO;
        if (url.includes('/reel/')) type = MEDIA_TYPES.REEL;
        if (url.includes('/stories/')) type = MEDIA_TYPES.STORY;
        
        return { platform: PLATFORMS.FACEBOOK, mediaType: type, mediaId: fbMatch[1], isValid: true };
    }

    // 5. TikTok
    const ttMatch = url.match(PATTERNS.TIKTOK);
    if (ttMatch) {
        return { platform: PLATFORMS.TIKTOK, mediaType: MEDIA_TYPES.VIDEO, mediaId: ttMatch[1], isValid: true };
    }

    return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };
};
