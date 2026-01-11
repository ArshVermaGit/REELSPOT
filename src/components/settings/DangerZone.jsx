import React from 'react';

const DangerZone = ({ onDeleteAccount }) => {
    return (
        <div className="mt-12 pt-8 border-t border-zinc-200">
            <h3 className="text-red-600 font-bold text-xl mb-4">Danger Zone</h3>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-bold text-red-900">Delete Account</h4>
                    <p className="text-red-600/80 text-sm mt-1">
                        Permanently delete your account and all of your content.
                    </p>
                </div>
                <button 
                    onClick={onDeleteAccount}
                    className="px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default DangerZone;
