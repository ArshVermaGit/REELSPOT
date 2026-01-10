import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';

const ApiKeyContext = createContext({});

export const useApiKeys = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({ children }) => {
    const { user } = useAuth();
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchApiKeys();
        }
    }, [user]);

    const fetchApiKeys = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('api_keys')
                .select('*');
            if (error) throw error;
            setApiKeys(data || []);
        } catch (error) {
            console.error('Error fetching API keys:', error);
        } finally {
            setLoading(false);
        }
    };

    const addApiKey = async (platform, key) => {
        try {
            const { data, error } = await supabase
                .from('api_keys')
                .upsert({ user_id: user.id, platform, api_key: key, updated_at: new Date() })
                .select();
            
            if (error) throw error;
            
            // Update local state
            setApiKeys(prev => {
                const filtered = prev.filter(k => k.platform !== platform);
                return [...filtered, data[0]];
            });
            return { success: true };
        } catch (error) {
            console.error('Error adding API key:', error);
            return { success: false, error };
        }
    };

    return (
        <ApiKeyContext.Provider value={{ apiKeys, addApiKey, loading }}>
            {children}
        </ApiKeyContext.Provider>
    );
};
