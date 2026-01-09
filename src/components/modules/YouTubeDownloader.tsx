'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Play, CheckCircle2, Clock, FileText } from 'lucide-react';
import styles from './YouTubeDownloader.module.css';
import { API_CONFIG } from '@/config/api';
import { saveToHistory } from '@/lib/history-utils';

interface Chapter {
  time: string;
  title: string;
}

interface ComponentProps {
  url: string;
  onReset: () => void;
}

const MOCK_DATA = {
  title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
  thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&auto=format&fit=crop&q=60',
  duration: 'Live',
  chapters: [
    { time: '00:00', title: 'Intro' },
    { time: '02:30', title: 'Deep Focus' },
    { time: '05:45', title: 'Chill Vibes' },
    { time: '10:00', title: 'Late Night' },
  ] as Chapter[],
  qualities: [
    { label: '4K', size: '1.2 GB', res: '2160p' },
    { label: '1080p', size: '450 MB', res: '1080p' },
    { label: '720p', size: '120 MB', res: '720p' },
    { label: '480p', size: '45 MB', res: '480p' },
  ],
  audio: [
    { label: '320kbps', size: '15 MB', format: 'mp3' },
    { label: '128kbps', size: '5 MB', format: 'mp3' },
  ]
};

const YouTubeDownloader: React.FC<ComponentProps> = ({ url }) => {
  const [format, setFormat] = useState<'video' | 'audio'>('video');
  const [selectedQuality, setSelectedQuality] = useState(0);
  const [status, setStatus] = useState<'idle' | 'converting' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [downloadSubtitles, setDownloadSubtitles] = useState(false);

  // Removed useEffect to avoid sync state update. Logic moved to handlers.

  const handleFormatChange = (fmt: 'video' | 'audio') => {
    setFormat(fmt);
    setStatus('idle');
    setProgress(0);
  };

  const handleQualityChange = (idx: number) => {
    setSelectedQuality(idx);
    setStatus('idle');
    setProgress(0);
  };

  const handleDownload = () => {
    setStatus('converting');
    
    // Simulate Conversion
    setTimeout(() => {
      setStatus('downloading');
      
      // Simulate Download
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setStatus('completed');

          // Save to History
          saveToHistory({
            title: MOCK_DATA.title,
            platform: 'YOUTUBE',
            url: url,
            thumbnail: MOCK_DATA.thumbnail,
          });
        }
      }, 50);
    }, 1500);
  };

  const getOptions = () => format === 'video' ? MOCK_DATA.qualities : MOCK_DATA.audio;

  return (
    <div className={styles.container}>
      
      {/* Preview Section */}
      <div className={styles.previewSection}>
        <Image 
          src={MOCK_DATA.thumbnail} 
          alt="Thumbnail" 
          className={styles.thumbnail}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <div className={styles.playOverlay}>
          <div className={styles.playButton}>
            <Play size={32} fill="white" />
          </div>
        </div>
      </div>

      <div className={styles.metadata}>
        <h3 className={styles.title}>{MOCK_DATA.title}</h3>
        <div className={styles.metaRow}>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{MOCK_DATA.duration}</span>
          </div>
          <span>•</span>
          <span>YouTube</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Format Tabs */}
        <div className={styles.formatTabs}>
          <button 
            className={`${styles.tab} ${format === 'video' ? styles.tabActive : ''}`}
            onClick={() => handleFormatChange('video')}
          >
            Video
          </button>
          <button 
            className={`${styles.tab} ${format === 'audio' ? styles.tabActive : ''}`}
            onClick={() => handleFormatChange('audio')}
          >
            Audio
          </button>
        </div>

        {/* Quality Grid */}
        <div className={styles.optionsGrid}>
          {getOptions().map((opt, idx) => (
            <div 
              key={idx}
              className={`${styles.optionCard} ${selectedQuality === idx ? styles.optionCardActive : ''}`}
              onClick={() => handleQualityChange(idx)}
            >
              <span className={styles.resLabel}>{opt.label}</span>
              <span className={styles.sizeLabel}>{opt.size}</span>
            </div>
          ))}
        </div>

        {/* Subtitles Option */}
        {format === 'video' && (
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={downloadSubtitles}
              onChange={(e) => setDownloadSubtitles(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText size={16} /> Download Subtitles (.srt)
            </span>
          </label>
        )}
      </div>

      {/* Chapters (Collapsible-ish) */}
      <div className={styles.chaptersSection}>
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Chapters Detected</p>
        <div className={styles.chapterList}>
          {MOCK_DATA.chapters.map((chap, i) => (
            <div key={i} className={styles.chapterItem}>
              <span className={styles.timestamp}>{chap.time}</span>
              <span>{chap.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={status !== 'idle' && status !== 'completed'}
        >
          {status !== 'idle' && status !== 'completed' && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}
          
          <div className={styles.statusText}>
            {status === 'idle' && <><Download size={20} /> Download {format === 'video' ? 'Video' : 'Audio'}</>}
            {status === 'converting' && 'Processing...'}
            {status === 'downloading' && `Downloading ${progress}%`}
            {status === 'completed' && <><CheckCircle2 size={20} /> Complete!</>}
          </div>
        </button>

        <div className={styles.apiPlaceholder}>
           API Config: `{API_CONFIG.YOUTUBE_API_KEY}` (Configure in Settings)
        </div>
        
        {/* Helper to avoid unused url warning */}
        <div style={{ display: 'none' }}>Source: {url}</div>
      </div>

    </div>
  );
};

export default YouTubeDownloader;
