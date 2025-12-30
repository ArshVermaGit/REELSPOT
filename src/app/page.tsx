'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Shield, Zap, Github, Cpu, Orbit, Layers, MousePointer2 } from 'lucide-react'
import { VideoDownloader, FeatureCard, AnimatedCounter, StepCard, GlowButton } from '@/components/ui'

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative min-h-screen pt-40 pb-32 overflow-hidden bg-background">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[45%] h-[45%] bg-accent-indigo/10 rounded-full blur-[140px]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Floating Icons Parallax */}
        <motion.div style={{ y: y1, opacity }} className="absolute top-20 right-10 hidden lg:block opacity-20">
           <Orbit className="w-24 h-24 text-primary animate-spin-slow" />
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-40 left-0 hidden lg:block opacity-10">
           <Layers className="w-32 h-32 text-accent-cyan" />
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 mb-10 backdrop-blur-md shadow-2xl"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>
            <span className="text-xs font-black text-foreground uppercase tracking-[0.3em]">Next-Gen Video Acquisition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-heading font-black tracking-tighter text-foreground mb-8 leading-[0.95] perspective-1000"
          >
            SAVE THE 
            <br />
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">EXTRAORDINARY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-foreground/60 text-xl font-medium leading-relaxed mb-16 px-4"
          >
            Experience the industry&apos;s most advanced content bridge. High-fidelity downloads from any social vector, delivered in milliseconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 50 }}
            className="relative"
          >
            <div className="absolute -inset-20 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <VideoDownloader />
          </motion.div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="relative py-24 mb-40">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            <AnimatedCounter value="500K+" label="Global Users" delay={1} />
            <AnimatedCounter value="5M+" label="Neural Processed" delay={2} />
            <AnimatedCounter value="99.9%" label="Engine Status" delay={3} />
            <AnimatedCounter value="< 2s" label="Response Time" delay={4} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Features Section */}
        <section className="py-20 mb-32" id="features">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                  <div className="w-12 h-px bg-linear-to-r from-primary to-accent-indigo" />
                  <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">Integrated Core</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-foreground mb-8 leading-tight">
                VISUAL <br /> <span className="text-foreground/20 italic">PRECISION.</span>
              </h2>
              <p className="text-foreground/50 text-xl font-medium max-w-xl">
                Every line of code is optimized for sensory delight. No tracking, no ads, just pure performance.
              </p>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GlowButton variant="secondary" className="px-10 py-5 rounded-3xl border-white/5 bg-white/5 backdrop-blur-3xl group">
                Engineering Docs
                <Github className="w-5 h-5 group-hover:rotate-360 transition-transform duration-700" />
              </GlowButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Hyper-Threaded" 
              description="Proprietary multiplexing technology for simultaneous quality scraping at maximum speeds."
              icon={<Zap className="w-7 h-7 text-primary" />}
              delay={1}
            />
            <FeatureCard 
              title="4K Fidelity" 
              description="Automated resolution scaling ensures you always receive the peak definition available."
              icon={<Sparkles className="w-7 h-7 text-accent-cyan" />}
              delay={2}
            />
            <FeatureCard 
              title="Vault Security" 
              description="Stateless processing architecture wipes every trace of your interaction upon delivery."
              icon={<Shield className="w-7 h-7 text-accent-indigo" />}
              delay={3}
            />
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 relative overflow-hidden rounded-[4rem] bg-white/2 border border-white/5 p-12 md:p-24">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-20" />
          
          <div className="text-center mb-24 relative">
             <h3 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6 tracking-tighter">The Process</h3>
             <p className="text-foreground/40 font-bold uppercase tracking-widest text-sm">Three stages to digital permanence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
             <StepCard 
                number="01" 
                title="Identify" 
                description="Secure a link from any of our supported social vectors." 
                delay={1}
             />
             <StepCard 
                number="02" 
                title="Synchronize" 
                description="Our engine identifies and prepares the content stream." 
                delay={2}
             />
             <StepCard 
                number="03" 
                title="Manifest" 
                description="High-fidelity file is delivered directly to your vault." 
                delay={3}
             />
          </div>
          
          <div className="mt-20 flex justify-center relative z-10">
             <GlowButton size="lg" className="group px-12 py-6 rounded-full text-lg shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.25)] transition-all">
                Access Interface
                <MousePointer2 className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
             </GlowButton>
          </div>
        </section>

        {/* Floating decoration */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-1/3 right-[5%] p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl opacity-40 hover:opacity-100 transition-opacity"
        >
          <Cpu className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    </div>
  )
}
