import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useApiKeys } from '../contexts/ApiKeyContext';
import StatsCards from '../components/dashboard/StatsCard'; 
import RecentDownloads from '../components/dashboard/RecentDownloads';
import PlatformChart from '../components/dashboard/PlatformChart';
import ApiKeyStatus from '../components/dashboard/ApiKeyStatus';
import ApiKeyModal from '../components/modals/ApiKeyModal';
import LoadingScreen from '../components/shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Download, AlertTriangle, Settings, History, Plus } from 'lucide-react';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const stats = useDashboardStats();
    const { apiKeys, loading: apiKeysLoading } = useApiKeys();

    // API Key Modal State
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [promptedPlatform, setPromptedPlatform] = useState(null);

    // Delete handler for recent downloads
    const handleDeleteItem = async (id) => {
        try {
            const { error } = await supabase
                .from('download_history')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            toast.success('Item deleted');
            stats.refreshStats(); // Refresh dashboard stats
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete item');
        }
    };

    if (stats.loading) return <LoadingScreen message="Loading dashboard..." />;

    // Greeting Logic
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

    const invalidKeys = Object.entries(apiKeys).filter(([_, k]) => k.status === 'invalid' || k.status === 'expired');

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20">
            {/* API Key Modal */}
            <ApiKeyModal 
                isOpen={showApiKeyModal} 
                onClose={() => setShowApiKeyModal(false)} 
                platform={promptedPlatform} 
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* 1. Compact Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-2">
                            {greeting}, {firstName}.
                        </h1>
                        <p className="text-zinc-500 font-medium">
                            Here's what's happening with your downloads today.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-3">
                        <Link 
                            to="/"
                            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/10"
                        >
                            <Plus size={18} />
                            New Download
                        </Link>
                        <div className="h-8 w-px bg-zinc-200 mx-1" />
                        <Link to="/history" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-600">
                            <History size={20} />
                        </Link>
                        <Link to="/settings" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-600">
                            <Settings size={20} />
                        </Link>
                    </div>
                </div>

                {/* 2. Key Warnings */}
                {invalidKeys.length > 0 && (
                    <div className="mb-10 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 animate-fade-in">
                        <div className="p-2.5 bg-red-100/50 rounded-2xl text-red-600">
                            <AlertTriangle size={22} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-red-900 text-sm">Action Required</h3>
                            <p className="text-red-700/80 text-sm font-medium mt-0.5">
                                Re-authenticate keys: <span className="font-bold">{invalidKeys.map(k=>k[0]).join(', ')}</span>
                            </p>
                        </div>
                        <button 
                            onClick={() => setShowApiKeyModal(true)}
                            className="px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-bold text-red-700 hover:bg-red-50"
                        >
                            Fix Now
                        </button>
                    </div>
                )}

                {/* 3. Stats Grid (Bento) */}
                <StatsCards stats={stats} apiKeysCount={Object.keys(apiKeys).length} />

                {/* 4. Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    {/* Activity Feed (2 cols) */}
                    <div className="lg:col-span-2 min-h-[500px]">
                        <RecentDownloads activities={stats.recentActivity || []} onDelete={handleDeleteItem} />
                    </div>

                    {/* Sidebar (1 col) */}
                    <div className="space-y-8 flex flex-col">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex-1">
                             <h3 className="font-[800] text-xl tracking-tight mb-6">Device Usage</h3>
                             <PlatformChart data={stats.platformDist} />
                        </div>

                        <ApiKeyStatus apiKeys={apiKeys} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
