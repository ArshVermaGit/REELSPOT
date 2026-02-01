import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, History, Settings, HelpCircle } from 'lucide-react';

const DashboardHeader = ({ greeting, firstName, onShowHelp }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
                <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-2">
                    {greeting}, {firstName}.
                </h1>
                <p className="text-zinc-500 font-medium">
                    Here&apos;s what&apos;s happening with your downloads today.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
                <Link 
                    to="/"
                    className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-900/10"
                >
                    <Plus size={18} />
                    New Download
                </Link>
                <div className="h-8 w-px bg-zinc-200 mx-1" />
                <Link to="/history" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-600">
                    <History size={20} />
                </Link>
                <Link to="/settings" className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-600">
                    <Settings size={20} />
                </Link>
                <button 
                    onClick={onShowHelp}
                    className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-zinc-600"
                    title="Help & Support"
                >
                    <HelpCircle size={20} />
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
