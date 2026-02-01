import React from 'react';
import { Trash2, X } from 'lucide-react';

const HistoryHeader = ({ selectedCount, onOpenBulkDelete, onClearSelection }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
                <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-2">History</h1>
                <p className="text-zinc-500 font-medium">Manage your past downloads and media.</p>
            </div>

            {/* Bulk Actions Header Control */}
            {selectedCount > 0 && (
                <div className="flex items-center gap-3 bg-white border border-zinc-200 p-2 rounded-2xl shadow-xl shadow-zinc-200/50 animate-in fade-in slide-in-from-bottom-2">
                     <div className="px-3 text-sm font-bold text-zinc-900">
                        {selectedCount} selected
                    </div>
                    <div className="h-4 w-px bg-zinc-200" />
                    <button 
                        onClick={onOpenBulkDelete}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl transition-colors text-sm font-bold"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                    <button 
                        onClick={onClearSelection} 
                        className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-black transition-colors"
                        title="Clear Selection"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistoryHeader;
