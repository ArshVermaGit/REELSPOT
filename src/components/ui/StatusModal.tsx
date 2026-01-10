'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import Modal from './Modal';
import ReelBot from './ReelBot';
import styles from './Modal.module.css';

type StatusType = 'loading' | 'success' | 'error';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: StatusType;
  title: string;
  message: string;
  onRetry?: () => void;
  actionLabel?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onRetry,
  actionLabel
}) => {
  const [countdown, setCountdown] = React.useState(5);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && type === 'error' && onRetry && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && onRetry) {
      onRetry();
    }
    return () => clearInterval(timer);
  }, [isOpen, type, countdown, onRetry]);

  const renderCelebration = () => {
    if (type !== 'success') return null;
    return (
      <div className={styles.celebrationContainer}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={styles.confetti}
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  const getMood = () => {
    switch (type) {
      case 'success': return 'happy';
      case 'error': return 'error';
      default: return 'idle';
    }
  };

  const statusClass = {
    success: styles.statusSuccess,
    error: styles.statusError,
    loading: styles.statusLoading
  }[type];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="small" 
      showClose={type !== 'loading'}
      isDismissible={type !== 'loading'}
    >
      {renderCelebration()}
      
      <div className={`${styles.header} ${statusClass} justify-center py-6`}>
        <ReelBot mood={getMood()} size={100} interactive={false} />
      </div>

      <div className={styles.body}>
        <h3 className="text-xl font-black mb-2">{title}</h3>
        <p className="text-gray-500 font-medium">{message}</p>
      </div>

      {(type === 'error' || type === 'success') && (
        <div className={styles.footer}>
          <button 
            className="w-full py-4 rounded-2xl font-bold bg-black text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
            onClick={type === 'error' && onRetry ? onRetry : onClose}
          >
            {type === 'error' && onRetry ? (
              <>
                Retrying in {countdown}s...
                <RefreshCw className="animate-spin" size={18} />
              </>
            ) : actionLabel || 'Understood'}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default StatusModal;
