import React from 'react';
import { Download, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import styles from './Hero.module.css';

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

          {/* Input Area */}
          <div className={`${styles.inputWrapper} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <input 
              type="text" 
              className={styles.mainInput} 
              placeholder="Paste your link here..." 
            />
            <button className={styles.downloadButton}>
              <Download size={24} />
              <span>Download</span>
            </button>
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
