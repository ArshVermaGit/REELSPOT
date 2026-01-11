import React, { useState } from 'react';
import { useHistory } from '../hooks/useHistory';
import HistoryCard from '../components/history/HistoryCard';
import HistoryFilters from '../components/history/HistoryFilters';
import HistoryStats from '../components/history/HistoryStats';
import HistoryList from '../components/history/HistoryList';
import { Trash2, CheckSquare, Square, History as HistoryIcon, X } from 'lucide-react';
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
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-2">History</h1>
                        <p className="text-zinc-500 font-medium">Manage your past downloads and media.</p>
                    </div>

                    {/* Bulk Actions Header Control */}
                    {selectedIds.size > 0 && (
                        <div className="flex items-center gap-3 bg-white border border-zinc-200 p-2 rounded-2xl shadow-xl shadow-zinc-200/50 animate-in fade-in slide-in-from-bottom-2">
                             <div className="px-3 text-sm font-bold text-zinc-900">
                                {selectedIds.size} selected
                            </div>
                            <div className="h-4 w-px bg-zinc-200" />
                            <button 
                                onClick={() => openConfirm({
                                    title: 'Delete Selected Items?',
                                    message: `Are you sure you want to delete ${selectedIds.size} items? This action cannot be undone.`,
                                    onConfirm: bulkDelete,
                                    confirmText: 'Delete All',
                                    type: 'danger'
                                })}
                                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl transition-colors text-sm font-bold"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                            <button 
                                onClick={selectAll} 
                                className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-black transition-colors"
                                title="Clear Selection"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Analytics */}
                <div className="mb-10">
                    <HistoryStats stats={stats} />
                </div>

                <div className="relative flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Sticky Sidebar / Filters */}
                    <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 z-30">
                        <div className="bg-white/80 backdrop-blur-xl border border-zinc-200/50 rounded-[2rem] p-6 shadow-sm">
                            <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                <Filter size={18} /> Filters
                            </h3>
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

                             {/* Helper Actions */}
                             <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col gap-3">
                                <button 
                                    onClick={selectAll}
                                    className="w-full py-3 px-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-sm font-bold transition-colors flex items-center justify-between group"
                                >
                                    <span>Select All Items</span>
                                    {selectedIds.size > 0 && selectedIds.size === history.length ? (
                                        <CheckSquare size={16} className="text-black" />
                                    ) : (
                                        <Square size={16} className="group-hover:text-black" />
                                    )}
                                </button>
                                
                                {history.length > 0 && (
                                    <button 
                                        onClick={() => openConfirm({
                                            title: 'Clear All History?',
                                            message: 'Are you sure you want to delete your entire download history? This action is permanent.',
                                            onConfirm: clearHistory,
                                            confirmText: 'Clear Everything',
                                            type: 'danger'
                                        })}
                                        className="w-full py-3 px-4 rounded-xl text-red-600 text-sm font-bold hover:bg-red-50 transition-colors flex items-center justify-between"
                                    >
                                        <span>Clear All History</span>
                                        <Trash2 size={16} />
                                    </button>
                                )}
                             </div>
                        </div>
                    </div>

                    {/* Main Content List */}
                    <div className="flex-1 min-w-0">
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
                                    className="bg-white border border-zinc-200 text-zinc-600 px-8 py-3 rounded-2xl font-bold shadow-sm hover:bg-zinc-50 hover:text-black hover:border-zinc-300 transition-all active:scale-95"
                                >
                                    Load More Results
                                </button>
                            </div>
                        )}
                    </div>
                </div>
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
