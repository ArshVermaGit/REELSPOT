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
        'bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative group',
        hover && 'transition-all duration-300 hover:border-white/30 hover:shadow-white/5 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
    sm: 'px-5 py-2 text-xs font-bold leading-none',
    md: 'px-7 py-3 text-sm font-bold leading-none',
    lg: 'px-10 py-5 text-base font-black uppercase tracking-widest leading-none',
  }

  const variantClasses = {
    primary:
      'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
    secondary:
      'bg-white/5 border border-white/10 text-white hover:border-white/40 hover:bg-white/10 shadow-lg',
    ghost:
      'bg-transparent text-white/50 hover:text-white hover:bg-white/5',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-2xl transition-all duration-300',
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
      transition={{ delay: delay * 0.1, duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.1 + 0.3, type: 'spring', stiffness: 100 }}
        className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {value}
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="h-0.5 w-12 bg-linear-to-r from-white/0 via-white/40 to-white/0" />
      <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em]">{label}</p>
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
      transition={{ delay: delay * 0.1, duration: 0.8 }}
      className="h-full"
    >
      <GlassCard className="p-10 group h-full border-white/5 bg-white/2">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 shadow-2xl">
          {icon}
        </div>
        
        <h3 className="text-2xl font-heading font-black text-white mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-white/50 text-base font-medium leading-relaxed">
          {description}
        </p>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-all duration-500">
           <span className="text-xs font-black uppercase tracking-widest text-white">Core Signal</span>
           <div className="grow h-px bg-white/20" />
           <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
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
      transition={{ delay: delay * 0.1, duration: 0.8 }}
      className="p-10 relative overflow-hidden group bg-background-subtle/30 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-primary/40 transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-8">
         <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-sm font-black text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
            {number}
         </div>
      </div>
      
      <div className="relative z-10 pt-16">
        <div className="text-[10px] font-black text-white/40 mb-6 tracking-[0.4em] uppercase flex items-center gap-3">
          <div className="w-8 h-px bg-white/20" />
          Protocol {number}
        </div>
        <h3 className="text-3xl font-heading font-black text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-white/40 text-base font-bold leading-relaxed max-w-[240px]">{description}</p>
      </div>
      
      {/* Visual noise background item */}
      <div className="absolute -bottom-10 -left-10 text-[10rem] font-heading font-black text-white/5 select-none group-hover:text-white/10 transition-colors duration-700">
        0{number}
      </div>
    </motion.div>
  )
}
