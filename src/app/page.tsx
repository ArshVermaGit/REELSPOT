'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Shield, Zap, Github, Cpu } from 'lucide-react'
import { VideoDownloader, FeatureCard, AnimatedCounter, StepCard, GlowButton } from '@/components/ui'

export default function HomePage() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-1/4 w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Fast & Free Video Downloads</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            Download Videos
            <br />
            <span className="text-gradient">From Anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto text-foreground-muted text-lg md:text-xl leading-relaxed mb-12"
          >
            The simplest way to save videos from Instagram, TikTok, YouTube, Twitter, and Facebook. No sign-up required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <VideoDownloader />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="relative py-16 mb-24">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/3 to-transparent rounded-3xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 px-8">
            <AnimatedCounter value="100K+" label="Active Users" delay={1} />
            <AnimatedCounter value="1M+" label="Downloads" delay={2} />
            <AnimatedCounter value="99.9%" label="Uptime" delay={3} />
            <AnimatedCounter value="< 3s" label="Processing" delay={4} />
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 mb-24">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-px bg-linear-to-r from-primary to-accent-pink" />
                 <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4">
                Why Choose <span className="text-gradient">REELSPOT</span>?
              </h2>
              <p className="text-foreground-muted text-lg">
                Built with performance and simplicity in mind. Download your favorite content in seconds.
              </p>
            </div>
            <div className="lg:pt-8">
              <GlowButton variant="secondary" className="group">
                View on GitHub
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </GlowButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Lightning Fast" 
              description="Our optimized servers process and deliver your videos in seconds, not minutes."
              icon={<Zap className="w-6 h-6" />}
              delay={1}
            />
            <FeatureCard 
              title="Best Quality" 
              description="Always get the highest available resolution including 4K when available."
              icon={<Sparkles className="w-6 h-6" />}
              delay={2}
            />
            <FeatureCard 
              title="100% Private" 
              description="We don't track your downloads or store any personal information."
              icon={<Shield className="w-6 h-6" />}
              delay={3}
            />
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 relative">
          <div className="text-center mb-16">
             <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">How It Works</h3>
             <p className="text-foreground-muted">Three simple steps to download any video</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
             <StepCard 
                number="01" 
                title="Copy Link" 
                description="Copy the video URL from your social media app" 
                delay={1}
             />
             <StepCard 
                number="02" 
                title="Paste" 
                description="Paste the link above and we'll detect the platform" 
                delay={2}
             />
             <StepCard 
                number="03" 
                title="Download" 
                description="Choose quality and save directly to your device" 
                delay={3}
             />
          </div>
          
          <div className="mt-12 flex justify-center">
             <GlowButton size="lg" className="group">
                Start Downloading
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </GlowButton>
          </div>
        </section>

        {/* Floating decoration */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-1/4 right-[8%] p-4 rounded-2xl bg-white border border-black/8 shadow-lg opacity-60"
        >
          <Cpu className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </div>
  )
}
