import React from 'react';
import { CheckCircle2, XCircle, RefreshCw, X, FileText, ArrowRight, Download, Loader2, Share2, Copy } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'react-hot-toast';

const DownloadProgress = ({ 
    status = 'downloading', // downloading, processing, success, error
    statusMessage = '',
    progress = 0, 
    speed = '0 MB/s', 
    timeRemaining = '--', 
    fileSize = '0 MB', 
    fileName = 'media_file.mp4',
    error = null,
    onCancel,
    onRetry,
    onDownloadAnother,
    onViewHistory
}) => {
    
    // Status Config
    const isSuccess = status === 'success';
    const isError = status === 'error';
    const isProcessing = status === 'processing';
    const isDownloading = status === 'downloading';

    const handleCopyLink = () => {
        // In a real app we might copy a shareable link
        toast.success("Link copied!");
    };

    // Dynamic styling based on state
    const borderColor = isSuccess ? 'border-green-100' : isError ? 'border-red-100' : 'border-zinc-100';
    const shadowColor = isSuccess ? 'shadow-green-100' : isError ? 'shadow-red-100' : 'shadow-zinc-200/50';

    return (
        <div className={clsx(
            "w-full max-w-[700px] bg-white rounded-[2rem] p-8 border shadow-2xl transition-all duration-500 animate-slide-up",
            borderColor, shadowColor
        )}>
            
            {/* 1. Status Header */}
            <div className="flex items-center gap-5 mb-8">
                <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                    isSuccess ? "bg-green-50 text-green-600 scale-110" :
                    isError ? "bg-red-50 text-red-600 scale-110" :
                    "bg-black text-white"
                )}>
                    {isSuccess ? <CheckCircle2 size={28} className="animate-scale-pulse" /> :
                     isError ? <XCircle size={28} className="animate-shake" /> :
                     isProcessing ? <Loader2 size={28} className="animate-spin" /> :
                     <Download size={28} className={clsx(isDownloading && "animate-bounce")} />}
                </div>
                
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                        {isSuccess ? 'Download Complete!' :
                         isError ? 'Download Failed' :
                         isProcessing ? 'Processing Media...' :
                         'Downloading Media...'}
                    </h3>
                    <p className="text-zinc-500 font-medium truncate pr-2 mt-0.5">
                        {isSuccess ? 'Your file has been saved successfully.' :
                         isError ? (error || 'Something went wrong') :
                         statusMessage || fileName}
                    </p>
                </div>
            </div>

            {/* 2. Progress Bar (Animated) */}
            <div className="relative w-full h-4 bg-zinc-100 rounded-full overflow-hidden mb-5">
                <div 
                    className={clsx(
                        "absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full",
                        isSuccess ? "bg-green-500" :
                        isError ? "bg-red-500" :
                        "bg-black"
                    )}
                    style={{ width: `${Math.max(2, progress)}%` }}
                >
                    {(isDownloading || isProcessing) && (
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" />
                    )}
                </div>
            </div>

            {/* 3. Detailed Metrics */}
            <div className="flex justify-between items-center mb-8 px-1">
                <span className="text-xl font-bold text-zinc-900 tabular-nums">
                    {progress}%
                </span>
                
                {!isError && !isSuccess && (
                     <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                        <span className="tabular-nums">{speed}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className="tabular-nums">{timeRemaining} left</span>
                     </div>
                )}
            </div>

            {/* 4. Stats Grid (Success/Downloading) */}
            {!isError && (
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-zinc-50/80 rounded-2xl p-4 text-center border border-zinc-100/50">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">File Size</p>
                        <p className="text-sm font-bold text-zinc-900">{fileSize}</p>
                    </div>
                    <div className="bg-zinc-50/80 rounded-2xl p-4 text-center border border-zinc-100/50">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">Format</p>
                        <p className="text-sm font-bold text-zinc-900 uppercase">{fileName.split('.').pop()}</p>
                    </div>
                    <div className="bg-zinc-50/80 rounded-2xl p-4 text-center border border-zinc-100/50">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">
                            {isSuccess ? 'Saved to' : 'ETA'}
                        </p>
                        <p className="text-sm font-bold text-zinc-900">
                            {isSuccess ? 'Downloads' : timeRemaining}
                        </p>
                    </div>
                </div>
            )}

            {/* 5. Error Box */}
            {isError && (
                <div className="mb-8 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-700 text-sm font-medium flex items-start gap-3">
                    <XCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <p>{error || "We couldn't verify the download source. Please try again."}</p>
                </div>
            )}

            {/* 6. High-Contrast Actions */}
            <div className="flex gap-4">
                {isDownloading || isProcessing ? (
                     <button 
                        onClick={onCancel}
                        className="w-full py-4 rounded-xl border-2 border-zinc-100 font-bold text-zinc-600 hover:bg-zinc-50 hover:text-black hover:border-zinc-200 transition-all active:scale-[0.98]"
                     >
                        Cancel
                     </button>
                ) : isError ? (
                    <>
                        <button 
                            onClick={onCancel}
                            className="flex-1 py-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                        >
                            Dismiss
                        </button>
                        <button 
                            onClick={onRetry}
                            className="flex-1 py-4 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Try Again
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col gap-3 w-full">
                         <div className="flex gap-3">
                            <button 
                                onClick={onViewHistory}
                                className="flex-1 py-4 rounded-xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
                            >
                                <FileText size={18} />
                                History
                            </button>
                            <button 
                                onClick={handleCopyLink}
                                className="px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
                                title="Copy Link"
                            >
                                <Copy size={18} />
                            </button>
                         </div>
                        <button 
                            onClick={onDownloadAnother}
                            className="w-full py-4 rounded-xl bg-black text-white font-bold hover:bg-zinc-900 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-green-900/10 flex items-center justify-center gap-2"
                        >
                            Download Another File
                            <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default DownloadProgress;
