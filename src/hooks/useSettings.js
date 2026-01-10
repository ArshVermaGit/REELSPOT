import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS = {
    default_format: 'mp4',
    default_quality: '1080p',
    auto_download: false,
    notifications_enabled: true,
    history_retention_days: 30,
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
                // Try fetching
                const { data, error } = await supabase
                    .from('user_settings')
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
                    await supabase.from('user_settings').insert({
                        user_id: user.id
                    });
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
                // Do not toast here to avoid spamming on load, just log
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
                .from('user_settings')
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
