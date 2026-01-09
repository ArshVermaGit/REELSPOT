'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Globe, Copy, CheckCircle2, Video, Music, Eye, 
  Share2, X, Instagram, Twitter, MessageCircle, Monitor, 
  ChevronRight, History, Heart, MessageSquare, Download
} from 'lucide-react';
import styles from './FacebookDownloader.module.css';
import { API_CONFIG } from '@/config/api';

interface QualityOption {
  label: string;
  size: string;
  res: string;
  icon: React.ReactNode;
}

interface Suggestion {
  id: string;
  title: string;
  thumb: string;
  views: string;
}

interface HistoryItem {
  id: string;
  title: string;
  thumb: string;
  quality: string;
  timestamp: string;
}

interface ComponentProps {
  url: string;
  onReset: () => void;
}

const MOCK_SUGGESTIONS: Suggestion[] = [
  { id: 's1', title: 'Top 10 Hidden Waterfalls', thumb: 'https://images.unsplash.com/photo-1433086566608-5732f1682c81?w=400', views: '2.5M' },
  { id: 's2', title: 'Ultimate City Lights Drone Tour', thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', views: '800K' },
  { id: 's3', title: 'Cooking Masterclass: Italian Pasta', thumb: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400', views: '3.1M' },
  { id: 's4', title: 'Mountain Biking Adventure 4K', thumb: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=400', views: '120K' },
];

const QUALITIES: QualityOption[] = [
  { label: '4K Ultra HD', size: '150 MB', res: '2160p', icon: <Monitor size={16} /> },
  { label: '1080p Full HD', size: '45 MB', res: '1080p', icon: <Video size={16} /> },
  { label: '720p HD', size: '12 MB', res: '720p', icon: <Video size={16} /> },
  { label: 'Audio MP3', size: '4 MB', res: '320kbps', icon: <Music size={16} /> },
];

const FacebookDownloader: React.FC<ComponentProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(1); // Default to 1080p
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [countdown, setCountdown] = useState(10);
  
  const isStory = url.includes('stories');
  const isReel = url.includes('reels');

  // Initial Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Story Countdown Logic
  useEffect(() => {
    if (!isStory || isLoading) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 10));
    }, 1000);
    return () => clearInterval(interval);
  }, [isStory, isLoading]);

  const handleCopyDescription = () => {
    navigator.clipboard.writeText('Amazing Nature Moments - Witness the incredible beauty of nature in high definition.');
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
        
        // Add to History
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          title: isStory ? 'FB Story' : 'Amazing Nature Moments',
          thumb: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
          quality: QUALITIES[selectedQuality].label,
          timestamp: new Date().toLocaleTimeString(),
        };
        setHistory(prev => [newItem, ...prev]);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={`${styles.previewSection} ${styles.skeleton}`} />
        <div style={{ height: '24px', width: '60%', marginBottom: '12px' }} className={styles.skeleton} />
        <div style={{ height: '60px', width: '100%', marginBottom: '20px' }} className={styles.skeleton} />
        <div className={styles.qualityGrid}>
          {[1,2,3,4].map(i => <div key={i} style={{ height: '80px' }} className={styles.skeleton} />)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      {/* Preview Section */}
      <div className={`${styles.previewSection} ${isReel ? styles.reelPreview : ''}`}>
        <div className={styles.zoomContainer}>
          <Image 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60" 
            alt="Thumbnail" 
            className={styles.thumbnail}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        
        {isStory && (
          <div className={styles.storyOverlay}>
            <svg className={styles.timerSvg} width="40" height="40">
              <circle className={styles.timerBg} cx="20" cy="20" r="16" />
              <circle 
                className={styles.timerProgress} 
                cx="20" cy="20" r="16" 
                style={{ strokeDashoffset: 100 - (countdown * 10) }} 
              />
            </svg>
            <span className={styles.timerText}>{countdown}s</span>
          </div>
        )}
      </div>

      <div className={styles.header}>
        <h3 className={styles.title}>Amazing Nature Moments - FB {isReel ? 'Reel' : isStory ? 'Story' : 'Watch'}</h3>
        <div className={styles.badges}>
          <div className={styles.badge}><Globe size={14} /> <span>Public</span></div>
          <div className={styles.badge}><Eye size={14} /> <span>1.2M</span></div>
        </div>
      </div>

      <div className={styles.descriptionBox}>
        <p className={styles.descriptionText}>Witness the incredible beauty of nature in high definition. Recorded by Global Discovery. #Nature #Amazing</p>
        <button className={styles.copyButton} onClick={handleCopyDescription}>
          {copied ? <CheckCircle2 size={16} color="#1877F2" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Quality Grid Selector */}
      <div className={styles.controls}>
        <p className={styles.sectionTitle}>Available Qualities</p>
        <div className={styles.qualityGrid}>
          {QUALITIES.map((q, idx) => (
            <div 
              key={idx}
              className={`${styles.qualityCard} ${selectedQuality === idx ? styles.qualityCardActive : ''}`}
              onClick={() => setSelectedQuality(idx)}
            >
              <div className={styles.cardIcon}>{q.icon}</div>
              <span className={styles.resLabel}>{q.res}</span>
              <span className={styles.sizeLabel}>{q.label} • {q.size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={status === 'downloading'}
        >
          {status === 'downloading' && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}
          <div className={styles.statusText}>
            {status === 'idle' && <><Download size={20} /> Download High Quality</>}
            {status === 'downloading' && `Downloading ${progress}%`}
            {status === 'completed' && <><CheckCircle2 size={20} /> Saved to Gallery</>}
          </div>
        </button>

        <div className="flex gap-2">
          <button 
            className="flex-1 py-3 border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            onClick={() => setShowShare(true)}
          >
            <Share2 size={18} /> Share Original
          </button>
        </div>

        <div className={styles.apiPlaceholder}>
           Config: `{API_CONFIG.FACEBOOK_API_KEY}` (Secure Connection)
        </div>
      </div>

      {/* Related Suggestions */}
      <div className={styles.carouselSection}>
        <p className={styles.sectionTitle}>Suggested Videos</p>
        <div className={styles.carousel}>
          {MOCK_SUGGESTIONS.map(s => (
            <div key={s.id} className={styles.carouselItem}>
              <div className={styles.carouselThumb}>
                <Image src={s.thumb} alt={s.title} className={styles.carouselImg} width={160} height={90} unoptimized />
              </div>
              <p className={styles.carouselTitle}>{s.title}</p>
              <div className="flex items-center gap-1 mt-1 opacity-60 text-[10px] uppercase font-bold">
                <Heart size={10} /> 12K • <MessageSquare size={10} /> 45
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session History */}
      {history.length > 0 && (
        <div className={styles.historySection}>
          <div className="flex items-center gap-2 mb-3 text-gray-500">
            <History size={16} /> 
            <span className="text-xs font-bold uppercase tracking-wider">Session Downloads</span>
          </div>
          <div className={styles.historyList}>
            {history.map(item => (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.historyThumb}>
                   <Image src={item.thumb} alt="thumb" width={48} height={48} className="rounded object-cover" unoptimized />
                </div>
                <div className={styles.historyInfo}>
                  <p className={styles.historyTitle}>{item.title}</p>
                  <p className={styles.historyMeta}>{item.quality} • {item.timestamp}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className={styles.modalOverlay} onClick={() => setShowShare(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setShowShare(false)}><X size={20} /></button>
            <h4 className="text-xl font-bold mb-1">Share post</h4>
            <p className="text-gray-500 text-sm mb-6">Send this content to your friends</p>
            
            <div className={styles.shareGrid}>
              <div className={styles.shareBtn}>
                <div className={styles.shareIcon} style={{ background: '#25D366' }}><MessageCircle size={24} /></div>
                <span>WhatsApp</span>
              </div>
              <div className={styles.shareBtn}>
                <div className={styles.shareIcon} style={{ background: '#E1306C' }}><Instagram size={24} /></div>
                <span>Instagram</span>
              </div>
              <div className={styles.shareBtn}>
                <div className={styles.shareIcon} style={{ background: '#1DA1F2' }}><Twitter size={24} /></div>
                <span>Twitter</span>
              </div>
              <div className={styles.shareBtn}>
                <div className={styles.shareIcon} style={{ background: '#1877F2' }}><Share2 size={24} /></div>
                <span>Messenger</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-top border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Direct Link</p>
              <div className="flex gap-2">
                <input readOnly value={url} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 outline-none" />
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold" onClick={() => {
                   navigator.clipboard.writeText(url);
                   setCopied(true);
                   setTimeout(() => setCopied(false), 2000);
                }}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Silencing unused url warning - redundant but keeps eslint happy */}
      <div style={{ display: 'none' }}>Source: {url}</div>
    </div>
  );
};

export default FacebookDownloader;
