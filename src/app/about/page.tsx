'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Rocket, Shield, Heart, RefreshCw, Code2, Database, Cloud, Server } from 'lucide-react'
import { GlassCard } from '@/components/ui'

const socialLinks = [
  { icon: Github, href: 'https://github.com/ArshVermaGit', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arshvermadev/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/TheArshVerma', label: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:arshvermadev@gmail.com', label: 'Email' },
]

const devStats = [
  { value: '1+', label: 'Years Experience' },
  { value: '50+', label: 'Projects' },
  { value: '100K+', label: 'Users' },
]

const missionCards = [
  {
    icon: Rocket,
    title: 'Our Mission',
    description: 'ReelSpot was created to provide a simple, fast, and free solution for downloading social media content. We believe that everyone should have access to their favorite videos without complicated processes or hidden costs.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: "Your privacy is our top priority. We don't store any of your data, track your downloads, or require registration. All downloads are processed securely and anonymously.",
  },
  {
    icon: Heart,
    title: 'Why Choose Us',
    description: 'ReelSpot stands out with its user-friendly interface, lightning-fast downloads, and commitment to being completely free. We continuously update our platform to support new features and maintain compatibility.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    description: 'We regularly update our platform to support new features, fix bugs, and ensure compatibility with the latest social media platform changes.',
  },
]

const techStack = [
  { icon: Code2, name: 'Next.js' },
  { icon: Code2, name: 'TypeScript' },
  { icon: Code2, name: 'React' },
  { icon: Database, name: 'PostgreSQL' },
  { icon: Cloud, name: 'Vercel' },
  { icon: Server, name: 'Prisma' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-pink/6 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            About <span className="text-gradient">ReelSpot</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Learn more about our mission and the developer behind the fastest video downloader
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Developer Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <GlassCard className="p-8 text-center">
                {/* Avatar */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-accent-pink rounded-full blur-xl opacity-30" />
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="/images/arsh-verma.jpg"
                      alt="Arsh Verma"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">Arsh Verma</h3>
                <p className="text-primary font-medium mb-4">
                  Full Stack Developer & Creator
                </p>
                <p className="text-foreground-muted text-sm mb-6">
                  Passionate about building tools that make life easier for content creators and social media enthusiasts.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-2 mb-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-black/5 border border-black/8 flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                      title={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
                  {devStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-xs text-foreground-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Mission Cards */}
            <div className="lg:col-span-2 space-y-5">
              {missionCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent-pink flex items-center justify-center shadow-lg shadow-primary/20">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-foreground-muted text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-black/3">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">Built With Modern Technology</h2>
            <p className="text-foreground-muted">
              We use the latest technologies for the best performance
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white border border-black/8 shadow-sm flex items-center justify-center">
                  <tech.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm text-foreground-muted font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
