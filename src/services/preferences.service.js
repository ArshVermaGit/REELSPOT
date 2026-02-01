import { supabase } from './supabase';

/**
 * Service to manage user application preferences.
 */
export const preferencesService = {
    /**
     * Retrieves preferences for a specific user.
     * @param {string} userId - UUID of the user
     * @returns {Promise<Object|null>}
     */
    async get(userId) {
        if (!userId) return null;
        const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            console.error('Error fetching preferences:', error);
        }
        return data;
    },

    /**
     * Updates preferences for a user (upsert).
     * @param {string} userId - UUID of the user
     * @param {Object} prefs - Partial preference object
     * @returns {Promise<Object>} Updated preference object
     */
    async update(userId, prefs) {
        if (!userId) return null;
        const { data, error } = await supabase
            .from('user_preferences')
            .upsert({ user_id: userId, ...prefs, updated_at: new Date().toISOString() })
            .select()
            .single();
            
        if (error) throw error;
        return data;
    }
};
