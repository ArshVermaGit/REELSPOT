'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'History', href: '/history' },
    { name: 'Settings', href: '/settings' },
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
              
              {/* Profile/Login (Placeholder) */}
              <button className={styles.avatarButton} aria-label="User Profile">
                <User size={20} />
              </button>

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
