'use client';

import React from 'react';
import Modal from './Modal';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
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

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={28} />;
      case 'error': return <XCircle size={28} />;
      case 'loading': return <RefreshCw className="animate-spin" size={28} />;
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
      
      <div className={`${styles.header} ${statusClass} justify-center`}>
        <div className={styles.headerIcon}>
          {getIcon()}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className="text-xl font-black mb-2">{title}</h3>
        <p className="text-gray-500 font-medium">{message}</p>
      </div>

      {(type === 'error' || type === 'success') && (
        <div className={styles.footer}>
          <button 
            className="w-full py-4 rounded-2xl font-bold bg-black text-white hover:opacity-90 transition-all"
            onClick={type === 'error' && onRetry ? onRetry : onClose}
          >
            {type === 'error' && onRetry ? 'Retry Action' : actionLabel || 'Understood'}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default StatusModal;
