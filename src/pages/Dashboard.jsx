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
import { Download, AlertTriangle } from 'lucide-react';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const stats = useDashboardStats();
    const { apiKeys, loading: apiKeysLoading } = useApiKeys();

    // API Key Modal State
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [promptedPlatform, setPromptedPlatform] = useState(null);
    const [hasCheckedApiKeys, setHasCheckedApiKeys] = useState(false);

    // API Key Modal is now only triggered by user action (button click), not automatically


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

    // API Keys Count
    const activeKeysCount = Object.keys(apiKeys).length;
    const invalidKeys = Object.entries(apiKeys).filter(([_, k]) => k.status === 'invalid' || k.status === 'expired');

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-100/50 via-white to-white pt-24 pb-20">
            {/* API Key Modal */}
            <ApiKeyModal 
                isOpen={showApiKeyModal} 
                onClose={() => setShowApiKeyModal(false)} 
                platform={promptedPlatform} 
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 1. Welcome Section - Enhanced */}
                <div className="relative mb-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-gradient-to-br from-white to-zinc-50 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 relative overflow-hidden group">
                         {/* Decorative Background Elements */}
                         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-blue-100/30 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Left: Greeting */}
                        <div className="relative flex items-center gap-5 z-10">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-zinc-900/20 ring-4 ring-white">
                                {firstName[0]?.toUpperCase() || '👋'}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-[800] text-zinc-900 tracking-tight leading-tight">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">
                                        {greeting}, {firstName}!
                                    </span>
                                </h1>
                                <p className="text-zinc-500 font-medium mt-1">
                                    You have <span className="text-black font-bold">{stats.totalDownloads}</span> downloads this week.
                                </p>
                            </div>
                        </div>
                        
                        {/* Right: CTA */}
                        <Link 
                            to="/"
                            className="relative z-10 px-7 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/20 flex items-center gap-2.5 group/btn"
                        >
                            <Download size={20} className="group-hover/btn:-translate-y-0.5 transition-transform" /> 
                            <span>Start New Download</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Key Warnings */}
                {invalidKeys.length > 0 && (
                    <div className="mb-8 p-6 bg-red-50/50 border border-red-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-red-700 animate-fade-in backdrop-blur-sm">
                        <div className="p-3 bg-red-100/50 rounded-xl shrink-0">
                            <AlertTriangle size={24} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-red-900 text-lg">Attention Needed</h3>
                            <p className="text-red-700/80 font-medium">
                                Your API keys for <span className="font-bold text-red-800">{invalidKeys.map(k=>k[0]).join(', ')}</span> are invalid or expired.
                            </p>
                        </div>
                        <Link to="/settings" className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all text-red-600 border border-red-100">
                            Fix Issue
                        </Link>
                    </div>
                )}

                {/* No API Keys Warning */}
                {activeKeysCount === 0 && (
                    <div className="mb-8 p-5 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-4 text-amber-700 animate-fade-in">
                        <div className="p-2 bg-amber-100 rounded-xl">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1">
                            <span className="font-bold">Setup Required:</span> Add an API key to start downloading media.
                        </div>
                        <button 
                            onClick={() => {
                                setPromptedPlatform('instagram');
                                setShowApiKeyModal(true);
                            }}
                            className="px-4 py-2 bg-white rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-50 border border-amber-200"
                        >
                            Add API Key
                        </button>
                    </div>
                )}

                {/* 3. Stats Cards */}
                <StatsCards stats={stats} apiKeysCount={activeKeysCount} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Activity Feed (2 cols) */}
                    <div className="lg:col-span-2">
                        <RecentDownloads activities={stats.recentActivity || []} onDelete={handleDeleteItem} />
                    </div>

                    {/* Sidebar (1 col) */}
                    <div className="space-y-8">
                        {/* Platform Chart */}
                        <PlatformChart data={stats.platformDist} />

                        {/* API Key Status */}
                        <ApiKeyStatus apiKeys={apiKeys} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
