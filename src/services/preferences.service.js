import { supabase } from './supabase';

export const preferencesService = {
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
