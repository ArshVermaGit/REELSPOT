import React from 'react';
import { X, Lock, Shield, Zap } from 'lucide-react';

// Inline Google Icon
const GIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.52 12.29C23.52 11.43 23.47 10.73 23.32 10.13H12V14.51H18.47C18.18 15.99 17.25 17.24 15.94 18.04V20.97H19.81C22.07 18.89 23.52 15.82 23.52 12.29Z" fill="#4285F4"/>
        <path d="M12 24C15.24 24 17.96 22.92 19.81 20.97L15.94 18.04C14.86 18.75 13.51 19.14 12 19.14C8.87 19.14 6.22 17.06 5.27 14.29H1.26V17.38C3.17 21.19 7.11 24 12 24Z" fill="#34A853"/>
        <path d="M5.27 14.29C5.02 13.56 4.89 12.79 4.89 12C4.89 11.21 5.03 10.44 5.27 9.7V6.62H1.26C0.46 8.23 0 10.06 0 12C0 13.94 0.46 15.77 1.25 17.38L5.27 14.29Z" fill="#FBBC05"/>
        <path d="M12 4.86C13.77 4.86 15.35 5.47 16.6 6.66L20.12 3.12C17.96 1.1 15.24 0 12 0C7.11 0 3.17 2.81 1.26 6.62L5.27 9.7C6.22 6.93 8.87 4.86 12 4.86Z" fill="#EA4335"/>
    </svg>
);

const SignInPrompt = ({ isOpen, onClose, onSignIn }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Gradient */}
                <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                >
                    <X size={20} />
                </button>

                <div className="p-6 md:p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                        <Lock size={28} className="text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                        Sign in to Download
                    </h2>
                    <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
                        Create a free account to download media, track your history, and manage your API keys.
                    </p>

                    {/* Sign In Button */}
                    <button 
                        onClick={onSignIn}
                        className="w-full py-4 bg-white border-2 border-zinc-200 rounded-2xl font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-3 shadow-sm mb-6"
                    >
                        <GIcon /> Continue with Google
                    </button>

                    {/* Benefits */}
                    <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Shield size={16} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">Secure & Private</p>
                                <p className="text-xs text-zinc-500">Your data is encrypted and never shared</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Zap size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">Unlimited Downloads</p>
                                <p className="text-xs text-zinc-500">No daily limits on your account</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-zinc-400 mt-6">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPrompt;
