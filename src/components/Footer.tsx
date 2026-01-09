'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Github, Youtube, Heart, Zap } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <Zap className={styles.logoDot} fill="currentColor" size={24} />
              REELSPOT
            </Link>
            <p className={styles.description}>
              The world&apos;s fastest and most premium media downloader. 
              Save your favorite content with cinematic quality and zero hassle.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={`${styles.socialIcon} ${styles.instagram}`} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.twitter}`} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.github}`} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.youtube}`} aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className={styles.columnTitle}>Product</h4>
            <ul className={styles.linkList}>
              <li><Link href="/features" className={styles.link}>Features</Link></li>
              <li><Link href="/history" className={styles.link}>Download History</Link></li>
              <li><Link href="/settings" className={styles.link}>Settings</Link></li>
              <li><Link href="/about" className={styles.link}>About Developer</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><Link href="/faq" className={styles.link}>Help Center & FAQ</Link></li>
              <li><Link href="/api-docs" className={styles.link}>API Reference</Link></li>
              <li><Link href="/status" className={styles.link}>System Status</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className={styles.columnTitle}>Legal</h4>
            <ul className={styles.linkList}>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
              <li><Link href="/cookies" className={styles.link}>Cookie Policy</Link></li>
              <li><Link href="/license" className={styles.link}>Licensing</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {currentYear} REELSPOT. All rights reserved.</p>
          
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>Privacy</Link>
            <Link href="/terms" className={styles.bottomLink}>Terms</Link>
            <Link href="/cookies" className={styles.bottomLink}>Cookies</Link>
          </div>

          <p>
            Designed with <Heart className={styles.heart} size={14} fill="currentColor" /> by <b>Arsh Verma</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
