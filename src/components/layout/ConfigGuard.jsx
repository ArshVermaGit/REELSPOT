import React from 'react';
import { AlertTriangle, Terminal, Settings } from 'lucide-react';

const ConfigGuard = ({ children, isConfigured }) => {
    if (isConfigured) return children;

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-10 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100/50">
                    <AlertTriangle size={40} className="text-amber-500" />
                </div>
                
                <h1 className="text-2xl font-[900] tracking-tight text-zinc-900 mb-4 px-4">
                    Backend Connection Required
                </h1>
                
                <p className="text-zinc-500 leading-relaxed mb-8">
                    To enable downloading, authentication, and database features, you need to configure your Supabase environment variables.
                </p>

                <div className="bg-zinc-900 rounded-2xl p-6 text-left mb-8 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Terminal size={16} className="text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Setup Instructions</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex items-start gap-3">
                            <span className="text-zinc-600">1.</span>
                            <span className="text-zinc-300">Open <code className="text-amber-400">.env</code> file</span>
                        </div>
                        <div className="flex items-start gap-3 text-zinc-400">
                            <span className="text-zinc-600">2.</span>
                            <span>Add your <code className="text-zinc-300 italic underline">SUPABASE URL</code> and <code className="text-zinc-300 italic underline">ANON KEY</code></span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-zinc-600">3.</span>
                            <span className="text-zinc-300">Restart the server</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-black text-white rounded-2xl py-4 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
                    >
                        I've configured it, Reload
                    </button>
                    <p className="text-xs text-zinc-400 font-medium">
                        Need help? See the <span className="underline cursor-help">documentation</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConfigGuard;
