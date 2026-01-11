import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DangerZone = ({ onDeleteAccount }) => {
    return (
        <div className="mt-12 pt-10 border-t border-zinc-200/60">
            <h3 className="text-red-600 font-[800] text-xl mb-4 flex items-center gap-2">
                <AlertTriangle size={20} strokeWidth={2.5} /> Danger Zone
            </h3>
            <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100/60 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-red-50 transition-colors">
                <div>
                    <h4 className="font-bold text-red-900 text-lg">Delete Account</h4>
                    <p className="text-red-700/70 text-sm mt-1 max-w-md font-medium">
                        Permanently delete your account and all of your content. This action is irreversible and all data will be lost.
                    </p>
                </div>
                <button 
                    onClick={onDeleteAccount}
                    className="px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all active:scale-95 whitespace-nowrap"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default DangerZone;
