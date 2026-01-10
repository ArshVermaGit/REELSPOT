import React from 'react';
import { DownloadCloud, HardDrive, CheckCircle2, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-zinc-500 text-sm font-medium">{title}</p>
                <h2 className="text-3xl font-bold text-zinc-900 mt-0.5">{value}</h2>
                {subtext && <p className="text-xs text-zinc-400 mt-1">{subtext}</p>}
            </div>
        </div>
    </div>
);

const HistoryStats = ({ stats }) => {
    return (
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
                title="Total Downloads" 
                value={stats.totalDownloads} 
                icon={DownloadCloud}
                colorClass="bg-black text-white"
            />
            <StatCard 
                title="Data Downloaded" 
                value={`${(stats.totalSize / (1024 * 1024)).toFixed(0)} MB`} 
                subtext="Total lifetime usage"
                icon={HardDrive}
                colorClass="bg-zinc-100 text-zinc-600"
            />
            <StatCard 
                title="Success Rate" 
                value={stats.totalDownloads > 0 ? `${((stats.successCount / stats.totalDownloads) * 100).toFixed(0)}%` : '0%'} 
                icon={CheckCircle2}
                colorClass="bg-green-100 text-green-600"
            />
            <StatCard 
                title="Favorite Platform" 
                value={stats.mostUsedPlatform !== 'None' ? stats.mostUsedPlatform.charAt(0).toUpperCase() + stats.mostUsedPlatform.slice(1) : 'None'} 
                icon={TrendingUp}
                colorClass="bg-blue-100 text-blue-600"
            />
        </div>
    );
};

export default HistoryStats;
