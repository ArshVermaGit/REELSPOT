import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApiKeys } from '../../contexts/ApiKeyContext';
import FloatingIcons from './FloatingIcons';
import ApiKeyModal from '../modals/ApiKeyModal';
import SignInPrompt from '../modals/SignInPrompt';
import DownloadForm from '../download/DownloadForm';
import { toast } from 'react-hot-toast';

const Hero = () => {
    const { hasApiKey, getApiKey } = useApiKeys();
    const { user, signInWithGoogle } = useAuth();
    
    // Modal State
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [modalPlatform, setModalPlatform] = useState(null);
    
    // Sign In Prompt State
    const [showSignInPrompt, setShowSignInPrompt] = useState(false);
    const [pendingUrl, setPendingUrl] = useState(null);

    // Handler for sign-in requirement
    const handleSignInRequired = (url) => {
        setPendingUrl(url); // Remember the URL user tried to download
        setShowSignInPrompt(true);
    };

    // Handler for API key requirement
    const handleApiKeyRequired = (platform) => {
        setModalPlatform(platform);
        setIsApiKeyModalOpen(true);
    };

    // Handle sign in from prompt
    const handleSignIn = async () => {
        setShowSignInPrompt(false);
        try {
            await signInWithGoogle();
        } catch (error) {
            toast.error('Sign in failed. Please try again.');
        }
    };
    
    return (
        <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black selection:bg-black selection:text-white">
            {/* Background Elements */}
            <FloatingIcons />

            {/* Sign In Prompt Modal */}
            <SignInPrompt 
                isOpen={showSignInPrompt}
                onClose={() => setShowSignInPrompt(false)}
                onSignIn={handleSignIn}
            />

            {/* API Key Modal */}
            <ApiKeyModal 
                isOpen={isApiKeyModalOpen} 
                onClose={() => setIsApiKeyModalOpen(false)} 
                platform={modalPlatform} 
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Animated Logo */}
                <h1
                    className="text-[48px] md:text-[72px] font-[800] tracking-[-2px] mb-6 leading-tight animate-slide-down drop-shadow-sm"
                    style={{ animationDelay: '0s' }}
                >
                    Reelspot
                </h1>

                {/* Tagline */}
                <p
                    className="text-[18px] md:text-[24px] font-medium mb-12 animate-fade-in opacity-0 text-transparent bg-clip-text bg-gradient-to-br from-black to-[#4A4A4A] hover:[&>span]:inline-block hover:[&>span]:scale-110 hover:[&>span]:transition-transform"
                    style={{ animationDelay: '0.3s' }}
                >
                    <span>D</span><span>o</span><span>w</span><span>n</span><span>l</span><span>o</span><span>a</span><span>d</span> <span>M</span><span>e</span><span>d</span><span>i</span><span>a</span><span>,</span> <span>E</span><span>f</span><span>f</span><span>o</span><span>r</span><span>t</span><span>l</span><span>e</span><span>s</span><span>s</span><span>l</span><span>y</span>
                </p>

                {/* Input Form Wrapper */}
                <div 
                    className="w-full flex justify-center animate-fade-in opacity-0"
                    style={{ animationDelay: '0.4s' }}
                >
                    <DownloadForm 
                        onApiKeyRequired={handleApiKeyRequired}
                        onSignInRequired={handleSignInRequired}
                        user={user}
                        initialUrl={pendingUrl}
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;
