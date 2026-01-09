'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Download, Instagram, Youtube, Facebook, Music2, Search, Link2, CheckCircle2 } from 'lucide-react';
import styles from './DownloadInterface.module.css';
import { saveToHistory } from '@/lib/history-utils';
import { useUserSettings } from '@/hooks/useUserSettings';
import InstagramDownloader from './modules/InstagramDownloader';
import YouTubeDownloader from './modules/YouTubeDownloader';
import FacebookDownloader from './modules/FacebookDownloader';
import TikTokDownloader from './modules/TikTokDownloader';
import { UserSettings } from '@/types/settings';
import PreviewModal from './ui/PreviewModal';
import StatusModal from './ui/StatusModal';

type Platform = 'instagram' | 'youtube' | 'facebook' | 'tiktok' | null;
type Status = 'idle' | 'analyzing' | 'success' | 'downloading' | 'completed' | 'error';
type Quality = 'HD' | 'SD' | 'Audio';

const DownloadInterface = () => {
  useSession();
  const { settings } = useUserSettings();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState<Quality>('HD');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Character States (Simple Emoji representation for now, can be SVGs)
  const getCharacter = () => {
    switch (status) {
      case 'analyzing': return '🤔'; // Thinking
      case 'success': return '🤩'; // Starry eyes
      case 'downloading': return '😎'; // Cool
      case 'completed': return '🥳'; // Party
      case 'error': return '😵'; // Dizzy
      default: return '🙂'; // Idle smile
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // Platform Auto-detection
    if (newUrl.includes('instagram.com')) setPlatform('instagram');
    else if (newUrl.includes('youtube.com') || newUrl.includes('youtu.be')) setPlatform('youtube');
    else if (newUrl.includes('facebook.com') || newUrl.includes('fb.watch')) setPlatform('facebook');
    else if (newUrl.includes('tiktok.com')) setPlatform('tiktok');
    else setPlatform(null);
  };

  const handleAnalyze = () => {
    if (!url) return;
    setStatus('analyzing');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  const handleDownload = () => {
    setStatus('downloading');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('completed');
        
        // Save to History (Mock data for generic platforms)
        saveToHistory({
          title: `Video Download - ${platform || 'Generic'}`,
          platform: platform?.toUpperCase() || 'EXTERNAL',
          url: url,
          thumbnail: '', // Potentially real thumb if we had it
        });

        setTimeout(() => {
            // Reset after completion
            setProgress(0);
            setStatus('success'); 
        }, 2000);
      }
    }, 100);
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram': return <Instagram size={24} color="#E1306C" />;
      case 'youtube': return <Youtube size={24} color="#FF0000" />;
      case 'facebook': return <Facebook size={24} color="#1877F2" />;
      case 'tiktok': return <Music2 size={24} color="#000000" />;
      default: return <Link2 size={24} />;
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Character Feedback */}
      <div className={styles.characterContainer}>
        <div className={`${styles.character} ${status === 'analyzing' ? styles.charThinking : ''}`}>
          {getCharacter()}
        </div>
      </div>

      {/* Main Input Area */}
      <div className={styles.inputWrapper}>
        <div className={`${styles.platformIcon} ${platform ? styles.platformIconActive : ''}`}>
          {getPlatformIcon()}
        </div>
        <input 
          type="text" 
          className={styles.mainInput}
          placeholder="Paste your video link here..." 
          value={url}
          onChange={handleUrlChange}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button 
          className={styles.analyzeButton}
          onClick={handleAnalyze}
          disabled={status === 'analyzing' || !url}
        >
          {status === 'analyzing' ? (
            <div className={styles.spinner} />
          ) : (
            <>
              <span>Analyze</span>
              <Search size={18} />
            </>
          )}
        </button>
      </div>

      {/* Results Area (Mock Data) handled by Module or Generic */}
      {(status === 'success' || status === 'downloading' || status === 'completed') && (
        <>
          {platform === 'instagram' ? (
             <React.Suspense fallback={<div>Loading Module...</div>}>
                <InstagramDownloader url={url} onReset={() => setStatus('idle')} />
             </React.Suspense>
          ) : platform === 'youtube' ? (
             <React.Suspense fallback={<div>Loading Module...</div>}>
                <YouTubeDownloader url={url} onReset={() => setStatus('idle')} />
             </React.Suspense>
          ) : platform === 'facebook' ? (
             <React.Suspense fallback={<div>Loading Module...</div>}>
                <FacebookDownloader url={url} onReset={() => setStatus('idle')} />
             </React.Suspense>
          ) : platform === 'tiktok' ? (
             <React.Suspense fallback={<div>Loading Module...</div>}>
                <TikTokDownloader url={url} onReset={() => setStatus('idle')} />
             </React.Suspense>
          ) : (
            <div className={styles.resultsArea}>
              <div className={styles.mediaInfo}>
                {/* Mock Thumbnail */}
                <div 
                  className={styles.thumbnail} 
                  style={{ background: '#ddd', cursor: 'zoom-in' }} 
                  onClick={() => setIsPreviewOpen(true)}
                /> 
                
                <div className={styles.details}>
                  <h3 className={styles.videoTitle}>Best Video Ever - {platform || 'Video'}</h3>
                  <div className={styles.metaInfo}>
                    <span>Duration: 0:45</span>
                    <span>•</span>
                    <span>Size: 12.5 MB</span>
                  </div>
                </div>
              </div>

              {/* Quality Options */}
              <div className={styles.qualityOptions}>
                {(['HD', 'SD', 'Audio'] as Quality[]).map((q) => (
                  <button
                    key={q}
                    className={`${styles.qualityBtn} ${selectedQuality === q ? styles.qualityBtnActive : ''}`}
                    onClick={() => setSelectedQuality(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Download Button */}
              <div className={styles.downloadAction}>
                <button 
                  className={styles.downloadButton}
                  onClick={handleDownload}
                  disabled={status === 'downloading' || status === 'completed'}
                >
                  <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                  <div className={styles.downloadText}>
                    {status === 'downloading' ? `Downloading ${progress}%` : 
                    status === 'completed' ? 'Downloaded!' : 'Download Now'}
                    {status === 'completed' ? <CheckCircle2 size={20} /> : <Download size={20} />}
                  </div>
                </button>
              </div>

              <div className={styles.apiKeyPlaceholder}>
                {platform && settings && (settings[`${(platform as string).toUpperCase()}_API_KEY` as keyof UserSettings] as string)
                  ? `Using your private ${platform} API Key` 
                  : 'Using System Default Key (Configure in Settings)'}
              </div>
            </div>
          )}
        </>
      )}

      <PreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        mediaUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60"
        title={`Preview: Video from ${platform || 'Web'}`}
      />
      
      <StatusModal 
        isOpen={status === 'completed'} 
        onClose={() => setStatus('success')} 
        type="success" 
        title="Download Ready!" 
        message="Your media has been successfully processed and filtered. It's now saved to your primary storage."
      />
    </div>
  );
};

export default DownloadInterface;
