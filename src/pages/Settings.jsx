import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApiKeys } from '../contexts/ApiKeyContext';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { exportHistoryToCSV, exportHistoryToJSON } from '../utils/exportUtils';
import PreferencesForm from '../components/settings/PreferencesForm';
import ProfileTab from '../components/settings/ProfileTab';
import KeysTab from '../components/settings/KeysTab';
import DataTab from '../components/settings/DataTab';
import ApiKeyModal from '../components/modals/ApiKeyModal';
import { User, Key, Sliders, Database, ChevronRight, LogOut } from 'lucide-react';
import SEO from '../components/shared/SEO';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import EditProfileModal from '../components/modals/EditProfileModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import HelpModal from '../components/modals/HelpModal';
import SuccessModal from '../components/modals/SuccessModal';
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
                    <ProfileTab 
                        user={user}
                        signOut={signOut}
                        onEditProfile={() => setProfileModalOpen(true)}
                        onOpenHelp={() => setHelpModalOpen(true)}
                        onOpenFeedback={() => setFeedbackModalOpen(true)}
                    />
                );
            case 'keys':
                return (
                    <KeysTab 
                        apiKeys={apiKeys}
                        onUpdateKey={(platform) => {
                            setActivePlatform(platform);
                            setModalOpen(true);
                        }}
                        onDeleteKey={(platform) => openConfirm({
                            title: `Delete ${platform} Key?`,
                            message: 'This will stop downloads for this platform until a new key is added.',
                            onConfirm: () => deleteApiKey(platform),
                            confirmText: 'Delete Key',
                            type: 'danger'
                        })}
                        onTestStatus={updateKeyStatus}
                    />
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
                    <DataTab 
                        history={history}
                        onExport={handleExport}
                        onClearHistory={() => openConfirm({
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
                        onDeleteAccount={() => openConfirm({
                            title: 'Delete Account?',
                            message: 'This will permanently delete your API keys, history, and preferences. This action cannot be undone.',
                            onConfirm: () => toast.error("Account deletion is disabled for safety in this demo."),
                            confirmText: 'Delete Account',
                            type: 'danger'
                        })}
                    />
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 relative">
            <SEO 
                title="Account Settings" 
                description="Configure your Reelspot account preferences, manage API keys, and control your data privacy settings."
            />
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
                    onSuccess={async () => {
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
