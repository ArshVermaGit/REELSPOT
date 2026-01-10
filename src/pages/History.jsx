import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/history/HistoryCard';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryStats from '../components/history/HistoryStats';
import { Trash2, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

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
        selectedIds,
        toggleSelect,
        selectAll,
        bulkDelete,
        clearHistory,
        hasMore,
        loadMore
    } = useHistory();

    const handleRedownload = async (item) => {
        // Redirect to home with URL to restart process cleanly
        navigator.clipboard.writeText(item.media_url);
        toast.success("URL copied! Paste on Home to download again.");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-[800] tracking-tight mb-2">Download History</h1>
                        <p className="text-zinc-500">Track and manage your media downloads.</p>
                    </div>
                    {/* Bulk Actions Header Control */}
                    {selectedIds.size > 0 && (
                        <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2">
                            <span className="font-medium text-sm">{selectedIds.size} Selected</span>
                            <div className="h-4 w-px bg-white/20" />
                            <button 
                                onClick={bulkDelete}
                                className="flex items-center gap-2 hover:text-red-300 transition-colors text-sm font-medium"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Analytics */}
                <HistoryStats stats={stats} />

                {/* Filters & Control Bar */}
                <HistoryFilters 
                    filter={filter} 
                    setFilter={setFilter} 
                    search={search} 
                    setSearch={setSearch} 
                    sort={sort} 
                    setSort={setSort}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    totalItems={history.length}
                />

                {/* Bulk Select All */}
                <div className="mb-4 flex items-center justify-between pl-1">
                    <button 
                        onClick={selectAll}
                        className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-2 transition-colors"
                    >
                         {selectedIds.size > 0 && selectedIds.size === history.length ? (
                             <CheckSquare size={18} className="text-black" />
                         ) : (
                             <Square size={18} />
                         )}
                         {selectedIds.size === history.length ? 'Deselect All' : 'Select All'}
                    </button>

                    {/* Clear All History Button */}
                    {history.length > 0 && (
                        <button 
                            onClick={() => {
                                if(window.confirm('Are you sure you want to delete ALL history? This cannot be undone.')) clearHistory();
                            }}
                            className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={14} /> Clear All
                        </button>
                    )}
                </div>

                {/* Grid/List Content */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="h-64 bg-zinc-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-zinc-100 shadow-sm border-dashed">
                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                             <CheckSquare size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">No history found</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto mb-6">
                            {search || filter.platform !== 'All' 
                                ? "No downloads match your current filters. Try adjusting them." 
                                : "You haven't downloaded any media yet. Start your collection now!"}
                        </p>
                        {(search || filter.platform !== 'All') ? (
                            <button 
                                onClick={() => {
                                    setSearch('');
                                    setFilter({ platform: 'All', type: 'All', status: 'All', format: 'All', dateRange: 'All' });
                                }}
                                className="text-black font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        ) : (
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform"
                            >
                                Start Downloading
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={clsx(
                        "grid gap-4 transition-all",
                        viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                    )}>
                        {history.map(item => (
                            <HistoryCard 
                                key={item.id} 
                                item={item}
                                isSelected={selectedIds.has(item.id)}
                                onSelect={toggleSelect}
                                onDelete={deleteItem}
                                onRedownload={handleRedownload}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                )}
                
                {/* Load More Trigger */}
                {!loading && history.length > 0 && hasMore && (
                    <div className="mt-12 flex justify-center">
                        <button 
                            onClick={loadMore}
                            className="bg-white border border-zinc-200 text-zinc-600 px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-zinc-50 hover:text-black hover:border-zinc-300 transition-all active:scale-95"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
