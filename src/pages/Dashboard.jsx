import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useApiKeys } from '../contexts/ApiKeyContext';
import StatsCards from '../components/dashboard/StatsCard'; 
import RecentDownloads from '../components/dashboard/RecentDownloads';
import PlatformChart from '../components/dashboard/PlatformChart';
import ApiKeyStatus from '../components/dashboard/ApiKeyStatus';
import ApiKeyModal from '../components/modals/ApiKeyModal';
import HelpModal from '../components/modals/HelpModal';
import LoadingScreen from '../components/shared/LoadingSpinner';
import SEO from '../components/shared/SEO';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KeyWarnings from '../components/dashboard/KeyWarnings';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const stats = useDashboardStats();
    const { apiKeys } = useApiKeys();

    // Modal State
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);

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

    const invalidKeys = Object.entries(apiKeys)
        .filter(([, k]) => k.status === 'invalid' || k.status === 'expired')
        .map(([platform]) => platform);

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 relative">
            <SEO 
                title="Creator Dashboard" 
                description="Manage your social media downloads and usage analytics in the Reelspot Creator Dashboard."
            />
            
            <ApiKeyModal 
                isOpen={showApiKeyModal} 
                onClose={() => setShowApiKeyModal(false)} 
            />

            <HelpModal 
                isOpen={showHelpModal}
                onClose={() => setShowHelpModal(false)}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                <DashboardHeader 
                    greeting={greeting}
                    firstName={firstName}
                    onShowHelp={() => setShowHelpModal(true)}
                />

                <KeyWarnings 
                    invalidKeys={invalidKeys}
                    onFix={() => setShowApiKeyModal(true)}
                />

                <StatsCards stats={stats} apiKeysCount={Object.keys(apiKeys).length} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    <div className="lg:col-span-2 min-h-[500px]">
                        <RecentDownloads activities={stats.recentActivity || []} onDelete={handleDeleteItem} />
                    </div>

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
