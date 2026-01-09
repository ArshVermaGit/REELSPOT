'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  showClose?: boolean;
  className?: string;
  isDismissible?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
  showClose = true,
  className = '',
  isDismissible = true
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid synchronous state update warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDismissible) onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isDismissible]);

  if (!mounted || !isOpen) return null;

  const sizeClass = {
    small: styles.contentSmall,
    medium: '',
    large: styles.contentLarge,
    full: styles.contentFull
  }[size];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isDismissible) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={`${styles.content} ${sizeClass} ${className}`}>
        {showClose && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
