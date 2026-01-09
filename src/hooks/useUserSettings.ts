'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserSettings } from '@/types/settings';

export const useUserSettings = () => {
  const { status } = useSession();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (status === 'authenticated') {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (isMounted) {
            setSettings(data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Failed to load settings:", err);
          if (isMounted) setLoading(false);
        });
    } else if (status === 'unauthenticated') {
      // Use setImmediate or Timeout to avoid synchronous setState during effect mount
      const timer = setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    return () => {
      isMounted = false;
    };
  }, [status]);

  return { settings, loading };
};
