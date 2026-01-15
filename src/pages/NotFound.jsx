import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-zinc-100 rounded-full scale-150 animate-pulse" />
                <Ghost size={80} className="relative text-zinc-900 animate-bounce" />
            </div>
            
            <h1 className="text-6xl font-[900] tracking-tighter text-zinc-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-zinc-600 mb-8">Page Not Found</h2>
            
            <p className="max-w-md text-zinc-500 mb-12 leading-relaxed">
                The page you are looking for might have been removed, had its name changed, 
                or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold shadow-xl shadow-black/20 hover:scale-[1.02] transition-all active:scale-95"
                >
                    <Home size={20} />
                    Back to Home
                </button>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-bold hover:bg-zinc-200 transition-all active:scale-95"
                >
                    <ArrowLeft size={20} />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
