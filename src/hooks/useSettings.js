import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS = {
    default_format: 'mp4',
    default_quality: '1080p',
    auto_start_downloads: false,
    notifications_enabled: true,
    auto_delete_days: 0,
    history_limit: 1000,
    show_file_warnings: true,
    theme: 'light'
};

export const useSettings = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchSettings = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('user_preferences') // Updated table name
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
                     throw error;
                }

                if (data) {
                    setSettings({ ...DEFAULT_SETTINGS, ...data });
                } else {
                    // Initialize if not exists
                    await supabase.from('user_preferences').insert({
                        user_id: user.id
                    });
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [user]);

    const updateSettings = async (newSettings) => {
        // Optimistic update
        const prev = settings;
        setSettings(newSettings);
        
        try {
            const { error } = await supabase
                .from('user_preferences')
                .upsert({ 
                    user_id: user.id,
                    ...newSettings,
                    updated_at: new Date().toISOString()
                });
            
            if (error) throw error;
            toast.success('Settings saved');
        } catch (err) {
            console.error(err);
            toast.error('Failed to save settings');
            setSettings(prev); // Revert
        }
    };

    return { settings, loading, updateSettings };
};
