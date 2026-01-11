import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApiKeys } from '../../contexts/ApiKeyContext';
import ApiKeyModal from '../modals/ApiKeyModal';
import SignInPrompt from '../modals/SignInPrompt';
import DownloadForm from '../download/DownloadForm';
import { toast } from 'react-hot-toast';
import { Instagram, Youtube, Facebook, Music2, Shield, Zap, Download } from 'lucide-react';
import { clsx } from 'clsx';

const FloatingIcon = ({ icon: Icon, colorClass, positionClass, delay }) => (
    <div 
        className={clsx(
            "absolute hidden xl:flex items-center justify-center w-24 h-24 rounded-[2rem] backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] animate-float-slow hover:scale-110 transition-transform duration-500",
            positionClass
        )}
        style={{ animationDelay: delay }}
    >
        <div className={clsx("opacity-100 p-4 bg-white/50 rounded-[1.5rem] shadow-sm", colorClass)}>
            <Icon size={32} />
        </div>
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
    </div>
);

const Hero = () => {
    const { hasApiKey, getApiKey } = useApiKeys();
    const { user, signInWithGoogle } = useAuth();
    
    // Modal & Auth State
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [modalPlatform, setModalPlatform] = useState(null);
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
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-zinc-50/50 text-black selection:bg-black selection:text-white pt-12">
            
            {/* 1. Aurora Background */}
            <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-gradient-to-br from-purple-200/40 via-blue-100/30 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                 <div className="absolute top-[20%] right-[-20%] w-[800px] h-[800px] bg-gradient-to-bl from-pink-200/40 via-rose-100/30 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                 <div className="absolute -bottom-[20%] left-[20%] w-[1200px] h-[600px] bg-gradient-to-t from-indigo-100/40 via-white/0 to-transparent blur-3xl" />
                 
                 {/* Subtle Grid */}
                 <div className="absolute inset-0 opacity-[0.3]" style={{
                     backgroundImage: 'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
                     backgroundSize: '80px 80px'
                 }} />
            </div>

            {/* Floating Elements (Exact Positions from Image + Premium Style) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-[1600px] mx-auto">
                 {/* Top Left - Instagram */}
                 <FloatingIcon 
                    icon={Instagram} 
                    colorClass="text-pink-600" 
                    positionClass="top-[15%] left-[5%] lg:left-[10%]" 
                    delay="0s" 
                 />
                 
                 {/* Top Right - Youtube */}
                 <FloatingIcon 
                    icon={Youtube} 
                    colorClass="text-red-600" 
                    positionClass="top-[20%] right-[5%] lg:right-[10%]" 
                    delay="1s" 
                 />

                 {/* Bottom Left - Facebook */}
                 <FloatingIcon 
                    icon={Facebook} 
                    colorClass="text-blue-600" 
                    positionClass="bottom-[15%] left-[8%] lg:left-[12%]" 
                    delay="2s" 
                 />

                 {/* Bottom Right - TikTok */}
                 <FloatingIcon 
                    icon={Music2} 
                    colorClass="text-zinc-900" 
                    positionClass="bottom-[20%] right-[8%] lg:right-[12%]" 
                    delay="1.5s" 
                 />
            </div>

            {/* Modals */}
            <SignInPrompt isOpen={showSignInPrompt} onClose={() => setShowSignInPrompt(false)} onSignIn={handleSignIn} />
            <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} platform={modalPlatform} />

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-zinc-200 shadow-sm mb-8 animate-fade-in-up backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Reelspot v2.0</span>
                </div>

                {/* Main Logo Text - Massive & Premium */}
                <h1 className="font-[900] text-5xl xs:text-6xl sm:text-8xl md:text-9xl tracking-tighter text-zinc-900 mb-6 animate-slide-down drop-shadow-sm">
                    Reelspot
                </h1>

                {/* Tagline - Exact Text */}
                <p className="text-xl sm:text-3xl text-zinc-500 font-medium mb-16 animate-fade-in tracking-tight max-w-2xl leading-relaxed">
                    Download Media, <span className="text-black font-bold">Effortlessly</span>
                </p>

                {/* Form Container - Premium Glow */}
                <div className="w-full max-w-2xl animate-fade-in mb-20 relative group" style={{ animationDelay: '0.2s' }}>
                    
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    
                    <div className="relative">
                        <DownloadForm 
                            onApiKeyRequired={handleApiKeyRequired}
                            onSignInRequired={handleSignInRequired}
                            user={user}
                            initialUrl={pendingUrl}
                        />
                    </div>
                </div>

                {/* Supports Section - Glass Pills */}
                <div className="flex flex-col items-center gap-4 mb-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Supports</span>
                    <div className="flex items-center gap-3 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 shadow-sm">
                        {[
                            { icon: Instagram, bg: 'text-pink-600 bg-pink-50' },
                            { icon: Youtube, bg: 'text-red-600 bg-red-50' },
                            { icon: Facebook, bg: 'text-blue-600 bg-blue-50' },
                            { icon: Music2, bg: 'text-zinc-900 bg-zinc-100' },
                        ].map(({ icon: Icon, bg }, i) => (
                            <div key={i} className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center transition-transform hover:scale-110 cursor-default`}>
                                <Icon size={20} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Trust Indicators - Refined */}
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    {[
                        { icon: Shield, text: 'Secure & Private' },
                        { icon: Zap, text: 'Lightning Fast' },
                        { icon: Download, text: 'No Watermarks' },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-500 group">
                            <div className="p-1.5 bg-zinc-100 rounded-full text-zinc-900 group-hover:bg-zinc-200 transition-colors">
                                <Icon size={16} />
                            </div>
                            <span className="text-sm font-semibold">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
