import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, RefreshCw, Trash2, Edit2, Activity } from 'lucide-react';
import { clsx } from 'clsx';
// Actually FloatingIcons exports default, need to grab specific icons or standard PlatformIcon from Hero (but Hero doesn't export it well).
// I will just simple icons here.
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import toast from 'react-hot-toast';

const getIcon = (p) => {
    switch(p) {
        case 'instagram': return <Instagram className="text-pink-500" />;
        case 'youtube': return <Youtube className="text-red-600" />;
        case 'facebook': return <Facebook className="text-blue-600" />;
        case 'tiktok': return <Music2 className="text-black" />;
        default: return <Shield className="text-zinc-400" />;
    }
};

const ApiKeyCard = ({ platform, apiKey, onUpdate, onDelete }) => {
    const [testing, setTesting] = useState(false);
    const [status, setStatus] = useState(apiKey ? 'active' : 'missing'); // active, missing, invalid
    const [latency, setLatency] = useState(null);

    const handleTest = async () => {
        if (!apiKey) return;
        setTesting(true);
        const start = Date.now();
        
        // Mock API Test
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));
        
        // Random success/fail for demo (simulating auth check)
        // In real app, call backend endpoint to verify key
        const success = Math.random() > 0.1; 
        
        setLatency(Date.now() - start);
        setStatus(success ? 'active' : 'invalid');
        setTesting(false);
        
        if (success) toast.success(`Connection to ${platform} successful!`);
        else toast.error(`Connection to ${platform} failed. check your key.`);
    };

    // Mask key: "sk_live...ab12"
    const displayKey = apiKey 
        ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` 
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
                </div>
                
                <p className="text-zinc-500 font-mono text-sm bg-zinc-50 inline-block px-2 py-1 rounded border border-zinc-100 mb-2">
                    {displayKey}
                </p>

                {latency && (
                    <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
                        <Activity size={12} /> Latency: {latency}ms
                    </p>
                )}
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
                        onClick={() => {
                            if(window.confirm(`Delete ${platform} API Key? This will stop downloads.`)) onDelete(platform);
                        }}
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
