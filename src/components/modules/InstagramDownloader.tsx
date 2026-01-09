'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Download, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import styles from './InstagramDownloader.module.css';
import { API_CONFIG } from '@/config/api';
import { saveToHistory } from '@/lib/history-utils';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
}

interface ComponentProps {
  url: string;
  onReset: () => void;
}

const MOCK_DATA = {
  user: {
    username: 'creative_reel_creator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  },
  posts: [
    { id: '1', type: 'image', url: '', thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60' },
    { id: '2', type: 'image', url: '', thumbnail: 'https://images.unsplash.com/photo-1604028682496-c631e8093108?w=800&auto=format&fit=crop&q=60' },
    { id: '3', type: 'image', url: '', thumbnail: 'https://images.unsplash.com/photo-1549400877-a5ec0248f219?w=800&auto=format&fit=crop&q=60' },
  ] as MediaItem[],
};

const InstagramDownloader: React.FC<ComponentProps> = ({ url }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const type = url.includes('stories') ? 'story' : 'post';
  const data = MOCK_DATA; // In real app, fetch based on URL

  // Confetti Animation Logic
  const renderConfetti = () => {
    if (!showConfetti) return null;
    return (
      <>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={styles.confetti}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: ['#f00', '#0f0', '#00f', '#ff0', '#f0f'][Math.floor(Math.random() * 5)],
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </>
    );
  };

  const handleDownload = () => {
    setDownloadStatus('downloading');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setDownloadStatus('completed');
        setShowConfetti(true);

        // Save to History
        saveToHistory({
          title: `Instagram ${type === 'story' ? 'Story' : 'Post'} - ${data.user.username}`,
          platform: 'INSTAGRAM',
          url: url,
          thumbnail: data.posts[currentIndex].thumbnail,
        });

        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 100);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_DATA.posts.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_DATA.posts.length) % MOCK_DATA.posts.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide]);

  return (
    <div className={styles.container}>
      {renderConfetti()}

      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <Image 
              src={data.user.avatar} 
              alt="User" 
              className={styles.imgFit} 
              width={48} 
              height={48} 
              unoptimized
            />
          </div>
          <div>
            <div className={styles.username}>{data.user.username}</div>
            <div className={styles.contentType}>{type === 'story' ? 'Instagram Story' : 'Carousel Post'}</div>
          </div>
        </div>
        <div>
           {/* Possibly Quality selector or other actions */}
        </div>
      </header>

      {/* Media Viewer */}
      <div className={`${styles.galleryContainer} ${type === 'story' ? styles.storyContainer : ''}`}>
        
        {/* Story Progress Bars */}
        {type === 'story' && (
          <div className={styles.storyProgress}>
            {data.posts.map((_, idx) => (
              <div key={idx} className={styles.barContainer}>
                 <div 
                   className={styles.barFill} 
                   style={{ width: idx < currentIndex ? '100%' : idx === currentIndex ? '50%' : '0%' }} 
                 />
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide}>
          <ChevronLeft size={24} color="#000" />
        </button>
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide}>
          <ChevronRight size={24} color="#000" />
        </button>

        {/* Sliding Track */}
        <div 
          className={styles.slideTrack} 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.posts.map((item) => (
            <div key={item.id} className={styles.slide}>
              <Image 
                src={item.thumbnail} 
                alt="Media" 
                className={styles.mediaItem} 
                fill
                style={{ objectFit: 'cover' }}
                unoptimized 
              />
            </div>
          ))}
        </div>

        {/* Dots (for posts) */}
        {type !== 'story' && (
          <div className={styles.indicators}>
            {data.posts.map((_, idx) => (
              <div 
                key={idx} 
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Downloader Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={downloadStatus === 'downloading' || downloadStatus === 'completed'}
        >
          {downloadStatus === 'downloading' && (
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          )}
          
          <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
             {downloadStatus === 'downloading' ? `Downloading ${progress}%` : 
              downloadStatus === 'completed' ? 'Saved to Gallery!' : 'Download All Media'}
             {downloadStatus === 'completed' ? <CheckCircle2 size={20} /> : <Download size={20} />}
          </span>
        </button>

        <div className={styles.apiPlaceholder}>
           API Config: `{API_CONFIG.INSTAGRAM_API_KEY}` (Configure in Settings)
        </div>
      </div>
    </div>
  );
};

export default InstagramDownloader;
