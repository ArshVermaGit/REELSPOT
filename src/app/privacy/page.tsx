import React from 'react';
import styles from '../legal.module.css';

const PrivacyPage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.meta}>Effective January 2026</span>
        <h1 className={styles.title}>Privacy Policy</h1>
      </header>

      <div className={styles.content}>
        <p>
          At ReelSpot, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our media downloading services.
        </p>

        <h2>1. Data Collection</h2>
        <p>
          We collect minimal data required to provide our services:
        </p>
        <ul>
          <li><b>Authentication Data:</b> When you sign in with Google, we receive your name, email, and profile picture.</li>
          <li><b>Usage History:</b> If authenticated, we store the URLs and titles of the videos you download to provide your personal history dashboard.</li>
          <li><b>Technical Data:</b> Standard server logs including IP addresses and browser types for security and optimization.</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>
          Your data is used exclusively to:
        </p>
        <ul>
          <li>Provide and maintain your personal download history.</li>
          <li>Synchronize your settings and API keys across devices.</li>
          <li>Improve application performance and fix technical issues.</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>
          We implement industry-standard security measures to protect your data. Your API keys are stored securely and are never shared with third parties. We do not sell your personal information to advertisers.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use essential cookies to maintain your session and remember your preferences (such as Dark Mode). You can manage cookie consent in the Privacy tab of your Settings.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, export, or delete your data at any time. You can clear your download history or delete your account through the Settings dashboard.
        </p>
      </div>

      <footer className={styles.footer}>
        <p>Questions? Contact our privacy team at privacy@reelspot.com</p>
      </footer>
    </div>
  );
};

export default PrivacyPage;
