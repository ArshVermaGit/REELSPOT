export interface VideoDownload {
  id: string
  platform: Platform
  videoUrl: string
  videoTitle?: string
  thumbnail?: string
  quality?: string
  downloadUrl?: string
  status: DownloadStatus
  createdAt: Date
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export interface DownloadResult {
  success: boolean
  platform: Platform
  title?: string
  thumbnail?: string
  duration?: number
  downloads: DownloadOption[]
  error?: string
}

export interface DownloadOption {
  quality: string
  format: string
  url: string
  size?: number
}

export type Platform = 
  | 'INSTAGRAM'
  | 'YOUTUBE'
  | 'TIKTOK'
  | 'TWITTER'
  | 'FACEBOOK'
  | 'OTHER'

export type DownloadStatus = 
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'

export type Role = 'USER' | 'ADMIN'

export interface PlatformInfo {
  name: string
  icon: string
  color: string
  gradient: string
  features: string[]
  description: string
}

export const PLATFORMS: Record<string, PlatformInfo> = {
  INSTAGRAM: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    features: ['Reels', 'Stories', 'Posts', 'IGTV'],
    description: 'Download Reels, Stories, Posts, and IGTV videos in HD quality',
  },
  YOUTUBE: {
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    gradient: 'from-red-600 to-red-500',
    features: ['4K Videos', 'MP4 & MP3', 'Subtitles', 'Playlists'],
    description: 'Download YouTube videos in multiple quality options including 4K',
  },
  TIKTOK: {
    name: 'TikTok',
    icon: 'tiktok',
    color: '#00f2ea',
    gradient: 'from-cyan-400 via-pink-500 to-red-500',
    features: ['No Watermark', 'HD Quality', 'Original Sound', 'Fast Download'],
    description: 'Download TikTok videos without watermark in best quality',
  },
  TWITTER: {
    name: 'X (Twitter)',
    icon: 'twitter',
    color: '#1DA1F2',
    gradient: 'from-blue-400 to-blue-600',
    features: ['Tweets', 'GIFs', 'Multiple Qualities', 'Quick Processing'],
    description: 'Download videos from X (formerly Twitter) in high quality',
  },
  FACEBOOK: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    gradient: 'from-blue-600 to-blue-700',
    features: ['All Formats', 'Reels & Stories', 'Private Videos', 'High Quality'],
    description: 'Download Facebook videos, reels, and stories easily',
  },
}

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Platforms', href: '/platforms' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export interface Stat {
  value: string
  label: string
  icon: string
}

export const STATS: Stat[] = [
  { value: '100K+', label: 'Active Users', icon: 'users' },
  { value: '1M+', label: 'Downloads', icon: 'download' },
  { value: '5', label: 'Platforms', icon: 'globe' },
  { value: '4.9/5', label: 'Rating', icon: 'star' },
]

export interface Feature {
  title: string
  description: string
  icon: string
}

export const FEATURES: Feature[] = [
  { title: 'Lightning Fast', description: 'Download videos in seconds with our optimized servers', icon: 'zap' },
  { title: 'HD Quality', description: 'Get videos in the highest quality available', icon: 'film' },
  { title: '100% Secure', description: 'Your privacy is our priority. No data stored', icon: 'shield' },
  { title: 'Mobile Friendly', description: 'Works perfectly on all devices', icon: 'smartphone' },
  { title: 'Unlimited Downloads', description: 'No limits, no registration required', icon: 'infinity' },
  { title: '100% Free', description: 'Completely free, forever', icon: 'dollar-sign' },
]

export interface Step {
  number: number
  title: string
  description: string
  icon: string
}

export const STEPS: Step[] = [
  { number: 1, title: 'Copy URL', description: 'Copy the video link from your favorite platform', icon: 'copy' },
  { number: 2, title: 'Paste & Analyze', description: 'Paste the URL and let us analyze it', icon: 'clipboard' },
  { number: 3, title: 'Download', description: 'Choose quality and download instantly', icon: 'download' },
]
