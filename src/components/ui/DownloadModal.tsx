'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Download, Music, Image as ImageIcon, 
  Smartphone, Film, Loader2, Settings, 
  Zap, ShieldCheck, Repeat 
} from 'lucide-react'
import { GlowButton } from './Cards'
import { cn } from '@/lib/utils'
import { PLATFORMS, DownloadResult } from '@/types'
import { PlatformIcon } from './PlatformCard'
import Image from 'next/image'

// Extended functionality types
type DownloadType = 'video' | 'audio' | 'story' | 'reel' | 'post' | 'auto'
type Quality = '4k' | '1080p' | '720p' | '360p' | 'max'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlatform?: keyof typeof PLATFORMS | null
  initialUrl?: string
}

export function DownloadModal({ 
  isOpen, 
  onClose, 
  initialPlatform = null,
  initialUrl = '' 
}: DownloadModalProps) {
  const [url, setUrl] = useState(initialUrl)
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS | null>(initialPlatform || 'INSTAGRAM')
  const [downloadType, setDownloadType] = useState<DownloadType>('auto')
  const [quality, setQuality] = useState<Quality>('max')
  
  
  const [downloadState, setDownloadState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [progress, setProgress] = useState(0)
  
  // Reset state when opening/changing platform
  useEffect(() => {
    if (isOpen) {
      if (initialPlatform) setPlatform(initialPlatform)
      if (initialUrl) setUrl(initialUrl)
      setDownloadState('idle')
      setResult(null)
      setProgress(0)
    }
  }, [isOpen, initialPlatform, initialUrl])

  // Mock download process for demo/premium feel
  const handleDownload = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!url) return

    setDownloadState('processing')
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 300)

    try {
      // In a real app, we would pass type and quality here
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      clearInterval(interval)
      setProgress(100)
      
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error || 'Failed')
      
      setTimeout(() => {
        setResult(data)
        setDownloadState('success')
      }, 500)
      
    } catch {
       clearInterval(interval)
       setDownloadState('error')
    }
  }

  // Render content based on platform
  const renderPlatformOptions = () => {
    if (!platform) return null

    switch(platform) {
      case 'INSTAGRAM':
        return (
          <div className="flex gap-2 mb-6">
            <OptionButton 
              active={downloadType === 'reel' || downloadType === 'auto'} 
              onClick={() => setDownloadType('reel')}
              icon={<Smartphone className="w-4 h-4" />}
              label="Reels"
            />
            <OptionButton 
              active={downloadType === 'story'} 
              onClick={() => setDownloadType('story')}
              icon={<HistoryIcon className="w-4 h-4" />}
              label="Story"
            />
            <OptionButton 
              active={downloadType === 'post'} 
              onClick={() => setDownloadType('post')}
              icon={<ImageIcon className="w-4 h-4" />}
              label="Post"
            />
          </div>
        )
      case 'YOUTUBE':
        return (
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
               <OptionButton 
                active={downloadType === 'video' || downloadType === 'auto'} 
                onClick={() => setDownloadType('video')}
                icon={<Film className="w-4 h-4" />}
                label="Video"
              />
              <OptionButton 
                active={downloadType === 'audio'} 
                onClick={() => setDownloadType('audio')}
                icon={<Music className="w-4 h-4" />}
                label="Audio (MP3)"
              />
            </div>
            
            {/* Quality Selector */}
            {(downloadType === 'video' || downloadType === 'auto') && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <Settings className="w-4 h-4 text-white/50" />
                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Quality</span>
                <div className="grow" />
                <select 
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as Quality)}
                  className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer"
                >
                  <option value="max" className="bg-black">Best Available</option>
                  <option value="4k" className="bg-black">4K Ultra HD</option>
                  <option value="1080p" className="bg-black">1080p HD</option>
                  <option value="720p" className="bg-black">720p</option>
                </select>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-center sm:justify-between bg-white/2">
              <div className="flex items-center gap-4">
                 {platform && (
                   <PlatformIcon platform={platform} size="sm" animated={false} />
                 )}
                 <div>
                   <h2 className="text-lg font-black text-white tracking-tight">
                     {platform ? `${PLATFORMS[platform].name} Downloader` : 'Universal Loader'}
                   </h2>
                   <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                     Premium Gateway
                   </p>
                 </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              {downloadState === 'success' && result ? (
                 <SuccessView result={result} onReset={() => setDownloadState('idle')} />
              ) : (
                <form onSubmit={handleDownload}>
                   {renderPlatformOptions()}
                   
                   <div className="relative group mb-8">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <LinkIcon className="w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste link here..."
                        className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-medium"
                        autoFocus
                      />
                   </div>

                   <div className="flex flex-col gap-4">
                      {downloadState === 'processing' ? (
                        <div className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 relative overflow-hidden">
                           <div 
                              className="absolute inset-y-0 left-0 bg-white/10 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                           />
                           <Loader2 className="w-5 h-5 text-white animate-spin mr-3 relative z-10" />
                           <span className="text-white/70 font-bold text-sm relative z-10">Processing Signal...</span>
                           <span className="ml-auto text-white font-black text-sm relative z-10">{Math.round(progress)}%</span>
                        </div>
                      ) : (
                        <GlowButton 
                           type="submit" 
                           disabled={!url}
                           className="w-full py-4 text-base"
                        >
                           Initialize Download
                        </GlowButton>
                      )}
                      
                      {downloadState === 'error' && (
                         <p className="text-red-400 text-sm text-center font-medium mt-2">
                            Signal interrupted. Please check your link and try again.
                         </p>
                      )}
                   </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-bold uppercase tracking-widest">
               <span className="flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3" /> Secure Connection
               </span>
               <span className="flex items-center gap-2">
                 <Zap className="w-3 h-3" /> Turbo Extraction
               </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function OptionButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 text-sm font-bold",
        active 
          ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function SuccessView({ result, onReset }: { result: DownloadResult, onReset: () => void }) {
   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex gap-6">
            <div className="relative w-32 aspect-9/16 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
               {result.thumbnail ? (
                  <Image 
                    src={result.thumbnail} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                     <Film className="w-8 h-8" />
                  </div>
               )}
            </div>
            <div className="flex-1 min-w-0 py-2">
               <h3 className="text-white font-heading font-black text-xl leading-tight line-clamp-2 mb-2">
                  {result.title || "Content Extracted"}
               </h3>
               <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[10px] uppercase font-bold tracking-wider">
                     {result.platform}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[10px] uppercase font-bold tracking-wider">
                     Ready
                  </span>
               </div>
               <p className="text-white/40 text-xs line-clamp-2">
                  Ready for secure transfer to your local storage.
               </p>
            </div>
         </div>

         <div className="space-y-3">
            {result.downloads.map((dl, i) => (
               <a 
                  key={i}
                  href={dl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
               >
                  <div className="flex flex-col">
                     <span className="text-white font-bold text-sm group-hover:text-white transition-colors">{dl.quality}</span>
                     <span className="text-white/30 text-xs font-medium uppercase tracking-wider">{dl.format} • {dl.size ? (dl.size/1024/1024).toFixed(1) + 'MB' : 'Unknown Size'}</span>
                  </div>
                  <Download className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
               </a>
            ))}
         </div>
         
         <button 
           onClick={onReset}
           className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
         >
            <Repeat className="w-4 h-4" /> Download Another
         </button>
      </div>
   )
}

function LinkIcon({ className }: { className?: string }) {
   return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
         <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
         <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
   )
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20v-6M6 20V10M18 20V4" />
    </svg>
  )
}
