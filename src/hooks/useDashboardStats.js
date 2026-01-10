import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';

export const useDashboardStats = () => {
    const { user } = useAuth();
    const { apiKeys } = useApiKeys();
    const [stats, setStats] = useState({
        totalDownloads: 0,
        totalSize: 0,
        successRate: 0,
        platformDist: [],
        recentActivity: [],
        weekTrend: 0,
        loading: true
    });

    const refreshStats = async () => {
        if (!user) return;
        
        try {
            // 1. Fetch History
            const { data: history, error } = await supabase
                .from('download_history')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // 2. Calculate Metrics
            const totalDownloads = history.length;
            const successCount = history.filter(h => h.download_status === 'completed').length;
            const successRate = totalDownloads > 0 ? Math.round((successCount / totalDownloads) * 100) : 0;
            const totalSize = history.reduce((acc, curr) => acc + (curr.file_size || 0), 0);

            // 3. Platform Distribution
            const distMap = {};
            history.forEach(h => {
                const p = h.platform || 'other';
                distMap[p] = (distMap[p] || 0) + 1;
            });
            const platformDist = Object.keys(distMap).map(key => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                value: distMap[key],
                fill: getPlatformColor(key)
            }));

            // 4. Weekly Trend
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const thisWeek = history.filter(h => new Date(h.created_at) > oneWeekAgo).length;
            // Mocking trend comparison logic slightly since we don't have "last week" efficiently without more queries
            // Simply returning count for now
            const weekTrend = thisWeek; 

            setStats({
                totalDownloads,
                totalSize,
                successRate,
                platformDist,
                recentActivity: history.slice(0, 5),
                weekTrend,
                loading: false
            });

        } catch (err) {
            console.error("Stats error:", err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        refreshStats();
        
        // Subscription for real-time updates
        const subscription = supabase
            .channel('dashboard_stats')
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: 'download_history',
                filter: `user_id=eq.${user?.id}`
            }, () => {
                refreshStats();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user, apiKeys]); // Re-run if keys change too, though less relevant for history stats

    return { ...stats, refreshStats };
};

const getPlatformColor = (platform) => {
    switch(platform.toLowerCase()) {
        case 'instagram': return '#E1306C';
        case 'youtube': return '#FF0000';
        case 'facebook': return '#4267B2';
        case 'tiktok': return '#000000';
        default: return '#71717a';
    }
};
