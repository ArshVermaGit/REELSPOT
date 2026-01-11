import React from 'react';
import { DownloadCloud, Key, Database, CheckCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const BentoCard = ({ title, value, subtext, icon: Icon, colorClass, delay, to, trend }) => {
    const Wrapper = to ? Link : 'div';
    const wrapperProps = to ? { to } : {};

    return (
        <Wrapper 
            {...wrapperProps}
            className={clsx(
                "relative flex flex-col justify-between p-6 rounded-[2rem] border border-zinc-100 shadow-sm transition-all duration-300 overflow-hidden group hover:shadow-md",
                to ? "cursor-pointer hover:border-zinc-300" : "bg-white",
                "h-full min-h-[180px]"
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Background Decoration */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-zinc-50 rounded-full blur-2xl group-hover:bg-zinc-100 transition-colors" />
            
            <div className="relative z-10 flex justify-between items-start">
                <div className={clsx("p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-sm", colorClass)}>
                    <Icon size={22} strokeWidth={2.5} />
                </div>
                {subtext && (
                    <div className={clsx(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border",
                        trend === 'down' 
                            ? "bg-red-50 text-red-600 border-red-100" 
                            : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    )}>
                        {trend === 'down' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                        {subtext}
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-6">
                <h3 className="text-4xl font-[800] text-zinc-900 tracking-tight leading-none mb-2">{value}</h3>
                <p className="text-zinc-500 font-semibold text-sm tracking-wide">{title}</p>
            </div>
        </Wrapper>
    );
};

const StatsCards = ({ stats, apiKeysCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <BentoCard 
                title="Total Downloads" 
                value={stats.totalDownloads} 
                subtext={`${stats.weekTrend}% this week`}
                trend={stats.weekTrend >= 0 ? 'up' : 'down'}
                icon={DownloadCloud} 
                colorClass="bg-zinc-900 text-white"
                delay={0}
            />
            <BentoCard 
                title="Active Keys" 
                value={`${apiKeysCount}/4`} 
                icon={Key} 
                colorClass="bg-blue-500 text-white"
                to="/settings"
                delay={100}
                subtext="Manage"
                trend="up"
            />
            <BentoCard 
                title="Data Usage" 
                value={(stats.totalSize / (1024*1024)).toFixed(0) + 'MB'} 
                icon={Database} 
                colorClass="bg-purple-500 text-white"
                delay={200}
                subtext="Lifetime"
                trend="up"
            />
            <BentoCard 
                title="Success Rate" 
                value={stats.successRate + '%'} 
                icon={Activity} 
                colorClass={stats.successRate >= 90 ? "bg-emerald-500 text-white" : "bg-orange-500 text-white"}
                delay={300}
                subtext="Stable"
                trend="up"
            />
        </div>
    );
};

export default StatsCards;
