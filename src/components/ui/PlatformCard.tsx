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
        className="p-6 h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
      >
        {/* Platform Icon */}
        <div
          className={cn(
            'relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto',
            'bg-linear-to-br shadow-lg transition-all duration-300',
            info.gradient,
            'group-hover:scale-110 group-hover:shadow-xl'
          )}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-center mb-2 text-foreground group-hover:text-primary transition-colors">
          {info.name}
        </h3>
        <p className="text-foreground-muted text-sm text-center mb-5 grow">
          {info.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-5">
          {info.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2.5 text-sm text-foreground-muted"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: `${info.color}15`, color: info.color }}
              >
                ✓
              </div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <GlowButton
          variant="primary"
          className="w-full"
          onClick={onClick}
        >
          Download Now
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
        'bg-white border border-black/10 shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:border-primary/20',
        sizeClasses[size],
        className
      )}
    >
      <IconComponent
        className={cn(
          iconSizes[size],
          'text-foreground-muted transition-colors duration-200'
        )}
        style={{ color: info.color }}
      />
    </motion.div>
  )
}

export function PlatformIconsRow() {
  const platforms = Object.keys(PLATFORMS) as Array<keyof typeof PLATFORMS>

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
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
                'w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center',
                'bg-white border border-black/10 shadow-sm',
                'transition-all duration-200',
                'hover:border-primary/30 hover:shadow-md'
              )}
            >
              <IconComponent
                className="w-6 h-6 md:w-7 md:h-7 transition-colors"
                style={{ color: info.color }}
              />
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
