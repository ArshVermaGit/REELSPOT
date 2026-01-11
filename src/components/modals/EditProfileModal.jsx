
import React, { useState } from 'react';
import { X, User, Save } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast if you need inside component, or props

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
    if (!isOpen) return null;

    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 800));
        
        // In real app: await supabase.auth.updateUser({ data: { full_name: fullName } })
        onUpdate({ ...user, user_metadata: { ...user.user_metadata, full_name: fullName } });
        
        toast.success("Profile updated!");
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                    <h3 className="font-bold text-lg text-zinc-900">Edit Profile</h3>
                    <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                            Display Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-zinc-400" size={20} />
                            <input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-zinc-600 font-bold hover:bg-zinc-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
                        >
                            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
