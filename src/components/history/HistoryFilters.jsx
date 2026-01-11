import React from 'react';
import { Search, LayoutGrid, List as ListIcon, ChevronDown, Instagram, Youtube, Facebook, Music2, Globe, Check } from 'lucide-react';
import { clsx } from 'clsx';

const PlatformRow = ({ label, icon: Icon, active, onClick, count }) => (
    <button 
        onClick={onClick}
        className={clsx(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
            active 
                ? "bg-black text-white shadow-md shadow-zinc-900/10" 
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        )}
    >
        <div className="flex items-center gap-3">
            <div className={clsx(
                "p-1.5 rounded-lg transition-colors",
                active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500 group-hover:text-zinc-900"
            )}>
                <Icon size={14} />
            </div>
            <span>{label}</span>
        </div>
        {active && <Check size={14} className="text-white/80" />}
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
    
    return (
        <div className="space-y-6">
            {/* 1. Search Section */}
            <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block px-1">Search</label>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-white focus:bg-white shadow-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none font-medium text-sm placeholder:text-zinc-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. View & Sort */}
            <div className="grid grid-cols-2 gap-2">
                {/* View Mode Toggle */}
                <div className="flex bg-zinc-100 p-1 rounded-xl">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={clsx(
                            "flex-1 flex items-center justify-center py-1.5 rounded-lg transition-all",
                            viewMode === 'grid' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600"
                        )}
                        title="Grid View"
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={clsx(
                            "flex-1 flex items-center justify-center py-1.5 rounded-lg transition-all",
                            viewMode === 'list' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600"
                        )}
                        title="List View"
                    >
                        <ListIcon size={16} />
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative group">
                    <select 
                        className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:border-zinc-300 transition-colors outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-black/5"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="size_desc">Big Files</option>
                        <option value="size_asc">Small Files</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-black transition-colors" size={14} />
                </div>
            </div>

            <div className="h-px bg-zinc-100 w-full" />

            {/* 3. Platform Filters - Vertical List */}
            <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block px-1">Platform</label>
                <div className="space-y-1">
                    <PlatformRow 
                        label="All Platforms" 
                        icon={Globe} 
                        active={filter.platform === 'All'} 
                        onClick={() => setFilter(prev => ({ ...prev, platform: 'All' }))}
                    />
                    <PlatformRow 
                        label="Instagram" 
                        icon={Instagram} 
                        active={filter.platform === 'instagram'} 
                        onClick={() => setFilter(prev => ({ ...prev, platform: 'instagram' }))}
                    />
                    <PlatformRow 
                        label="YouTube" 
                        icon={Youtube} 
                        active={filter.platform === 'youtube'} 
                        onClick={() => setFilter(prev => ({ ...prev, platform: 'youtube' }))}
                    />
                    <PlatformRow 
                        label="Facebook" 
                        icon={Facebook} 
                        active={filter.platform === 'facebook'} 
                        onClick={() => setFilter(prev => ({ ...prev, platform: 'facebook' }))}
                    />
                    <PlatformRow 
                        label="TikTok" 
                        icon={Music2} 
                        active={filter.platform === 'tiktok'} 
                        onClick={() => setFilter(prev => ({ ...prev, platform: 'tiktok' }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default HistoryFilters;
