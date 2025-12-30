import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  
  return then.toLocaleDateString()
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export function detectPlatform(url: string): string {
  const urlLower = url.toLowerCase()
  if (urlLower.includes('instagram.com') || urlLower.includes('instagr.am')) return 'INSTAGRAM'
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'YOUTUBE'
  if (urlLower.includes('tiktok.com') || urlLower.includes('vm.tiktok')) return 'TIKTOK'
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return 'TWITTER'
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch')) return 'FACEBOOK'
  return 'OTHER'
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    INSTAGRAM: '#E4405F',
    YOUTUBE: '#FF0000',
    TIKTOK: '#00f2ea',
    TWITTER: '#1DA1F2',
    FACEBOOK: '#1877F2',
    OTHER: '#8b5cf6',
  }
  return colors[platform] || colors.OTHER
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
