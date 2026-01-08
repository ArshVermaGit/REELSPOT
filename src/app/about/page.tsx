'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Rocket, Shield, Code2, Database, Cloud, Server, Cpu, Orbit, Sparkles } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'

const socialLinks = [
  { icon: Github, href: 'https://github.com/ArshVermaGit', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arshvermadev/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/TheArshVerma', label: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:arshvermadev@gmail.com', label: 'Email' },
]

const devStats = [
  { value: '1+', label: 'Years Experience' },
  { value: '50+', label: 'Deployments' },
  { value: '100K+', label: 'Network Points' },
]

const missionCards = [
  {
    icon: Rocket,
    title: 'Fast Downloads',
    description: 'ReelSpot provides seamless, high-speed downloads for capturing extraordinary digital moments. We believe in unrestricted access to content.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: "Security is non-negotiable. Our architecture ensures zero-log delivery and encrypted processing. Your history remains private.",
  },
  {
    icon: Sparkles,
    title: 'Premium Experience',
    description: 'We don\'t just build tools; we craft experiences. ReelSpot stands as a testament to premium design and engineering excellence.',
  },
]

const techStack = [
  { icon: Code2, name: 'Next.js 16' },
  { icon: Cpu, name: 'TypeScript' },
  { icon: Orbit, name: 'Framer Motion' },
  { icon: Database, name: 'PostgreSQL' },
  { icon: Cloud, name: 'Vercel' },
  { icon: Server, name: 'Prisma' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white/2 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-white/1 rounded-full blur-[140px]" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
                <div className="w-12 h-px bg-white/40" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">About Us</span>
                <div className="w-12 h-px bg-white/40" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-heading font-black text-white mb-8 tracking-tighter"
            >
              THE <span className="text-white/10 italic">TEAM</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 font-medium leading-relaxed uppercase tracking-widest text-sm md:text-2xl"
            >
              Building the future of digital content tools through premium design and precision.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <GlassCard className="p-12 border-white/5 bg-white/2 shadow-2xl relative overflow-hidden group rounded-4xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                   <Cpu className="w-24 h-24 text-white" />
                </div>
                
                <div className="relative w-48 h-48 mb-10 group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-black">
                    <Image
                      src="/images/arsh-verma.jpg"
                      alt="Arsh Verma"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      priority
                      unoptimized
                    />
                  </div>
                </div>

                <h3 className="text-4xl font-heading font-black text-white mb-2 tracking-tight transition-colors">Arsh Verma</h3>
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                  FOUNDER & DEVELOPER
                </p>
                <p className="text-white/40 text-lg font-bold leading-relaxed mb-10">
                  Dedicated to crafting digital tools that redefine the boundary between functionality and art.
                </p>

                <div className="flex gap-4 mb-12">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all shadow-xl"
                      title={link.label}
                    >
                      <link.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                  {devStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
                      <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <div className="lg:col-span-7 space-y-12">
              <div className="grid grid-cols-1 gap-6">
                {missionCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-10 flex flex-col md:flex-row gap-8 border-white/5 bg-white/2 group hover:border-white/30 transition-all duration-500 rounded-3xl">
                      <div className="shrink-0 w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                        <card.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-black text-white mb-3 tracking-tight">{card.title}</h3>
                        <p className="text-white/40 text-base font-bold leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-12"
              >
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-8 h-px bg-white/10" />
                   <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em]">Tech Stack</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-4xl bg-white/2 border border-white/5 flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <tech.icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-white/40 group-hover:text-white mb-0 uppercase tracking-widest leading-none">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
         <div className="container relative z-10 px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-10 tracking-tighter">
               READY TO <span className="text-white/20 italic">START?</span>
            </h2>
            <GlowButton size="lg" className="rounded-full">
               Get Started
            </GlowButton>
         </div>
      </section>
    </main>
  )
}
