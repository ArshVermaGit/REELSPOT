'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Film, Loader2, AlertCircle, Clock } from 'lucide-react'
import { GlassCard } from '@/components/ui/Cards'
import { formatDistanceToNow } from 'date-fns'

interface DownloadRecord {
  id: string
  platform: string
  videoTitle: string | null
  thumbnail: string | null
  videoUrl: string
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
      redirect('/auth/signin?callbackUrl=/history')
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
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
              Download <span className="text-white/40">History</span>
            </h1>
            <p className="text-white/60 font-medium max-w-lg">
              Your recent downloads. Access previously downloaded videos here.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/40">
            <Clock className="w-4 h-4" />
            <span>Last 30 Days</span>
          </div>
        </div>

        {error ? (
          <GlassCard className="p-8 flex flex-col items-center justify-center text-center border-red-500/20 bg-red-500/5">
            <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
            <p className="text-red-200 font-medium">{error}</p>
          </GlassCard>
        ) : history.length === 0 ? (
          <GlassCard className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
               <Film className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No downloads yet</h3>
            <p className="text-white/40 mb-8 max-w-sm">
              Your download history is empty. Start downloading to see your history here.
            </p>
            <Link 
              href="/"
              className="px-8 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Start Downloading
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-4 flex gap-4 md:gap-6 items-center hover:bg-white/5 transition-colors group">
                  <div className="relative w-24 md:w-32 aspect-video bg-black/50 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    {item.thumbnail ? (
                      <Image 
                        src={item.thumbnail} 
                        alt={item.videoTitle || 'Video'} 
                        fill 
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="w-6 h-6 text-white/20" />
                      </div>
                    )}
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[8px] font-bold uppercase text-white backdrop-blur-sm">
                       {item.platform}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base md:text-lg mb-1 truncate pr-4">
                      {item.videoTitle || 'Untitled Video'}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                      {item.quality && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 border border-white/5 uppercase tracking-wider text-[10px]">
                          {item.quality}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4 pl-4 border-l border-white/5">
                     <a 
                       href={item.videoUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="p-2 md:p-3 rounded-xl hover:bg-white/10 text-white/30 hover:text-white transition-colors"
                       title="View Original"
                     >
                        <ExternalLink className="w-5 h-5" />
                     </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
