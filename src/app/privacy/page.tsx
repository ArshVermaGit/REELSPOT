'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Database, Settings, Shield, Clock, ShieldAlert, Cpu } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'

const privacySections = [
  {
    icon: Database,
    title: 'Data Collection',
    content: (
      <div className="space-y-6">
        <p className="font-bold text-white/40 leading-relaxed">
          ReelSpot operates with minimal data collection. We don&apos;t store your downloads or personal information.
        </p>
        <div className="p-6 rounded-3xl bg-white/2 border border-white/10">
          <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">We Don&apos;t Collect:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 'Personal identification', 
                 'Video URLs you download', 
                 'Download history', 
                 'IP addresses', 
                 'Device information'
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 text-sm font-bold text-white/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    {item}
                 </li>
               ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: Settings,
    title: 'How We Use Data',
    content: (
      <div className="space-y-4">
        <p className="font-bold text-white/40 leading-relaxed">
          We only use anonymous data to improve our service and ensure system stability.
        </p>
        <div className="flex flex-wrap gap-2">
           {['Anonymous analytics', 'Error tracking', 'Session data'].map(tag => (
             <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/20">{tag}</span>
           ))}
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: 'Security',
    content: (
      <div className="space-y-4">
        <p className="font-bold text-white/40 leading-relaxed">
          We use industry-standard security measures to protect all data transmissions.
        </p>
        <ul className="space-y-3">
          <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 border-l-white/20 border-l-4">
             <ShieldAlert className="w-5 h-5 text-white/20 shrink-0" />
             <span className="text-sm font-bold text-white/30 leading-tight">All connections are encrypted with SSL/TLS.</span>
          </li>
        </ul>
      </div>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-40 pb-24 overflow-hidden px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/2 rounded-full blur-[140px]" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Last Updated: Jan 2026</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-black text-white mb-8 tracking-tighter"
          >
            PRIVACY <span className="text-white/10 italic">POLICY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-sm md:text-2xl"
          >
            How we handle your data and protect your privacy.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-10 md:p-14 border-white/5 bg-white/2 group hover:border-white/20 transition-all duration-700 rounded-4xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <section.icon className="w-48 h-48" />
                   </div>
                   
                   <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                           <section.icon className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-heading font-black text-white tracking-tight">{section.title}</h2>
                    </div>
                    
                    <div className="max-w-3xl">
                       {section.content}
                    </div>
                   </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <GlassCard className="p-16 text-center border-white/10 bg-white/5 rounded-4xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 blur-[80px]" />
              <div className="relative z-10">
                <Cpu className="w-12 h-12 text-white/40 mx-auto mb-8 animate-spin-slow" />
                <h3 className="text-3xl font-heading font-black text-white mb-4 tracking-tight">Questions?</h3>
                <p className="text-white/30 text-lg font-bold mb-10 max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
                  If you have any questions about our privacy policy, feel free to contact us.
                </p>
                <Link href="/contact">
                  <GlowButton size="lg" className="rounded-full px-12 py-5 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    Contact Us
                  </GlowButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
