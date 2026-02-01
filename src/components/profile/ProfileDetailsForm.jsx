import React from 'react';
import { User, Mail, Save } from 'lucide-react';

const ProfileDetailsForm = ({ fullName, email, setFullName, onSave, updating }) => {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full">
            <form onSubmit={onSave} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2 px-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                            <User size={18} />
                        </div>
                        <input 
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-2 px-1">Email Address (Primary)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="email"
                            value={email}
                            disabled
                            className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-400 font-medium cursor-not-allowed opacity-60"
                        />
                    </div>
                    <p className="mt-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest px-1">Email cannot be changed manually</p>
                </div>

                <div className="pt-6">
                    <button 
                        type="submit"
                        disabled={updating}
                        className="w-full py-4 bg-black text-white rounded-2xl font-[900] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-black/10"
                    >
                        <Save size={20} />
                        {updating ? 'Saving Changes...' : 'Save Profile Details'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileDetailsForm;
