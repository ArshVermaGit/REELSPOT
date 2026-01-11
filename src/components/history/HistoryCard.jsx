import React, { useState } from 'react';
import { Download, Trash2, ExternalLink, RefreshCw, ChevronDown, ChevronUp, FileVideo, FileAudio, Image as ImageIcon, Instagram, Youtube, Facebook, Music2, User, Clock, HardDrive, Film, PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const formatDistanceToNow = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
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

const StatusBadge = ({ status }) => {
    const isSuccess = status === 'completed';
    return isSuccess ? null : (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
            Failed
        </span>
    );
};

const HistoryCard = ({ item, isSelected, onSelect, onDelete, onRedownload, viewMode = 'grid' }) => {
    const [expanded, setExpanded] = useState(false);

    const isSuccess = item.download_status === 'completed';
    const isVideo = item.media_type?.includes('video') || item.format === 'mp4' || item.format === 'webm';
    const isAudio = item.media_type?.includes('audio') || item.format === 'mp3';

    const handleCopyUrl = (e) => {
        e.stopPropagation();
        if (item.media_url) {
            navigator.clipboard.writeText(item.media_url);
            toast.success('URL copied');
        }
    };

    return (
        <div 
            className={clsx(
                "group relative bg-white transition-all duration-300 overflow-hidden",
                isSelected ? "ring-2 ring-black shadow-lg transform scale-[1.02]" : "shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1",
                viewMode === 'list' ? "rounded-2xl" : "rounded-3xl"
            )}
            onClick={() => viewMode === 'list' && setExpanded(!expanded)}
        >
            {/* Selection Checkbox Overlay */}
            <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(item.id)}
                        className="peer appearance-none w-5 h-5 border-2 border-white/50 checked:border-black bg-black/20 checked:bg-black rounded-lg cursor-pointer transition-all shadow-sm backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={clsx("flex", viewMode === 'list' ? "flex-row p-3 gap-5 items-center" : "flex-col")}>
                {/* Thumbnail */}
                <div 
                    className={clsx(
                        "relative bg-zinc-100/50 overflow-hidden flex-shrink-0 cursor-pointer",
                        viewMode === 'list' ? "w-24 h-24 rounded-2xl" : "w-full aspect-[4/3]"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                    }}
                >
                    {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt={item.title || 'Thumbnail'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                             {isVideo ? <FileVideo size={32} /> : isAudio ? <FileAudio size={32} /> : <ImageIcon size={32} />}
                        </div>
                    )}
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                         {isVideo && <div className="bg-white/30 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100"><PlayCircle size={20} fill="currentColor" /></div>}
                    </div>

                    {/* Platform Icon Badge */}
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm z-10">
                        <PlatformIcon platform={item.platform} size={14} />
                    </div>

                    {/* Duration Badge */}
                    {item.duration && (
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded-full backdrop-blur-md">
                            {item.duration}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={clsx("flex-1 min-w-0 flex flex-col justify-between", viewMode === 'grid' && "p-5")}>
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-zinc-900 truncate pr-2 text-sm leading-snug" title={item.title}>
                                 {item.title || 'Untitled Media'}
                            </h3>
                            <StatusBadge status={item.download_status} />
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mb-4">
                            <span>{formatSize(item.file_size)}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                            <span>{item.format?.toUpperCase() || 'MP4'}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                            <span className="text-zinc-400">{formatDistanceToNow(item.created_at)}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded(!expanded);
                            }}
                            className="text-xs font-bold text-zinc-400 hover:text-black flex items-center gap-1 transition-colors hover:bg-zinc-100 px-2 py-1 rounded-lg -ml-2"
                        >
                             Details {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>

                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             {item.media_url && (
                                <button onClick={handleCopyUrl} className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 hover:text-black transition-colors" title="Copy Link">
                                    <ExternalLink size={16} />
                                </button>
                             )}
                             {isSuccess && (
                                <button onClick={(e) => { e.stopPropagation(); onRedownload(item); }} className="p-2 hover:bg-blue-50 rounded-xl text-zinc-400 hover:text-blue-600 transition-colors" title="Download Again">
                                    <RefreshCw size={16} />
                                </button>
                             )}
                             <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="p-2 hover:bg-red-50 rounded-xl text-zinc-400 hover:text-red-500 transition-colors" title="Delete">
                                <Trash2 size={16} />
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Expanded Details Panel */}
            {expanded && (
                <div className="bg-zinc-50/50 p-5 text-xs text-zinc-600 space-y-4 animate-slide-down border-t border-zinc-50">
                    <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                             <p className="font-bold text-zinc-400 text-[10px] uppercase">Format</p>
                             <p className="font-semibold text-zinc-900">{item.format?.toUpperCase() || 'MP4'} • {item.quality || 'Standard'}</p>
                         </div>
                         <div className="space-y-1">
                             <p className="font-bold text-zinc-400 text-[10px] uppercase">Original Source</p>
                             <a href={item.media_url} target="_blank" rel="noopener" className="font-semibold text-blue-600 hover:underline truncate block">Open Link</a>
                         </div>
                    </div>
                    {item.author && (
                        <div className="pt-2 border-t border-zinc-100">
                             <p className="flex items-center gap-2 text-zinc-500">
                                <User size={12} /> <span className="font-medium">{item.author}</span>
                             </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryCard;
