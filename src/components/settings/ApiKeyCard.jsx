import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, RefreshCw, Trash2, Edit2, Activity, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import toast from 'react-hot-toast';

const timeAgo = (date) => {
    if (!date) return 'Never';
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const getIcon = (p) => {
    switch(p) {
        case 'instagram': return <Instagram className="text-pink-500" />;
        case 'youtube': return <Youtube className="text-red-600" />;
        case 'facebook': return <Facebook className="text-blue-600" />;
        case 'tiktok': return <Music2 className="text-black" />;
        default: return <Shield className="text-zinc-400" />;
    }
};

const ApiKeyCard = ({ platform, keyData, onUpdate, onDelete, onTestStatus }) => {
    // keyData is the full DB object now
    const apiKey = keyData?.api_key;
    const [testing, setTesting] = useState(false);
    
    // Use DB status or fallback
    const status = !apiKey ? 'missing' : (keyData?.status || 'active'); 

    const handleTest = async () => {
        if (!apiKey) return;
        setTesting(true);
        const start = Date.now();
        
        // Mock API Test
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));
        
        const success = Math.random() > 0.1; // 90% success rate
        const latency = Date.now() - start;
        
        const newStatus = success ? 'active' : 'invalid';
        
        if (onTestStatus) {
            await onTestStatus(platform, newStatus, latency);
        }
        
        setTesting(false);
        if (success) toast.success(`Connection to ${platform} successful!`);
        else toast.error(`Connection to ${platform} failed.`);
    };

    const displayKey = apiKey 
        ? `••••••••${apiKey.substring(apiKey.length - 4)}` 
        : 'Not configured';

    return (
        <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            
            {/* Logo Section */}
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center shadow-inner">
                {getIcon(platform)}
            </div>

            {/* Info Section */}
            <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                    <h3 className="font-bold text-lg capitalize">{platform}</h3>
                    {status === 'active' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={10} /> Active</span>}
                    {status === 'missing' && <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-xs font-bold rounded-full">Not Configured</span>}
                    {status === 'invalid' && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center gap-1"><AlertCircle size={10} /> Invalid</span>}
                    {status === 'expired' && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Expired</span>}
                </div>
                
                <p className="text-zinc-500 font-mono text-sm bg-zinc-50 inline-block px-2 py-1 rounded border border-zinc-100 mb-2">
                    {displayKey}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400">
                    {keyData?.last_tested_at && (
                        <p className="flex items-center gap-1">
                            <Clock size={12} /> Tested: {timeAgo(keyData.last_tested_at)}
                        </p>
                    )}
                    {keyData?.quota_usage > 0 && (
                        <p className="flex items-center gap-1">
                            <Activity size={12} /> Usage: {keyData.quota_usage} reqs
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {apiKey && (
                    <button 
                        onClick={handleTest}
                        disabled={testing}
                        className="p-3 rounded-xl bg-zinc-50 text-zinc-600 hover:bg-black hover:text-white transition-all disabled:opacity-50"
                        title="Test Connection"
                    >
                        <RefreshCw size={18} className={testing ? "animate-spin" : ""} />
                    </button>
                )}
                
                <button 
                    onClick={() => onUpdate(platform)}
                    className="p-3 rounded-xl bg-zinc-50 text-green-600 hover:bg-green-500 hover:text-white transition-all"
                    title={apiKey ? "Update Key" : "Add Key"}
                >
                    <Edit2 size={18} />
                </button>

                {apiKey && (
                    <button 
                        onClick={onDelete}
                        className="p-3 rounded-xl bg-zinc-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Key"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApiKeyCard;
