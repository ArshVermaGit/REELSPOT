'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Download, Play, AlertCircle, Sparkles, X, Share2, Clipboard, Check, Terminal, ShieldCheck, Zap } from 'lucide-react'
import { GlassCard } from './Cards'
import { isValidUrl, detectPlatform } from '@/lib/utils'
import { DownloadResult } from '@/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface VideoDownloaderProps {
  onDownload?: (url: string, result: DownloadResult) => void
  initialUrl?: string
}

export function VideoDownloader({ onDownload, initialUrl = '' }: VideoDownloaderProps) {
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Please provide a secure content vector.')
      return
    }

    if (!isValidUrl(url)) {
      setError("Invalid signal. Ensure the vector URL is correct.")
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
        throw new Error(data.error || 'Interface processing failed.')
      }

      setResult(data)
      onDownload?.(url, data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neural bridge disconnected.')
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

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* Magic Command Bar */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative group">
          <motion.div
            layout
            initial={false}
            animate={{
              scale: isFocused ? 1.02 : 1,
              y: isFocused ? -4 : 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={cn(
              'relative bg-white/2 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-3xl shadow-2xl',
              isFocused 
                ? 'border-white shadow-[0_0_40px_rgba(255,255,255,0.1)]' 
                : 'border-white/5'
            )}
          >
            {/* Animated Gradient Border */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                   <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent opacity-50" />
                   <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent opacity-50" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center px-8 py-6 gap-6">
              <div className="shrink-0">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    >
                      <Loader2 className="w-7 h-7 text-white animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="terminal"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Terminal className={cn(
                        "w-7 h-7 transition-all duration-500",
                        isFocused ? "text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-white/20"
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
                placeholder="Enter social vector link..."
                className="grow bg-transparent border-none text-foreground text-xl md:text-2xl placeholder:text-foreground/10 focus:outline-none focus:ring-0 font-bold tracking-tight"
              />

              <div className="flex items-center gap-3">
                <AnimatePresence>
                  {url && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      type="button"
                      onClick={() => { setUrl(''); setResult(null); setError(null); }}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-foreground/40 hover:text-white transition-all border border-white/5"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || !url}
                  className={cn(
                    "group/btn relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 overflow-hidden",
                    url && !isLoading 
                      ? "bg-white text-black shadow-lg shadow-white/10 hover:scale-105 hover:bg-neutral-200" 
                      : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                  )}
                >
                  <span className="relative z-10">Extract</span>
                  {url && !isLoading && (
                    <Sparkles className="w-4 h-4 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Platform Intelligence Badge */}
          <AnimatePresence>
            {platform && platform !== 'OTHER' && (
               <motion.div
                 initial={{ opacity: 0, y: 15, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 15, scale: 0.9 }}
                 className="absolute -top-4 right-10 px-5 py-2 rounded-full bg-black border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3"
               >
                 <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
                 {platform} Detected
               </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Error Interface */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="p-6 rounded-3xl bg-error/10 border border-error/20 flex items-center gap-5 text-error max-w-2xl mx-auto backdrop-blur-3xl shadow-2xl"
          >
            <div className="p-3 bg-error/20 rounded-2xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest mb-1">Signal Error</p>
              <p className="text-sm font-bold opacity-80">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Result Interface */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            <GlassCard className="p-0 border-white/10 bg-background-subtle/30 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col lg:flex-row">
                {/* Visual Preview */}
                <div className="relative lg:w-[420px] shrink-0 group overflow-hidden">
                   <div className="aspect-video relative overflow-hidden bg-white/5">
                    {result.thumbnail ? (
                      <Image
                        src={result.thumbnail}
                        alt={result.title || 'Video Preview'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-white/10 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{result.platform} Vector</span>
                      </div>
                      <h4 className="text-white font-heading font-black text-2xl leading-[1.1] tracking-tight line-clamp-2 drop-shadow-lg">
                        {result.title || 'Manifest Ready'}
                      </h4>
                    </motion.div>
                  </div>
                </div>

                {/* Processing Controls */}
                <div className="grow p-10 lg:p-12 flex flex-col">
                   <div className="flex items-center justify-between mb-10 pb-8 border-b border-white/5">
                    <div>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Available Strata</span>
                      <p className="text-white/40 text-sm font-bold mt-1 uppercase tracking-widest">Select Output Quality</p>
                    </div>
                    <div className="flex gap-3">
                       <button 
                         onClick={() => window.open(url, '_blank')}
                         className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center text-white/40 hover:text-white"
                       >
                         <Share2 className="w-5 h-5" />
                       </button>
                       <button 
                         onClick={handleCopy}
                         className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center text-white/40 hover:text-white"
                        >
                         {copied ? <Check className="w-5 h-5 text-white" /> : <Clipboard className="w-5 h-5" />}
                       </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {result.downloads.map((dl, i) => (
                      <motion.a
                        key={i}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.4 }}
                        className="flex items-center justify-between px-6 py-5 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-500 group/dl"
                      >
                         <div className="flex flex-col">
                          <span className="text-white font-black text-sm uppercase tracking-widest group-hover/dl:text-white transition-colors">{dl.quality}</span>
                          <div className="flex items-center gap-3 text-white/30 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{dl.format}</span>
                            {dl.size && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                <span className="text-[10px] font-bold">{(dl.size/1024/1024).toFixed(1)}MB</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/20 group-hover/dl:bg-white group-hover/dl:border-white group-hover/dl:text-black transition-all duration-300 flex items-center justify-center">
                          <Download className="w-5 h-5" />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <ShieldCheck className="w-6 h-6 text-white" />
                       </div>
                       <div>
                         <span className="text-xs font-black text-white uppercase tracking-widest block">Neural Verified</span>
                         <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-none">Safe delivery enabled</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => { setResult(null); setUrl(''); }}
                      className="px-8 py-3.5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                    >
                      Purge & Reset
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Micro-Animations */}
      {!result && !error && (
        <div className="flex justify-center items-center gap-12 opacity-20 pt-8">
           <div className="flex items-center gap-3 grayscale cursor-default">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ultra Speed</span>
           </div>
           <div className="flex items-center gap-3 grayscale cursor-default">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Zero Logs</span>
           </div>
        </div>
      )}
    </div>
  )
}
