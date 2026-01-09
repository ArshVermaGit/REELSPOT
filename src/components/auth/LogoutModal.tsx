'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import styles from './Auth.module.css';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogOut size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-xl font-bold mb-2">Sign Out</h2>
        <p className="text-gray-500 mb-8">Are you sure you want to sign out of your account?</p>

        <div className="flex gap-3">
          <button 
            className="flex-1 py-3 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            Yes, Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
