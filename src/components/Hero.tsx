'use client';

import React from 'react';
import styles from './Hero.module.css';
import DownloadInterface from './DownloadInterface';
import ReelBot from './ui/ReelBot';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          
          {/* Logo Area & Mascot */}
          <div className={`${styles.logoContainer} flex flex-col items-center gap-4`}>
            <ReelBot mood="idle" size={120} className="mb-2" />
            <h1 className={styles.logo}>Reelspot</h1>
          </div>

          {/* Tagline */}
          <h2 className={styles.tagline}>
            Download Media, <span className={styles.gradientText}>Effortlessly</span>
          </h2>

          {/* Smart Download Interface */}
          <div className="w-full relative z-20 max-w-2xl mx-auto">
             <DownloadInterface />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
