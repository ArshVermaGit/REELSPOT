'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Sparkles, Shield, Zap, Download, Instagram, Youtube, Music2, Clapperboard } from 'lucide-react'
import { VideoDownloader, GlowButton } from '@/components/ui'
import Link from 'next/link'

function HomeContent() {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') || ''

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Free Video Downloader</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight text-white mb-6">
            Download videos <br />
            <span className="text-white/30">from anywhere</span>
          </h1>

          <p className="max-w-lg mx-auto text-white/40 text-lg mb-12">
            Save videos from Instagram, YouTube, TikTok, and Twitter. 
            Fast, free, and in the best quality.
          </p>

          <div className="max-w-2xl mx-auto">
            <VideoDownloader initialUrl={initialUrl} />
          </div>
        </section>

        {/* Platforms */}
        <section className="mb-20">
          <p className="text-center text-sm text-white/30 mb-6">Works with</p>
          <div className="flex justify-center gap-12">
            {[
              { icon: Instagram, name: 'Instagram' },
              { icon: Youtube, name: 'YouTube' },
              { icon: Music2, name: 'TikTok' },
              { icon: Clapperboard, name: 'Twitter' },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 text-white/20 hover:text-white/60 transition-colors">
                <p.icon className="w-6 h-6" />
                <span className="text-xs">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Zap, title: 'Fast', desc: 'Download in seconds' },
            { icon: Sparkles, title: 'HD Quality', desc: 'Best available quality' },
            { icon: Shield, title: 'Secure', desc: 'No data stored' },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white/3 border border-white/10">
              <f.icon className="w-6 h-6 text-white mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-white/40">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-heading font-bold text-white mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Copy link', desc: 'Copy the video URL' },
              { step: '2', title: 'Paste', desc: 'Paste it above' },
              { step: '3', title: 'Download', desc: 'Click download' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 text-white font-bold flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-white/40">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link href="/platforms">
            <GlowButton size="lg" className="rounded-full">
              <Download className="w-5 h-5" />
              View All Platforms
            </GlowButton>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  )
}
