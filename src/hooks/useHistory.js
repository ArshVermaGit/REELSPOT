import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useHistory = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters & Search
    const [filter, setFilter] = useState({ 
        platform: 'All', 
        type: 'All', 
        status: 'All',
        format: 'All',
        dateRange: 'All' // Today, Last 7 Days, Last 30 Days, All
    });
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest'); // newest, oldest, largest, smallest

    // Selection for Bulk Actions
    const [selectedIds, setSelectedIds] = useState(new Set());

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
                // Fetch all history for now (can paginate later)
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
                    // Also remove from selection if deleted
                    setSelectedIds(prev => {
                        const next = new Set(prev);
                        next.delete(payload.old.id);
                        return next;
                    });
                } else if (payload.eventType === 'UPDATE') {
                    setHistory(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user]);

    // Derived Logic: Filtering & Sorting
    const filteredHistory = useMemo(() => {
        let result = [...history];

        // 1. Search (Debounce not strictly needed here unless heavy, handled in UI)
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(item => 
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.media_url && item.media_url.toLowerCase().includes(q))
            );
        }

        // 2. Filters
        if (filter.platform !== 'All') {
            result = result.filter(item => item.platform.toLowerCase() === filter.platform.toLowerCase());
        }
        if (filter.status !== 'All') {
            result = result.filter(item => 
                filter.status === 'Completed' ? item.download_status === 'completed' : 
                filter.status === 'Failed' ? item.download_status === 'failed' : true
            );
        }
        // Media Type logic (approximate)
        if (filter.type !== 'All') { 
            // Assume we populate this column better later, checks for substring now
             result = result.filter(item => item.media_type && item.media_type.toLowerCase().includes(filter.type.toLowerCase()));
        }

        if (filter.format !== 'All') {
            result = result.filter(item => item.format && item.format.toLowerCase() === filter.format.toLowerCase());
        }

        // Date Range
        if (filter.dateRange !== 'All') {
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            result = result.filter(item => {
                const date = new Date(item.created_at);
                if (filter.dateRange === 'Today') {
                    return date >= todayStart;
                }
                if (filter.dateRange === 'Last 7 Days') {
                    const sevenDaysAgo = new Date(now);
                    sevenDaysAgo.setDate(now.getDate() - 7);
                    return date >= sevenDaysAgo;
                }
                if (filter.dateRange === 'Last 30 Days') {
                    const thirtyDaysAgo = new Date(now);
                    thirtyDaysAgo.setDate(now.getDate() - 30);
                    return date >= thirtyDaysAgo;
                }
                return true;
            });
        }

        // 3. Sorting
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

    // Stats
    const stats = useMemo(() => {
        const totalDownloads = history.length;
        const totalSize = history.reduce((acc, curr) => acc + (curr.file_size || 0), 0);
        const successCount = history.filter(h => h.download_status === 'completed').length;
        
        // Find most used platform
        const platformCounts = {};
        history.forEach(h => {
            const p = h.platform || 'unknown';
            platformCounts[p] = (platformCounts[p] || 0) + 1;
        });
        const mostUsedPlatform = Object.entries(platformCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'None';

        return { totalDownloads, totalSize, successCount, mostUsedPlatform };
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
            setSelectedIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete item');
        }
    };

    const clearHistory = async () => {
        try {
            const { error } = await supabase
                .from('download_history')
                .delete()
                .eq('user_id', user.id);
            if (error) throw error;
            toast.success('History cleared');
            setSelectedIds(new Set());
        } catch(err) {
            toast.error('Failed to clear history');
        }
    };

    // Bulk Actions
    const toggleSelect = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedIds.size === filteredHistory.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredHistory.map(item => item.id)));
        }
    };

    const bulkDelete = async () => {
        if (selectedIds.size === 0) return;
        if (!confirm(`Delete ${selectedIds.size} items?`)) return;

        try {
            const ids = Array.from(selectedIds);
            const { error } = await supabase
                .from('download_history')
                .delete()
                .in('id', ids);

            if (error) throw error;
            toast.success(`${ids.length} items deleted`);
            setSelectedIds(new Set());
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete selected items');
        }
    };

    return {
        history: filteredHistory,
        rawHistory: history,
        loading,
        filter,
        setFilter,
        search,
        setSearch,
        sort,
        setSort,
        stats,
        // Single Actions
        deleteItem,
        clearHistory,
        // Bulk Actions
        selectedIds,
        toggleSelect,
        selectAll,
        bulkDelete
    };
};
