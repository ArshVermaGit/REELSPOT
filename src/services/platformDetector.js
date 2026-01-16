import { PLATFORMS, MEDIA_TYPES, PATTERNS } from '../constants';

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
    } catch {
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
                // Handle story URLs: /stories/username/12345
                if(url.includes('/stories/')) {
                     const parts = url.split('/').filter(p => p);
                     // If structure is instagram.com/stories/username/ID ...
                     // Last part should be ID.
                     const lastPart = parts[parts.length - 1];
                     // Basic check if it looks like an ID (numeric)
                     if (/^\d+$/.test(lastPart)) return lastPart;
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
    } catch {
        console.warn('Error extracting media ID');
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
    if (cleanUrl.includes('instagram.com') || cleanUrl.includes('instagr.am')) {
        let type = MEDIA_TYPES.POST;
        if (cleanUrl.includes('/reel/') || cleanUrl.includes('/reels/')) type = MEDIA_TYPES.REEL;
        else if (cleanUrl.includes('/stories/')) type = MEDIA_TYPES.STORY;
        else if (cleanUrl.includes('/tv/')) type = MEDIA_TYPES.VIDEO;

        const id = extractMediaId(cleanUrl, PLATFORMS.INSTAGRAM);
        // Valid if we found an ID (except for stories which might be tricky, but general posts need ID)
        // For stories, allow if URL looks correct even if extractMediaId simple matching failed previously
        const isValid = !!id || cleanUrl.includes('/stories/');
        
        return { platform: PLATFORMS.INSTAGRAM, mediaType: type, mediaId: id, isValid: isValid };
    }

    // 3. YouTube Detection
    if (cleanUrl.match(/youtu\.?be/)) {
        const isShort = PATTERNS.YOUTUBE_SHORTS.test(cleanUrl);
        const id = extractMediaId(cleanUrl, PLATFORMS.YOUTUBE);
        return { 
            platform: PLATFORMS.YOUTUBE, 
            mediaType: isShort ? MEDIA_TYPES.SHORT : MEDIA_TYPES.VIDEO, 
            mediaId: id, 
            isValid: !!id 
        };
    }

    // 4. Facebook Detection
    if (cleanUrl.includes('facebook.com') || cleanUrl.includes('fb.watch')) {
        let type = MEDIA_TYPES.VIDEO;
        if (cleanUrl.includes('/reel/')) type = MEDIA_TYPES.REEL;
        else if (cleanUrl.includes('/stories/')) type = MEDIA_TYPES.STORY;
        
        const id = extractMediaId(cleanUrl, PLATFORMS.FACEBOOK);
        // FB URLs are diverse, loosen valid check slightly or rely on regex match
        const hasMatch = PATTERNS.FACEBOOK.test(cleanUrl);
        return { platform: PLATFORMS.FACEBOOK, mediaType: type, mediaId: id, isValid: hasMatch };
    }

    // 5. TikTok Detection
    if (cleanUrl.includes('tiktok.com')) {
        const id = extractMediaId(cleanUrl, PLATFORMS.TIKTOK);
        return { platform: PLATFORMS.TIKTOK, mediaType: MEDIA_TYPES.VIDEO, mediaId: id, isValid: !!id };
    }

    return { platform: PLATFORMS.UNKNOWN, mediaType: MEDIA_TYPES.UNKNOWN, mediaId: null, isValid: false };
};
