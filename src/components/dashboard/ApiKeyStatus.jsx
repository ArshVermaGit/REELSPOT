import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowRight, Key } from 'lucide-react';
import { clsx } from 'clsx';

const ApiKeyStatus = ({ apiKeys }) => {
    // apiKeys is object: { instagram: { status: 'active' }, ... }
    
    const platforms = ['instagram', 'youtube', 'facebook', 'tiktok'];

    return (
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                     <h2 className="text-xl font-bold">API Status</h2>
                     <p className="text-sm text-zinc-500">System health check</p>
                </div>
                <Link to="/settings" className="p-2 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                    <Key size={20} className="text-zinc-600" />
                </Link>
            </div>
           
            <div className="space-y-4">
                {platforms.map(platform => {
                    const status = apiKeys[platform]?.status || 'missing';
                    const isActive = status === 'active';
                    
                    return (
                        <div key={platform} className="flex items-center justify-between p-3 rounded-xl border border-zinc-50 bg-zinc-50/50">
                            <div className="flex items-center gap-3">
                                <div className={clsx("w-2 h-2 rounded-full", isActive ? "bg-green-500" : "bg-red-500")} />
                                <span className="capitalize font-medium text-zinc-700">{platform}</span>
                            </div>
                            <div className={clsx(
                                "text-xs font-bold px-2 py-1 rounded-md uppercase",
                                isActive ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
                            )}>
                                {status}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-zinc-100">
                <Link to="/settings" className="w-full flex items-center justify-between text-sm font-bold text-zinc-900 group">
                    <span>Manage Keys</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default ApiKeyStatus;
