'use client';

import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setProgress((currentScroll / totalScroll) * 100);
      } else {
        setProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        backgroundColor: '#3B82F6',
        backgroundImage: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
      }}
    />
  );
};

export default ScrollProgress;
