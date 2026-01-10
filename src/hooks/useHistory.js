import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useHistory = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ platform: 'All', type: 'All', status: 'All' });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest'); // 'newest', 'oldest', 'size_desc', 'size_asc'

    // Fetch Initial Data
    useEffect(() => {
        if (!user) {
            setHistory([]);
            setLoading(false);
            return;
        }

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('download_history')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setHistory(data || []);
            } catch (err) {
                console.error('Error fetching history:', err);
                toast.error('Failed to load history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();

        // Real-time Subscription
        const subscription = supabase
            .channel('public:download_history')
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: 'download_history', 
                filter: `user_id=eq.${user.id}` 
            }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setHistory(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'DELETE') {
                    setHistory(prev => prev.filter(item => item.id !== payload.old.id));
                } else if (payload.eventType === 'UPDATE') {
                    setHistory(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user]);

    // Filtering & Sorting Logic
    const filteredHistory = useMemo(() => {
        let result = [...history];

        // Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(item => 
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.media_url && item.media_url.toLowerCase().includes(q)) ||
                (item.platform && item.platform.toLowerCase().includes(q))
            );
        }

        // Filters
        if (filter.platform !== 'All') {
            result = result.filter(item => item.platform.toLowerCase() === filter.platform.toLowerCase());
        }
        if (filter.status !== 'All') {
            result = result.filter(item => 
                filter.status === 'Completed' ? item.download_status === 'completed' : 
                filter.status === 'Failed' ? item.download_status === 'failed' : true
            );
        }
        // Simplified type filter for now (as schema stores generic strings)
        if (filter.type !== 'All') {
             // Logic depends on what we store in 'media_type'. Assume 'video', 'image'.
             // For specific types like 'Reels', we might check platform + type or metadata.
             // Stick to simple matches for now.
             result = result.filter(item => item.media_type && item.media_type.toLowerCase() === filter.type.toLowerCase());
        }

        // Sorting
        result.sort((a, b) => {
            switch (sort) {
                case 'newest': return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest': return new Date(a.created_at) - new Date(b.created_at);
                case 'size_desc': return (b.file_size || 0) - (a.file_size || 0);
                case 'size_asc': return (a.file_size || 0) - (b.file_size || 0);
                default: return 0;
            }
        });

        return result;
    }, [history, search, filter, sort]);

    // Stats Calculation
    const stats = useMemo(() => {
        const totalDownloads = history.length;
        const totalSize = history.reduce((acc, curr) => acc + (curr.file_size || 0), 0);
        const successCount = history.filter(h => h.download_status === 'completed').length;
        return { totalDownloads, totalSize, successCount };
    }, [history]);

    // Actions
    const deleteItem = async (id) => {
        try {
            const { error } = await supabase
                .from('download_history')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            toast.success('Item deleted');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete item');
        }
    };

    const clearHistory = async () => {
         // Batch delete
         try {
             const { error } = await supabase
                .from('download_history')
                .delete()
                .eq('user_id', user.id);
             if (error) throw error;
             toast.success('History cleared');
         } catch(err) {
             toast.error('Failed to clear history');
         }
    };

    return {
        history: filteredHistory,
        loading,
        filter,
        setFilter,
        search,
        setSearch,
        sort,
        setSort,
        stats,
        deleteItem,
        clearHistory
    };
};
