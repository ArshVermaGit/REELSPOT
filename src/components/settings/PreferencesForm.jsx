import React from 'react';
import Card from '../shared/Card';
import { ToggleLeft, ToggleRight, Moon, Sun, ChevronDown } from 'lucide-react';

const Select = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-xs font-[800] uppercase text-zinc-400 mb-2 tracking-wide">{label}</label>
        <div className="relative">
            <select 
                value={value}
                onChange={onChange}
                className="w-full p-3 pr-10 border border-zinc-200 rounded-xl text-sm font-bold bg-zinc-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none cursor-pointer text-zinc-900"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3.5 text-zinc-400 pointer-events-none" size={16} />
        </div>
    </div>
);

const Toggle = ({ active, onClick }) => (
    <button 
        onClick={onClick}
        className="text-zinc-300 hover:text-zinc-400 transition-colors relative"
    >
        {active ? (
            <div className="text-black scale-[1.1] transition-transform">
                <ToggleRight size={40} fill="currentColor" className="text-black" />
            </div>
        ) : (
            <ToggleLeft size={40} />
        )}
    </button>
);

const PreferencesForm = ({ settings, onUpdate }) => {
    
    return (
        <Card className="p-8 rounded-[2rem] border-zinc-100 shadow-sm">
            <h3 className="font-[800] text-xl mb-8 border-b border-zinc-100 pb-4">General Preferences</h3>
            
            <div className="space-y-8">
                
                {/* Default Download Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select 
                        label="Default Format"
                        value={settings.default_format}
                        onChange={(e) => onUpdate({ default_format: e.target.value })}
                        options={[
                            { value: 'mp4', label: 'MP4 (Video)' },
                            { value: 'mp3', label: 'MP3 (Audio)' },
                            { value: 'jpg', label: 'JPG (Image)' },
                        ]}
                    />
                    <Select 
                        label="Default Quality"
                        value={settings.default_quality}
                        onChange={(e) => onUpdate({ default_quality: e.target.value })}
                        options={[
                            { value: 'best', label: 'Best Available' },
                            { value: '1080p', label: 'Full HD (1080p)' },
                            { value: '720p', label: 'HD (720p)' },
                            { value: '480p', label: 'SD (480p)' },
                            { value: 'audio_high', label: 'High Quality Audio' },
                        ]}
                    />
                </div>

                <div className="h-px bg-zinc-100" />

                {/* Auto Download */}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-zinc-900">Auto-start Downloads</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-0.5">Start download immediately after resolving URL.</p>
                    </div>
                    <Toggle 
                        active={settings.auto_start_downloads} 
                        onClick={() => onUpdate({ auto_start_downloads: !settings.auto_start_downloads })} 
                    />
                </div>

                 {/* Notifications */}
                 <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-zinc-900">Notifications</h4>
                        <p className="text-sm text-zinc-500 font-medium mt-0.5">Show success and error toast popups.</p>
                    </div>
                    <Toggle 
                        active={settings.notifications_enabled} 
                        onClick={() => onUpdate({ notifications_enabled: !settings.notifications_enabled })} 
                    />
                </div>


                
                <div className="h-px bg-zinc-100" />

                {/* History Limit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <Select 
                        label="History Retention"
                        value={settings.history_limit}
                        onChange={(e) => onUpdate({ history_limit: parseInt(e.target.value) })}
                        options={[
                            { value: 100, label: 'Last 100 items' },
                            { value: 500, label: 'Last 500 items' },
                            { value: 1000, label: 'Last 1000 items' },
                            { value: 0, label: 'Unlimited' },
                        ]}
                    />

                    <Select 
                        label="Auto-delete Downloads"
                        value={settings.auto_delete_days}
                        onChange={(e) => onUpdate({ auto_delete_days: parseInt(e.target.value) })}
                        options={[
                            { value: 0, label: 'Never' },
                            { value: 7, label: 'After 7 Days' },
                            { value: 30, label: 'After 30 Days' },
                            { value: 90, label: 'After 90 Days' },
                        ]}
                    />
                </div>

            </div>
        </Card>
    );
};

export default PreferencesForm;
