'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, X, User } from 'lucide-react';
import styles from './Navbar.module.css';
import LoginModal from './auth/LoginModal';
import UserDropdown from './auth/UserDropdown';

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    const handleOpenLogin = () => setIsLoginOpen(true);
    window.addEventListener('open-login', handleOpenLogin as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-login', handleOpenLogin as EventListener);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'History', href: '/history' },
    { name: 'Features', href: '/features' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navContainer}>
            
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              Reelspot
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions & Mobile Toggle */}
            <div className={styles.actions}>
              
              {session ? (
                <UserDropdown />
              ) : (
                <button 
                  className={styles.avatarButton} 
                  onClick={() => setIsLoginOpen(true)}
                  aria-label="Sign In"
                >
                  <User size={20} />
                </button>
              )}

              {/* Hamburger Button */}
              <button 
                className={styles.mobileToggle} 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </aside>
    </>
  );
};

export default Navbar;
