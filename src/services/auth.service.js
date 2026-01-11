import { supabase } from './supabase';

export const authService = {
    async signInWithGoogle() {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
    },

    async signOut() {
        return supabase.auth.signOut();
    },

    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
