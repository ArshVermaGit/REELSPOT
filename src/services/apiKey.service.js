import { supabase } from './supabase';

export const apiKeyService = {
    async getKeys(userId) {
        return supabase.from('api_keys').select('*').eq('user_id', userId);
    },

    async saveKey(keyData) {
        return supabase.from('api_keys').upsert(keyData);
    },

    async deleteKey(platform, userId) {
        return supabase.from('api_keys').delete().match({ platform, user_id: userId });
    }
};
