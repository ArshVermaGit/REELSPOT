/**
 * @typedef {Function} PlatformStrategy
 * @param {string} url - Source URL
 * @param {string} [apiKey] - API key
 * @returns {Promise<Object>} Media metadata
 */

/** @type {Record<string, PlatformStrategy>} */
const strategies = {};

/**
 * Registers a new download strategy for a specific platform.
 * Used for modular extension of the downloader.
 * 
 * @param {string} platform - Platform key from PLATFORMS constant
 * @param {PlatformStrategy} strategy - Function that implements the extraction logic
 */
export const registerPlatform = (platform, strategy) => {
  strategies[platform] = strategy;
};

/**
 * Retrieves the registered strategy for a platform.
 * 
 * @param {string} platform 
 * @returns {PlatformStrategy | null}
 */
export const getPlatformStrategy = (platform) => {
  return strategies[platform] || null;
};
