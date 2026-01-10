import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useApiKeys } from '../contexts/ApiKeyContext';
import { useHistory } from '../hooks/useHistory'; // reusing delete logic
import StatsCards from '../components/dashboard/StatsCards';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import LoadingScreen from '../components/LoadingScreen';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { deleteItem } = useHistory(); // reusing delete action
    const stats = useDashboardStats();
    const { apiKeys } = useApiKeys();

    if (stats.loading) return <LoadingScreen message="Loading dashboard..." />;

    // Greeting Logic
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

    // API Keys Count
    const activeKeysCount = Object.keys(apiKeys).length;
    const invalidKeys = Object.entries(apiKeys).filter(([_, k]) => k.status === 'invalid' || k.status === 'expired');

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 1. Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-zinc-900 mb-1">
                            {greeting}, {firstName}!
                        </h1>
                        <p className="text-zinc-500 font-medium">Here's what's happening with your downloads.</p>
                    </div>
                    <Link 
                        to="/"
                        className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-black/20 flex items-center gap-2"
                    >
                        <Download size={20} /> Start New Download
                    </Link>
                </div>

                {/* 2. Key Warnings */}
                {invalidKeys.length > 0 && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 animate-fade-in">
                        <AlertTriangle size={24} />
                        <div className="flex-1">
                            <span className="font-bold">Attention Needed:</span> Your API keys for {invalidKeys.map(k=>k[0]).join(', ')} are invalid or expired.
                        </div>
                        <Link to="/settings" className="px-4 py-2 bg-white rounded-lg text-sm font-bold shadow-sm hover:bg-zinc-50">
                            Fix Now
                        </Link>
                    </div>
                )}

                {/* 3. Stats Cards */}
                <StatsCards stats={stats} apiKeysCount={activeKeysCount} />

                {/* 4. Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Col: Activity Feed (2/3 width) */}
                    <div className="lg:col-span-2 flex flex-col">
                        <ActivityFeed activities={stats.recentActivity} onDelete={deleteItem} />
                    </div>

                    {/* Right Col: Charts & Status (1/3 width) */}
                    <div className="flex flex-col gap-8">
                        
                        {/* Platform Chart */}
                        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm h-[400px]">
                            <h2 className="text-xl font-bold mb-6">Platform Usage</h2>
                            {stats.platformDist.length > 0 ? (
                                <ResponsiveContainer width="100%" height="85%">
                                    <PieChart>
                                        <Pie
                                            data={stats.platformDist}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {stats.platformDist.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', borderColor: '#f4f4f5' }}
                                            itemStyle={{ fontWeight: 600, color: '#3f3f46' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-zinc-400 text-center">
                                    No data yet.<br/>Start downloading to see analytics.
                                </div>
                            )}
                        </div>

                        {/* Quick Help Card */}
                        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                            <p className="text-zinc-400 text-sm mb-6">Check our guide on how to configure API keys for best performance.</p>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
                                View Documentation
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
