import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Chrome, Sparkles, Download, Shield, Zap, X } from 'lucide-react';

const features = [
    { icon: Download, text: 'Download from Instagram, YouTube & more' },
    { icon: Shield, text: 'Your data is private and secure' },
    { icon: Zap, text: 'Lightning-fast downloads' },
];

const AuthGate = ({ children }) => {
    const { user, loading } = useAuth();
    const [showModal, setShowModal] = useState(false);

    // Show modal for unauthenticated users after a short delay
    useEffect(() => {
        if (!loading && !user) {
            // Small delay so the page loads first
            const timer = setTimeout(() => setShowModal(true), 800);
            return () => clearTimeout(timer);
        }
    }, [user, loading]);

    const { signInWithGoogle } = useAuth();

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* Always render the main content */}
            {children}

            {/* Sign-in prompt modal for unauthenticated users */}
            {showModal && !user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop with blur */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                        onClick={handleClose}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        
                        {/* Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900 z-10"
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="px-8 pt-8 pb-6 text-center border-b border-zinc-100">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-4">
                                <Sparkles size={14} className="text-amber-500" />
                                <span className="text-xs font-bold text-zinc-600">WELCOME TO</span>
                            </div>
                            <h1 className="text-4xl font-[900] tracking-tight text-zinc-900 mb-2">
                                Reelspot
                            </h1>
                            <p className="text-zinc-500 font-medium">
                                Sign in to unlock all features
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            {/* Features */}
                            <div className="space-y-3">
                                {features.map(({ icon: Icon, text }, i) => (
                                    <div 
                                        key={i}
                                        className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl text-left"
                                    >
                                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Sign In Button */}
                            <button
                                onClick={signInWithGoogle}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/20 group"
                            >
                                <Chrome size={24} className="group-hover:rotate-12 transition-transform" />
                                Continue with Google
                            </button>

                            {/* Skip for now */}
                            <button
                                onClick={handleClose}
                                className="w-full text-center text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
                            >
                                Maybe later, let me explore first
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthGate;

