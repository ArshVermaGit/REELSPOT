import React from 'react';
import Card from '../shared/Card';
import { ToggleLeft, ToggleRight, Moon, Sun, Trash, Archive } from 'lucide-react';

const PreferencesForm = ({ settings, onUpdate }) => {
    
    return (
        <Card className="p-6">
            <h3 className="font-bold text-lg mb-6 border-b border-zinc-100 pb-4">General Preferences</h3>
            
            <div className="space-y-6">
                
                {/* Default Download Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-zinc-100">
                    <div>
                        <label className="block text-sm font-medium mb-2">Default Format</label>
                        <select 
                            value={settings.default_format}
                            onChange={(e) => onUpdate({ default_format: e.target.value })}
                            className="w-full p-2.5 border border-zinc-200 rounded-lg text-sm bg-white"
                        >
                            <option value="mp4">MP4 (Video)</option>
                            <option value="mp3">MP3 (Audio)</option>
                            <option value="jpg">JPG (Image)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Default Quality</label>
                        <select 
                            value={settings.default_quality}
                            onChange={(e) => onUpdate({ default_quality: e.target.value })}
                            className="w-full p-2.5 border border-zinc-200 rounded-lg text-sm bg-white"
                        >
                            <option value="best">Best Available</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                            <option value="audio_high">High Quality Audio</option>
                        </select>
                    </div>
                </div>

                {/* Auto Download */}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Auto-start Downloads</h4>
                        <p className="text-sm text-zinc-500">Automatically begin downloading once metadata is loaded.</p>
                    </div>
                    <button 
                        onClick={() => onUpdate({ auto_start_downloads: !settings.auto_start_downloads })}
                        className="text-zinc-400 hover:text-black transition-colors"
                    >
                        {settings.auto_start_downloads ? <ToggleRight size={32} className="text-black" /> : <ToggleLeft size={32} />}
                    </button>
                </div>

                 {/* Notifications */}
                 <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Notifications</h4>
                        <p className="text-sm text-zinc-500">Show success/error toast popups.</p>
                    </div>
                    <button 
                        onClick={() => onUpdate({ notifications_enabled: !settings.notifications_enabled })}
                        className="text-zinc-400 hover:text-black transition-colors"
                    >
                        {settings.notifications_enabled ? <ToggleRight size={32} className="text-black" /> : <ToggleLeft size={32} />}
                    </button>
                </div>

                {/* Theme (Mock) */}
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Appearance</h4>
                        <p className="text-sm text-zinc-500">Manage theme settings.</p>
                    </div>
                     <div className="flex gap-2 bg-zinc-100 p-1 rounded-lg">
                        <button className="p-1.5 bg-white shadow-sm rounded-md text-black"><Sun size={16} /></button>
                        <button className="p-1.5 text-zinc-400"><Moon size={16} /></button>
                     </div>
                </div>

                {/* History Limit */}
                <div className="pt-6 border-t border-zinc-100">
                    <label className="block text-sm font-medium mb-2">History Retention</label>
                    <select 
                        value={settings.history_limit}
                        onChange={(e) => onUpdate({ history_limit: parseInt(e.target.value) })}
                        className="w-full p-2 border border-zinc-200 rounded-lg text-sm"
                    >
                        <option value="100">Last 100 items</option>
                        <option value="500">Last 500 items</option>
                        <option value="1000">Last 1000 items</option>
                        <option value="0">Unlimited</option>
                    </select>

                     <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Auto-delete Downloads after</label>
                        <select 
                            value={settings.auto_delete_days}
                            onChange={(e) => onUpdate({ auto_delete_days: parseInt(e.target.value) })}
                            className="w-full p-2 border border-zinc-200 rounded-lg text-sm"
                        >
                            <option value="0">Never</option>
                            <option value="7">7 Days</option>
                            <option value="30">30 Days</option>
                            <option value="90">90 Days</option>
                        </select>
                    </div>
                </div>

            </div>
        </Card>
    );
};

export default PreferencesForm;
