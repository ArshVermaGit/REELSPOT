import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ApiKeyContext = createContext({});

export const useApiKeys = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({ children }) => {
    const { user } = useAuth();
    const [apiKeys, setApiKeys] = useState({}); // Map: platform -> key object
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchApiKeys();
        } else {
            setApiKeys({});
        }
    }, [user]);

    const fetchApiKeys = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('api_keys')
                .select('*');
            
            if (error) throw error;
            
            // Convert array to map for easier access
            const keyMap = {};
            data?.forEach(k => {
                keyMap[k.platform] = k;
            });
            setApiKeys(keyMap);
        } catch (error) {
            console.error('Error fetching API keys:', error);
            toast.error('Failed to load API keys');
        } finally {
            setLoading(false);
        }
    };

    const validateApiKey = async (platform, key) => {
        if (!key) return { valid: false, message: 'Key is empty' };
        
        let valid = false;
        let message = '';

        // Regex patterns for rough validation
        const patterns = {
            // Instagram / Facebook User Tokens are often ~150-200+ chars, start with EAA...
            facebook: /^EAA[A-Za-z0-9]+/,
            instagram: /^EAA[A-Za-z0-9]+/, // Often same format if using FB Graph API for Insta
            // YouTube API keys: 39 characters, alphanumeric + symbols
            youtube: /^[A-Za-z0-9_-]{39}$/,
            // TikTok Client Keys: alphanumeric, varying length (often 20ish)
            tiktok: /^[A-Za-z0-9]{15,30}$/
        };

        // Basic format check
        switch (platform) {
            case 'instagram':
            case 'facebook':
                // Relaxed check: Just ensure it's long enough and starts right or has structure
                // FB tokens are notoriously variable, so length > 50 is a safe sanity check.
                if (key.length < 50) {
                     message = 'Token seems too short for a Facebook/Instagram User Token';
                } else {
                     valid = true;
                }
                break;
            case 'youtube':
                if (patterns.youtube.test(key)) {
                    valid = true;
                } else {
                    message = 'Invalid YouTube API Key format (usually 39 chars)';
                }
                break;
            case 'tiktok':
                 if (key.length < 10) {
                     message = 'Key seems too short';
                 } else {
                     valid = true;
                 }
                 break;
            default:
                valid = true;
                break;
        }

        if (!valid && !message) message = 'Invalid format';

        if (!valid) return { valid: false, message };

        // Simulate network test validation
        await new Promise(r => setTimeout(r, 600)); 
        
        return { valid: true };
    };

    const saveApiKey = async (platform, key) => {
        const toastId = toast.loading(`Validating ${platform} key...`);
        
        try {
            // 1. Validate
            const validation = await validateApiKey(platform, key);
            if (!validation.valid) {
                toast.error(validation.message, { id: toastId });
                return false;
            }

            // 2. Upsert to Supabase
            // Note: In a production environment with pgcrypto, we would use an RPC 
            // function to encrypt: rpc('save_encrypted_key', { ... })
            const { data, error } = await supabase
                .from('api_keys')
                .upsert({ 
                    user_id: user.id, 
                    platform, 
                    api_key: key, 
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, platform' })
                .select()
                .single();
            
            if (error) throw error;
            
            // 3. Update local state
            setApiKeys(prev => ({
                ...prev,
                [platform]: data
            }));
            
            toast.success(`${platform} API key saved!`, { id: toastId });
            return true;
        } catch (error) {
            console.error('Error saving API key:', error);
            toast.error(`Failed to save key: ${error.message}`, { id: toastId });
            return false;
        }
    };

    const getApiKey = (platform) => {
        return apiKeys[platform]?.api_key;
    };

    const hasApiKey = (platform) => {
        return !!apiKeys[platform];
    };

    const deleteApiKey = async (platform) => {
         const toastId = toast.loading('Removing API key...');
         try {
            const { error } = await supabase
                .from('api_keys')
                .delete()
                .eq('user_id', user.id)
                .eq('platform', platform);
            
            if (error) throw error;

            setApiKeys(prev => {
                const updated = { ...prev };
                delete updated[platform];
                return updated;
            });

            toast.success('API key removed', { id: toastId });
            return true;
         } catch (error) {
             console.error('Error deleting API key:', error);
             toast.error('Failed to delete key', { id: toastId });
             return false;
         }
    };

    const updateKeyStatus = async (platform, status, latency) => {
        try {
            const updates = { 
                status, 
                last_tested_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            // Logic to update Supabase would go here
            // For now, we update local state optimistically or re-fetch
             const { data, error } = await supabase
                .from('api_keys')
                .update(updates)
                .eq('user_id', user.id)
                .eq('platform', platform)
                .select()
                .single();

            if (error) throw error;

            setApiKeys(prev => ({
                ...prev,
                [platform]: data
            }));
            return true;
        } catch (error) {
            console.error('Error updating key status:', error);
            return false;
        }
    };

    return (
        <ApiKeyContext.Provider value={{ apiKeys, saveApiKey, getApiKey, hasApiKey, deleteApiKey, updateKeyStatus, loading }}>
            {children}
        </ApiKeyContext.Provider>
    );
};
