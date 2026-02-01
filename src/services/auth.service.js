import { supabase } from './supabase';

/**
 * Service to handle user authentication via Supabase.
 */
export const authService = {
    /**
     * Initiates Google OAuth sign-in flow.
     * @returns {Promise<{data: any, error: any}>}
     */
    async signInWithGoogle() {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
    },

    /**
     * Signs out the current user session.
     * @returns {Promise<{error: any}>}
     */
    async signOut() {
        return supabase.auth.signOut();
    },

    /**
     * Retrieves the current authenticated user object.
     * @returns {Promise<Object|null>}
     */
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
