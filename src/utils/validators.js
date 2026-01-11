export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validateApiKey = (key) => {
    return key && key.length > 10;
};
