import React from 'react';
import { DownloadCloud, Key, Database, CheckCircle, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const Card = ({ title, value, subtext, icon: Icon, colorClass, delay }) => (
    <div 
        className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm animate-fade-in-up hover:shadow-md transition-shadow"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-start justify-between mb-4">
            <div className={clsx("p-3 rounded-xl", colorClass)}>
                <Icon size={24} />
            </div>
            {subtext && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                 <TrendingUp size={12} /> {subtext}
            </span>}
        </div>
        <h3 className="text-3xl font-bold text-zinc-900 mb-1">{value}</h3>
        <p className="text-zinc-500 text-sm font-medium">{title}</p>
    </div>
);

const StatsCards = ({ stats, apiKeysCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card 
                title="Total Downloads" 
                value={stats.totalDownloads} 
                subtext={`+${stats.weekTrend} this week`}
                icon={DownloadCloud} 
                colorClass="bg-black text-white"
                delay={0}
            />
            <Link to="/settings">
                <Card 
                    title="Active Connections" 
                    value={`${apiKeysCount} / 4`} 
                    icon={Key} 
                    colorClass="bg-blue-50 text-blue-600"
                    delay={100}
                />
            </Link>
            <Card 
                title="Data Downloaded" 
                value={(stats.totalSize / (1024*1024)).toFixed(0) + ' MB'} 
                icon={Database} 
                colorClass="bg-purple-50 text-purple-600"
                delay={200}
            />
            <Card 
                title="Success Rate" 
                value={stats.successRate + '%'} 
                icon={CheckCircle} 
                colorClass={stats.successRate >= 90 ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}
                delay={300}
            />
        </div>
    );
};

export default StatsCards;
