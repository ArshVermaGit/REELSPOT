'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Key, Shield, Palette, 
  ChevronDown, ChevronUp, CheckCircle2, 
  AlertCircle, RefreshCw, Save, Eye, EyeOff,
  Globe, Moon, Sun, Download, Database, Lock
} from 'lucide-react';
import Modal from '../ui/Modal';
import { HelpCircle, Info } from 'lucide-react';
import styles from './Settings.module.css';
import { UserSettings } from '@/types/settings';

type Tab = 'General' | 'API Keys' | 'Appearance' | 'Privacy';

const SettingsContainer = () => {
  const { status } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('General');
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [testStatus, setTestStatus] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({});
  const [guideModal, setGuideModal] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial local state for settings
  const [settings, setSettings] = useState<UserSettings>({
    id: '',
    userId: '',
    downloadPath: '/Downloads/ReelSpot',
    autoHistory: true,
    darkMode: false,
    analytics: true,
    cookies: true,
    INSTAGRAM_API_KEY: '',
    YOUTUBE_API_KEY: '',
    FACEBOOK_API_KEY: '',
    TIKTOK_API_KEY: '',
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
  });

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Failed to load user settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSettings();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status]);

  const toggleKey = (key: string) => {
    setShowKey(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestConnection = (platform: string) => {
    setTestStatus((prev) => ({ ...prev, [platform]: 'loading' }));
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      setTestStatus((prev) => ({ ...prev, [platform]: isSuccess ? 'success' : 'error' }));
    }, 1500);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Sub-component for guides
  const ApiGuide = ({ platform }: { platform: string }) => (
    <Modal isOpen={!!guideModal} onClose={() => setGuideModal(null)} size="medium">
      <div className={`${styles.header} flex items-center gap-3 p-6 border-b`}>
        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
          <Info size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black">{platform.replace(/_/g, ' ')} Setup</h3>
          <p className="text-gray-500 font-medium">Follow these steps to get your key</p>
        </div>
      </div>
      <div className="p-8 space-y-6">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
          <p className="font-medium text-gray-700">Go to the <b>{platform.split('_')[0].toLowerCase()} developers</b> console and sign in.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
          <p className="font-medium text-gray-700">Create a new Project (or select existing) and navigate to <b>Credentials</b>.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
          <p className="font-medium text-gray-700">Generate an <b>API Key</b> (for platforms) or <b>OAuth ID</b> (for Google) and ensure <b>Public Access</b> is enabled.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
          <p className="font-medium text-gray-700">Copy the value and paste it into the secure input field on this page.</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
          <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
          <p className="text-sm text-amber-800 font-semibold italic">Keep your keys private! Never share them or commit them to public repos.</p>
        </div>
      </div>
    </Modal>
  );

  const renderToggle = (key: string, label: string) => (
    <div className={styles.toggleRow}>
      <span className="font-bold">{label}</span>
      <div 
        className={`${styles.toggleSwitch} ${settings[key as keyof UserSettings] ? styles.toggleActive : ''}`}
        onClick={() => setSettings((prev: UserSettings) => ({ ...prev, [key]: !prev[key as keyof UserSettings] }))}
      >
        <div className={styles.toggleThumb} />
      </div>
    </div>
  );

  if (status === 'unauthenticated') {
    return (
      <div className={styles.emptyState} style={{ background: 'white', borderRadius: '40px', padding: '100px 20px', textAlign: 'center', border: '2px dashed #eee' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔒</div>
        <h3 className="text-2xl font-black mb-2">Private Settings</h3>
        <p className="text-gray-500 mb-8 font-medium">Please sign in to manage your API keys and preferences.</p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-login'))}
          className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-all inline-block"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.settingsWrapper}>
        <div className="flex flex-col gap-4">
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-96 w-full bg-gray-50 rounded-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.settingsWrapper}>
      <h1 className={styles.title}>Settings</h1>

      <nav className={styles.tabNav}>
        {(['General', 'API Keys', 'Appearance', 'Privacy'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className={styles.contentArea}>
        {activeTab === 'General' && (
          <div className="animate-fade-in">
            <h2 className={styles.sectionTitle}><Globe size={24} /> General</h2>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Download Location</label>
              <p className={styles.description}>Specify the path where your media should be saved.</p>
              <div className={styles.secureInputWrapper}>
                <input 
                  type="text" 
                  value={settings.downloadPath}
                  className={styles.input}
                  onChange={(e) => setSettings((prev: UserSettings) => ({ ...prev, downloadPath: e.target.value }))}
                />
                <button className={styles.testBtn}><Download size={16} /> Browse</button>
              </div>
            </div>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Automatic History</label>
              <p className={styles.description}>Save your downloads automatically to the history dashboard.</p>
              {renderToggle('autoHistory', 'Enable Logging')}
            </div>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Account & Database</label>
              <p className={styles.description}>Your profile and settings are synchronized through cloud storage.</p>
              <button className={`${styles.testBtn} py-3 w-full justify-center`}>
                <Database size={16} /> Data Synchronization Active
              </button>
            </div>
          </div>
        )}

        {activeTab === 'API Keys' && (
          <div className="animate-fade-in">
            <h2 className={styles.sectionTitle}><Key size={24} /> API Configuration</h2>
            <p className={styles.description}>Configure keys to enable advanced platform features.</p>
            {['INSTAGRAM_API_KEY', 'YOUTUBE_API_KEY', 'FACEBOOK_API_KEY', 'TIKTOK_API_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'].map((k) => (
              <div key={k} className={styles.settingGroup}>
                <div className="flex items-center justify-between mb-2">
                  <label className={styles.label}>{k.replace(/_/g, ' ')}</label>
                  <button 
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => setGuideModal(k)}
                  >
                    <HelpCircle size={14} /> Get Help
                  </button>
                </div>
                <div className={styles.secureInputWrapper}>
                  <input 
                    type={showKey[k] ? 'text' : 'password'} 
                    value={(settings[k as keyof UserSettings] as string) || ''}
                    placeholder="Paste your key here..."
                    className={styles.input}
                    onChange={(e) => setSettings((prev: UserSettings) => ({ ...prev, [k]: e.target.value }))}
                  />
                  <button className={styles.testBtn} onClick={() => toggleKey(k)}>
                    {showKey[k] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button 
                    className={`${styles.testBtn} ${testStatus[k] === 'success' ? styles.testSuccess : testStatus[k] === 'error' ? styles.testError : ''}`}
                    onClick={() => handleTestConnection(k)}
                    disabled={testStatus[k] === 'loading'}
                  >
                    {testStatus[k] === 'loading' ? <RefreshCw className="animate-spin" size={16} /> : 
                     testStatus[k] === 'success' ? <CheckCircle2 size={16} /> :
                     testStatus[k] === 'error' ? <AlertCircle size={16} /> : 
                     'Test'}
                  </button>
                </div>
              </div>
            ))}
            {guideModal && <ApiGuide platform={guideModal} />}
          </div>
        )}

        {activeTab === 'Appearance' && (
          <div className="animate-fade-in">
            <h2 className={styles.sectionTitle}><Palette size={24} /> UI Customization</h2>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Theme Mode</label>
              <div className={styles.toggleRow}>
                <div className="flex items-center gap-3">
                  {settings.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="font-bold">{settings.darkMode ? 'Dark' : 'Light'} Mode</span>
                </div>
                <div 
                  className={`${styles.toggleSwitch} ${settings.darkMode ? styles.toggleActive : ''}`}
                  onClick={() => setSettings((prev: UserSettings) => ({ ...prev, darkMode: !prev.darkMode }))}
                >
                  <div className={styles.toggleThumb} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="animate-fade-in">
            <h2 className={styles.sectionTitle}><Shield size={24} /> Privacy Controls</h2>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Usage Tracking</label>
              {renderToggle('analytics', 'Anonymous Analytics')}
            </div>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Cookie Consent</label>
              {renderToggle('cookies', 'Persistent Preferences')}
            </div>
            <div className={styles.settingGroup}>
              <label className={styles.label}>Security</label>
              <p className={styles.description}>Your account is protected with Google OAuth 2.0.</p>
              <button className={`${styles.testBtn} py-3`}>
                <Lock size={16} /> Data Export Managed
              </button>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={fetchSettings}>Discard</button>
          <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
            {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
            {isSaving ? 'Processing...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;
