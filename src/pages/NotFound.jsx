import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-zinc-100 rounded-full scale-150 animate-pulse" />
                <Ghost size={80} className="relative text-zinc-900 animate-bounce" />
            </div>
            
            <h1 className="text-6xl font-[900] tracking-tighter text-zinc-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-zinc-600 mb-8">Page Not Found</h2>
            
            <p className="max-w-md text-zinc-500 mb-12 leading-relaxed">
                The page you are looking for might have be removed, had its name changed, 
                or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Link to="/" className="w-full sm:w-auto">
                    <div className="px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center">
                        Go Home
                    </div>
                </Link>
                <a href="https://github.com/arshverma/REELSPOT/issues" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <div className="px-8 py-3 bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center">
                        Report Issue
                    </div>
                </a>
            </div>
        </div>
    );
};

export default NotFound;
