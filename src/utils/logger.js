/**
 * Custom Logger Service
 * Provides consistent logging across the application.
 */

import config from '../config';

const isDev = config.app.environment === 'development';

const logger = {
    debug: (...args) => {
        if (isDev) {
            console.debug('🐛 [DEBUG]', ...args);
        }
    },
    info: (...args) => {
        console.info('ℹ️ [INFO]', ...args);
    },
    warn: (...args) => {
        console.warn('⚠️ [WARN]', ...args);
    },
    error: (message, error, details = null) => {
        console.error('❌ [ERROR]', message, {
            error: error?.message || error,
            stack: error?.stack,
            details,
            timestamp: new Date().toISOString()
        });
        
        // In production, you might send this to Sentry or another service
        if (!isDev) {
            // sendToErrorService(message, error, details);
        }
    }
};

export default logger;
