import React from 'react';
import { Save, Bell, Download, Trash2, Clock, Moon } from 'lucide-react';

const Toggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-zinc-50">
        <span className="text-zinc-700 font-medium">{label}</span>
        <button 
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-green-500' : 'bg-zinc-200'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-all ${checked ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

const Select = ({ label, value, onChange, options }) => (
    <div className="flex items-center justify-between py-4 border-b border-zinc-50">
        <span className="text-zinc-700 font-medium">{label}</span>
        <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-black"
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

const PreferencesForm = ({ settings, onUpdate }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 space-y-2">
            
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Download size={20} className="text-blue-500" /> Download Defaults
            </h3>
            
            <Select 
                label="Default Format"
                value={settings.default_format}
                onChange={(v) => onUpdate({ ...settings, default_format: v })}
                options={[
                    { value: 'mp4', label: 'MP4 (Video)' },
                    { value: 'mp3', label: 'MP3 (Audio)' },
                ]}
            />
            <Select 
                label="Default Quality"
                value={settings.default_quality}
                onChange={(v) => onUpdate({ ...settings, default_quality: v })}
                options={[
                    { value: '1080p', label: 'Best Available (1080p+)' },
                    { value: '720p', label: 'Data Saver (720p)' },
                    { value: '480p', label: 'Low (480p)' },
                ]}
            />
            <Toggle 
                label="Auto-start downloads"
                checked={settings.auto_download}
                onChange={(v) => onUpdate({ ...settings, auto_download: v })}
            />

            <div className="h-8" /> {/* Spacer */}

            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Bell size={20} className="text-amber-500" /> Notifications & System
            </h3>

            <Toggle 
                label="Enable Notifications"
                checked={settings.notifications_enabled}
                onChange={(v) => onUpdate({ ...settings, notifications_enabled: v })}
            />
            <Select 
                label="History Retention"
                value={settings.history_retention_days}
                onChange={(v) => onUpdate({ ...settings, history_retention_days: parseInt(v) })}
                options={[
                    { value: 7, label: '7 Days' },
                    { value: 30, label: '30 Days' },
                    { value: 90, label: '90 Days' },
                    { value: 365, label: '1 Year' },
                ]}
            />
             <Toggle 
                label="Dark Mode (Coming Soon)"
                checked={settings.theme === 'dark'}
                onChange={(v) => onUpdate({ ...settings, theme: v ? 'dark' : 'light' })}
            />
        </div>
    );
};

export default PreferencesForm;
