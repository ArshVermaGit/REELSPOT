import React from 'react';

const SecurityCard = () => {
    return (
        <div className="mt-8 bg-zinc-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-xl font-[800] mb-2">Account Security</h4>
                    <p className="text-zinc-400 text-sm font-medium">Your account is secured via Google OAuth. No separate password needed.</p>
                </div>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all">
                    Manage Authentication
                </button>
            </div>
        </div>
    );
};

export default SecurityCard;
