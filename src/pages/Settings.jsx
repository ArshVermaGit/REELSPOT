import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { exportHistoryToCSV, exportHistoryToJSON } from '../utils/exportUtils';
import ApiKeyCard from '../components/settings/ApiKeyCard';
import PreferencesForm from '../components/settings/PreferencesForm';
import ProfileSection from '../components/settings/ProfileSection';
import DangerZone from '../components/settings/DangerZone';
import ApiKeyModal from '../components/modals/ApiKeyModal';
import { User, Key, Sliders, Database, DownloadCloud, Trash2, Code, HardDrive, FileJson, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import EditProfileModal from '../components/modals/EditProfileModal';

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
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    // Delete Flow State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => {},
        type: 'danger',
        confirmText: 'Delete'
    });

    const openConfirm = (config) => setConfirmModal({ ...config, isOpen: true });
    const closeConfirm = () => setConfirmModal(prev => ({ ...prev, isOpen: false }));

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
    
    // Generic handlers managed by modal callback now

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-100/50 via-white to-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-10 p-6 md:p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-600 flex items-center justify-center text-white shadow-lg">
                            <Sliders size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-[800] tracking-tight">Settings</h1>
                            <p className="text-zinc-500 font-medium">Manage your account, API keys, and preferences.</p>
                        </div>
                    </div>
                </div>

                {/* 1. Profile Section */}
                <SettingsSection title="Profile" icon={User}>
                    <ProfileSection 
                        user={user}
                        signOut={signOut}
                        onEditProfile={() => setProfileModalOpen(true)}
                    />
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
                                onDelete={() => openConfirm({
                                    title: `Delete ${platform} Key?`,
                                    message: 'This will stop downloads for this platform until a new key is added.',
                                    onConfirm: () => deleteApiKey(platform),
                                    confirmText: 'Delete Key',
                                    type: 'danger'
                                })}
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
                                onClick={() => openConfirm({
                                    title: 'Clear All History?',
                                    message: 'This will permanently remove all download records. This action cannot be undone.',
                                    onConfirm: clearHistory,
                                    confirmText: 'Clear Everything',
                                    type: 'danger'
                                })}
                                className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={20} /> Clear All History
                            </button>
                        </div>
                        
                        <DangerZone 
                            onDeleteAccount={() => openConfirm({
                                title: 'Delete Account?',
                                message: 'This will permanently delete your API keys, history, and preferences. This action cannot be undone.',
                                onConfirm: () => toast.error("Account deletion is disabled for safety in this demo."),
                                confirmText: 'Delete Account',
                                type: 'danger'
                            })}
                        />
                    </div>
                </SettingsSection>

                 {/* API Key Modal Reuse */}
                 <ApiKeyModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    platform={activePlatform} 
                />

                <EditProfileModal 
                    isOpen={profileModalOpen}
                    onClose={() => setProfileModalOpen(false)}
                    user={user}
                    onUpdate={(updatedUser) => {
                        // In a real app the AuthProvider or Supabase sub would update this automatically
                        // For now we just close and toast, simulating the update
                    }}
                />

                {/* Delete Confirmation Modal */}
                <ConfirmationModal 
                    isOpen={confirmModal.isOpen}
                    onClose={closeConfirm}
                    onConfirm={confirmModal.onConfirm}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    type={confirmModal.type}
                    confirmText={confirmModal.confirmText}
                />

            </div>
        </div>
    );
};

export default Settings;
