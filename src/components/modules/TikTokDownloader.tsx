'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Download, Music, CheckCircle2, Hash, Flame, 
  ToggleRight, Ghost, Music4
} from 'lucide-react';
import styles from './TikTokDownloader.module.css';
import { API_CONFIG } from '@/config/api';

interface Creator {
  username: string;
  handle: string;
  avatar: string;
  followers: string;
}

interface ComponentProps {
  url: string;
  onReset: () => void;
}

const MOCK_DATA = {
  title: 'Check out this awesome transition! 😱🔥',
  description: 'Sharing some creative vibes today. Hope you like it! #Transitions #Creative #TikTok #DigitalArt',
  hashtags: ['#Transitions', '#Creative', '#TikTok', '#DigitalArt'],
  thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=60',
  creator: {
    username: 'Creator Studio',
    handle: '@creator_vibes',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creative',
    followers: '2.4M',
  } as Creator,
  music: 'Original Sound - Creator Studio',
};

const TikTokDownloader: React.FC<ComponentProps> = ({ url }) => {
  const [noWatermark, setNoWatermark] = useState(true);
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    setStatus('downloading');
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('completed');
      }
    }, 80);
  };

  return (
    <div className={styles.container}>
      
      {/* 9:16 Vertical Preview */}
      <div className={styles.previewWrapper}>
        <Image 
          src={MOCK_DATA.thumbnail} 
          alt="TikTok Preview" 
          className={styles.thumbnail}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        
        {/* Floating Music Notes */}
        <div className={`${styles.musicNote} ${styles.note1}`}><Music4 size={20} /></div>
        <div className={`${styles.musicNote} ${styles.note2}`}><Music4 size={16} /></div>
        <div className={`${styles.musicNote} ${styles.note3}`}><Music4 size={24} /></div>

        {/* Trending Badge */}
        <div className={styles.trendingBadge}>
          <Flame size={14} fill="currentColor" />
          <span>TRENDING</span>
        </div>

        {/* Creator Info Overlay */}
        <div className={styles.creatorOverlay}>
          <div className={styles.creatorHeader}>
            <div className={styles.avatarWrapper}>
              <Image src={MOCK_DATA.creator.avatar} alt="Avatar" width={48} height={48} unoptimized />
            </div>
            <div>
              <div className={styles.username}>{MOCK_DATA.creator.username}</div>
              <div className={styles.handle}>{MOCK_DATA.creator.handle}</div>
            </div>
          </div>
          
          <div className="text-xs opacity-90 line-clamp-2 mb-2">
            {MOCK_DATA.description}
          </div>

          <div className={styles.waveform}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className={styles.waveBar} 
                style={{ animationDelay: `${i * 0.1}s` }} 
              />
            ))}
            <span className="text-[10px] ml-2 font-mono flex items-center gap-1">
              <Music size={10} /> {MOCK_DATA.music}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Watermark Toggle */}
        <div 
          className={styles.toggleWrapper}
          onClick={() => setNoWatermark(!noWatermark)}
        >
          <div className={styles.toggleLabel}>
            {noWatermark ? <Ghost size={20} className="text-pink-500" /> : <ToggleRight size={20} />}
            <div>
              <div className="text-sm font-bold">No Watermark</div>
              <div className="text-[10px] text-gray-500">Fast HD Download (Recommended)</div>
            </div>
          </div>
          <div className={`${styles.switch} ${noWatermark ? styles.switchActive : ''}`}>
            <div className={styles.knob} />
          </div>
        </div>

        {/* Hashtags Display */}
        <div className={styles.hashtags}>
          {MOCK_DATA.hashtags.map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span>
          ))}
          <span className="text-gray-400 text-xs ml-auto flex items-center gap-1">
            <Hash size={12} /> Extracted
          </span>
        </div>

        {/* Action Button */}
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={status === 'downloading' || status === 'completed'}
        >
          {status === 'downloading' && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}
          
          <div className={styles.statusText}>
            {status === 'idle' && (
              <>
                <Download size={20} /> 
                Download Video {noWatermark ? '(Original)' : '(With Credit)'}
              </>
            )}
            {status === 'downloading' && `Processing TikTok Video ${progress}%`}
            {status === 'completed' && <><CheckCircle2 size={20} /> Clear HD Video Saved!</>}
          </div>
        </button>

        <div className={styles.apiPlaceholder}>
           TikTok Config: `{API_CONFIG.TIKTOK_API_KEY}` (Region: Global)
        </div>
      </div>

      {/* Silencing unused url warning */}
      <div style={{ display: 'none' }}>Source: {url}</div>
    </div>
  );
};

export default TikTokDownloader;
