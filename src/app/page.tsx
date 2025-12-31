'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Shield, Zap, Github, Cpu, Orbit, Layers, MousePointer2 } from 'lucide-react'
import { VideoDownloader, FeatureCard, AnimatedCounter, StepCard, GlowButton, PlatformGrid } from '@/components/ui'

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative min-h-screen pt-40 pb-32 overflow-hidden bg-black">
      {/* Cinematic Background Elements - Monochrome */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[45%] h-[45%] bg-white/2 rounded-full blur-[80px]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Floating Icons Parallax - Monochrome */}
        <motion.div style={{ y: y1, opacity }} className="absolute top-20 right-10 hidden lg:block opacity-10">
           <Orbit className="w-24 h-24 text-white animate-spin-slow" />
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-40 left-0 hidden lg:block opacity-5">
           <Layers className="w-32 h-32 text-white" />
        </motion.div>

        {/* Hero Section - Monochrome */}
        <div className="text-center mb-40 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/3 border border-white/10 mb-12 backdrop-blur-md shadow-2xl"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">System.Zero Extraction Vector</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-heading font-black tracking-tighter text-white mb-10 leading-[0.9] outline-none"
          >
            CAPTURE THE 
            <br />
            <span className="text-gradient-prism drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">ZERO POINT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-white/40 font-medium leading-relaxed mb-20 px-4 uppercase tracking-widest text-sm md:text-xl"
          >
            High-fidelity signal acquisition. Decrypted content delivery. 
            No interference. Just pure permanence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 50 }}
            className="relative"
          >
            <div className="absolute -inset-24 bg-white/2 rounded-full blur-[120px] pointer-events-none" />
            <VideoDownloader />
          </motion.div>
        </div>

        {/* Dynamic Stats Grid - Monochrome */}
        <div className="relative py-32 mb-40">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            <AnimatedCounter value="1.2M+" label="Neural Extracts" delay={1} />
            <AnimatedCounter value="100%" label="Signal Integrity" delay={2} />
            <AnimatedCounter value="0.0s" label="Latency Delay" delay={3} />
            <AnimatedCounter value="CORE" label="Engine Status" delay={4} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Supported Platforms Section */}
        <section className="py-20 mb-32 relative">
          <div className="absolute inset-0 bg-white/2 skew-y-3 transform origin-top-left -z-10 h-full w-full rounded-[100px] blur-3xl opacity-20" />
          
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Universal Compatibility</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-6 tracking-tighter">
              ALL SIGNALS <br /> <span className="text-white/20">ACCEPTED</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/40 font-medium leading-relaxed uppercase tracking-widest text-sm">
              Advanced manifest extraction for every major social vector. 
              Automatically optimized for maximum fidelity.
            </p>
          </div>

          <PlatformGrid />
        </section>

        {/* Features Section - Monochrome */}
        <section className="py-20 mb-32" id="features">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                  <div className="w-12 h-px bg-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Extraction Interface</span>
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter text-white mb-10 leading-tight">
                ZERO <br /> <span className="text-white/10 italic">INTERFERENCE.</span>
              </h2>
              <p className="text-white/40 font-medium max-w-xl leading-relaxed uppercase tracking-widest text-sm md:text-xl">
                Every strata of the interface is optimized for absolute visual clarity. 
                Stateless, secure, and visually superior.
              </p>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GlowButton variant="secondary" className="px-10 py-6 rounded-2xl border-white/10 bg-white/3 backdrop-blur-3xl group">
                Access Protocol
                <Github className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </GlowButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Stateless Core" 
              description="Zero-log processing ensures your extraction identity remains your sovereign data."
              icon={<Zap className="w-7 h-7 text-white" />}
              delay={1}
            />
            <FeatureCard 
              title="High-Fidelity" 
              description="Neural scaling identifies the peak definition available across every digital vector."
              icon={<Sparkles className="w-7 h-7 text-white" />}
              delay={2}
            />
            <FeatureCard 
              title="Secure Bridge" 
              description="Encrypted manifests delivered directly to your vault in milliseconds."
              icon={<Shield className="w-7 h-7 text-white" />}
              delay={3}
            />
          </div>
        </section>

        {/* Workflow Section - Monochrome */}
        <section className="py-24 relative overflow-hidden rounded-5xl bg-white/2 border border-white/10 p-12 md:p-32">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-10" />
          
          <div className="text-center mb-32 relative">
             <h3 className="text-5xl md:text-7xl font-heading font-black text-white mb-8 tracking-tighter">THE MANIFEST</h3>
             <p className="text-white/30 font-black uppercase tracking-[0.5em] text-[10px]">Three stages to digital zero</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
             <StepCard 
                number="01" 
                title="Siphon" 
                description="Acquire a vector link from any social grid support." 
                delay={1}
             />
             <StepCard 
                number="02" 
                title="Decrypt" 
                description="Our engine establishes a neural bridge to capture data." 
                delay={2}
             />
             <StepCard 
                number="03" 
                title="Manifest" 
                description="High-definition content delivered to your secure vault." 
                delay={3}
             />
          </div>
          
          <div className="mt-32 flex justify-center relative z-10">
             <GlowButton size="lg" className="group px-16 py-8 rounded-full text-lg shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_70px_rgba(255,255,255,0.2)] transition-all">
                Access Interface
                <MousePointer2 className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
             </GlowButton>
          </div>
        </section>

        {/* Floating decoration - Monochrome */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-1/3 right-[5%] p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-3xl shadow-2xl opacity-20 hover:opacity-100 transition-opacity"
        >
          <Cpu className="w-10 h-10 text-white" />
        </motion.div>
      </div>
    </div>
  )
}
