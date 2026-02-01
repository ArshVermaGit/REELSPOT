import React from 'react';
import { DownloadCloud, Code, Shield } from 'lucide-react';
import DangerZone from './DangerZone';

const DataTab = ({ history, onExport, onClearHistory, onDeleteAccount }) => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="mb-8">
                <h2 className="text-2xl font-[800] tracking-tight mb-2">Data & Privacy</h2>
                <p className="text-zinc-500">Control your data, export history, or delete your account.</p>
            </div>
            
            {/* Stats Summary */}
            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 flex items-center justify-around mb-6">
                <div className="text-center">
                    <div className="text-3xl font-[800] text-black">{history?.length || 0}</div>
                    <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Total Downloads</div>
                </div>
                <div className="h-10 w-px bg-zinc-200" />
                <div className="text-center">
                    <div className="text-3xl font-[800] text-black">
                        {((history?.reduce((acc, c) => acc + (c.file_size || 0), 0) || 0) / (1024*1024)).toFixed(0)} <span className="text-sm font-medium text-zinc-500">MB</span>
                    </div>
                    <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Data Tracked</div>
                </div>
            </div>

            <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 bg-zinc-50 px-6 py-3 border-b border-zinc-100">Export Date</h3>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={() => onExport('csv')}
                        className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
                    >
                        <DownloadCloud size={20} /> Export CSV
                    </button>
                    <button 
                        onClick={() => onExport('json')}
                        className="w-full py-4 bg-white border-2 border-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-200 transition-all flex items-center justify-center gap-2"
                    >
                        <Code size={20} /> Export JSON
                    </button>
                </div>
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-3xl overflow-hidden">
                 <h3 className="text-sm font-bold text-red-700 bg-red-100/50 px-6 py-3 border-b border-red-100 flex items-center gap-2">
                    <Shield size={16} /> Danger Zone
                </h3>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-zinc-900">Clear Search History</h4>
                            <p className="text-sm text-zinc-500">Remove all your local search and download records.</p>
                        </div>
                        <button 
                            onClick={onClearHistory}
                            className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors text-sm"
                        >
                            Clear History
                        </button>
                    </div>
                    
                    <div className="w-full h-px bg-red-100" />
                    
                    <DangerZone onDeleteAccount={onDeleteAccount} />
                </div>
            </div>
        </div>
    );
};

export default DataTab;
