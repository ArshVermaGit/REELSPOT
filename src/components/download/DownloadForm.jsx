import React, { useState, useEffect } from 'react';
import { ArrowRight, Link as LinkIcon, AlertCircle, Loader2, Instagram, Youtube, Facebook, Music2, Settings2, Download, X } from 'lucide-react';
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
    const [platformState, setPlatformState] = useState({ platform: 'unknown', isValid: false });
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
                setPlatformState({ platform: 'unknown', isValid: false });
                setMediaInfo(null); 
                setError(null);
                setDownloadStatus('idle');
                return;
            }
            const res = detectPlatform(url);
            setPlatformState({ platform: res.platform, isValid: res.isValid });
        }, 300);
        return () => clearTimeout(timer);
    }, [url]);

    // 2. Analyze URL
    const handleAnalyze = async () => {
        if (!platformState.isValid) {
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
            onApiKeyRequired(platformState.platform);
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

    // 3. Start Download
    const handleDownloadClick = async () => {
        if (!mediaInfo || !selectedFormat || !selectedQuality) return;

        const target = mediaInfo.formats.find(f => f.ext === selectedFormat && f.quality === selectedQuality) 
                       || mediaInfo.formats[0];

        setDownloadStatus('downloading');
        setStatusMessage(`Connecting to ${platformState.platform}...`);
        setProgress({ percentage: 0, speed: 'Starting...', timeRemaining: '--' });

        try {
            // Simulate connection phase
            await new Promise(r => setTimeout(r, 500));
            setStatusMessage('Fetching media information...');
            setProgress({ percentage: 5, speed: 'Preparing...', timeRemaining: '--' });
            
            await new Promise(r => setTimeout(r, 500));
            setStatusMessage('Downloading media...');
            setProgress({ percentage: 10, speed: 'Calculating...', timeRemaining: '--' });

            const result = await downloadMedia({
                downloadUrl: target.url,
                platform: platformState.platform,
                format: selectedFormat,
                quality: selectedQuality,
                mediaTitle: mediaInfo.title,
                mediaThumbnail: mediaInfo.thumbnail,
                mediaUrl: url, // Original URL
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
                        setStatusMessage('Processing media...');
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
    const availableQualities = mediaInfo 
        ? mediaInfo.formats.filter(f => f.ext === selectedFormat).map(f => f.quality)
        : [];
    const targetFormat = mediaInfo?.formats.find(f => f.ext === selectedFormat && f.quality === selectedQuality);


    // RENDER: IDLE (Inputs) or ACTIVE (Progress)
    if (downloadStatus !== 'idle') {
        return (
            <div className="w-full max-w-[700px] animate-fade-in">
                <DownloadProgress 
                    status={downloadStatus}
                    statusMessage={statusMessage}
                    progress={progress.percentage}
                    speed={progress.speed}
                    timeRemaining={progress.timeRemaining}
                    fileSize={targetFormat?.size || 'Unknown'}
                    fileName={`${mediaInfo?.title}.${selectedFormat}`}
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
                        <Loader2 size={20} className="animate-spin text-zinc-400" />
                    ) : (
                        <PlatformIcon platform={platformState.platform} />
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
                        "w-full h-16 pl-14 pr-14 rounded-2xl border-2 text-lg font-medium placeholder:text-[#A0A0A0] placeholder:font-normal outline-none transition-all duration-300",
                        error 
                            ? "border-red-300 focus:border-red-500 bg-red-50/10" 
                            : "border-[#E5E5E5] focus:border-black bg-white shadow-sm hover:border-zinc-300 focus:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    )}
                />

                {url && !analyzing && (
                    <button 
                        onClick={() => {
                            setUrl('');
                            setMediaInfo(null);
                        }}
                        className="absolute inset-y-0 right-4 flex items-center text-zinc-300 hover:text-zinc-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium animate-slide-down px-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {/* 2. Configuration Section (Slide Down) */}
            {mediaInfo && (
                <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-2xl shadow-zinc-200/50 animate-slide-down flex flex-col gap-6">
                    
                    {/* Media Header */}
                    <div className="flex items-center gap-4 border-b border-zinc-50 pb-4">
                        <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                            {mediaInfo.thumbnail && <img src={mediaInfo.thumbnail} alt="Ref" className="w-full h-full object-cover" />}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                            <h3 className="font-bold text-lg truncate pr-4">{mediaInfo.title}</h3>
                            <p className="text-sm text-zinc-500 flex items-center gap-1">
                                {mediaInfo.author} • {mediaInfo.duration}
                            </p>
                        </div>
                    </div>

                    {/* Selectors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Format */}
                        <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Format</label>
                            <div className="flex bg-zinc-50 p-1 rounded-xl">
                                {availableFormats.map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setSelectedFormat(fmt)}
                                        className={clsx(
                                            "flex-1 py-2 rounded-lg text-sm font-semibold transition-all uppercase",
                                            selectedFormat === fmt 
                                                ? "bg-white text-black shadow-sm" 
                                                : "text-zinc-500 hover:bg-zinc-100"
                                        )}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quality */}
                        <div className="flex flex-col gap-2 text-left">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Quality</label>
                             <div className="relative"> 
                                <select 
                                    value={selectedQuality}
                                    onChange={(e) => setSelectedQuality(e.target.value)}
                                    className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm rounded-xl focus:ring-black focus:border-black block p-2.5 font-medium outline-none"
                                >
                                    {availableQualities.map(q => (
                                        <option key={q} value={q}>{q}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-zinc-400">
                                     <Settings2 size={16} />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleDownloadClick}
                        className="w-full bg-black text-white rounded-xl py-4 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 group"
                    >
                        <span>Download {selectedQuality}</span>
                        <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            )}

            {/* Analyze Button */}
            {!mediaInfo && url && platformState.isValid && (
                <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-black text-white rounded-xl py-[18px] px-12 font-semibold text-lg hover:scale-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_12px_32px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100"
                >
                    {analyzing ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Download Now
                            <Download size={24} />
                        </>
                    )}
                </button>
            )}

        </div>
    );
};

export default DownloadForm;
