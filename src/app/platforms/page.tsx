'use client'

import { motion } from 'framer-motion'
import { PlatformGrid } from '@/components/ui'

export default function PlatformsPage() {

  return (
    <>
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
            Supported <span className="text-gradient">Platforms</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Download videos from all major social media platforms in the highest quality available
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <PlatformGrid />
        </div>
      </section>

      <section className="py-16 bg-black/3">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '100%', label: 'Free Service' },
              { value: '24/7', label: 'Availability' },
              { value: '5+', label: 'Platforms' },
              { value: '1M+', label: 'Downloads' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-foreground-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
