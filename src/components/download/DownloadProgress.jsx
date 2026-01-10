import React from 'react';
import { CheckCircle2, XCircle, RefreshCw, X, FileText, ArrowRight, Download, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const DownloadProgress = ({ 
    status = 'downloading', // downloading, processing, success, error
    statusMessage = '',
    progress = 0, 
    speed = '0 MB/s', 
    timeRemaining = 'Calculating...', 
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

    // Default status messages
    const getStatusTitle = () => {
        if (isSuccess) return 'Download Complete!';
        if (isError) return 'Download Failed';
        if (isProcessing) return 'Processing Media...';
        return 'Downloading Media...';
    };

    const getStatusDescription = () => {
        if (isSuccess) return 'Your file is ready.';
        if (isError) return error || 'Something went wrong';
        if (statusMessage) return statusMessage;
        return fileName;
    };

    return (
        <div className="w-full max-w-[700px] bg-white rounded-3xl p-8 border border-zinc-100 shadow-2xl shadow-zinc-200/50 animate-slide-down">
            
            {/* 1. Header & Icon */}
            <div className="flex items-center gap-4 mb-6">
                <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                    isSuccess ? "bg-green-100 text-green-600" :
                    isError ? "bg-red-100 text-red-600" :
                    "bg-black text-white"
                )}>
                    {isSuccess ? <CheckCircle2 size={24} /> :
                     isError ? <XCircle size={24} /> :
                     isProcessing ? <Loader2 size={24} className="animate-spin" /> :
                     <Download size={24} className={clsx(isDownloading && "animate-pulse")} />}
                </div>
                
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-900">
                        {getStatusTitle()}
                    </h3>
                    <p className="text-sm text-zinc-500 font-medium">
                        {getStatusDescription()}
                    </p>
                </div>
            </div>

            {/* 2. Progress Bar */}
            <div className="relative w-full h-3 bg-zinc-100 rounded-full overflow-hidden mb-4">
                <div 
                    className={clsx(
                        "absolute inset-y-0 left-0 transition-all duration-300 rounded-full",
                        isSuccess ? "bg-green-500" :
                        isError ? "bg-red-500" :
                        "bg-black"
                    )}
                    style={{ width: `${Math.max(5, progress)}%` }}
                >
                    {(isDownloading || isProcessing) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                </div>
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-semibold text-zinc-700">{progress}%</span>
                {!isError && !isSuccess && (
                    <span className="text-xs text-zinc-500">{speed}</span>
                )}
            </div>

            {/* 3. Metrics (Hidden on Error) */}
            {!isError && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* Size */}
                    <div className="bg-zinc-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">Size</p>
                        <p className="text-sm font-bold text-zinc-900">{fileSize}</p>
                    </div>
                    {/* Speed / Success Status */}
                    <div className="bg-zinc-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                            {isSuccess ? 'Status' : 'Speed'}
                        </p>
                        <p className="text-sm font-bold text-zinc-900">
                            {isSuccess ? 'Saved' : speed}
                        </p>
                    </div>
                    {/* Time / Percentage */}
                    <div className="bg-zinc-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                            {isSuccess ? 'Quality' : 'ETA'}
                        </p>
                        <p className="text-sm font-bold text-zinc-900">
                            {isSuccess ? '100% Verified' : timeRemaining}
                        </p>
                    </div>
                </div>
            )}

            {/* Error Details */}
            {isError && error && (
                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* 4. Actions */}
            <div className="flex gap-3">
                {isDownloading || isProcessing ? (
                     <button 
                        onClick={onCancel}
                        className="w-full py-3.5 rounded-xl border-2 border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-200 transition-all flex items-center justify-center gap-2"
                     >
                        <X size={18} />
                        Cancel Download
                     </button>
                ) : isError ? (
                    <>
                        <button 
                            onClick={onCancel}
                            className="flex-1 py-3.5 rounded-xl border-2 border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-50 transition-all"
                        >
                            Dismiss
                        </button>
                        <button 
                            onClick={onRetry}
                            className="flex-1 py-3.5 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Try Again
                        </button>
                    </>
                ) : (
                    <>
                         <button 
                            onClick={onViewHistory}
                            className="flex-1 py-3.5 rounded-xl border-2 border-zinc-100 font-bold text-zinc-700 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                        >
                            <FileText size={18} />
                            View History
                        </button>
                        <button 
                            onClick={onDownloadAnother}
                            className="flex-1 py-3.5 rounded-xl bg-black text-white font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Download Another
                            <ArrowRight size={18} />
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default DownloadProgress;
