import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { exportHistoryToCSV } from '../utils/exportUtils';
import ApiKeyCard from '../components/settings/ApiKeyCard';
import PreferencesForm from '../components/settings/PreferencesForm';
import ApiKeyModal from '../components/ApiKeyModal';
import { User, Key, Sliders, Database, DownloadCloud, Trash2, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
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
    const { apiKeys, deleteApiKey } = useApiKeys();
    const { settings, updateSettings } = useSettings();
    const { history, clearHistory } = useHistory();
    
    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [activePlatform, setActivePlatform] = useState(null);

    // Active Sidebar Tab (for mobile mostly, but handled via scroll or simplified list on desktop)
    // For this design, we'll list them vertically.

    const handleExport = () => {
        if (history.length === 0) return toast('No history to export');
        exportHistoryToCSV(history);
        toast.success('History exported to CSV');
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                <h1 className="text-4xl font-extrabold mb-10">Settings</h1>

                {/* 1. Profile Section */}
                <SettingsSection title="Profile" icon={User}>
                    <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-zinc-100 overflow-hidden shadow-inner">
                            {user?.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-2xl">
                                    {(user?.email?.[0] || 'U').toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">{user?.user_metadata?.full_name || 'User'}</h3>
                            <p className="text-zinc-500">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-2">
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
                                apiKey={apiKeys[platform]?.api_key}
                                onUpdate={(p) => {
                                    setActivePlatform(p);
                                    setModalOpen(true);
                                }}
                                onDelete={deleteApiKey}
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

                        <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row gap-4">
                            <button 
                                onClick={handleExport}
                                className="flex-1 py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                            >
                                <DownloadCloud size={20} /> Export History (CSV)
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm("Are you sure you want to delete ALL history? This cannot be undone.")) clearHistory();
                                }}
                                className="flex-1 py-4 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={20} /> Clear All Data
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

            </div>
        </div>
    );
};

export default Settings;
