import { supabase } from './supabase';

export const historyService = {
    async getAll() {
        return supabase.from('download_history').select('*');
    },

    async delete(id) {
        return supabase.from('download_history').delete().eq('id', id);
    },

    async clearAll(userId) {
        return supabase.from('download_history').delete().eq('user_id', userId);
    }
};
