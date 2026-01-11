import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MoreHorizontal, FileVideo, Youtube, X } from 'lucide-react';
import { clsx } from 'clsx';

const formatDistanceToNow = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
};

const PlatformIcon = ({ platform }) => {
    switch(platform?.toLowerCase()) {
        case 'youtube': return <div className="text-red-500"><Youtube size={20} /></div>;
        default: return <div className="text-zinc-500"><FileVideo size={20} /></div>;
    }
};

const ActivityItem = ({ item, onDelete }) => {
    return (
        <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
            {/* Thumbnail / Icon */}
            <div className="w-16 h-12 rounded-lg bg-zinc-100 overflow-hidden relative flex-shrink-0 border border-zinc-200/50">
                {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                        <FileVideo size={20} className="text-zinc-300" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-zinc-900 truncate pr-4">{item.title || 'Untitled Video'}</h4>
                <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                        {item.platform}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                        <Clock size={10} />
                        {item.created_at ? formatDistanceToNow(item.created_at) : 'Just now'}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

const ActivityFeed = ({ activities, onDelete }) => {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-[800] tracking-tight">Recent Activity</h2>
                    <p className="text-zinc-500 font-medium text-sm mt-1">Your latest downloads</p>
                </div>
                <Link to="/history" className="px-4 py-2 bg-zinc-50 text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-colors flex items-center gap-2 border border-zinc-200/50">
                    View History <ArrowRight size={14} />
                </Link>
            </div>

            {activities.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-3xl bg-zinc-50/50">
                    <Clock size={48} className="mb-4 text-zinc-200" />
                    <p className="font-medium">No recent activity found</p>
                </div>
            ) : (
                <div className="space-y-1 overflow-y-auto max-h-[500px] pr-2 -mr-2 custom-scrollbar">
                    {activities.map(item => (
                        <ActivityItem 
                            key={item.id} 
                            item={item} 
                            onDelete={onDelete} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityFeed;
