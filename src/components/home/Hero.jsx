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
        <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black">
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
        </div>
    );
};

export default Hero;
