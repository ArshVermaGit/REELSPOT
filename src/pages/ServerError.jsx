import React from 'react';
import { AlertTriangle, Home, MessageSquare, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';

const ServerError = () => {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center bg-white relative">
            <SEO 
                title="Internal Server Error" 
                description="Reelspot is currently experiencing technical difficulties. Our team is working on a fix to restore our social media media downloader services."
            />
            {/* Warning Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[100px] -z-10" />

            <div className="relative mb-12">
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl shadow-red-500/10 border border-red-100 flex items-center justify-center">
                    <AlertTriangle size={56} strokeWidth={1.5} className="text-red-500 animate-bounce" />
                </div>
                {/* Hardware bits icons floating */}
                <div className="absolute -bottom-2 -right-2 p-2 bg-zinc-900 text-white rounded-xl shadow-lg animate-float">
                    <RefreshCcw size={20} />
                </div>
            </div>
            
            <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold tracking-widest uppercase">
                    System Error 500
                </div>
                <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                    Our circuits <span className="text-red-500">shorted out</span>.
                </h1>
                <p className="text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
                    Something went wrong on our end. Our engineering team has been alerted and is already working on a fix.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-sm">
                <Link to="/" className="flex-1">
                    <button className="w-full px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                        <Home size={18} />
                        Back Home
                    </button>
                </Link>
                <a href="https://github.com/ArshVermaGit/REELSPOT/issues" target="_blank" rel="noreferrer" className="flex-1">
                    <button className="w-full px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                        <MessageSquare size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        Get Help
                    </button>
                </a>
            </div>

            <p className="mt-12 text-sm text-zinc-400 font-medium animate-pulse">
                Trying to recover connection...
            </p>
        </div>
    );
};

export default ServerError;
