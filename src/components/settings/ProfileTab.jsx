import React from 'react';
import { Shield, ChevronRight, Code } from 'lucide-react';
import ProfileSection from './ProfileSection';

const ProfileTab = ({ user, signOut, onEditProfile, onOpenHelp, onOpenFeedback }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-[800] tracking-tight mb-2">My Profile</h2>
                <p className="text-zinc-500">Manage your personal information and account security.</p>
            </div>
            <ProfileSection 
                user={user}
                signOut={signOut}
                onEditProfile={onEditProfile}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={onOpenHelp}
                    className="flex items-center justify-between p-6 bg-white border border-zinc-100 rounded-3xl hover:bg-zinc-50 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <Shield size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-zinc-900">Help & Support</h3>
                            <p className="text-sm text-zinc-500">Guides and common questions.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-300" />
                </button>

                <button 
                    onClick={onOpenFeedback}
                    className="flex items-center justify-between p-6 bg-white border border-zinc-100 rounded-3xl hover:bg-zinc-50 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <Code size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-zinc-900">Give Feedback</h3>
                            <p className="text-sm text-zinc-500">Tell us how we can improve.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-300" />
                </button>
            </div>
        </div>
    );
};

export default ProfileTab;
