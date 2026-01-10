import React, { useState } from 'react';
import { Download, Trash2, ExternalLink, RefreshCw, ChevronDown, ChevronUp, FileVideo, FileAudio, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

const formatDistanceToNow = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
};

const PlatformBadge = ({ platform }) => {
    const colors = {
        instagram: 'bg-pink-100 text-pink-600',
        youtube: 'bg-red-100 text-red-600',
        facebook: 'bg-blue-100 text-blue-600',
        tiktok: 'bg-zinc-100 text-black',
        unknown: 'bg-zinc-100 text-zinc-500'
    };
    return (
        <span className={clsx("px-2 py-1 rounded-md text-xs font-bold uppercase", colors[platform] || colors.unknown)}>
            {platform}
        </span>
    );
};

const HistoryCard = ({ item, onDelete, onRedownload }) => {
    const [expanded, setExpanded] = useState(false);

    const formatSize = (bytes) => {
        if (!bytes) return 'Unknown size';
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const isSuccess = item.download_status === 'completed';

    return (
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-full sm:w-32 h-32 sm:h-24 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                    {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt={item.title || 'Thumbnail'} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                             {item.media_type === 'audio' ? <FileAudio size={32} /> : <FileVideo size={32} />}
                        </div>
                    )}
                    <div className="absolute top-1 left-1">
                        <PlatformBadge platform={item.platform} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                             <h3 className="font-semibold text-zinc-900 truncate pr-2" title={item.title}>
                                 {item.title || 'Untitled Media'}
                             </h3>
                             <span className={clsx(
                                 "text-xs font-medium px-2 py-0.5 rounded-full",
                                 isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                             )}>
                                 {isSuccess ? 'Completed' : 'Failed'}
                             </span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">
                            {formatSize(item.file_size)} • {item.format?.toUpperCase()} • {item.quality}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-0">
                        <span className="text-xs text-zinc-400">
                             {formatDistanceToNow(item.created_at)}
                        </span>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                                onClick={() => setExpanded(!expanded)}
                                className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-zinc-600"
                                title="Details"
                             >
                                 {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                             </button>
                             {isSuccess && (
                                <button 
                                    onClick={() => onRedownload(item)}
                                    className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-black"
                                    title="Download Again"
                                >
                                    <Download size={16} />
                                </button>
                             )}
                             <button 
                                onClick={() => onDelete(item.id)}
                                className="p-2 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-600"
                                title="Delete"
                             >
                                 <Trash2 size={16} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="bg-zinc-50 border-t border-zinc-100 p-4 text-sm text-zinc-600 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-down">
                    <div className="space-y-2">
                        <p><span className="font-medium text-zinc-900">Original URL:</span></p>
                        <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">
                            {item.media_url}
                        </a>
                    </div>
                    <div className="space-y-1">
                        <p><span className="font-medium text-zinc-900">Downloaded At:</span> {new Date(item.created_at).toLocaleString()}</p>
                        <p><span className="font-medium text-zinc-900">Duration:</span> {item.duration || 'N/A'}</p>
                        {item.error_message && (
                            <p className="text-red-500"><span className="font-medium">Error:</span> {item.error_message}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryCard;
