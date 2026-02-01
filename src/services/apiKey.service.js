import { supabase } from './supabase';

/**
 * Service to manage user API keys for social media platforms.
 */
export const apiKeyService = {
    /**
     * Retrieves all API keys for a specific user.
     * @param {string} userId - UUID of the user
     * @returns {Promise<{data: Array|null, error: any}>}
     */
    async getKeys(userId) {
        return supabase.from('api_keys').select('*').eq('user_id', userId);
    },

    /**
     * Saves or updates an API key for a user and platform.
     * @param {Object} keyData - { user_id, platform, api_key, status, updated_at }
     * @returns {Promise<{data: any, error: any}>}
     */
    async saveKey(keyData) {
        return supabase.from('api_keys').upsert(keyData);
    },

    /**
     * Deletes a specific platform key for a user.
     * @param {string} platform - Platform identifier (e.g., 'youtube')
     * @param {string} userId - UUID of the user
     * @returns {Promise<{error: any}>}
     */
    async deleteKey(platform, userId) {
        return supabase.from('api_keys').delete().match({ platform, user_id: userId });
    }
};
