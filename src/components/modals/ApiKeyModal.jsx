import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Key, ExternalLink, AlertTriangle, Eye, EyeOff, Save, Instagram, Youtube, Facebook, Music2, HelpCircle } from 'lucide-react';
import { useApiKeys } from '../../contexts/ApiKeyContext';
import { clsx } from 'clsx';

const GUIDES = {
    instagram: {
        title: 'Instagram API Setup',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
        url: 'https://developers.facebook.com/',
        steps: [
            "Go to Facebook Developers: developers.facebook.com",
            "Create a new app or select existing app",
            "Add 'Instagram Basic Display API'",
            "Generate Access Token from 'User Token Generator'",
            "Copy the token and paste below"
        ],
        note: "Token expires in 60 days. Requires Instagram Business/Creator account."
    },
    youtube: {
        title: 'YouTube API Setup',
        color: 'text-red-600',
        bg: 'bg-red-600/10',
        url: 'https://console.cloud.google.com/',
        steps: [
            "Go to Google Cloud Console: console.cloud.google.com",
            "Create new project or select existing",
            "Enable 'YouTube Data API v3'",
            "Create credentials → API Key",
            "Copy API key and paste below"
        ],
        note: "Free quota: 10,000 units/day. Restrict API key to specific domains (recommended)."
    },
    facebook: {
        title: 'Facebook API Setup',
        color: 'text-blue-600',
        bg: 'bg-blue-600/10',
        url: 'https://developers.facebook.com/',
        steps: [
            "Go to Facebook Developers: developers.facebook.com",
            "Create App → Select 'Consumer' type",
            "Add 'Facebook Login' product",
            "Get User Access Token from Graph API Explorer",
            "Copy token and paste below"
        ],
        note: "Token expires, may need refresh. Requires app review for public use."
    },
    tiktok: {
        title: 'TikTok API Setup',
        color: 'text-black',
        bg: 'bg-black/5',
        url: 'https://developers.tiktok.com/',
        steps: [
            "Go to TikTok Developers: developers.tiktok.com",
            "Register as a developer",
            "Create new app",
            "Get Client Key from app dashboard",
            "Copy client key and paste below"
        ],
        note: "Requires approval for some endpoints. Rate limits apply."
    }
};

const PlatformIcon = ({ platform, className }) => {
    switch (platform) {
        case 'instagram': return <Instagram className={className} />;
        case 'youtube': return <Youtube className={className} />;
        case 'facebook': return <Facebook className={className} />;
        case 'tiktok': return <Music2 className={className} />;
        default: return <HelpCircle className={className} />;
    }
};

const ApiKeyModal = ({ isOpen, onClose, platform }) => {
    const { saveApiKey } = useApiKeys();
    const [key, setKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen || !platform) return null;

    const guide = GUIDES[platform] || GUIDES.instagram; // Fallback

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const success = await saveApiKey(platform, key);
        setIsSaving(false);
        if (success) {
            setKey('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                        <div className={clsx("p-3 rounded-xl", guide.bg)}>
                            <PlatformIcon platform={platform} className={clsx("w-6 h-6", guide.color)} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900">{guide.title}</h2>
                            <p className="text-sm text-zinc-500">Enter your credentials to continue</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Guide Section */}
                    <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-100">
                        <h3 className="font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                             How to get your key
                             <a 
                                href={guide.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-xs font-normal flex items-center gap-1"
                            >
                                Open Console <ExternalLink size={10} />
                            </a>
                        </h3>
                        <ol className="space-y-2">
                            {guide.steps.map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-zinc-600">
                                    <span className="flex-shrink-0 w-5 h-5 bg-zinc-200 rounded-full flex items-center justify-center text-xs font-medium text-zinc-700">
                                        {idx + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                        
                        {guide.note && (
                            <div className="mt-4 flex gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                                <p>{guide.note}</p>
                            </div>
                        )}
                    </div>

                    {/* Input Section */}
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">
                                API Access Token
                            </label>
                            <div className="relative">
                                <input
                                    type={showKey ? "text" : "password"}
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder={`Paste your ${platform} token here`}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all pr-12 font-mono text-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute right-3 top-3 text-zinc-400 hover:text-black transition-colors"
                                >
                                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving || !key}
                                className="flex-1 px-4 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Key
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
