import React from 'react';
import { Search, Filter, Calendar, FileType, CheckCircle, LayoutGrid, List as ListIcon } from 'lucide-react';
import { clsx } from 'clsx';

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

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-black transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search history..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-black transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* View Toggles & Sort */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                     <div className="flex items-center gap-1 bg-zinc-100/80 p-1 rounded-xl">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={clsx(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'grid' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"
                            )}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-2 rounded-lg transition-all",
                                viewMode === 'list' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"
                            )}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>

                    <select 
                        className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium hover:bg-zinc-50 transition-colors outline-none cursor-pointer"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="size_desc">Largest Size</option>
                        <option value="size_asc">Smallest Size</option>
                    </select>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 items-center">
                
                {/* Platform Filter */}
                <div className="relative">
                    <select 
                        className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-white border border-zinc-200 text-sm font-medium hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                        value={filter.platform}
                        onChange={(e) => setFilter(prev => ({ ...prev, platform: e.target.value }))}
                    >
                        <option value="All">All Platforms</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                    <Filter className="absolute right-2.5 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select 
                        className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-white border border-zinc-200 text-sm font-medium hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                        value={filter.status}
                        onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <CheckCircle className="absolute right-2.5 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                </div>

                {/* Type Filter */}
                <div className="relative">
                    <select 
                        className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-white border border-zinc-200 text-sm font-medium hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
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

                 {/* Date Range Filter */}
                 <div className="relative">
                    <select 
                        className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-white border border-zinc-200 text-sm font-medium hover:border-zinc-300 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-black/5"
                        value={filter.dateRange}
                        onChange={(e) => setFilter(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                        <option value="All">All Time</option>
                        <option value="Today">Today</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                    </select>
                    <Calendar className="absolute right-2.5 top-2.5 text-zinc-400 pointer-events-none" size={14} />
                </div>

                {/* Reset Filters CTA */}
                {activeFiltersCount > 0 && (
                    <button 
                        onClick={() => setFilter({ platform: 'All', type: 'All', status: 'All', format: 'All', dateRange: 'All' })}
                        className="px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Clear Filters
                    </button>
                )}
                
                <div className="ml-auto text-sm text-zinc-400 font-medium">
                    Showing {totalItems} items
                </div>
            </div>
        </div>
    );
};

export default HistoryFilters;
