import React from 'react';
import Card from '../shared/Card';
import { ToggleLeft, ToggleRight, Moon, Sun, Trash, Archive } from 'lucide-react';

const PreferencesForm = ({ settings, onUpdate }) => {
    
    return (
        <Card className="p-6">
            <h3 className="font-bold text-lg mb-6 border-b border-zinc-100 pb-4">General Preferences</h3>
            
            <div className="space-y-6">
                
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
                </div>

            </div>
        </Card>
    );
};

export default PreferencesForm;
