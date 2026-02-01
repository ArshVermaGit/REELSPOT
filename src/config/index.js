/**
 * Centralized Configuration Manager
 * Handles environment variables and global application settings.
 */

const getEnv = (key, defaultValue = null) => {
    const value = import.meta.env[key];
    if (value === undefined || value === '') return defaultValue;
    return value;
};

export const config = {
    app: {
        name: getEnv('VITE_APP_NAME', 'Reelspot'),
        version: '1.0.0',
        environment: getEnv('MODE', 'development'),
        isProduction: getEnv('PROD', false),
        isMaintenanceMode: getEnv('VITE_MAINTENANCE_MODE') === 'true',
    },
    supabase: {
        url: getEnv('VITE_SUPABASE_URL'),
        anonKey: getEnv('VITE_SUPABASE_ANON_KEY'),
    },
    api: {
        baseUrl: getEnv('VITE_API_BASE_URL', '/api/v1'),
        timeout: parseInt(getEnv('VITE_API_TIMEOUT', '30000'), 10),
    },
    features: {
        enableAnalytics: getEnv('VITE_ENABLE_ANALYTICS') === 'true',
        mockDownloadDelay: parseInt(getEnv('VITE_MOCK_DELAY', '1500'), 10),
    },
    social: {
        github: 'https://github.com/ArshVermaGit/REELSPOT',
        creator: 'https://arshcreates.vercel.app',
    }
};

export default config;
