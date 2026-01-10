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

    const saveApiKey = async (platform, key) => {
        // Basic format validation
        if (!key || key.length < 5) {
            toast.error('Invalid API key format');
            return false;
        }

        const toastId = toast.loading('Saving API key...');
        try {
            // Upsert to Supabase
            const { data, error } = await supabase
                .from('api_keys')
                .upsert({ 
                    user_id: user.id, 
                    platform, 
                    api_key: key, 
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, platform' }) // Use constraint name if needed, or inferred from unique index
                .select()
                .single();
            
            if (error) throw error;
            
            // Update local state
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

    return (
        <ApiKeyContext.Provider value={{ apiKeys, saveApiKey, getApiKey, hasApiKey, deleteApiKey, loading }}>
            {children}
        </ApiKeyContext.Provider>
    );
};
