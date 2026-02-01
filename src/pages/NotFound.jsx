import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, AlertCircle } from 'lucide-react';
import SEO from '../components/shared/SEO';

const NotFound = () => {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center bg-white relative">
            <SEO 
                title="Page Not Found" 
                description="We couldn't find the page you're looking for on Reelspot. Return to our homepage to use our social media media downloader."
            />
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow [animation-delay:2s]" />

            <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-black/5 rounded-full scale-150 blur-2xl group-hover:bg-black/10 transition-colors duration-500" />
                <div className="relative w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-zinc-100 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Ghost size={64} strokeWidth={1.5} className="text-zinc-900 animate-float" />
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-zinc-900 rounded-full border-4 border-white shadow-lg animate-bounce" />
            </div>
            
            <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 text-zinc-500 rounded-full text-xs font-bold tracking-widest uppercase">
                    Error 404
                </div>
                <h1 className="text-5xl md:text-6xl font-[900] tracking-tight text-zinc-900">
                    Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-400">Void</span>
                </h1>
                <p className="text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
                    The content you&apos;re looking for has vanished into digital dust. It might have been moved or never existed at all.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-sm">
                <Link to="/" className="flex-1">
                    <button className="w-full px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                        <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                        Go Home
                    </button>
                </Link>
                <a href="https://github.com/ArshVermaGit/REELSPOT/issues" target="_blank" rel="noreferrer" className="flex-1">
                    <button className="w-full px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 hover:border-zinc-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <AlertCircle size={18} />
                        Report
                    </button>
                </a>
            </div>
        </div>
    );
};

export default NotFound;
