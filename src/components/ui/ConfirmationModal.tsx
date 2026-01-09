'use client';

import React from 'react';
import Modal from './Modal';
import { AlertCircle, Trash2, Check } from 'lucide-react';
import styles from './Modal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  type = 'info',
  isLoading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger': return <Trash2 size={24} />;
      case 'warning': return <AlertCircle size={24} />;
      default: return <Check size={24} />;
    }
  };

  const statusClass = {
    danger: styles.statusError,
    warning: styles.statusError,
    info: styles.statusLoading
  }[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <div className={`${styles.header} ${statusClass}`}>
        <div className={styles.headerIcon}>
          {getIcon()}
        </div>
      </div>
      
      <div className={styles.body}>
        <h3 className="text-xl font-black mb-2">{title}</h3>
        <p className="text-gray-500 font-medium">{description}</p>
      </div>

      <div className={styles.footer}>
        <button 
          className="flex-1 py-3 px-4 rounded-2xl font-bold bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-white transition-opacity ${
            type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:opacity-90'
          }`}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
