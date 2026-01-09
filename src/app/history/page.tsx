import React from 'react';
import HistoryContainer from '@/components/history/HistoryContainer';
import styles from '@/components/history/History.module.css';

const HistoryPage = () => {
  return (
    <main className={styles.pageContainer}>
      <HistoryContainer />
    </main>
  );
};

export default HistoryPage;
