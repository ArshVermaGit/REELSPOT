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
    const [activeStep, setActiveStep] = useState(0); // For collapsible steps if we wanted accordion, but listing is better.

    if (!isOpen || !platform) return null;

    const guide = GUIDES[platform] || GUIDES.instagram;

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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-scale-up">
                
                {/* Header */}
                <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-white z-10">
                    <div className="flex items-center gap-4">
                        <div className={clsx("p-3 rounded-2xl shadow-sm", guide.bg)}>
                            <PlatformIcon platform={platform} className={clsx("w-8 h-8", guide.color)} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-zinc-900">{guide.title}</h2>
                            <p className="text-sm text-zinc-500 font-medium">Configure credentials</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Guide Section */}
                    <div className="bg-zinc-50/80 rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="p-4 bg-zinc-100/50 border-b border-zinc-100 flex items-center justify-between">
                            <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">1</span>
                                Get your API Key
                            </h3>
                            <a 
                                href={guide.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 hover:border-zinc-300 transition-all shadow-sm"
                            >
                                Open Developer Console 
                                <ExternalLink size={12} className="text-zinc-400 group-hover:text-zinc-700" />
                            </a>
                        </div>
                        
                        <div className="p-5">
                            <ol className="space-y-4">
                                {guide.steps.map((step, idx) => (
                                    <li key={idx} className="flex gap-4 group">
                                        <div className="flex-col items-center hidden sm:flex pt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-zinc-400 transition-colors" />
                                            {idx !== guide.steps.length - 1 && <div className="w-px h-full bg-zinc-200 my-1" />}
                                        </div>
                                        <div className="flex-1 pb-1">
                                            <p className="text-sm text-zinc-600 leading-relaxed font-medium">{step}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {guide.note && (
                            <div className="bg-amber-50/50 p-4 border-t border-amber-100/50 flex items-start gap-3">
                                <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-700 font-medium leading-relaxed">{guide.note}</p>
                            </div>
                        )}
                    </div>

                    {/* Input Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-zinc-900 flex items-center gap-2 px-1">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">2</span>
                            Enter & Save Key
                        </h3>
                        
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Key size={18} className="text-zinc-400 group-focus-within:text-black transition-colors" />
                                </div>
                                <input
                                    type={showKey ? "text" : "password"}
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder={`Paste your ${platform} token here`}
                                    className="w-full pl-11 pr-12 py-4 rounded-xl border-2 border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-200 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition-all font-mono text-sm shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute right-4 top-4 text-zinc-400 hover:text-black transition-colors"
                                >
                                    {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3.5 rounded-xl text-sm font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving || !key}
                                    className="flex-1 px-6 py-3.5 rounded-xl bg-black text-white text-sm font-bold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Validating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Securely Save Key
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
