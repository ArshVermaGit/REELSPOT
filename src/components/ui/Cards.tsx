'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white border border-black/8 rounded-3xl shadow-md overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface GlowButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2 text-xs font-semibold',
    md: 'px-6 py-3 text-sm font-semibold',
    lg: 'px-8 py-4 text-base font-semibold',
  }

  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30',
    secondary:
      'bg-white border border-black/10 text-foreground hover:border-primary/30 hover:shadow-md',
    ghost:
      'bg-transparent text-foreground-muted hover:text-foreground hover:bg-black/5',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

interface AnimatedCounterProps {
  value: string
  label: string
  delay?: number
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col items-center text-center space-y-2"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1 + 0.2, type: 'spring', stiffness: 100 }}
        className="text-4xl md:text-6xl font-heading font-black text-foreground tracking-tight"
      >
        {value}
      </motion.div>
      <div className="h-px w-8 bg-linear-to-r from-primary to-accent-pink" />
      <p className="text-foreground-muted text-xs uppercase font-semibold tracking-wider">{label}</p>
    </motion.div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  delay?: number
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <GlassCard className="p-8 group h-full">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
          {icon}
        </div>
        
        <h3 className="text-xl font-heading font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-foreground-muted text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="mt-6 pt-6 border-t border-black/8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-xs font-semibold text-primary">Learn more</span>
           <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </GlassCard>
    </motion.div>
  )
}

interface StepCardProps {
  number: string
  title: string
  description: string
  delay?: number
}

export function StepCard({ number, title, description, delay = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.6 }}
      className="p-8 relative overflow-hidden group bg-white rounded-3xl border border-black/8 shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="text-[5rem] font-heading font-black text-primary/10 leading-none absolute -bottom-2 -right-2 group-hover:text-primary/15 transition-colors duration-300">
        {number}
      </div>
      
      <div className="relative z-10">
        <div className="text-xs font-semibold text-primary mb-4 tracking-wider uppercase flex items-center gap-2">
          <div className="w-6 h-px bg-primary/30" />
          Step {number}
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-3">{title}</h3>
        <p className="text-foreground-muted text-sm leading-relaxed max-w-[200px]">{description}</p>
      </div>
    </motion.div>
  )
}
