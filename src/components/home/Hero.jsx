import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApiKeys } from '../../contexts/ApiKeyContext';
import ApiKeyModal from '../modals/ApiKeyModal';
import SignInPrompt from '../modals/SignInPrompt';
import DownloadForm from '../download/DownloadForm';
import { toast } from 'react-hot-toast';
import { Instagram, Youtube, Facebook, Music2, ArrowDown, Shield, Zap, Download } from 'lucide-react';

const Hero = () => {
    const { hasApiKey, getApiKey } = useApiKeys();
    const { user, signInWithGoogle } = useAuth();
    
    // Modal State
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [modalPlatform, setModalPlatform] = useState(null);
    
    // Sign In Prompt State
    const [showSignInPrompt, setShowSignInPrompt] = useState(false);
    const [pendingUrl, setPendingUrl] = useState(null);

    const handleSignInRequired = (url) => {
        setPendingUrl(url);
        setShowSignInPrompt(true);
    };

    const handleApiKeyRequired = (platform) => {
        setModalPlatform(platform);
        setIsApiKeyModalOpen(true);
    };

    const handleSignIn = async () => {
        setShowSignInPrompt(false);
        try {
            await signInWithGoogle();
        } catch (error) {
            toast.error('Sign in failed. Please try again.');
        }
    };
    
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-white via-zinc-50/50 to-white text-black selection:bg-black selection:text-white">
            
            {/* Creative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-60 -right-60 w-[700px] h-[700px] bg-gradient-to-tl from-blue-100/50 via-cyan-50/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-50/30 to-transparent rounded-full blur-3xl" />
                
                {/* Subtle Grid */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }} />
                
                {/* Floating Platform Icons */}
                <div className="hidden md:block">
                    <div className="absolute top-[18%] left-[12%] opacity-[0.08] animate-float-slow">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl">
                            <Instagram size={36} className="text-white" />
                        </div>
                    </div>
                    <div className="absolute top-[22%] right-[14%] opacity-[0.08] animate-float-slow" style={{ animationDelay: '1s' }}>
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl">
                            <Youtube size={36} className="text-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-[22%] left-[16%] opacity-[0.08] animate-float-slow" style={{ animationDelay: '2s' }}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl">
                            <Facebook size={28} className="text-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-[28%] right-[12%] opacity-[0.08] animate-float-slow" style={{ animationDelay: '0.5s' }}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center shadow-2xl">
                            <Music2 size={28} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SignInPrompt isOpen={showSignInPrompt} onClose={() => setShowSignInPrompt(false)} onSignIn={handleSignIn} />
            <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} platform={modalPlatform} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-24">
                
                {/* Main Logo */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-[900] tracking-[-0.04em] leading-none mb-6 animate-slide-down">
                    <span className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-transparent drop-shadow-sm">
                        Reelspot
                    </span>
                </h1>

                {/* Tagline */}
                <p className="text-xl sm:text-2xl md:text-3xl text-zinc-500 font-medium mb-16 animate-fade-in tracking-tight" style={{ animationDelay: '0.2s' }}>
                    Download Media, <span className="text-zinc-900 font-semibold">Effortlessly</span>
                </p>

                {/* Download Form */}
                <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <DownloadForm 
                        onApiKeyRequired={handleApiKeyRequired}
                        onSignInRequired={handleSignInRequired}
                        user={user}
                        initialUrl={pendingUrl}
                    />
                </div>

                {/* Platform Badges */}
                <div className="flex items-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <span className="text-sm text-zinc-400 font-medium">Supports</span>
                    <div className="flex items-center gap-2">
                        {[
                            { icon: Instagram, color: 'bg-gradient-to-br from-pink-500 to-purple-600' },
                            { icon: Youtube, color: 'bg-gradient-to-br from-red-500 to-red-600' },
                            { icon: Facebook, color: 'bg-gradient-to-br from-blue-500 to-blue-700' },
                            { icon: Music2, color: 'bg-gradient-to-br from-zinc-700 to-black' },
                        ].map(({ icon: Icon, color }, i) => (
                            <div key={i} className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default`}>
                                <Icon size={18} className="text-white" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    {[
                        { icon: Shield, text: 'Secure & Private' },
                        { icon: Zap, text: 'Lightning Fast' },
                        { icon: Download, text: 'No Watermarks' },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                            <Icon size={18} />
                            <span className="text-sm font-medium">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                <ArrowDown size={24} className="text-zinc-400" />
            </div>
        </section>
    );
};

export default Hero;
