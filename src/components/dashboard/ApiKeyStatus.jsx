import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

const ApiKeyStatus = ({ apiKeys }) => {
    const platforms = ['instagram', 'youtube', 'facebook', 'tiktok'];
    
    // Quick calculations
    const activeCount = Object.values(apiKeys).filter(k => k.status === 'active').length;
    const isHealthy = activeCount === platforms.length;

    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                     <h2 className="text-xl font-bold flex items-center gap-2">
                        <Activity size={20} className="text-zinc-400" /> System Health
                     </h2>
                     <p className="text-sm text-zinc-500 font-medium mt-1">
                        {isHealthy ? 'All systems operational' : `${platforms.length - activeCount} issues detected`}
                     </p>
                </div>
                <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-inner",
                    isHealthy ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                )}>
                    {isHealthy ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                </div>
            </div>
           
            <div className="space-y-3 flex-1">
                {platforms.map(platform => {
                    const status = apiKeys[platform]?.status || 'missing';
                    const isActive = status === 'active';
                    
                    return (
                        <div key={platform} className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-50 bg-zinc-50/50 hover:bg-white hover:border-zinc-200 hovering:shadow-sm transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className={clsx("w-2.5 h-2.5 rounded-full ring-4 ring-white shadow-sm", isActive ? "bg-green-500" : "bg-red-500")} />
                                    {isActive && <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />}
                                </div>
                                <span className="capitalize font-bold text-zinc-700 text-sm">{platform}</span>
                            </div>
                            <div className={clsx(
                                "text-[10px] font-[800] px-2.5 py-1 rounded-full uppercase tracking-wider",
                                isActive ? "bg-green-100/50 text-green-700" : "bg-red-100/50 text-red-600"
                            )}>
                                {status === 'missing' ? 'No Key' : status}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-100">
                <Link to="/settings" className="w-full flex items-center justify-between text-sm font-bold text-zinc-900 group p-2 rounded-xl hover:bg-zinc-50 transition-colors">
                    <span>Manage Keys</span>
                    <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all">
                        <ArrowRight size={14} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ApiKeyStatus;
