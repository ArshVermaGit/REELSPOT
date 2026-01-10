import React from 'react';
import { Film } from 'lucide-react';

const LoadingScreen = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="relative mb-4">
                <Film size={48} className="text-black animate-pulse" />
                <div className="absolute inset-0 bg-black/10 rounded-full animate-ping opacity-20"></div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-500 font-medium text-sm tracking-wide animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
