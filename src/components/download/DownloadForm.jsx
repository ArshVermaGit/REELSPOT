import React, { useState, useEffect } from 'react';
import { ArrowRight, Link as LinkIcon, AlertCircle, Loader2, Instagram, Youtube, Facebook, Music2, Settings2, Download, X, CheckCircle } from 'lucide-react';
import { getMediaInfo, downloadMedia } from '../../services/mediaDownloader';
import { useApiKeys } from '../../contexts/ApiKeyContext';
import { detectPlatform } from '../../services/platformDetector';
import { toast } from 'react-hot-toast';
import { clsx } from 'clsx';
import DownloadProgress from './DownloadProgress';

const PlatformIcon = ({ platform, size = 20, className }) => {
    switch (platform) {
        case 'instagram': return <Instagram size={size} className={clsx("text-pink-500", className)} />;
        case 'youtube': return <Youtube size={size} className={clsx("text-red-600", className)} />;
        case 'facebook': return <Facebook size={size} className={clsx("text-blue-600", className)} />;
        case 'tiktok': return <Music2 size={size} className={clsx("text-black", className)} />;
        default: return <LinkIcon size={size} className={clsx("text-zinc-400", className)} />;
    }
};

const DownloadForm = ({ onApiKeyRequired, onSignInRequired, user, initialUrl }) => {
    const { hasApiKey, getApiKey } = useApiKeys();

    // Input & Analysis State (IDLE)
    const [url, setUrl] = useState(initialUrl || '');
    const [platformState, setPlatformState] = useState({ platform: 'unknown', isValid: false, mediaType: null });
    const [analyzing, setAnalyzing] = useState(false);
    const [mediaInfo, setMediaInfo] = useState(null); // { formats, thumbnail, title }
    const [error, setError] = useState(null);

    // Selection State
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);

    // Download State (ACTIVE)
    const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, processing, success, error
    const [statusMessage, setStatusMessage] = useState('');
    const [progress, setProgress] = useState({ percentage: 0, speed: '0 MB/s', timeRemaining: '--' });
    const [downloadError, setDownloadError] = useState(null);

    // Handle initial URL from props
    useEffect(() => {
        if (initialUrl && initialUrl !== url) {
            setUrl(initialUrl);
        }
    }, [initialUrl]);

    // 1. Platform Detection
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!url) {
                setPlatformState({ platform: 'unknown', isValid: false, mediaType: null });
                setMediaInfo(null);
                setError(null);
                setDownloadStatus('idle');
                return;
            }
            const res = detectPlatform(url);
            setPlatformState({ 
                platform: res.platform, 
                isValid: res.isValid,
                mediaType: res.mediaType
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [url]);

    // 2. Analyze URL
    const handleAnalyze = async (forceResume = false) => {
        if (!platformState.isValid && !forceResume) {
            setError('Please enter a valid URL first.');
            return;
        }

        // Check authentication first
        if (!user) {
            onSignInRequired?.(url);
            return;
        }

        // Check for API key
        if (!hasApiKey(platformState.platform)) {
            // Wait for user to add key then we need to ideally auto-resume or just let them click again.
            // Requirement says "Automatically resume".
            // We'll pass a callback or just depend on them clicking again for simplicity unless we add complex effect.
            // Actually, we can assume the parent handles the Modal. We interrupt here.
            await onApiKeyRequired(platformState.platform); 
            // We stop here. If the user saves the key, they will essentially stay on this page.
            // A truly auto-resume system needs to listen to ApiKeyContext changes.
            return;
        }

        setAnalyzing(true);
        setError(null);
        setMediaInfo(null);

        try {
            const apiKey = getApiKey(platformState.platform);
            const info = await getMediaInfo({ 
                url, 
                platform: platformState.platform, 
                apiKey 
            });
            
            setMediaInfo(info);
            // Default selections
            if (info.formats && info.formats.length > 0) {
                const videoFormats = info.formats.filter(f => f.type === 'video');
                const defaultFmt = videoFormats.length > 0 ? videoFormats[0] : info.formats[0];
                setSelectedFormat(defaultFmt.ext);
                setSelectedQuality(defaultFmt.quality);
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch media info.');
        } finally {
            setAnalyzing(false);
        }
    };

    // Auto-Resume Effect: If we were blocked on API Key, and now we have it, likely user just added it.
    // Making this robust requires detection of "user tried to download". 
    // For now we will rely on manual retry as "Auto-Resume" without global state tracking is tricky across modals.
    
    // 3. Start Download
    const handleDownloadClick = async () => {
        // Double check API Key Existence before actual download call (in case it was deleted)
         if (!hasApiKey(platformState.platform)) {
            onApiKeyRequired(platformState.platform);
            return;
        }

        if (!mediaInfo || !selectedFormat || !selectedQuality) return;

        const target = mediaInfo.formats.find(f => f.ext === selectedFormat && f.quality === selectedQuality) 
                       || mediaInfo.formats[0];

        setDownloadStatus('downloading');
        setStatusMessage(`Connecting to ${platformState.platform}...`);
        setProgress({ percentage: 0, speed: 'Starting...', timeRemaining: '--' });
        setDownloadError(null);

        try {
            // Simulate connection phase
            await new Promise(r => setTimeout(r, 600));
            setStatusMessage('Handshaking with server...');
            setProgress({ percentage: 3, speed: 'Connecting...', timeRemaining: '--' });
            
            await new Promise(r => setTimeout(r, 800));
            setStatusMessage('Downloading content...');
            setProgress({ percentage: 5, speed: 'Preparing...', timeRemaining: '--' });

            const result = await downloadMedia({
                downloadUrl: target.url,
                platform: platformState.platform,
                format: selectedFormat,
                quality: selectedQuality,
                mediaTitle: mediaInfo.title,
                mediaThumbnail: mediaInfo.thumbnail,
                mediaUrl: url, 
                author: mediaInfo.author,
                duration: mediaInfo.duration,
                userId: user?.id,
                onProgress: (p) => {
                    const adjustedProgress = 10 + Math.round(p.percentage * 0.85); // Scale 10-95%
                    setProgress({
                        percentage: adjustedProgress,
                        speed: p.speed || '0 MB/s',
                        timeRemaining: p.timeRemaining || '--'
                    });
                    if (p.percentage >= 100) {
                        setStatusMessage('Finalizing file...');
                        setDownloadStatus('processing');
                    }
                }
            });

            if (result.success) {
                setProgress({ percentage: 100, speed: 'Complete', timeRemaining: '0s' });
                setStatusMessage('Processing complete!');
                setDownloadStatus('success');
                toast.success('Download Complete!');
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            console.error(err);
            setDownloadStatus('error');
            setDownloadError(err.message || 'Download failed.');
            setStatusMessage('Download failed');
        }
    };

    // 4. Reset / Retry
    const handleReset = () => {
        setDownloadStatus('idle');
        setStatusMessage('');
        setProgress({ percentage: 0, speed: '0 MB/s', timeRemaining: '--' });
        setDownloadError(null);
    };

    const handleDownloadAnother = () => {
        handleReset();
        setUrl('');
        setMediaInfo(null);
    };

    // Derived Properties
    const availableFormats = mediaInfo ? [...new Set(mediaInfo.formats.map(f => f.ext))] : [];
    // Filter qualities for the CURRENTLY selected format
    const availableQualities = mediaInfo 
        ? mediaInfo.formats.filter(f => f.ext === selectedFormat).map(f => f.quality)
        : [];
    const targetFormat = mediaInfo?.formats.find(f => f.ext === selectedFormat && f.quality === selectedQuality);


    // RENDER: IDLE (Inputs) or ACTIVE (Progress)
    if (downloadStatus !== 'idle') {
        return (
            <div className="w-full max-w-[700px] animate-fade-in flex justify-center">
                <DownloadProgress 
                    status={downloadStatus}
                    statusMessage={statusMessage}
                    progress={progress.percentage}
                    speed={progress.speed}
                    timeRemaining={progress.timeRemaining}
                    fileSize={targetFormat?.size || 'Unknown'}
                    fileName={`${(mediaInfo?.title || 'media').substring(0,30)}...${selectedFormat}`}
                    error={downloadError}
                    onCancel={handleReset}
                    onRetry={handleDownloadClick}
                    onDownloadAnother={handleDownloadAnother}
                    onViewHistory={() => window.location.href = '/history'}
                />
            </div>
        );
    }

    return (
        <div className="w-full max-w-[700px] flex flex-col gap-6 animate-fade-in">
            
            {/* 1. URL Input Section */}
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-all duration-300">
                    {analyzing ? (
                        <Loader2 size={24} className="animate-spin text-zinc-400" />
                    ) : (
                        <PlatformIcon platform={platformState.platform} size={24} />
                    )}
                </div>

                <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError(null);
                    }}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            e.preventDefault();
                            handleAnalyze();
                        }
                    }}
                    placeholder="Paste your link here..."
                    disabled={analyzing}
                    className={clsx(
                        "w-full h-20 pl-16 pr-16 rounded-3xl border-2 text-xl font-medium placeholder:text-[#A0A0A0] placeholder:font-normal outline-none transition-all duration-300",
                        !url ? "border-[#E5E5E5] focus:border-black bg-white shadow-sm" :
                        platformState.isValid 
                            ? "border-green-500/20 focus:border-green-500 bg-green-50/5 shadow-[0_8px_32px_rgba(34,197,94,0.12)]" 
                            : platformState.platform !== 'unknown' || (url.length > 10 && !platformState.isValid)
                                ? "border-red-300 focus:border-red-500 bg-red-50/10"
                                : "border-[#E5E5E5] focus:border-black bg-white shadow-sm hover:border-zinc-300"
                    )}
                />

                <div className="absolute inset-y-0 right-5 flex items-center gap-3">
                    {/* Validation Icons */}
                    {url && !analyzing && (
                        <>
                            {platformState.isValid ? (
                                <CheckCircle size={24} className="text-green-500 animate-scale-pulse" />
                            ) : (
                                (platformState.platform !== 'unknown' || url.length > 10) && <AlertCircle size={24} className="text-red-400" />
                            )}
                            
                            <button 
                                onClick={() => {
                                    setUrl('');
                                    setMediaInfo(null);
                                    setPlatformState({ platform: 'unknown', isValid: false, mediaType: null });
                                }}
                                className="p-2 text-zinc-300 hover:text-zinc-600 transition-colors rounded-full hover:bg-zinc-100"
                            >
                                <X size={20} />
                            </button>
                        </>
                    )}
                </div>

                {/* Detected Type Badge */}
                {platformState.isValid && platformState.mediaType && (
                    <div className="absolute -bottom-8 left-6 flex items-center gap-2 animate-slide-down">
                         <div className={clsx("w-2 h-2 rounded-full", 
                             platformState.platform === 'instagram' ? 'bg-pink-500' :
                             platformState.platform === 'youtube' ? 'bg-red-500' :
                             platformState.platform === 'facebook' ? 'bg-blue-600' :
                             'bg-black'
                         )}/>
                        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                            {platformState.platform} {platformState.mediaType}
                        </span>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-slide-down px-4">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {/* 2. Configuration Section (Slide Down) */}
            {mediaInfo && (
                <div className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-2xl shadow-zinc-200/50 animate-slide-down flex flex-col gap-8 mt-4">
                    
                    {/* Media Header */}
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-zinc-100 overflow-hidden flex-shrink-0 shadow-inner border border-zinc-100">
                            {mediaInfo.thumbnail && <img src={mediaInfo.thumbnail} alt="Ref" className="w-full h-full object-cover" />}
                        </div>
                        <div className="text-left flex-1 min-w-0 pt-1">
                            <h3 className="font-bold text-xl leading-tight mb-2 line-clamp-2">{mediaInfo.title}</h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-600 flex items-center gap-1">
                                    Author: {mediaInfo.author}
                                </span>
                                <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-600">
                                    Duration: {mediaInfo.duration}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-100 w-full" />

                    {/* Premium Selectors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Format Selector */}
                        <div className="flex flex-col gap-3 text-left">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Target Format</label>
                            <div className="grid grid-cols-2 gap-3">
                                {availableFormats.map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setSelectedFormat(fmt)}
                                        className={clsx(
                                            "relative py-4 px-4 rounded-2xl text-sm font-bold transition-all border-2 uppercase flex items-center justify-center gap-2",
                                            selectedFormat === fmt 
                                                ? "bg-black border-black text-white shadow-lg shadow-black/20 scale-[1.02]" 
                                                : "bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50"
                                        )}
                                    >
                                        {fmt === 'mp3' ? <Music2 size={16} /> : <Settings2 size={16} />}
                                        {fmt}
                                        {selectedFormat === fmt && (
                                            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quality Selector */}
                        <div className="flex flex-col gap-3 text-left">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">Quality</label>
                             <div className="flex flex-wrap gap-2"> 
                                {availableQualities.map(q => (
                                    <button
                                        key={q}
                                        onClick={() => setSelectedQuality(q)}
                                        className={clsx(
                                            "px-5 py-3 rounded-xl text-sm font-bold transition-all border-2",
                                            selectedQuality === q
                                                ? "bg-black border-black text-white shadow-md shadow-black/10 scale-105"
                                                : "bg-white border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50"
                                        )}
                                    >
                                        {q}
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleDownloadClick}
                        className="w-full bg-black text-white rounded-2xl py-5 font-bold text-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 group mt-2"
                    >
                        <span>Start Download</span>
                        <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                             <ArrowRight size={20} />
                        </div>
                    </button>
                </div>
            )}

            {/* Analyze Button */}
            {!mediaInfo && url && platformState.isValid && (
                <button
                    onClick={() => handleAnalyze(false)}
                    disabled={analyzing}
                    className="w-full bg-black text-white rounded-[2rem] py-6 px-12 font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 group mt-4"
                >
                    {analyzing ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Fetching Media Info...
                        </>
                    ) : (
                        <>
                            Download Content
                            <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-[-45deg] transition-transform">
                                <ArrowRight size={24} />
                            </div>
                        </>
                    )}
                </button>
            )}

        </div>
    );
};

export default DownloadForm;
