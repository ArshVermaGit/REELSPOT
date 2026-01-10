import { showToast } from './toastUtils'; // Extension is resolved automatically but good to know it's JSX now

export class AppError extends Error {
    constructor(message, code, details = null) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.details = details;
    }
}

export const handleError = (error) => {
    // 1. Network Errors
    if (!navigator.onLine) {
        showToast.error("No internet connection. Please check your network.");
        return;
    }
    
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        showToast.error("Connection lost. Please try again.");
        return;
    }

    // 2. Custom App Logic Errors
    if (error instanceof AppError) {
        switch(error.code) {
            case 'AUTH_REQUIRED':
                showToast.error("Session expired. Please sign in again.");
                // Redirect logic handled elsewhere ideally, or dispatch event
                break;
            case 'API_KEY_INVALID':
                showToast.error(`Invalid API Key for ${error.details?.platform || 'platform'}. Check settings.`);
                break;
            case 'API_KEY_EXPIRED':
                showToast.warning(`API Key for ${error.details?.platform} has expired.`);
                break;
            case 'RATE_LIMIT':
                showToast.error(`Rate limit reached. Try again later.`);
                break;
            default:
                showToast.error(error.message);
        }
        return;
    }

    // 3. Generic/Unknown Errors
    console.error("Unhandled Error:", error);
    showToast.error(error.message || "Something went wrong. Please try again.");
};

export const parseApiError = (status, platform) => {
    switch (status) {
        case 401: return new AppError('Unauthorized', 'API_KEY_INVALID', { platform });
        case 403: return new AppError('Forbidden', 'API_KEY_EXPIRED', { platform });
        case 429: return new AppError('Too Many Requests', 'RATE_LIMIT', { platform });
        case 404: return new AppError('Media not found', 'MEDIA_NOT_FOUND', { platform });
        case 500: return new AppError('Server Error', 'SERVER_ERROR', { platform });
        default: return new AppError('Unknown API Error', 'UNKNOWN');
    }
};
