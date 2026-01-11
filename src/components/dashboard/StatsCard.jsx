import React from 'react';
import { DownloadCloud, Key, Database, CheckCircle, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const Card = ({ title, value, subtext, icon: Icon, colorClass, delay, to }) => {
    const Wrapper = to ? Link : 'div';
    const wrapperProps = to ? { to } : {};

    return (
        <Wrapper 
            {...wrapperProps}
            className={clsx(
                "block bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-xl shadow-zinc-200/40 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300",
                to ? "cursor-pointer" : ""
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-100/50 to-white/0 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className={clsx("p-3.5 rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 transition-transform group-hover:scale-110 duration-300", colorClass)}>
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                    {subtext && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50/80 backdrop-blur-sm text-green-700 text-xs font-bold rounded-full border border-green-100/50">
                             <TrendingUp size={12} strokeWidth={3} /> {subtext}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-4xl font-[800] text-zinc-900 tracking-tight mb-1">{value}</h3>
                    <p className="text-zinc-500 font-medium text-sm tracking-wide uppercase">{title}</p>
                </div>
            </div>
        </Wrapper>
    );
};

const StatsCards = ({ stats, apiKeysCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card 
                title="Total Downloads" 
                value={stats.totalDownloads} 
                subtext={`+${stats.weekTrend}%`}
                icon={DownloadCloud} 
                colorClass="bg-zinc-900 text-white"
                delay={0}
            />
            <Card 
                title="Active Connections" 
                value={`${apiKeysCount}/4`} 
                icon={Key} 
                colorClass="bg-blue-500 text-white"
                to="/settings"
                delay={100}
            />
            <Card 
                title="Data Downloaded" 
                value={(stats.totalSize / (1024*1024)).toFixed(0) + ' MB'} 
                icon={Database} 
                colorClass="bg-purple-500 text-white"
                delay={200}
            />
            <Card 
                title="Success Rate" 
                value={stats.successRate + '%'} 
                icon={CheckCircle} 
                colorClass={stats.successRate >= 90 ? "bg-emerald-500 text-white" : "bg-orange-500 text-white"}
                delay={300}
            />
        </div>
    );
};

export default StatsCards;
