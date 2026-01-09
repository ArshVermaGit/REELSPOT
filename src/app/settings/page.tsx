import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import styles from '@/components/settings/Settings.module.css';

const SettingsPage = () => {
  return (
    <main className={styles.pageContainer}>
      <SettingsContainer />
    </main>
  );
};

export default SettingsPage;
