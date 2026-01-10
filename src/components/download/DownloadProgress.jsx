import React, { useEffect, useState } from 'react';
import { X, Check, AlertTriangle, RefreshCw, FileDown } from 'lucide-react';
import { clsx } from 'clsx';

const DownloadProgress = ({ isOpen, status, progress, onClose, onRetry, fileName }) => {
    // status: 'initializing' | 'downloading' | 'processing' | 'success' | 'error'
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    const isSuccess = status === 'success';
    const isError = status === 'error';
    const isProcessing = status === 'processing';

    return (
        <div className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
             {/* Backdrop */}
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={!isProcessing ? onClose : undefined} />

             {/* Card */}
             <div className={clsx(
                 "relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 overflow-hidden",
                 isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
             )}>
                 
                 {/* Success Bloom Effect */}
                 {isSuccess && (
                     <div className="absolute inset-0 bg-green-50/50 animate-fade-in pointer-events-none" />
                 )}

                 {/* Header */}
                 <div className="relative flex flex-col items-center text-center mb-8">
                     {/* Icon Container */}
                     <div className={clsx(
                         "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-500",
                         isSuccess ? "bg-green-100 text-green-600" :
                         isError ? "bg-red-100 text-red-600" :
                         "bg-zinc-100 text-zinc-900"
                     )}>
                         {isSuccess ? <Check size={32} className="animate-in zoom-in spin-in-180 duration-500" /> :
                          isError ? <AlertTriangle size={32} className="animate-in shake" /> :
                          <FileDown size={32} className={clsx("transition-transform", status === 'downloading' && "animate-bounce")} />}
                     </div>

                     <h3 className="font-bold text-2xl text-zinc-900">
                         {isSuccess ? "Download Complete!" :
                          isError ? "Download Failed" :
                          isProcessing ? "Finalizing..." :
                          "Downloading Media..."}
                     </h3>
                     <p className="text-zinc-500 text-sm mt-1 max-w-[250px] truncate">
                         {fileName || "Preparing file..."}
                     </p>
                 </div>

                 {/* Progress Bar (Hidden on Success/Error mainly, or keep showing 100%?) */}
                 {!isSuccess && !isError && (
                     <div className="mb-8">
                         <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                             <span>Progress</span>
                             <span>{progress.percentage}%</span>
                         </div>
                         <div className="h-4 bg-zinc-100 rounded-full overflow-hidden relative">
                             {/* Shimmer */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                             
                             {/* Fill */}
                             <div 
                                className="h-full bg-black rounded-full transition-all duration-300 ease-out relative"
                                style={{ width: `${progress.percentage}%` }}
                             />
                         </div>
                         <div className="flex justify-between text-xs font-medium text-zinc-500 mt-2">
                             <span>{(progress.loaded / (1024*1024)).toFixed(1)} MB downloaded</span>
                             <span>{progress.speed}</span>
                         </div>
                     </div>
                 )}

                 {/* Actions */}
                 <div className="flex gap-3 relative z-10">
                     {isSuccess ? (
                         <button 
                            onClick={onClose}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                         >
                             Download Another
                         </button>
                     ) : isError ? (
                         <>
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 border border-zinc-200 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onRetry}
                                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={18} /> Retry
                            </button>
                         </>
                     ) : (
                         <button 
                            onClick={onClose}
                            className="w-full py-3 text-zinc-400 hover:text-zinc-600 font-medium transition-colors"
                         >
                             Cancel Download
                         </button>
                     )}
                 </div>
             </div>
        </div>
    );
};

export default DownloadProgress;
