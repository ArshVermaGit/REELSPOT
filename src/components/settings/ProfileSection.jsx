import React from 'react';
import { LogOut } from 'lucide-react';

const ProfileSection = ({ user, signOut, onEditProfile }) => {
    return (
        <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-zinc-100 overflow-hidden shadow-inner">
                {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-2xl">
                        {(user?.email?.[0] || 'U').toUpperCase()}
                    </div>
                )}
            </div>
            <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold">{user?.user_metadata?.full_name || 'User'}</h3>
                <p className="text-zinc-500">{user?.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase tracking-wider">
                        {user?.app_metadata?.provider || 'Email'} Account
                    </span>
                </div>
                <button 
                    onClick={onEditProfile}
                    className="mt-3 text-sm font-bold text-zinc-400 hover:text-black transition-colors"
                >
                    Edit Profile
                </button>
            </div>
            <button 
                onClick={signOut}
                className="px-6 py-3 border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-zinc-50 hover:text-red-500 transition-colors flex items-center gap-2"
            >
                <LogOut size={18} /> Sign Out
            </button>
        </div>
    );
};

export default ProfileSection;
