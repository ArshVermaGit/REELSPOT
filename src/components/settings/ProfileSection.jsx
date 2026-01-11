import React from 'react';
import { LogOut, Link2 } from 'lucide-react';

const ProfileSection = ({ user, signOut, onEditProfile }) => {
    return (
        <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-zinc-100 overflow-hidden shadow-lg ring-4 ring-white">
                    {user?.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-bold text-3xl">
                            {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 text-center sm:text-left z-10">
                <h3 className="text-2xl font-[800] tracking-tight text-zinc-900">{user?.user_metadata?.full_name || 'User'}</h3>
                <p className="text-zinc-500 font-medium">{user?.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-[800] uppercase tracking-wide border border-blue-100 flex items-center gap-1">
                        <Link2 size={12} /> {user?.app_metadata?.provider || 'Email'} Account
                    </span>
                </div>
                <button 
                    onClick={onEditProfile}
                    className="mt-4 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors underline decoration-2 decoration-zinc-200 underline-offset-4 hover:decoration-black"
                >
                    Edit Profile
                </button>
            </div>

            <button 
                onClick={signOut}
                className="px-6 py-3 bg-white border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2 shadow-sm z-10"
            >
                <LogOut size={18} /> Sign Out
            </button>
        </div>
    );
};

export default ProfileSection;
