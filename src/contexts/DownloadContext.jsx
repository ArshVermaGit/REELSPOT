import React, { createContext, useContext, useState } from 'react';
import { MediaDownloader } from '../services/download.service';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

/* eslint-disable react-refresh/only-export-components */

const DownloadContext = createContext({});

export const useDownload = () => useContext(DownloadContext);

export const DownloadProvider = ({ children }) => {
    const { user } = useAuth();
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(null); // { loaded, total, percentage, speed, timeRemaining }
    const [error, setError] = useState(null);
    const [mediaInfo, setMediaInfo] = useState(null);

    const reset = () => {
        setDownloading(false);
        setProgress(null);
        setError(null);
        setMediaInfo(null);
    };

    const fetchInfo = async (url, platform, apiKey) => {
        setLoading(true);
        setError(null);
        try {
            const info = await MediaDownloader.getMediaInfo({ url, platform, apiKey });
            setMediaInfo(info);
            return info;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const startDownload = async (options) => {
        const { downloadUrl, platform, format, quality, title, thumbnail, mediaUrl, author, duration } = options;
        
        setDownloading(true);
        setError(null);
        setProgress({ percentage: 0, speed: '---', timeRemaining: '---' });

        try {
            const result = await MediaDownloader.downloadMedia({
                downloadUrl,
                platform,
                format,
                quality,
                userId: user?.id,
                mediaTitle: title,
                mediaThumbnail: thumbnail,
                mediaUrl,
                author,
                duration,
                onProgress: (p) => setProgress(p)
            });

            if (!result.success) throw new Error(result.error);
            
            toast.success('Download completed successfully!');
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(`Download failed: ${err.message}`);
            return false;
        } finally {
            setDownloading(false);
            setProgress(null);
        }
    };

    const [loading, setLoading] = useState(false);

    return (
        <DownloadContext.Provider value={{ 
            downloading, progress, error, mediaInfo, loading,
            fetchInfo, startDownload, reset, setMediaInfo
        }}>
            {children}
        </DownloadContext.Provider>
    );
};
