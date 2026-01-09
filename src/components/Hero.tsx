import React from 'react';
import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import styles from './Hero.module.css';
import DownloadInterface from './DownloadInterface';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          
          {/* Logo Area */}
          <div className={`${styles.logoContainer} animate-scale-in`}>
            <h1 className={styles.logo}>Reelspot</h1>
          </div>

          {/* Tagline */}
          <h2 className={`${styles.tagline} animate-fade-in`}>
            Download Media, <span className={styles.gradientText}>Effortlessly</span>
          </h2>

          {/* Smart Download Interface */}
          <div className="w-full relative z-20">
             <DownloadInterface />
          </div>

          {/* Floating Icons Background Elements */}
          <div className={styles.floatingIcons}>
            <div className={`${styles.iconBubble} ${styles.iconIg} animate-float`} style={{ animationDelay: '0s' }}>
              <Instagram size={32} />
            </div>
            <div className={`${styles.iconBubble} ${styles.iconYt} animate-float`} style={{ animationDelay: '2s' }}>
              <Youtube size={32} />
            </div>
            <div className={`${styles.iconBubble} ${styles.iconFb} animate-float`} style={{ animationDelay: '1s' }}>
              <Facebook size={32} />
            </div>
            <div className={`${styles.iconBubble} ${styles.iconTk} animate-float`} style={{ animationDelay: '3s' }}>
              <Music2 size={32} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
