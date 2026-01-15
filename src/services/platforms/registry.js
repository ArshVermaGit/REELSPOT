/**
 * Platform Strategy Registry
 * Allows dynamic registration of platform-specific download strategies.
 */

const PLATFORM_STRATEGIES = new Map();

/**
 * Registers a new platform strategy.
 * @param {string} platform - Use constants from PLATFORMS
 * @param {Function} fetchFn - The API fetching logic
 */
export const registerPlatform = (platform, fetchFn) => {
    PLATFORM_STRATEGIES.set(platform, fetchFn);
};

/**
 * Gets a platform strategy.
 * @param {string} platform 
 * @returns {Function|null}
 */
export const getPlatformStrategy = (platform) => {
    return PLATFORM_STRATEGIES.get(platform);
};
