import React from 'react';
import { Search, Filter, Calendar, FileType, CheckCircle, LayoutGrid, List as ListIcon, X } from 'lucide-react';
import { clsx } from 'clsx';

const FilterPill = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={clsx(
            "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
            active 
                ? "bg-black text-white shadow-lg shadow-black/20 scale-105" 
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
        )}
    >
        {label}
    </button>
);

const HistoryFilters = ({ 
    filter, 
    setFilter, 
    search, 
    setSearch, 
    sort, 
    setSort,
    viewMode,
    setViewMode,
    totalItems 
}) => {
    
    // Helper for filter badges (optional visual improvement)
    const activeFiltersCount = Object.values(filter).filter(v => v !== 'All').length;
    const platforms = ['All', 'instagram', 'youtube', 'facebook', 'tiktok'];

    return (
        <div className="space-y-6 mb-8">
            {/* Top Bar: Search & View */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-black transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by title..." 
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-200 bg-white shadow-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* View Toggles & Sort */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                     <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-zinc-100 shadow-sm">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={clsx(
                                "p-2.5 rounded-xl transition-all",
                                viewMode === 'grid' ? "bg-zinc-100 text-black font-bold" : "text-zinc-400 hover:text-black"
                            )}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-2.5 rounded-xl transition-all",
                                viewMode === 'list' ? "bg-zinc-100 text-black font-bold" : "text-zinc-400 hover:text-black"
                            )}
                        >
                            <ListIcon size={20} />
                        </button>
                    </div>

                    <div className="relative">
                        <select 
                            className="appearance-none pl-4 pr-10 py-3 rounded-2xl border border-zinc-200 bg-white text-sm font-bold hover:bg-zinc-50 transition-colors outline-none cursor-pointer shadow-sm"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="size_desc">Largest Size</option>
                            <option value="size_asc">Smallest Size</option>
                        </select>
                        <Filter className="absolute right-3.5 top-3.5 text-zinc-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col gap-4">
                {/* Platform Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {platforms.map(p => (
                        <FilterPill 
                            key={p} 
                            label={p === 'All' ? 'All Platforms' : p.charAt(0).toUpperCase() + p.slice(1)} 
                            active={filter.platform === p}
                            onClick={() => setFilter(prev => ({ ...prev, platform: p }))}
                        />
                    ))}
                    
                    {/* Divider */}
                    <div className="w-px h-6 bg-zinc-200 mx-2 flex-shrink-0" />
                    
                    {/* Other Filters as Dropdowns */}
                     <div className="relative flex-shrink-0">
                        <select 
                            className="appearance-none pl-3 pr-8 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                            value={filter.status}
                            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="All">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <CheckCircle className="absolute right-2.5 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                    </div>

                    <div className="relative flex-shrink-0">
                        <select 
                            className="appearance-none pl-3 pr-8 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                            value={filter.type}
                            onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="All">All Types</option>
                            <option value="video">Videos</option>
                            <option value="reel">Reels</option>
                            <option value="image">Images</option>
                        </select>
                        <FileType className="absolute right-2.5 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                    </div>
                    
                    {activeFiltersCount > 0 && (
                        <button 
                            onClick={() => setFilter({ platform: 'All', type: 'All', status: 'All', format: 'All', dateRange: 'All' })}
                            className="ml-auto px-3 py-2 text-sm text-red-600 font-bold hover:bg-red-50 rounded-full transition-colors flex items-center gap-1"
                        >
                            <X size={14} /> Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryFilters;
