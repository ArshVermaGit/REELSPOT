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
import { User, Key, Sliders, Database, DownloadCloud, Trash2, Code, ChevronRight, LogOut, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import EditProfileModal from '../components/modals/EditProfileModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import HelpModal from '../components/modals/HelpModal';
import SuccessModal from '../components/modals/SuccessModal';
import ErrorModal from '../components/modals/ErrorModal';
import { clsx } from 'clsx';

const Settings = () => {
    const { user, signOut } = useAuth();
    const { apiKeys, deleteApiKey, updateKeyStatus } = useApiKeys();
    const { settings, updateSettings } = useSettings();
    const { history, clearHistory } = useHistory();
    
    // UI State
    const [activeTab, setActiveTab] = useState('profile');
    
    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [activePlatform, setActivePlatform] = useState(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

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

    const tabs = [
        { id: 'profile', label: 'Profile & Account', icon: User },
        { id: 'keys', label: 'API Credentials', icon: Key },
        { id: 'preferences', label: 'Preferences', icon: Sliders },
        { id: 'data', label: 'Data & Privacy', icon: Database },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-8">
                            <h2 className="text-2xl font-[800] tracking-tight mb-2">My Profile</h2>
                            <p className="text-zinc-500">Manage your personal information and account security.</p>
                        </div>
                        <ProfileSection 
                            user={user}
                            signOut={signOut}
                            onEditProfile={() => setProfileModalOpen(true)}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setHelpModalOpen(true)}
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
                                onClick={() => setFeedbackModalOpen(true)}
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
            case 'keys':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-8">
                            <h2 className="text-2xl font-[800] tracking-tight mb-2">API Credentials</h2>
                            <p className="text-zinc-500">Manage API keys for different platforms to enable downloads.</p>
                        </div>
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
                    </div>
                );
            case 'preferences':
                return (
                    <div className="space-y-6 animate-fade-in">
                         <div className="mb-8">
                            <h2 className="text-2xl font-[800] tracking-tight mb-2">App Preferences</h2>
                            <p className="text-zinc-500">Customize your download defaults and interface.</p>
                        </div>
                        <PreferencesForm settings={settings} onUpdate={updateSettings} />
                    </div>
                );
            case 'data':
                return (
                    <div className="space-y-6 animate-fade-in">
                         <div className="mb-8">
                            <h2 className="text-2xl font-[800] tracking-tight mb-2">Data & Privacy</h2>
                            <p className="text-zinc-500">Control your data, export history, or delete your account.</p>
                        </div>
                        
                        {/* Stats Summary */}
                        <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 flex items-center justify-around mb-6">
                            <div className="text-center">
                                <div className="text-3xl font-[800] text-black">{history.length}</div>
                                <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Total Downloads</div>
                            </div>
                            <div className="h-10 w-px bg-zinc-200" />
                            <div className="text-center">
                                <div className="text-3xl font-[800] text-black">
                                    {(history.reduce((acc, c) => acc + (c.file_size || 0), 0) / (1024*1024)).toFixed(0)} <span className="text-sm font-medium text-zinc-500">MB</span>
                                </div>
                                <div className="text-xs font-bold text-zinc-400 uppercase mt-1">Data Tracked</div>
                            </div>
                        </div>

                        <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
                            <h3 className="text-sm font-bold text-zinc-900 bg-zinc-50 px-6 py-3 border-b border-zinc-100">Export Date</h3>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => handleExport('csv')}
                                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
                                >
                                    <DownloadCloud size={20} /> Export CSV
                                </button>
                                <button 
                                    onClick={() => handleExport('json')}
                                    className="w-full py-4 bg-white border-2 border-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Code size={20} /> Export JSON
                                </button>
                            </div>
                        </div>

                        <div className="bg-red-50/50 border border-red-100 rounded-3xl overflow-hidden">
                             <h3 className="text-sm font-bold text-red-700 bg-red-100/50 px-6 py-3 border-b border-red-100 flex items-center gap-2">
                                <Shield size={16} /> Danger Zone
                            </h3>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-zinc-900">Clear Search History</h4>
                                        <p className="text-sm text-zinc-500">Remove all your local search and download records.</p>
                                    </div>
                                    <button 
                                        onClick={() => openConfirm({
                                            title: 'Clear All History?',
                                            message: 'This will permanently remove all download records. This action cannot be undone.',
                                            onConfirm: () => {
                                                clearHistory();
                                                setSuccessModal({
                                                    isOpen: true,
                                                    title: 'History Cleared',
                                                    message: 'Your download history has been successfully removed.'
                                                });
                                            },
                                            confirmText: 'Clear Everything',
                                            type: 'danger'
                                        })}
                                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors text-sm"
                                    >
                                        Clear History
                                    </button>
                                </div>
                                
                                <div className="w-full h-px bg-red-100" />
                                
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
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-2">Settings</h1>
                    <p className="text-zinc-500 font-medium">Manage your account and application preferences.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar navigation */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                         {/* Mobile Horizontal Nav */}
                        <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar flex items-center gap-3 mb-4">
                             {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={clsx(
                                        "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                        activeTab === tab.id 
                                            ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/10" 
                                            : "bg-white border border-zinc-200 text-zinc-500"
                                    )}
                                >
                                    <tab.icon size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                         {/* Desktop Sidebar */}
                        <div className="hidden lg:block bg-white rounded-[2rem] border border-zinc-100 p-3 shadow-sm sticky top-24">
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200 group",
                                            activeTab === tab.id 
                                                ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/20" 
                                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon size={20} className={activeTab === tab.id ? "" : "opacity-70 group-hover:opacity-100"} />
                                            <span className="font-bold text-sm">{tab.label}</span>
                                        </div>
                                        {activeTab === tab.id && <ChevronRight size={16} />}
                                    </button>
                                ))}
                            </nav>
                            
                            <div className="mt-4 pt-4 border-t border-zinc-100 px-2 pb-2">
                                <button 
                                    onClick={signOut}
                                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-red-600 font-bold hover:bg-red-50 transition-colors text-sm"
                                >
                                    <LogOut size={20} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        {renderContent()}
                    </div>
                </div>

                {/* Modals */}
                 <ApiKeyModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    platform={activePlatform} 
                />

                <EditProfileModal 
                    isOpen={profileModalOpen}
                    onClose={() => setProfileModalOpen(false)}
                    user={user}
                    onUpdate={() => {}} 
                />

                <ConfirmationModal 
                    isOpen={confirmModal.isOpen}
                    onClose={closeConfirm}
                    onConfirm={confirmModal.onConfirm}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    type={confirmModal.type}
                    confirmText={confirmModal.confirmText}
                />

                <FeedbackModal 
                    isOpen={feedbackModalOpen}
                    onClose={() => setFeedbackModalOpen(false)}
                    onSubmit={async (data) => {
                        toast.success("Feedback received! Thank you.");
                        setSuccessModal({
                            isOpen: true,
                            title: 'Thank You!',
                            message: 'Your feedback helps us make Reelspot better for everyone.'
                        });
                    }}
                />

                <HelpModal 
                    isOpen={helpModalOpen}
                    onClose={() => setHelpModalOpen(false)}
                />

                <SuccessModal 
                    isOpen={successModal.isOpen}
                    onClose={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                    title={successModal.title}
                    message={successModal.message}
                />
            </div>
        </div>
    );
};

export default Settings;
