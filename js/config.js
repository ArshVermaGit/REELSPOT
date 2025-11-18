// Configuration file for ReelSpot APIs

require('dotenv').config();

const config = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development',
        corsOrigin: process.env.CORS_ORIGIN || '*'
    },

    // Rate limiting
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    },

    // Free API endpoints (No API key required)
    freeAPIs: {
        instagram: {
            primary: 'https://api.saveig.app/api/ajaxSearch',
            backup: 'https://v3.saveig.app/api/ajaxSearch',
            method: 'POST'
        },
        youtube: {
            primary: 'https://api.cobalt.tools/api/json',
            backup: 'https://api.y2mate.com/api/ajax/search',
            method: 'POST'
        },
        tiktok: {
            primary: 'https://api.tikwm.com/api/',
            backup: 'https://www.tikwm.com/api/',
            method: 'POST'
        },
        facebook: {
            primary: 'https://api.saveig.app/api/ajaxSearch',
            backup: 'https://fbdownloader.app/api/ajaxSearch',
            method: 'POST'
        },
        twitter: {
            primary: 'https://api.saveig.app/api/ajaxSearch',
            backup: 'https://twdown.net/download.php',
            method: 'POST'
        }
    },

    // Premium API endpoints (Require API keys from RapidAPI)
    premiumAPIs: {
        instagram: {
            host: 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
            endpoint: '/get-info-rapidapi',
            key: process.env.INSTAGRAM_API_KEY || process.env.RAPIDAPI_KEY
        },
        youtube: {
            host: 'youtube-mp36.p.rapidapi.com',
            endpoint: '/dl',
            key: process.env.YOUTUBE_API_KEY || process.env.RAPIDAPI_KEY
        },
        tiktok: {
            host: 'tiktok-video-no-watermark2.p.rapidapi.com',
            endpoint: '/',
            key: process.env.TIKTOK_API_KEY || process.env.RAPIDAPI_KEY
        },
        facebook: {
            host: 'facebook-video-downloader.p.rapidapi.com',
            endpoint: '/download',
            key: process.env.FACEBOOK_API_KEY || process.env.RAPIDAPI_KEY
        },
        twitter: {
            host: 'twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com',
            endpoint: '/status',
            key: process.env.TWITTER_API_KEY || process.env.RAPIDAPI_KEY
        }
    },

    // Alternative free services
    alternatives: {
        // Invidious instances for YouTube (open-source frontend)
        youtube: [
            'https://invidious.snopyta.org',
            'https://yewtu.be',
            'https://invidious.kavin.rocks'
        ],
        // Nitter instances for Twitter (open-source frontend)
        twitter: [
            'https://nitter.net',
            'https://nitter.42l.fr',
            'https://nitter.pussthecat.org'
        ]
    },

    // Download settings
    download: {
        maxFileSize: 500 * 1024 * 1024, // 500MB
        timeout: 60000, // 60 seconds
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },

    // Platform-specific settings
    platforms: {
        instagram: {
            maxRetries: 3,
            useBackup: true,
            supportedTypes: ['reel', 'post', 'story', 'igtv']
        },
        youtube: {
            maxRetries: 3,
            useBackup: true,
            supportedTypes: ['video', 'short'],
            formats: ['mp4', 'webm', 'mp3']
        },
        tiktok: {
            maxRetries: 3,
            useBackup: true,
            noWatermark: true,
            supportedTypes: ['video']
        },
        facebook: {
            maxRetries: 3,
            useBackup: true,
            supportedTypes: ['video', 'watch']
        },
        twitter: {
            maxRetries: 3,
            useBackup: true,
            supportedTypes: ['video', 'gif']
        }
    },

    // Quality presets
    qualityPresets: {
        '2160p': { width: 3840, height: 2160, bitrate: '50M' },
        '1440p': { width: 2560, height: 1440, bitrate: '30M' },
        '1080p': { width: 1920, height: 1080, bitrate: '12M' },
        '720p': { width: 1280, height: 720, bitrate: '8M' },
        '480p': { width: 854, height: 480, bitrate: '4M' },
        '360p': { width: 640, height: 360, bitrate: '2M' }
    },

    // Error messages
    errors: {
        invalidUrl: 'Invalid URL provided',
        unsupportedPlatform: 'Platform not supported',
        videoNotFound: 'Video not found or unavailable',
        privateVideo: 'Cannot download private videos',
        rateLimitExceeded: 'Rate limit exceeded. Please try again later',
        apiError: 'API error occurred. Please try again',
        downloadFailed: 'Download failed. Please try again',
        networkError: 'Network error. Please check your connection'
    }
};

// Helper function to get API configuration
config.getAPIConfig = function(platform, usePremium = false) {
    if (usePremium && this.premiumAPIs[platform] && this.premiumAPIs[platform].key) {
        return {
            type: 'premium',
            config: this.premiumAPIs[platform]
        };
    }
    return {
        type: 'free',
        config: this.freeAPIs[platform]
    };
};

// Helper function to check if premium APIs are available
config.hasPremiumAccess = function(platform) {
    return this.premiumAPIs[platform] && this.premiumAPIs[platform].key;
};

module.exports = config;