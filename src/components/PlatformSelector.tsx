'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import styles from './PlatformSelector.module.css';

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    formats: 'Reels, Stories, Posts',
    count: 500,
    color: '#E1306C'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    formats: 'Videos, Shorts, Audio',
    count: 850,
    color: '#FF0000'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    formats: 'Videos, Reels',
    count: 420,
    color: '#1877F2'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Music2,
    formats: 'Videos, No Watermark',
    count: 900,
    color: '#000000'
  }
];

const PlatformSelector = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = styles.ripple;
    
    card.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {platforms.map((platform, index) => (
            <div
              key={platform.id}
              className={`${styles.card} ${styles.cardIdle} ${isVisible ? styles.animateEntrance : ''}`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0 // Ensure hidden until animate
              }}
              onClick={handleRipple}
            >
              <div className={styles.iconWrapper} style={{ color: platform.color }}>
                <platform.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className={styles.platformName}>{platform.name}</h3>
              <p className={styles.formatList}>{platform.formats}</p>
              <div className={styles.counter}>
                {isVisible ? platform.count : 0}K+ Downloads
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSelector;
