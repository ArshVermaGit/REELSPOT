import React, { useEffect } from 'react';
import { Instagram, Youtube, Facebook, Music2, Link as LinkIcon, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { detectPlatform } from '../../services/platformDetector';
import Input from '../shared/Input';

const PlatformDetector = ({ url, onChange, onDetect }) => {
    
    const platform = detectPlatform(url);

    useEffect(() => {
        if (onDetect) onDetect(platform);
    }, [url, platform, onDetect]);

    const getIcon = () => {
        switch (platform) {
            case 'instagram': return <Instagram className="text-pink-600" />;
            case 'youtube': return <Youtube className="text-red-600" />;
            case 'facebook': return <Facebook className="text-blue-600" />;
            case 'tiktok': return <Music2 className="text-black" />;
            default: return <LinkIcon className="text-zinc-400" />;
        }
    };

    return (
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 transform group-focus-within:scale-110">
                {getIcon()}
            </div>
            <input
                type="text"
                value={url}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Paste video URL here (Instagram, YouTube, TikTok...)"
                className={clsx(
                    "w-full pl-14 pr-32 py-5 rounded-2xl border-2 bg-white text-lg transition-all outline-none",
                    platform !== 'unknown' 
                        ? "border-black shadow-lg shadow-black/5" 
                        : "border-zinc-100 focus:border-black/20"
                )}
            />
            {platform !== 'unknown' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-100 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-600 animate-fade-in">
                    {platform}
                </div>
            )}
        </div>
    );
};

export default PlatformDetector;
