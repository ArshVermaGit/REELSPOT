import React, { useState } from 'react';
import { Key, Eye, EyeOff, Trash2, CheckCircle, AlertCircle, RefreshCw, Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../shared/Button';

const PlatformIcon = ({ platform, size=24, className }) => {
    switch(platform) {
        case 'instagram': return <Instagram size={size} className={className} />;
        case 'youtube': return <Youtube size={size} className={className} />;
        case 'facebook': return <Facebook size={size} className={className} />;
        case 'tiktok': return <Music2 size={size} className={className} />;
        default: return <Key size={size} className={className} />;
    }
};

const ApiKeyCard = ({ platform, keyData, onUpdate, onDelete, onTestStatus }) => {
    const [showKey, setShowKey] = useState(false);
    const [isTestLoading, setIsTestLoading] = useState(false);
    const [testResult, setTestResult] = useState(null);

    const handleTest = async () => {
        setIsTestLoading(true);
        setTestResult(null);
        
        const start = Date.now();
        const success = await onTestStatus(platform);
        const end = Date.now();
        
        setIsTestLoading(false);
        if (success) {
            setTestResult({ success: true, latency: `${end - start}ms` });
            setTimeout(() => setTestResult(null), 3000);
        }
    };

    const statusColors = {
        active: 'text-green-700 bg-green-100/50 border-green-200',
        expired: 'text-amber-700 bg-amber-100/50 border-amber-200',
        invalid: 'text-red-700 bg-red-100/50 border-red-200',
        missing: 'text-zinc-400 bg-zinc-100 border-zinc-200'
    };
    
    // Brand Config
    const brandStyles = {
        instagram: 'from-pink-500 to-purple-600 shadow-pink-500/20',
        youtube: 'from-red-600 to-red-500 shadow-red-500/20',
        facebook: 'from-blue-600 to-blue-500 shadow-blue-500/20',
        tiktok: 'from-black to-zinc-800 shadow-zinc-900/20'
    };
    
    const status = keyData?.status || 'missing';

    return (
        <div className="bg-white rounded-[1.5rem] p-6 border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-shadow duration-300">
            <div className={clsx(
                "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-xl bg-gradient-to-br",
                brandStyles[platform] || 'from-zinc-800 to-zinc-600'
            )}>
                <PlatformIcon platform={platform} size={28} />
            </div>
            
            <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-xl font-[800] capitalize text-zinc-900">{platform}</h3>
                    <div className={clsx("px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1.5", statusColors[status])}>
                         {status === 'active' && <CheckCircle size={10} strokeWidth={3} />}
                         {status === 'invalid' && <AlertCircle size={10} strokeWidth={3} />}
                         {status}
                    </div>
                </div>
                
                {keyData ? (
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                        <div className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg text-sm text-zinc-600 font-mono flex items-center gap-2">
                            {showKey ? keyData.api_key : '•••• •••• •••• ••••'}
                        </div>
                        <button 
                            onClick={() => setShowKey(!showKey)} 
                            className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-black transition-colors"
                        >
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                ) : (
                    <p className="text-zinc-400 text-sm font-medium">No API key configured for {platform}</p>
                )}

                {/* Test Feedback */}
                {testResult && (
                    <div className="mt-2 text-xs font-bold text-green-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 justify-center md:justify-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Connected • {testResult.latency}
                    </div>
                )}
            </div>

            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={keyData ? handleTest : () => onUpdate(platform)}
                    isLoading={isTestLoading}
                    disabled={!keyData && status !== 'missing'}
                    className="flex-1 md:flex-none"
                >
                    {keyData ? <RefreshCw size={16} className={isTestLoading ? "animate-spin" : ""} /> : "Connect"} 
                    {keyData && <span className="md:hidden lg:inline ml-2">Test</span>}
                </Button>
                
                <Button variant="primary" size="sm" onClick={() => onUpdate(platform)} className="flex-1 md:flex-none">
                    {keyData ? "Edit" : "Setup"}
                </Button>

                {keyData && (
                    <Button variant="danger" size="sm" onClick={onDelete} className="flex-none">
                        <Trash2 size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ApiKeyCard;
