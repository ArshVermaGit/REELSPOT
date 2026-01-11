import React from 'react';
import { Search, Filter, Calendar, FileType, CheckCircle, LayoutGrid, List as ListIcon, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const FilterPill = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={clsx(
            "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
            active 
                ? "bg-black text-white border-black shadow-md shadow-zinc-900/10" 
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
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
    
    const activeFiltersCount = Object.values(filter).filter(v => v !== 'All').length;
    const platforms = ['All', 'instagram', 'youtube', 'facebook', 'tiktok'];

    return (
        <div className="space-y-4">
            {/* Top Bar: Search & View */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                
                {/* Search Bar - Expanded */}
                <div className="relative w-full md:w-[480px] group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search history by title..." 
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-zinc-200 bg-white shadow-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none font-medium placeholder:text-zinc-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* View Toggles & Sort */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                     <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-zinc-200 shadow-sm">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={clsx(
                                "p-2.5 rounded-xl transition-all",
                                viewMode === 'grid' ? "bg-zinc-100 text-black shadow-sm" : "text-zinc-400 hover:text-black hover:bg-zinc-50"
                            )}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-2.5 rounded-xl transition-all",
                                viewMode === 'list' ? "bg-zinc-100 text-black shadow-sm" : "text-zinc-400 hover:text-black hover:bg-zinc-50"
                            )}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>

                    <div className="relative group">
                        <select 
                            className="appearance-none pl-4 pr-10 py-3.5 rounded-2xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-colors outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-black/5"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="size_desc">Largest Size</option>
                            <option value="size_asc">Smallest Size</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-black transition-colors" size={16} />
                    </div>
                </div>
            </div>

            {/* Filter Scroll Area */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide py-2">
                <div className="flex items-center gap-2 pr-4 border-r border-zinc-200 mr-2 flex-shrink-0">
                    <SlidersHorizontal size={18} className="text-zinc-400" />
                    <span className="text-sm font-bold text-zinc-500">Filters:</span>
                </div>

                {platforms.map(p => (
                    <FilterPill 
                        key={p} 
                        label={p === 'All' ? 'All Platforms' : p.charAt(0).toUpperCase() + p.slice(1)} 
                        active={filter.platform === p}
                        onClick={() => setFilter(prev => ({ ...prev, platform: p }))}
                    />
                ))}
            </div>
        </div>
    );
};

export default HistoryFilters;
