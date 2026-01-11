import React from 'react';
import HistoryCard from './HistoryCard';
import { clsx } from 'clsx';
import { CheckSquare, Ghost, SearchX, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryList = ({ 
    history, 
    loading, 
    viewMode, 
    selectedIds, 
    toggleSelect, 
    deleteItem,
    openConfirm, 
    handleRedownload,
    search,
    filter,
    setSearch,
    setFilter,
    onDelete
}) => {
    const navigate = useNavigate();

    // Compat: Use onDelete from props if passed, otherwise construct it
    const handleDelete = onDelete || ((id) => openConfirm({
        title: 'Delete Item?',
        message: 'Remove this item from your history?',
        onConfirm: () => deleteItem?.(id),
        confirmText: 'Delete',
        type: 'danger'
    }));

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="h-72 bg-zinc-100 rounded-[2rem]"></div>
                ))}
            </div>
        );
    }

    if (history.length === 0) {
        const isFiltering = search || filter.platform !== 'All';
        
        return (
            <div className="text-center py-32 flex flex-col items-center justify-center animate-fade-in px-4">
                <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm ring-8 ring-zinc-50/50">
                    {isFiltering ? (
                        <SearchX size={40} className="text-zinc-300" />
                    ) : (
                        <Ghost size={40} className="text-zinc-300" />
                    )}
                </div>
                <h3 className="text-2xl font-[800] text-zinc-900 mb-2 tracking-tight">
                    {isFiltering ? "No results found" : "History is empty"}
                </h3>
                <p className="text-zinc-500 max-w-sm mx-auto mb-8 font-medium">
                    {isFiltering 
                        ? "We couldn't find any downloads matching your current filters." 
                        : "Your download history will appear here once you start downloading media."}
                </p>
                {isFiltering ? (
                    <button 
                        onClick={() => {
                            setSearch?.('');
                            setFilter?.({ platform: 'All', type: 'All', status: 'All', format: 'All', dateRange: 'All' });
                        }}
                        className="px-6 py-3 bg-zinc-100 text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
                    >
                        Clear Filters
                    </button>
                ) : (
                    <button 
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center gap-2"
                    >
                        <Download size={20} /> Start Downloading
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={clsx(
            "grid gap-4 transition-all pb-24",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
            {history.map((item, index) => (
                <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <HistoryCard 
                        item={item}
                        isSelected={selectedIds?.has(item.id)}
                        onSelect={toggleSelect}
                        onDelete={handleDelete}
                        onRedownload={handleRedownload}
                        viewMode={viewMode}
                    />
                </div>
            ))}
        </div>
    );
};

export default HistoryList;
