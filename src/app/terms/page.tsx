import React from 'react';
import styles from '../legal.module.css';

const TermsPage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.meta}>Effective January 2026</span>
        <h1 className={styles.title}>Terms of Service</h1>
      </header>

      <div className={styles.content}>
        <p>
          By using ReelSpot, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          Your access to and use of the ReelSpot service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          ReelSpot is a media downloader tool intended for personal, non-commercial use. You agree not to:
        </p>
        <ul>
          <li>Use the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
          <li>Infringe upon the intellectual property rights of others.</li>
          <li>Attempt to gain unauthorized access to any part of the service or its related systems.</li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property of ReelSpot and its licensors. ReelSpot is not responsible for the content downloaded by users from third-party platforms.
        </p>

        <h2>4. User Content</h2>
        <p>
          Our Service allows you to download content from third-party platforms. You represent and warrant that you have the right to download and use such content and that your use does not violate the terms of the source platform or any copyright laws.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall ReelSpot be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service or any content downloaded therefrom.
        </p>
      </div>

      <footer className={styles.footer}>
        <p>Terms updated January 10, 2026</p>
      </footer>
    </div>
  );
};

export default TermsPage;
