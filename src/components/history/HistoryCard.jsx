import React, { useState } from 'react';
import { Download, Trash2, ExternalLink, RefreshCw, ChevronDown, ChevronUp, FileVideo, FileAudio, Image as ImageIcon, Instagram, Youtube, Facebook, Music2, User, Clock, HardDrive, Film } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const formatDistanceToNow = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
};

const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return 'Unknown';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const PlatformIcon = ({ platform, size = 16, className }) => {
    switch (platform) {
        case 'instagram': return <Instagram size={size} className={clsx("text-pink-500", className)} />;
        case 'youtube': return <Youtube size={size} className={clsx("text-red-600", className)} />;
        case 'facebook': return <Facebook size={size} className={clsx("text-blue-600", className)} />;
        case 'tiktok': return <Music2 size={size} className={clsx("text-black", className)} />;
        default: return <Film size={size} className={clsx("text-zinc-400", className)} />;
    }
};

const PlatformBadge = ({ platform }) => {
    const colors = {
        instagram: 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 border-pink-200',
        youtube: 'bg-red-50 text-red-600 border-red-200',
        facebook: 'bg-blue-50 text-blue-600 border-blue-200',
        tiktok: 'bg-zinc-100 text-zinc-900 border-zinc-200',
        unknown: 'bg-zinc-100 text-zinc-500 border-zinc-200'
    };
    return (
        <span className={clsx("px-2 py-1 rounded-lg text-xs font-semibold capitalize border flex items-center gap-1.5", colors[platform] || colors.unknown)}>
            <PlatformIcon platform={platform} size={12} />
            {platform}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const isSuccess = status === 'completed';
    return (
        <span className={clsx(
            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}>
            {isSuccess ? 'Completed' : 'Failed'}
        </span>
    );
};

const HistoryCard = ({ item, isSelected, onSelect, onDelete, onRedownload, viewMode = 'grid' }) => {
    const [expanded, setExpanded] = useState(false);

    const isSuccess = item.download_status === 'completed';
    const isVideo = item.media_type?.includes('video') || item.format === 'mp4' || item.format === 'webm';
    const isAudio = item.media_type?.includes('audio') || item.format === 'mp3';

    const handleCopyUrl = () => {
        if (item.media_url) {
            navigator.clipboard.writeText(item.media_url);
            toast.success('URL copied to clipboard');
        }
    };

    return (
        <div 
            className={clsx(
                "group relative bg-white border transition-all duration-200 overflow-hidden",
                isSelected ? "border-black shadow-md ring-1 ring-black/10" : "border-zinc-100 shadow-sm hover:shadow-md hover:border-zinc-200",
                viewMode === 'list' ? "rounded-xl" : "rounded-2xl"
            )}
        >
            {/* Selection Checkbox Overlay */}
            <div className="absolute top-3 left-3 z-20">
                 <div className="relative">
                    <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(item.id)}
                        className="peer appearance-none w-5 h-5 border-2 border-white/80 checked:border-black bg-black/20 checked:bg-black rounded-md cursor-pointer transition-all shadow-sm backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={clsx("flex", viewMode === 'list' ? "flex-row p-3 gap-4" : "flex-col")}>
                {/* Thumbnail */}
                <div 
                    className={clsx(
                        "relative bg-zinc-100 overflow-hidden flex-shrink-0 cursor-pointer",
                        viewMode === 'list' ? "w-32 h-20 rounded-lg" : "w-full aspect-video"
                    )}
                    onClick={() => setExpanded(!expanded)}
                >
                    {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt={item.title || 'Thumbnail'} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300 bg-gradient-to-br from-zinc-100 to-zinc-200">
                             {isVideo ? <FileVideo size={32} /> : isAudio ? <FileAudio size={32} /> : <ImageIcon size={32} />}
                        </div>
                    )}
                    
                    {/* Duration Badge */}
                    {item.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-medium rounded backdrop-blur-sm">
                            {item.duration}
                        </div>
                    )}
                    
                    {/* Platform Icon Overlay */}
                    <div className="absolute top-2 right-2">
                         <div className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                            <PlatformIcon platform={item.platform} size={14} />
                         </div>
                    </div>
                </div>

                {/* Content */}
                <div className={clsx("flex-1 min-w-0 flex flex-col justify-between", viewMode === 'grid' && "p-4")}>
                    <div>
                        {/* Title */}
                        <h3 className="font-semibold text-zinc-900 truncate pr-2 mb-2" title={item.title}>
                             {item.title || 'Untitled Media'}
                        </h3>
                        
                        {/* Meta Row 1: Status, Platform, Media Type */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <StatusBadge status={item.download_status} />
                            <PlatformBadge platform={item.platform} />
                            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md text-[10px] font-semibold uppercase">
                                {item.media_type || (isVideo ? 'Video' : isAudio ? 'Audio' : 'Media')}
                            </span>
                        </div>
                        
                        {/* Meta Row 2: Format, Quality, Size, Date */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                                <HardDrive size={12} />
                                {item.format?.toUpperCase() || 'MP4'} • {item.quality || 'Standard'}
                            </span>
                            <span>{formatSize(item.file_size)}</span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {formatDistanceToNow(item.created_at)}
                            </span>
                        </div>
                        
                        {/* Author */}
                        {item.author && (
                            <div className="flex items-center gap-1 text-xs text-zinc-400 mt-2">
                                <User size={12} />
                                {item.author}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-3">
                         <button 
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs font-medium text-zinc-500 hover:text-black flex items-center gap-1 transition-colors"
                         >
                             {expanded ? 'Less info' : 'View details'}
                             {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                         </button>

                         <div className="flex items-center gap-1">
                             {item.media_url && (
                                <button 
                                    onClick={handleCopyUrl}
                                    className="p-1.5 hover:bg-zinc-100 rounded-md text-zinc-400 hover:text-black transition-colors"
                                    title="Copy Link"
                                >
                                    <ExternalLink size={14} />
                                </button>
                             )}
                             {isSuccess && (
                                <button 
                                    onClick={() => onRedownload(item)}
                                    className="p-1.5 hover:bg-blue-50 rounded-md text-zinc-400 hover:text-blue-600 transition-colors"
                                    title="Download Again"
                                >
                                    <RefreshCw size={14} />
                                </button>
                             )}
                             <button 
                                onClick={() => onDelete(item.id)}
                                className="p-1.5 hover:bg-red-50 rounded-md text-zinc-400 hover:text-red-600 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={14} />
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Expanded Details Panel */}
            {expanded && (
                <div className="bg-zinc-50/50 border-t border-zinc-100 p-4 text-xs text-zinc-600 space-y-4 animate-slide-down">
                    {/* Source URL */}
                    <div>
                        <p className="font-semibold text-zinc-900 mb-1 flex items-center gap-1">
                            <ExternalLink size={12} /> Original URL
                        </p>
                        <a 
                            href={item.media_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline break-all"
                        >
                            {item.media_url || 'Not available'}
                        </a>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-white p-2 rounded-lg border border-zinc-100">
                            <p className="text-zinc-400 text-[10px] uppercase font-semibold mb-0.5">Platform</p>
                            <p className="font-medium text-zinc-900 capitalize">{item.platform}</p>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-zinc-100">
                            <p className="text-zinc-400 text-[10px] uppercase font-semibold mb-0.5">Format</p>
                            <p className="font-medium text-zinc-900">{item.format?.toUpperCase() || 'MP4'}</p>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-zinc-100">
                            <p className="text-zinc-400 text-[10px] uppercase font-semibold mb-0.5">Quality</p>
                            <p className="font-medium text-zinc-900">{item.quality || 'Standard'}</p>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-zinc-100">
                            <p className="text-zinc-400 text-[10px] uppercase font-semibold mb-0.5">File Size</p>
                            <p className="font-medium text-zinc-900">{formatSize(item.file_size)}</p>
                        </div>
                    </div>
                    
                    {/* Full Date */}
                    <div className="flex items-center gap-4 text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Downloaded: {new Date(item.created_at).toLocaleString()}
                        </span>
                        {item.duration && (
                            <span className="flex items-center gap-1">
                                <Film size={12} />
                                Duration: {item.duration}
                            </span>
                        )}
                    </div>
                    
                    {/* Error Message */}
                    {item.error_message && (
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-600">
                            <span className="font-bold">Error:</span> {item.error_message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryCard;
