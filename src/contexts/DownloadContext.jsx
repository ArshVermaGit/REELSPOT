import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MediaDownloader } from '../services/download.service';
import { useToast } from '../hooks/useToast';
import { useAuth } from './AuthContext';

const DownloadContext = createContext();

export const useDownloadManager = () => useContext(DownloadContext);

export const DownloadProvider = ({ children }) => {
    const { user } = useAuth();
    const [queue, setQueue] = useState([]); // Array of items waiting
    const [activeDownloads, setActiveDownloads] = useState([]); // Array of items currently downloading
    const MAX_CONCURRENT = 2;

    // Process Queue Effect
    useEffect(() => {
        if (activeDownloads.length < MAX_CONCURRENT && queue.length > 0) {
            const nextItem = queue[0];
            setQueue(prev => prev.slice(1)); // Remove from queue
            startDownload(nextItem);
        }
    }, [activeDownloads.length, queue]);

    const addToQueue = useCallback((downloadOptions) => {
        // Check for duplicates in active or queue (simple check by ID/URL)
        const isDuplicate = [...activeDownloads, ...queue].some(item => item.downloadUrl === downloadOptions.downloadUrl);
        
        if (isDuplicate) {
            // Optional: Allow anyway or warn
            showToast.warning("This item is already in the download list.");
            return;
        }

        const item = {
            ...downloadOptions,
            id: Date.now() + Math.random().toString(36).substr(2, 9), // Temp ID
            status: 'queued',
            progress: 0
        };

        setQueue(prev => [...prev, item]);
        showToast.info("Added to download queue");
    }, [activeDownloads, queue]);

    const startDownload = async (item) => {
        // Move to active
        setActiveDownloads(prev => [...prev, { ...item, status: 'initializing' }]);

        // We need a way to update the specific active item's progress in state
        // This is tricky with functional updates but doable
        const updateProgress = (id, progressData) => {
            setActiveDownloads(prev => prev.map(d => 
                d.id === id ? { ...d, ...progressData, status: 'downloading' } : d
            ));
        };

        try {
            const result = await MediaDownloader.downloadMedia({
                downloadUrl: item.downloadUrl,
                ...item, // Pass all item properties
                userId: user?.id,
                onProgress: (p) => {
                    updateProgress(item.id, { 
                        progress: p.percentage, 
                        status: 'downloading',
                        speed: p.speed,
                        timeRemaining: p.timeRemaining
                    });
                }
            });

            if (result.success) {
                showToast.success(`Download complete: ${item.mediaTitle}`);
            } else {
                // Handled in mediaDownloader or global error handler, but nice to toast specific fail
                // Error toast likely already shown by mediaDownloader catching helper
            }
        } catch (error) {
            console.error("Download manager caught error:", error);
            showToast.error(`Download failed: ${error.message}`);
        } finally {
            // Remove from active
            setActiveDownloads(prev => prev.filter(d => d.id !== item.id));
        }
    };

    // Helper for UI to see queue/active
    // We expose a merged list or separate lists
    const tasks = [
        ...activeDownloads,
        ...queue.map(q => ({ ...q, status: 'queued', progress: 0 }))
    ];

    return (
        <DownloadContext.Provider value={{ addToQueue, tasks, activeDownloads, queue }}>
            {children}
        </DownloadContext.Provider>
    );
};
