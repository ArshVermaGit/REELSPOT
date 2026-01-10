import { useState, useEffect } from 'react';
import { Download, Link as LinkIcon, Instagram, Youtube, Facebook, Music2, CheckCircle2, XCircle, AlertCircle, Key } from 'lucide-react';
import { clsx } from 'clsx';
import FloatingIcons from './FloatingIcons';
import { detectPlatform, validateUrl } from '../services/platformDetector';
import { useApiKeys } from '../contexts/ApiKeyContext';
import ApiKeyModal from './ApiKeyModal';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PlatformIcon = ({ platform }) => {
    switch (platform) {
        case 'instagram': return <Instagram size={20} className="text-pink-500" />;
        case 'youtube': return <Youtube size={20} className="text-red-600" />;
        case 'facebook': return <Facebook size={20} className="text-blue-600" />;
        case 'tiktok': return <Music2 size={20} className="text-black" />;
        default: return <LinkIcon size={20} className="text-zinc-400 group-focus-within:text-black transition-colors" />;
    }
};

const Hero = () => {
    const { hasApiKey } = useApiKeys();
    const { user } = useAuth();
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPlatform, setModalPlatform] = useState(null);

    const [url, setUrl] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [validationState, setValidationState] = useState({
        isValid: false,
        platform: 'unknown',
        mediaType: 'unknown',
        loading: false,
        error: null
    });

    // Debounce validation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!url) {
                setValidationState({ isValid: false, platform: 'unknown', mediaType: 'unknown', loading: false, error: null });
                return;
            }

            setValidationState(prev => ({ ...prev, loading: true }));
             
            const result = detectPlatform(url);
            setValidationState({
                isValid: result.isValid,
                platform: result.platform,
                mediaType: result.mediaType,
                loading: false,
                error: !result.isValid && url.length > 5 ? 'Unsupported or invalid URL' : null
            });
            
        }, 300);

        return () => clearTimeout(timer);
    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("Please sign in to download content.");
            return;
        }

        if (validationState.isValid) {
            // Check if we have an API key for this platform
            if (!hasApiKey(validationState.platform)) {
                setModalPlatform(validationState.platform);
                setIsModalOpen(true);
                return;
            }

            console.log("Download:", url, validationState);
            toast.success(`Starting download for ${validationState.platform}...`);
            // Trigger actual download logic here
        }
    };

    const getBorderColor = () => {
        if (!url) return 'border-zinc-200 focus:border-black';
        if (validationState.loading) return 'border-blue-300 focus:border-blue-500';
        if (validationState.isValid) return 'border-green-500 focus:border-green-500 shadow-green-100';
        if (validationState.error) return 'border-red-300 focus:border-red-500 shadow-red-100';
        return 'border-zinc-200 focus:border-black';
    };

    return (
        <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black">
            {/* Background Elements */}
            <FloatingIcons />

            {/* API Key Modal */}
            <ApiKeyModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                platform={modalPlatform} 
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Animated Logo */}
                <h1
                    className="text-5xl md:text-7xl font-[800] tracking-tighter mb-4 animate-slide-down"
                    style={{ animationDelay: '0s' }}
                >
                    Reelspot
                </h1>

                {/* Tagline */}
                <p
                    className="text-lg md:text-2xl font-medium mb-12 text-zinc-600 bg-clip-text text-transparent bg-gradient-to-br from-black to-zinc-600 animate-fade-in opacity-0"
                    style={{ animationDelay: '0.2s' }}
                >
                    Download Media, <span className="text-black font-semibold">Effortlessly</span>
                </p>

                {/* Input Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[600px] flex flex-col items-center gap-6 animate-fade-in opacity-0"
                    style={{ animationDelay: '0.4s' }}
                >
                    <div className="relative w-full group">
                        {/* Left Icon (Dynamic) */}
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-all duration-300">
                            <PlatformIcon platform={validationState.platform === 'unknown' ? 'default' : validationState.platform} />
                        </div>

                        {/* Input Field */}
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste your link here..."
                            className={clsx(
                                "w-full h-16 pl-12 pr-12 rounded-2xl border-2 text-lg placeholder:text-zinc-400 focus:outline-none focus:shadow-xl transition-all duration-300",
                                getBorderColor()
                            )}
                            required
                        />

                        {/* Right Status Indicator */}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            {validationState.loading && (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-zinc-600"></div>
                            )}
                            {!validationState.loading && validationState.isValid && (
                                <CheckCircle2 size={24} className="text-green-500 animate-in fade-in zoom-in duration-200" />
                            )}
                            {!validationState.loading && validationState.error && (
                                <XCircle size={24} className="text-red-500 animate-in fade-in zoom-in duration-200" />
                            )}
                        </div>
                    </div>
                    
                    {/* Helper Text for Error or Missing Key */}
                    {validationState.error && (
                        <div className="text-red-500 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-top-1">
                             <AlertCircle size={14} />
                             {validationState.error}
                        </div>
                    )}

                    {!validationState.error && validationState.isValid && user && !hasApiKey(validationState.platform) && (
                         <div className="text-amber-500 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-top-1">
                            <Key size={14} />
                            API Key setup required for {validationState.platform}
                       </div>
                    )}
                    
                    {/* Media Type Badge */}
                    {validationState.isValid && (
                        <div className="text-zinc-500 text-sm font-medium animate-in slide-in-from-top-1 bg-zinc-100 px-3 py-1 rounded-full">
                           Detected: <span className="capitalize text-black">{validationState.platform} {validationState.mediaType}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!validationState.isValid}
                        className={clsx(
                            "relative overflow-hidden group bg-black text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform",
                            "hover:scale-105 hover:shadow-2xl hover:shadow-black/20",
                            "active:scale-95",
                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        )}
                        style={{ animationDelay: '0.6s' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <Download size={20} className={clsx("transition-transform duration-300", isHovered ? "translate-y-1" : "")} />
                            <span>Download Now</span>
                        </div>
                        {/* Subtle sheen effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Hero;
