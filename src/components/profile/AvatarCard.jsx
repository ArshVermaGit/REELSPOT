import React from 'react';
import { User, Camera, Shield } from 'lucide-react';

const AvatarCard = ({ fullName, email, avatarUrl }) => {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-50 shadow-xl mb-6 relative z-10">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                            <User size={48} />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={24} />
                </div>
            </div>
            <h3 className="font-bold text-zinc-900 mb-1">{fullName || 'No Name'}</h3>
            <p className="text-sm text-zinc-500 font-medium mb-6 truncate w-full">{email}</p>
            
            <div className="w-full pt-6 border-t border-zinc-50 flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl justify-center">
                    <Shield size={14} /> Verified Account
                </div>
            </div>
        </div>
    );
};

export default AvatarCard;
