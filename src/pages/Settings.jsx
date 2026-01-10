import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { exportHistoryToCSV, exportHistoryToJSON } from '../utils/exportUtils';
import ApiKeyCard from '../components/settings/ApiKeyCard';
import PreferencesForm from '../components/settings/PreferencesForm';
import ApiKeyModal from '../components/modals/ApiKeyModal';
import { User, Key, Sliders, Database, DownloadCloud, Trash2, LogOut, Code, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="mb-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-black/5 rounded-lg">
                <Icon size={24} className="text-black" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {children}
    </div>
);

const Settings = () => {
    const { user, signOut } = useAuth();
    const { apiKeys, deleteApiKey, updateKeyStatus } = useApiKeys();
    const { settings, updateSettings } = useSettings();
    const { history, clearHistory } = useHistory();
    
    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [activePlatform, setActivePlatform] = useState(null);

    // Delete Flow State
    const [deleteModal, setDeleteModal] = useState({ open: false, type: null }); // type: 'history' | 'account'
    const [confirmText, setConfirmText] = useState('');

    const handleExport = (type) => {
        if (history.length === 0) return toast('No history to export');
        if (type === 'csv') {
            exportHistoryToCSV(history);
            toast.success('Exporting CSV...');
        } else {
            exportHistoryToJSON(history);
            toast.success('Exporting JSON...');
        }
    };

    const handleDeleteKey = async (platform) => {
        if(window.confirm(`Are you sure you want to delete the ${platform} API Key? This will stop downloads.`)) {
             await deleteApiKey(platform);
        }
    };

    const confirmDelete = async () => {
        if (confirmText !== 'DELETE') return;
        
        if (deleteModal.type === 'history') {
             await clearHistory();
             setDeleteModal({ open: false, type: null });
             setConfirmText('');
        } else if (deleteModal.type === 'account') {
             // Mock account deletion flow
             toast.error("Account deletion is disabled for safety in this demo.");
             setDeleteModal({ open: false, type: null });
             setConfirmText('');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                <h1 className="text-4xl font-extrabold mb-10">Settings</h1>

                {/* 1. Profile Section */}
                <SettingsSection title="Profile" icon={User}>
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
                        </div>
                        <button 
                            onClick={signOut}
                            className="px-6 py-3 border border-zinc-200 rounded-xl font-bold text-zinc-700 hover:bg-zinc-50 hover:text-red-500 transition-colors flex items-center gap-2"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </SettingsSection>

                {/* 2. API Keys */}
                <SettingsSection title="API Credentials" icon={Key}>
                     <div className="grid grid-cols-1 gap-4">
                        {['instagram', 'youtube', 'facebook', 'tiktok'].map(platform => (
                            <ApiKeyCard 
                                key={platform}
                                platform={platform} 
                                keyData={apiKeys[platform]} 
                                onUpdate={(p) => {
                                    setActivePlatform(p);
                                    setModalOpen(true);
                                }}
                                onDelete={() => handleDeleteKey(platform)}
                                onTestStatus={updateKeyStatus}
                            />
                        ))}
                     </div>
                </SettingsSection>

                {/* 3. Preferences */}
                <SettingsSection title="Preferences" icon={Sliders}>
                    <PreferencesForm settings={settings} onUpdate={updateSettings} />
                </SettingsSection>

                {/* 4. Data Management */}
                <SettingsSection title="Data & Privacy" icon={Database}>
                    <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                             <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                                 <div className="text-3xl font-bold text-black">{history.length}</div>
                                 <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Total Downloads</div>
                             </div>
                             {/* Mock Storage Calc */}
                             <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                                 <div className="text-3xl font-bold text-black">
                                     {(history.reduce((acc, c) => acc + (c.file_size || 0), 0) / (1024*1024)).toFixed(0)} MB
                                 </div>
                                 <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Data Tracked</div>
                             </div>
                        </div>

                        <div className="border-t border-zinc-100 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                onClick={() => handleExport('csv')}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                            >
                                <DownloadCloud size={20} /> Export CSV
                            </button>
                             <button 
                                onClick={() => handleExport('json')}
                                className="w-full py-4 bg-zinc-100 text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Code size={20} /> Export JSON
                            </button>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-zinc-100">
                             <button 
                                onClick={() => {
                                   setDeleteModal({ open: true, type: 'history' });
                                }}
                                className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={20} /> Clear All History
                            </button>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-zinc-400">
                                Reelspot v1.0.0 • <a href="#" className="hover:underline">Privacy Policy</a> • <a href="#" className="hover:underline">Terms</a>
                            </p>
                        </div>
                    </div>
                </SettingsSection>

                 {/* API Key Modal Reuse */}
                 <ApiKeyModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    platform={activePlatform} 
                />

                {/* Delete Confirmation Modal */}
                {deleteModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal({ open: false, type: null})} />
                        <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                                    {deleteModal.type === 'history' ? 'Clear All History?' : 'Delete Account?'}
                                </h3>
                                <p className="text-zinc-500 mb-6">
                                    {deleteModal.type === 'history' 
                                        ? "This will permanently remove all download records. This action cannot be undone." 
                                        : "This will permanently delete your API keys, history, and preferences."}
                                </p>
                                
                                <div className="w-full mb-6">
                                    <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block text-left">
                                        Type "DELETE" to confirm
                                    </label>
                                    <input 
                                        type="text" 
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        placeholder="DELETE"
                                        className="w-full p-4 border-2 border-red-100 rounded-xl focus:border-red-500 focus:outline-none text-center font-bold tracking-widest uppercase"
                                    />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <button 
                                        onClick={() => setDeleteModal({ open: false, type: null})}
                                        className="flex-1 py-3 text-zinc-500 font-bold hover:bg-zinc-50 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={confirmDelete}
                                        disabled={confirmText !== 'DELETE'}
                                        className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Settings;
