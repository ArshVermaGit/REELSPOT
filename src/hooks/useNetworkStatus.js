import { useState, useEffect } from 'react';
import { showToast } from '../utils/toastUtils';

export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            showToast.success("Back online!");
        };
        const handleOffline = () => {
            setIsOnline(false);
            showToast.error("You are offline. Features may be limited.");
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
