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
    // Data State
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 20;

    const buildQuery = (baseQuery) => {
        let q = baseQuery;

        // 1. Search
        if (search) {
            // Simple OR search on title and url
            q = q.or(`title.ilike.%${search}%,media_url.ilike.%${search}%`);
        }

        // 2. Filters
        if (filter.platform !== 'All') {
            q = q.eq('platform', filter.platform.toLowerCase());
        }
        if (filter.status !== 'All') {
            const status = filter.status === 'Completed' ? 'completed' : 'failed';
            q = q.eq('download_status', status);
        }
        if (filter.type !== 'All') {
            q = q.ilike('media_type', `%${filter.type.toLowerCase()}%`);
        }
        if (filter.format !== 'All') {
            q = q.eq('format', filter.format.toLowerCase());
        }
        if (filter.dateRange !== 'All') {
            const now = new Date();
            let date = new Date();
            if (filter.dateRange === 'Today') date.setHours(0,0,0,0);
            if (filter.dateRange === 'Last 7 Days') date.setDate(now.getDate() - 7);
            if (filter.dateRange === 'Last 30 Days') date.setDate(now.getDate() - 30);
            q = q.gte('created_at', date.toISOString());
        }

        // 3. Sorting
        switch (sort) {
            case 'newest': q = q.order('created_at', { ascending: false }); break;
            case 'oldest': q = q.order('created_at', { ascending: true }); break;
            case 'size_desc': q = q.order('file_size', { ascending: false }); break;
            case 'size_asc': q = q.order('file_size', { ascending: true }); break;
            default: q = q.order('created_at', { ascending: false });
        }

        return q;
    };

    const fetchHistory = async (pageIndex, reset = false) => {
        if (!user) return;
        if (reset) {
            setLoading(true);
            setHistory([]); // Clear immediately on filter change
        }

        try {
            const from = pageIndex * ITEMS_PER_PAGE;
            const to = from + ITEMS_PER_PAGE - 1;

            let query = supabase
                .from('download_history')
                .select('*', { count: 'exact' })
                .eq('user_id', user.id);

            query = buildQuery(query);
            
            // Pagination
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) throw error;

            setHistory(prev => reset ? (data || []) : [...prev, ...(data || [])]);
            setHasMore(data && data.length === ITEMS_PER_PAGE);
            
        } catch (err) {
            console.error('Error fetching history:', err);
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    // Effect for Filter/Sort/Search changes
    useEffect(() => {
        // Debounce search
        const timeoutId = setTimeout(() => {
            setPage(0);
            fetchHistory(0, true); 
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [user, filter, sort, search]);

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchHistory(nextPage, false);
        }
    };

    // Note: Removed useMemo filteredHistory, directly using `history` state which is now server-filtered.

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
        history, // Directly returning history state
        rawHistory: history,
        loading,
        hasMore,
        loadMore,
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
