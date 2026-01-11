import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/history/HistoryCard';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryStats from '../components/history/HistoryStats';
import HistoryList from '../components/history/HistoryList';
import { Trash2, CheckSquare, Square, History as HistoryIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/modals/ConfirmationModal';

const History = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [viewMode, setViewMode] = useState('grid');
    
    // Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {},
        type: 'danger',
        confirmText: 'Delete'
    });

    const openConfirm = (config) => setConfirmModal({ ...config, isOpen: true });
    const closeConfirm = () => setConfirmModal(prev => ({ ...prev, isOpen: false }));

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
        <div className="min-h-screen bg-gradient-to-b from-zinc-100/50 via-white to-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 p-6 md:p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                            <HistoryIcon size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-[800] tracking-tight">Download History</h1>
                            <p className="text-zinc-500">Track and manage your media downloads.</p>
                        </div>
                    </div>
                    {/* Bulk Actions Header Control */}
                    {selectedIds.size > 0 && (
                        <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2">
                            <span className="font-medium text-sm">{selectedIds.size} Selected</span>
                            <div className="h-4 w-px bg-white/20" />
                            <button 
                                onClick={() => openConfirm({
                                    title: 'Delete Selected Items?',
                                    message: `Are you sure you want to delete ${selectedIds.size} items? This action cannot be undone.`,
                                    onConfirm: bulkDelete,
                                    confirmText: 'Delete All',
                                    type: 'danger'
                                })}
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
                            onClick={() => openConfirm({
                                title: 'Clear All History?',
                                message: 'Are you sure you want to delete your entire download history? This action is permanent and cannot be undone.',
                                onConfirm: clearHistory,
                                confirmText: 'Clear Everything',
                                type: 'danger'
                            })}
                            className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={14} /> Clear All
                        </button>
                    )}
                </div>

                {/* Grid/List Content */}
                {/* Grid/List Content */}
                <HistoryList 
                    history={history}
                    loading={loading}
                    viewMode={viewMode}
                    selectedIds={selectedIds}
                    toggleSelect={toggleSelect}
                    deleteItem={deleteItem}
                    openConfirm={openConfirm}
                    handleRedownload={handleRedownload}
                    navigate={navigate}
                    search={search}
                    filter={filter}
                    setSearch={setSearch}
                    setFilter={setFilter}
                />
                
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
            
            <ConfirmationModal 
                isOpen={confirmModal.isOpen}
                onClose={closeConfirm}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText={confirmModal.confirmText}
            />
        </div>
    );
};

export default History;
