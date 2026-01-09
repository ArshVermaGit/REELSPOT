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
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          disabled={isLoading}
          onClick={handleGoogleSignIn}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Image 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              width={18}
              height={18}
              unoptimized
            />
          )}
          {isLoading ? 'Connecting...' : 'Continue with Google'}
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
