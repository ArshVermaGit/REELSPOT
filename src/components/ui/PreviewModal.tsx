'use client';

import React from 'react';
import Modal from './Modal';
import Image from 'next/image';
import styles from './Modal.module.css';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  type?: 'image' | 'video';
  title?: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  type = 'image',
  title
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={true} size="full" className={styles.previewContent}>
      <div className={styles.mediaWrapper}>
        {type === 'image' ? (
          <Image 
            src={mediaUrl} 
            alt={title || 'Preview'} 
            className={styles.media}
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        ) : (
          <video 
            src={mediaUrl} 
            controls 
            autoPlay 
            className={styles.media}
            style={{ width: 'auto', height: '100%' }}
          />
        )}
      </div>
      
      {title && (
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <h3 className="text-white text-xl font-bold bg-black/50 backdrop-blur-md inline-block px-6 py-3 rounded-full">
            {title}
          </h3>
        </div>
      )}
    </Modal>
  );
};

export default PreviewModal;
