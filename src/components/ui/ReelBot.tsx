'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ReelBotProps {
  mood?: 'idle' | 'happy' | 'error' | 'sleepy';
  className?: string;
  size?: number;
  interactive?: boolean;
}

const ReelBot = ({ 
  mood = 'idle', 
  className = '', 
  size = 120,
  interactive = true 
}: ReelBotProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentMood, setCurrentMood] = useState(mood);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position relative to center
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePos({ x, y });

      // Reset idle timer
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), 15000); // 15s to "sleepy"
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [interactive]);

  const getTransform = () => {
    if (isIdle || currentMood === 'sleepy') return 'scale(0.95)';
    if (currentMood === 'happy') return 'scale(1.1) rotate(5deg)';
    if (currentMood === 'error') return 'scale(0.9) rotate(-10deg) translateX(5px)';
    
    // Look at cursor effect
    return `translate(${mousePos.x}px, ${mousePos.y}px)`;
  };

  return (
    <div 
      className={`relative inline-block transition-all duration-300 ease-out ${className}`}
      style={{ width: size, height: size }}
    >
      <div 
        className="relative transition-transform duration-150 ease-out h-full w-full"
        style={{ transform: getTransform() }}
      >
        <Image 
          src="/assets/mascot.png"
          alt="ReelBot Mascot"
          width={size}
          height={size}
          className={`object-contain transition-all duration-1000 ${isIdle || currentMood === 'sleepy' ? 'opacity-60 grayscale' : 'opacity-100'}`}
          priority
        />
        
        {/* Animated Overlays based on state */}
        {currentMood === 'happy' && (
          <div className="absolute top-0 right-0 animate-bounce text-2xl">✨</div>
        )}
        {(isIdle || currentMood === 'sleepy') && (
          <div className="absolute -top-2 -right-2 animate-pulse text-sm font-black text-gray-400">ZZZ</div>
        )}
        {currentMood === 'error' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold blur-[1px] animate-pulse">!</div>
        )}
      </div>

      {/* Subtle Shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/5 rounded-full blur-md transition-all duration-300"
        style={{ transform: `scale(${isIdle ? 0.8 : 1.2})` }}
      />
    </div>
  );
};

export default ReelBot;
