import React from 'react';

const LoadingScreen = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white animate-fade-in">
            <div className="relative mb-8">
                <div className="bg-white p-1 rounded-3xl shadow-2xl border border-zinc-100 animate-pulse">
                     <img src="/logo.png" alt="Reelspot" className="w-16 h-16 rounded-2xl" />
                </div>
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-black/20 blur-xl rounded-full animate-pulse-slow -z-10"></div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                </div>
                <p className="text-zinc-500 font-medium text-sm tracking-widest uppercase opacity-80 animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
