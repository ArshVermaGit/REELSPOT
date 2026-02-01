/**
 * Validates if a string is a properly formatted URL.
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Basic validation for an API key. 
 * Checks for existence and minimum length.
 * @param {string} key 
 * @returns {boolean}
 */
export const validateApiKey = (key) => {
    return !!(key && key.length > 10);
};
