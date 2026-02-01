import React from 'react';
import ApiKeyCard from './ApiKeyCard';

const KeysTab = ({ apiKeys, onUpdateKey, onDeleteKey, onTestStatus }) => {
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
                        onUpdate={() => onUpdateKey(platform)}
                        onDelete={() => onDeleteKey(platform)}
                        onTestStatus={onTestStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default KeysTab;
