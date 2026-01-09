'use client';

import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  History, Settings, LogOut
} from 'lucide-react';
import styles from './Auth.module.css';

import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const showTimer = setTimeout(() => setShowWelcome(true), 100);
      const hideTimer = setTimeout(() => setShowWelcome(false), 4000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [session]);

  if (!session?.user) return null;

  return (
    <div className={styles.dropdownContainer}>
      {showWelcome && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-black text-white px-6 py-3 rounded-2xl shadow-2xl animate-bounce flex items-center gap-2">
          <span>👋</span>
          <span className="font-bold">Welcome back, {session.user.name}!</span>
        </div>
      )}
      <div 
        className={styles.avatarWrapper}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image 
          src={session.user.image || ''} 
          alt="Avatar" 
          width={40} 
          height={40} 
          className="rounded-full border-2 border-white shadow-sm"
          unoptimized
        />
        <div className={styles.statusDot} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
          <div className={styles.dropdownMenu}>
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-bold truncate">{session.user.name}</p>
              <p className="text-xs text-secondary truncate">{session.user.email}</p>
            </div>
            <Link href="/history" className={styles.dropdownItem}>
            <History size={18} />
            <span>Download History</span>
          </Link>
          <Link href="/settings" className={styles.dropdownItem}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
            
            <div className="pt-2 mt-2 border-t border-gray-100">
              <div 
                className={`${styles.menuItem} ${styles.logoutItem}`}
                onClick={() => {
                  setIsOpen(false);
                  setIsLogoutOpen(true);
                }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </>
      )}

      <ConfirmationModal 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => signOut()}
        title="Sign Out?"
        description="You will need to sign in again to access your private history and sync your settings."
        confirmLabel="Logout Now"
        type="warning"
      />
    </div>
  );
}
