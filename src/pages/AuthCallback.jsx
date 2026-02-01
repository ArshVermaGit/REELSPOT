import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import LoadingScreen from '../components/shared/LoadingSpinner';
import SEO from '../components/shared/SEO';
import toast from 'react-hot-toast';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // The Supabase client handles the session exchange automatically 
        // if the URL contains the access_token or code.
        // We just need to wait for the session to be established.
        
        const handleAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) throw error;
                
                if (session) {
                    toast.success("Successfully signed in!");
                    // Add a small delay to ensure state propagates if needed, or just redirect
                    setTimeout(() => navigate('/', { replace: true }), 500);
                } else {
                    // Sometimes the hash processing takes a moment, or we might be here without a hash
                    // Listen for the auth state change
                    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                        if (event === 'SIGNED_IN' && session) {
                             toast.success("Successfully signed in!");
                             navigate('/', { replace: true });
                        }
                    });
                    return () => subscription.unsubscribe();
                }
            } catch (error) {
                console.error('Auth Callback Error:', error);
                toast.error("Authentication failed. Please try again.");
                navigate('/', { replace: true });
            }
        };

        handleAuth();
    }, [navigate]);

    return (
        <div className="relative">
            <SEO 
                title="Secure Authentication" 
                description="Finalizing your secure sign-in to Reelspot. Please wait while we establish your protected session."
            />
            <LoadingScreen message="Completing secure sign-in..." />
        </div>
    );
};

export default AuthCallback;
