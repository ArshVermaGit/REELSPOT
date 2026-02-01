import { supabase } from './supabase';

/**
 * Service to manage user download history.
 * Interacts with the 'download_history' table in Supabase.
 */
export const historyService = {
    /**
     * Retrieves all download history records for the current user.
     * @returns {Promise<{data: Array|null, error: any}>}
     */
    async getAll() {
        return supabase
            .from('download_history')
            .select('*')
            .order('created_at', { ascending: false });
    },

    /**
     * Deletes a specific history record by ID.
     * @param {string|number} id - Record identifier
     * @returns {Promise<{error: any}>}
     */
    async delete(id) {
        return supabase
            .from('download_history')
            .delete()
            .eq('id', id);
    },

    /**
     * Clears all history records for a specific user.
     * @param {string} userId - UUID of the user
     * @returns {Promise<{error: any}>}
     */
    async clearAll(userId) {
        return supabase
            .from('download_history')
            .delete()
            .eq('user_id', userId);
    }
};
