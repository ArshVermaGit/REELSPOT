'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { X, Check } from 'lucide-react';
import styles from './Auth.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to save your history and sync across devices</p>

        <button 
          className={styles.googleButton}
          onClick={() => signIn('google')}
        >
          <Image 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            width={18}
            height={18}
            unoptimized
          />
          Continue with Google
        </button>

        <div 
          className={styles.rememberMe}
          onClick={() => setRememberMe(!rememberMe)}
        >
          <div className={`${styles.checkbox} ${rememberMe ? styles.checkboxChecked : ''}`}>
            {rememberMe && <Check size={14} color="white" />}
          </div>
          <span className="text-sm font-medium">Remember me for 30 days</span>
        </div>
      </div>
    </div>
  );
}
