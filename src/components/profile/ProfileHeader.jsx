import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const navigate = useNavigate();
    
    return (
        <div className="mb-10 flex items-center gap-4">
            <button 
                onClick={() => navigate(-1)}
                className="p-3 bg-white border border-zinc-200 rounded-2xl text-zinc-500 hover:text-black hover:border-zinc-300 transition-all active:scale-95"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-3xl font-[900] tracking-tight text-zinc-900">Your Profile</h1>
                <p className="text-zinc-500 font-medium text-sm">Manage your account details and preferences.</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
