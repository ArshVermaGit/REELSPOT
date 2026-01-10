'use client';

import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import styles from './PlatformSelector.module.css';

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    formats: 'Reels, Stories, Posts',
    count: '500K+'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    formats: 'Videos, Shorts, Audio',
    count: '850K+'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    formats: 'Videos, Reels',
    count: '420K+'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Music2,
    formats: 'Videos, No Watermark',
    count: '900K+'
  }
];

const PlatformSelector = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {platforms.map((platform) => (
            <div key={platform.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <platform.icon size={32} strokeWidth={2} />
              </div>
              <h3 className={styles.platformName}>{platform.name}</h3>
              <p className={styles.formatList}>{platform.formats}</p>
              <div className={styles.counter}>
                {platform.count} Downloads
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSelector;
