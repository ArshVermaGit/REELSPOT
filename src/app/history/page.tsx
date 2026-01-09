'use client'

import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Film, Loader2, AlertCircle, Clock, Download as DownloadIcon } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui/Cards'
import { PlatformIcon } from '@/components/ui/PlatformCard'
import { formatDistanceToNow } from 'date-fns'
import { Platform } from '@/types'

interface DownloadRecord {
  id: string
  platform: string
  videoTitle: string | null
  thumbnail: string | null
  videoUrl: string
  downloadUrl: string | null
  createdAt: string
  quality: string | null
}

export default function HistoryPage() {
  const { status } = useSession()
  const [history, setHistory] = useState<DownloadRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/history' })
    }

    if (status === 'authenticated') {
      fetchHistory()
    }
  }, [status])

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history')
      if (!res.ok) throw new Error('Failed to load history')
      const data = await res.json()
      setHistory(data)
    } catch {
      setError('Could not load your history.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Vault...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/10" />
              <span className="text-xs font-black text-white/40 uppercase tracking-[0.4em]">Vault / History</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-4 tracking-tighter uppercase">
            Captured <span className="text-white/10 italic">Media</span>
          </h1>
          <p className="text-white/40 font-medium max-w-xl uppercase tracking-widest text-xs md:text-sm">
            Review your digital collection and previously extracted signals.
          </p>
        </div>
        <Link href="/">
          <GlowButton size="lg" className="rounded-full shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            New Extraction
          </GlowButton>
        </Link>
      </div>

      {error ? (
        <GlassCard className="p-16 flex flex-col items-center justify-center text-center border-red-500/20 bg-red-500/5 rounded-4xl">
          <AlertCircle className="w-12 h-12 text-red-500 mb-6" />
          <h3 className="text-xl font-heading font-black text-white mb-2 uppercase tracking-tight">System Interruption</h3>
          <p className="text-red-200/40 text-xs font-bold uppercase tracking-widest">{error}</p>
        </GlassCard>
      ) : history.length === 0 ? (
        <GlassCard className="p-24 text-center border-white/5 bg-white/2 rounded-4xl">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Film className="w-10 h-10 text-white/20" />
          </div>
          <h2 className="text-3xl font-heading font-black text-white mb-4 tracking-tight uppercase">Archive Empty</h2>
          <p className="text-white/20 font-bold mb-10 max-w-md mx-auto uppercase tracking-widest text-xs leading-relaxed">
            No signals have been logged in your vault yet. <br /> Start your first extraction to begin the archive.
          </p>
          <Link href="/">
            <GlowButton variant="secondary" className="px-12 py-5 rounded-2xl">
              Initialize Extraction
            </GlowButton>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="flex flex-col h-full overflow-hidden group border-white/5 bg-white/3 shadow-2xl rounded-4xl hover:border-white/20 transition-all duration-500">
                  <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.videoTitle || 'Video thumbnail'}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.5]"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <PlatformIcon platform={item.platform as Platform} size="lg" animated={false} />
                      </div>
                    )}
                    
                    <div className="absolute top-5 right-5 z-20">
                      <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <PlatformIcon platform={item.platform as Platform} size="sm" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-10">
                       {item.downloadUrl && (
                        <a 
                          href={item.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-white text-black rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-2xl flex items-center justify-center group/btn"
                        >
                          <DownloadIcon className="w-6 h-6 transition-transform group-hover/btn:-translate-y-0.5" />
                        </a>
                       )}
                       <a 
                          href={item.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-white/10 text-white rounded-2xl hover:scale-110 active:scale-90 transition-all border border-white/20 backdrop-blur-md flex items-center justify-center group/btn"
                        >
                          <ExternalLink className="w-6 h-6 transition-transform group-hover/btn:scale-110" />
                        </a>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col grow">
                    <h3 className="text-lg font-heading font-black text-white mb-3 line-clamp-2 leading-tight tracking-tight uppercase">
                      {item.videoTitle || 'Unknown Signal'}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-white/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">
                        {item.quality || 'N/A'}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </main>
  )
}
