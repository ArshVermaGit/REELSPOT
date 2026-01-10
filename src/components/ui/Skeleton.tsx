'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({ 
  className, 
  variant = 'rectangular', 
  width, 
  height 
}: SkeletonProps) => {
  return (
    <motion.div
      className={cn(
        "bg-gray-100 relative overflow-hidden",
        variant === 'circular' ? "rounded-full" : "rounded-md",
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <div className="absolute inset-0 shimmer" />
    </motion.div>
  );
};

export default Skeleton;
