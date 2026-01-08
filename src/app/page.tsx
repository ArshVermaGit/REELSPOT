'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowRight, Check, Instagram, Youtube, Music2, Clapperboard } from 'lucide-react'
import Image from 'next/image'
import { isValidUrl, detectPlatform } from '@/lib/utils'
import { DownloadResult } from '@/types'

function HomeContent() {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') || ''
  
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")
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
        throw new Error(data.error || 'Something went wrong')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setIsLoading(false)
    }
  }

  const platform = url ? detectPlatform(url) : null

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Hero */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            Download videos from <br />
            <span className="text-gradient">anywhere</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-md mx-auto"
          >
            Paste a link from Instagram, YouTube, TikTok, or Twitter. 
            Get your video in seconds.
          </motion.p>
        </section>

        {/* Download Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-24"
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(null); }}
              placeholder="Paste video link here..."
              className="input pr-32"
            />
            
            <button
              type="submit"
              disabled={isLoading || !url}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Download
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Platform Badge */}
            <AnimatePresence>
              {platform && platform !== 'OTHER' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-8 left-4 text-xs text-muted flex items-center gap-2"
                >
                  <Check className="w-3 h-3 text-green-500" />
                  {platform} link detected
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm mt-4 text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card p-6">
                <div className="flex gap-6">
                  {/* Thumbnail */}
                  {result.thumbnail && (
                    <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <Image
                        src={result.thumbnail}
                        alt={result.title || 'Video'}
                        width={160}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate mb-1">
                      {result.title || 'Video ready'}
                    </h3>
                    <p className="text-sm text-muted mb-4">
                      {result.platform} • {result.downloads.length} format{result.downloads.length > 1 ? 's' : ''} available
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {result.downloads.map((dl, i) => (
                        <a
                          key={i}
                          href={dl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary text-sm py-2 px-4"
                        >
                          <Download className="w-4 h-4" />
                          {dl.quality}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setResult(null); setUrl(''); }}
                className="mt-4 text-sm text-muted hover:text-foreground transition-colors mx-auto block"
              >
                Download another video
              </button>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Platforms */}
        {!result && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-center text-sm text-muted mb-6">Works with</p>
            <div className="flex justify-center gap-8">
              {[
                { icon: Instagram, name: 'Instagram' },
                { icon: Youtube, name: 'YouTube' },
                { icon: Music2, name: 'TikTok' },
                { icon: Clapperboard, name: 'Twitter' },
              ].map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors">
                  <p.icon className="w-6 h-6" />
                  <span className="text-xs">{p.name}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  )
}
