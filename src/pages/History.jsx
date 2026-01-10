import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/history/HistoryCard';
import LoadingScreen from '../components/shared/LoadingSpinner';
import { Search, Filter, Trash2, DownloadCloud } from 'lucide-react';
import { clsx } from 'clsx';
import { downloadMedia } from '../services/mediaDownloader';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';

const History = () => {
    const { user } = useAuth();
    const { getApiKey } = useApiKeys();
    const { 
        history, 
        loading, 
        filter, 
        setFilter, 
        search, 
        setSearch, 
        sort, 
        setSort, 
        stats, 
        deleteItem, 
        clearHistory 
    } = useHistory();

    const handleRedownload = async (item) => {
        toast.success(`Restarting download for ${item.title}...`);
        // Note: For a "real" redownload, we likely need to re-fetch the fresh direct link 
        // because the old one might be expired.
        // We reuse the logic from mediaDownloader but bypass analysis if we trust the metadata?
        // Actually, safer to treat it as a fresh download request using the original URL.
        try {
             // Basic trigger - in a real app better to integrate with the Hero's download manager logic
             // For now, standalone helper call:
             // getApiKey might be needed?
             const apiKey = getApiKey(item.platform); 
             
             // Wait, downloadMedia now expects a downloadUrl (direct link).
             // If we didn't store the direct link or if it expired, we must re-analyze.
             // Let's assume for this "Re-download" we need to start over.
             // Simplified: Just redirect to Home with URL pre-filled? Or Show a toast saying "Copying URL..."
             
             navigator.clipboard.writeText(item.media_url);
             toast.success("URL copied! Paste on Home to download again.");
             
             // True re-download implementation requires checking if direct link is valid or re-fetching.
             // Given the architecture, guiding user to Home is safer UX than failing on expired links.
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-20 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Stats */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black text-white p-6 rounded-2xl shadow-xl shadow-black/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <DownloadCloud size={24} />
                            </div>
                            <div>
                                <p className="text-white/60 text-sm font-medium">Total Downloads</p>
                                <h2 className="text-3xl font-bold">{stats.totalDownloads}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                        <div className="flex items-center gap-4">
                             <div className="p-3 bg-zinc-100 rounded-xl text-zinc-600">
                                <Filter size={24} />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">Data Downloaded</p>
                                <h2 className="text-3xl font-bold text-zinc-900">{(stats.totalSize / (1024*1024)).toFixed(0)} MB</h2>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl text-green-600">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">Success Rate</p>
                                <h2 className="text-3xl font-bold text-zinc-900">
                                    {stats.totalDownloads > 0 ? ((stats.successCount / stats.totalDownloads) * 100).toFixed(0) : 0}%
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-8 sticky top-24 z-10 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 text-zinc-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by title, URL..." 
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-black transition-colors outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <select 
                            className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50 transition-colors outline-none"
                            value={filter.platform}
                            onChange={(e) => setFilter(prev => ({ ...prev, platform: e.target.value }))}
                        >
                            <option value="All">All Platforms</option>
                            <option value="instagram">Instagram</option>
                            <option value="youtube">YouTube</option>
                            <option value="facebook">Facebook</option>
                            <option value="tiktok">TikTok</option>
                        </select>

                        <select 
                            className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50 transition-colors outline-none"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="size_desc">Largest Size</option>
                        </select>

                        {/* Clear History Button */}
                        {history.length > 0 && (
                             <button 
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to clear all history?')) clearHistory();
                                }}
                                className="px-4 py-2.5 rounded-xl border border-transparent bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20 text-zinc-400">Loading history...</div>
                ) : history.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
                             <DownloadCloud size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">No history found</h3>
                        <p className="text-zinc-500">
                            {search || filter.platform !== 'All' 
                                ? "Try adjusting your filters" 
                                : "Start downloading to see your history here"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {history.map(item => (
                            <HistoryCard 
                                key={item.id} 
                                item={item} 
                                onDelete={deleteItem}
                                onRedownload={handleRedownload}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
