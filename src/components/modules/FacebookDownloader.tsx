'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Globe, Lock, Copy, CheckCircle2, Video, Music, Eye } from 'lucide-react';
import styles from './FacebookDownloader.module.css';
import { API_CONFIG } from '@/config/api';

interface ComponentProps {
  url: string;
  onReset: () => void;
}

const MOCK_DATA = {
  title: 'Amazing Nature Moments - Facebook Watch',
  description: 'Shared by Global Discovery. Witness the incredible beauty of nature in high definition. #Nature #Amazing #Discovery',
  thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60',
  views: '1.2M',
  privacy: 'public' as 'public' | 'private',
  duration: '03:45',
};

const FacebookDownloader: React.FC<ComponentProps> = ({ url }) => {
  const [format, setFormat] = useState<'video' | 'audio'>('video');
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const isReel = url.includes('reels');

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(MOCK_DATA.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setStatus('downloading');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('completed');
      }
    }, 100);
  };

  return (
    <div className={styles.container}>
      
      {/* Preview Section */}
      <div className={`${styles.previewSection} ${isReel ? styles.reelPreview : ''}`}>
        <Image 
          src={MOCK_DATA.thumbnail} 
          alt="Thumbnail" 
          className={styles.thumbnail}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </div>

      <div className={styles.header}>
        <h3 className={styles.title}>{MOCK_DATA.title}</h3>
        <div className={styles.badges}>
          <div className={styles.badge}>
            {MOCK_DATA.privacy === 'public' ? <Globe size={14} /> : <Lock size={14} />}
            <span>{MOCK_DATA.privacy === 'public' ? 'Public' : 'Private'}</span>
          </div>
          <div className={styles.badge}>
            <Eye size={14} />
            <span>{MOCK_DATA.views}</span>
          </div>
        </div>
      </div>

      {/* Description Box */}
      <div className={styles.descriptionBox}>
        <p className={styles.descriptionText}>{MOCK_DATA.description}</p>
        <button 
          className={styles.copyButton}
          onClick={handleCopyDescription}
          title="Copy Description"
        >
          {copied ? <CheckCircle2 size={16} color="#10B981" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.formatToggle}>
          <button 
            className={`${styles.toggleBtn} ${format === 'video' ? styles.toggleBtnActive : ''}`}
            onClick={() => setFormat('video')}
          >
            Video
          </button>
          <button 
            className={`${styles.toggleBtn} ${format === 'audio' ? styles.toggleBtnActive : ''}`}
            onClick={() => setFormat('audio')}
          >
            Audio
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={status !== 'idle' && status !== 'completed'}
        >
          {status === 'downloading' && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}
          
          <div className={styles.statusText}>
            {status === 'idle' && (
              <>
                {format === 'video' ? <Video size={20} /> : <Music size={20} />}
                Download {format === 'video' ? 'High Quality Video' : 'Audio Track'}
              </>
            )}
            {status === 'downloading' && `Downloading ${progress}%`}
            {status === 'completed' && <><CheckCircle2 size={20} /> Downloaded successfully!</>}
          </div>
        </button>

        <div className={styles.apiPlaceholder}>
           FB_API Config: `{API_CONFIG.FACEBOOK_API_KEY}` (Public/Private Support)
        </div>

        {/* Silencing unused url warning */}
        <div style={{ display: 'none' }}>URL: {url}</div>
      </div>

    </div>
  );
};

export default FacebookDownloader;
