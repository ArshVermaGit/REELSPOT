import React from 'react';
import HistoryCard from './HistoryCard';
import { clsx } from 'clsx';
import { CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HistoryList = ({ 
    history, 
    loading, 
    viewMode, 
    selectedIds, 
    toggleSelect, 
    openConfirm, 
    handleRedownload,
    search,
    filter,
    setSearch,
    setFilter 
}) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-64 bg-zinc-200 rounded-2xl"></div>
                ))}
            </div>
        );
    }

    if (history.length === 0) {
        return (
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
        );
    }

    return (
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
                    onDelete={(id) => openConfirm({
                        title: 'Delete Item?',
                        message: 'Remove this item from your history?',
                        onConfirm: () => {}, // The parent will handle the actual delete call if we pass ID, but wait, parent passed openConfirm which usually binds the function. 
                        // Actually in History.jsx: openConfirm({... onConfirm: () => deleteItem(id) })
                        // So here we should probably pass the delete handler? 
                        // No, the prop is openConfirm from parent which takes a config object.
                        // I need to know *what* to delete.
                        // Let's change the prop structure or assume openConfirm is generic.
                        // Better: reuse the logic from History.jsx:
                        // onDelete={(id) => openConfirm({ ... onConfirm: () => deleteItem(id) ... })}
                        // But deleteItem isn't passed to HistoryList in my proposed props above.
                        // I should pass `deleteItem` to HistoryList instead of `openConfirm`? 
                        // No, openConfirm handles the modal state.
                        // I will pass `onDelete` to HistoryList which calls openConfirm.
                    })} 
                    // Wait, HistoryCard takes `onDelete`.
                    // In History.jsx it was:
                    // onDelete={(id) => openConfirm({ ... onConfirm: () => deleteItem(id) ... })}
                    // So I need `deleteItem` available here.
                />
            ))}
        </div>
    );
};

// Re-writing the component with correct props to match logic
export default ({ 
    history, 
    loading, 
    viewMode, 
    selectedIds, 
    toggleSelect, 
    onDelete, // Pass the wrapped handler or the raw one? Let's pass the raw one and Wrap here? Or pass the wrapping function?
    // Let's pass "onDeleteItemClick" which takes title, message, action.
    // Or just pass generic `onDelete` which triggers the confirmation in parent.
    // Parent History.jsx has `openConfirm`.
    // I will pass `requestDelete` prop.
    deleteItem, // Need this to form the closure
    openConfirm,
    handleRedownload,
    navigate, // history list uses navigate for empty state
    search,
    filter,
    setSearch,
    setFilter
}) => {
     return (
        <div className={clsx(
            "grid gap-4 transition-all",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
            {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="h-64 bg-zinc-200 rounded-2xl"></div>
                    ))}
                </div>
            ) : history.length === 0 ? (
                 <div className="text-center py-24 bg-white rounded-3xl border border-zinc-100 shadow-sm border-dashed">
                    {/* Empty State UI */}
                     <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                         <CheckSquare size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2">No history found</h3>
                    {/* ... */}
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
                history.map(item => (
                    <HistoryCard 
                        key={item.id} 
                        item={item}
                        isSelected={selectedIds.has(item.id)}
                        onSelect={toggleSelect}
                        onDelete={(id) => openConfirm({
                            title: 'Delete Item?',
                            message: 'Remove this item from your history?',
                            onConfirm: () => deleteItem(id),
                            confirmText: 'Delete',
                            type: 'danger'
                        })}
                        onRedownload={handleRedownload}
                        viewMode={viewMode}
                    />
                ))
            )}
        </div>
     );
}
