'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Download, Play, AlertCircle, Sparkles, X, ChevronRight, Share2, Clipboard, Check } from 'lucide-react'
import { GlassCard } from './Cards'
import { isValidUrl, detectPlatform, getPlatformColor } from '@/lib/utils'
import { DownloadResult } from '@/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface VideoDownloaderProps {
  onDownload?: (url: string, result: DownloadResult) => void
}

export function VideoDownloader({ onDownload }: VideoDownloaderProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Please paste a video URL to get started.')
      return
    }

    if (!isValidUrl(url)) {
      setError("That doesn't look like a valid URL.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setResult(data)
      onDownload?.(url, data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const platform = url ? detectPlatform(url) : null
  const platformColor = platform ? getPlatformColor(platform) : null

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Command Bar */}
      <div className="relative z-50">
        <form onSubmit={handleSubmit} className="relative group">
          <motion.div
            layout
            initial={false}
            animate={{
              scale: isFocused ? 1.01 : 1,
              y: isFocused ? -2 : 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative bg-white border rounded-2xl overflow-hidden transition-all duration-300',
              isFocused 
                ? 'border-primary shadow-xl shadow-primary/10' 
                : 'border-black/10 shadow-lg'
            )}
          >
            {/* Focus indicator bar */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-accent-pink to-primary origin-left"
                />
              )}
            </AnimatePresence>

            <div className="flex items-center px-6 py-5 gap-4">
              <div className="shrink-0">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sparkle"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Sparkles className={cn(
                        "w-6 h-6 transition-colors duration-300",
                        isFocused ? "text-primary" : "text-foreground-muted"
                      )} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setError(null)
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Paste your video link here..."
                className="grow bg-transparent border-none text-foreground text-lg placeholder:text-foreground-muted/50 focus:outline-none focus:ring-0 font-medium"
              />

              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {url && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={() => { setUrl(''); setResult(null); setError(null); }}
                      className="p-2.5 rounded-full hover:bg-black/5 text-foreground-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || !url}
                  className={cn(
                    "group/btn flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                    url && !isLoading 
                      ? "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark hover:shadow-lg" 
                      : "bg-black/5 text-foreground-muted cursor-not-allowed"
                  )}
                >
                  <span>Download</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Platform Detection Badge */}
          <AnimatePresence>
            {platform && platform !== 'OTHER' && (
               <motion.div
                 initial={{ opacity: 0, y: 8, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 8, scale: 0.9 }}
                 className="absolute -top-3 left-6 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-semibold shadow-md flex items-center gap-2"
               >
                 <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: platformColor || '#3b82f6' }} />
                 {platform} detected
               </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Error State */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="p-5 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-4 text-red-600 max-w-xl mx-auto"
          >
            <div className="p-2.5 bg-red-100 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Oops!</p>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Result Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Video Preview */}
                <div className="relative lg:w-[380px] shrink-0 group overflow-hidden bg-black/5">
                   <div className="aspect-video relative overflow-hidden">
                    {result.thumbnail ? (
                      <Image
                        src={result.thumbnail}
                        alt={result.title || 'Video Preview'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent-pink/10 flex items-center justify-center">
                        <Play className="w-12 h-12 text-foreground-muted/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm inline-block mb-2">
                        <span className="text-[10px] font-semibold tracking-wide text-foreground uppercase">{platform}</span>
                      </div>
                      <h4 className="text-white font-heading font-bold text-lg leading-tight line-clamp-2">
                        {result.title || 'Video Ready'}
                      </h4>
                    </motion.div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="grow p-6 lg:p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">Available Formats</span>
                      <p className="text-foreground-muted text-sm mt-0.5">Choose your preferred quality</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                         onClick={() => window.open(url, '_blank')}
                         className="p-2.5 rounded-xl bg-black/5 hover:bg-black/10 transition-colors text-foreground-muted hover:text-foreground"
                       >
                         <Share2 className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={handleCopy}
                         className="p-2.5 rounded-xl bg-black/5 hover:bg-black/10 transition-colors text-foreground-muted hover:text-foreground"
                        >
                         {copied ? <Check className="w-4 h-4 text-success" /> : <Clipboard className="w-4 h-4" />}
                       </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {result.downloads.map((dl, i) => (
                      <motion.a
                        key={i}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center justify-between px-5 py-4 rounded-xl bg-black/3 border border-black/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group/dl"
                      >
                        <div className="flex flex-col">
                          <span className="text-foreground font-semibold group-hover/dl:text-primary transition-colors">{dl.quality}</span>
                          <div className="flex items-center gap-2 text-foreground-muted">
                            <span className="text-xs font-medium uppercase">{dl.format}</span>
                            {dl.size && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-foreground-muted/30" />
                                <span className="text-xs">{(dl.size/1024/1024).toFixed(1)}MB</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-black/10 group-hover/dl:bg-primary group-hover/dl:border-primary group-hover/dl:text-white transition-all duration-200">
                          <Download className="w-4 h-4" />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-auto pt-5 border-t border-black/8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                       </div>
                       <div>
                         <span className="text-xs font-semibold text-foreground block">Download Ready</span>
                         <span className="text-[10px] text-foreground-muted">Secure & fast delivery</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => { setResult(null); setUrl(''); }}
                      className="px-4 py-2 rounded-lg border border-black/10 text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-black/5 transition-all"
                    >
                      New Download
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
