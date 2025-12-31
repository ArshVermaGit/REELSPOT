'use client'

import { motion } from 'framer-motion'
import { Instagram, Youtube, Twitter, Facebook, Globe } from 'lucide-react'
import { GlassCard, GlowButton } from './Cards'
import { PLATFORMS } from '@/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// TikTok icon (not in Lucide)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

const ICON_MAP: Record<string, React.ElementType> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon,
  twitter: Twitter,
  facebook: Facebook,
  globe: Globe,
}

interface PlatformCardProps {
  platform: keyof typeof PLATFORMS
  delay?: number
  onClick?: () => void
}

export function PlatformCard({ platform, delay = 0, onClick }: PlatformCardProps) {
  const info = PLATFORMS[platform]
  const IconComponent = ICON_MAP[info.icon] || Globe

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.08, duration: 0.5 }}
      className="group"
    >
      <GlassCard
        className="p-8 h-full flex flex-col border-white/5 bg-white/2"
        whileHover={{ scale: 1.02 }}
      >
        {/* Platform Icon - Monochrome */}
        <div
          className={cn(
            'relative w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto',
            'bg-white text-black shadow-2xl transition-all duration-500',
            'group-hover:scale-110 group-hover:shadow-white/10'
          )}
        >
          <IconComponent className="w-10 h-10" />
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-black text-center mb-3 text-white tracking-tight group-hover:text-neutral-300 transition-colors">
          {info.name}
        </h3>
        <p className="text-white/40 text-sm text-center mb-8 grow font-medium leading-relaxed">
          {info.description}
        </p>

        {/* Features - Monochrome */}
        <ul className="space-y-4 mb-8">
          {info.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3.5 text-xs font-bold text-white/60 uppercase tracking-widest"
            >
              <div
                className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <GlowButton
          variant="primary"
          className="w-full py-5 rounded-2xl"
          onClick={onClick}
        >
          Establish Bridge
        </GlowButton>
      </GlassCard>
    </motion.div>
  )
}

interface PlatformIconProps {
  platform: keyof typeof PLATFORMS
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export function PlatformIcon({
  platform,
  size = 'md',
  className,
  animated = true,
}: PlatformIconProps) {
  const info = PLATFORMS[platform]
  const IconComponent = ICON_MAP[info.icon] || Globe

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <motion.div
      whileHover={animated ? { scale: 1.1, y: -2 } : undefined}
      className={cn(
        'rounded-xl flex items-center justify-center',
        'bg-white/5 border border-white/10 shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:border-white/40',
        sizeClasses[size],
        className
      )}
    >
      <IconComponent
        className={cn(
          iconSizes[size],
          'text-white transition-colors duration-200'
        )}
      />
    </motion.div>
  )
}

export function PlatformIconsRow() {
  const platforms = Object.keys(PLATFORMS) as Array<keyof typeof PLATFORMS>

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {platforms.map((platform, index) => {
        const info = PLATFORMS[platform]
        const IconComponent = ICON_MAP[info.icon] || Globe

        return (
          <motion.div
            key={platform}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="group"
          >
            <Link
              href={`/platforms#${platform.toLowerCase()}`}
              className={cn(
                'w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center',
                'bg-white/5 border border-white/10 shadow-sm',
                'transition-all duration-300',
                'hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
              )}
            >
              <IconComponent
                className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform"
              />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
