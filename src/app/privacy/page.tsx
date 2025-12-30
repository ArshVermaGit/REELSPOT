'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Database, Settings, Cookie, Shield, UserCheck, RefreshCw, Clock } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'

const privacySections = [
  {
    icon: Database,
    title: 'Data Collection',
    content: (
      <>
        <p className="mb-4">
          ReelSpot is committed to protecting your privacy. We have designed our
          service to minimize data collection while providing the best user
          experience.
        </p>
        <h4 className="font-semibold text-foreground mb-2">What We Don&apos;t Collect:</h4>
        <ul className="list-disc list-inside space-y-1 text-foreground-muted">
          <li>Personal identification information</li>
          <li>Video URLs you process</li>
          <li>Download history</li>
          <li>IP addresses (beyond basic analytics)</li>
          <li>Device information</li>
        </ul>
      </>
    ),
  },
  {
    icon: Settings,
    title: 'Data Usage',
    content: (
      <>
        <p className="mb-4">
          We use minimal data solely to improve our service and ensure its proper
          functioning.
        </p>
        <ul className="list-disc list-inside space-y-1 text-foreground-muted">
          <li>Anonymous usage statistics to enhance performance</li>
          <li>Error reports for debugging purposes</li>
          <li>Temporary session information for functionality</li>
        </ul>
      </>
    ),
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    content: (
      <>
        <p className="mb-4">
          We use minimal cookies only for essential website functionality:
        </p>
        <ul className="space-y-2 text-foreground-muted">
          <li>
            <strong className="text-foreground">Essential Cookies:</strong> Required for
            basic site functionality
          </li>
          <li>
            <strong className="text-foreground">Analytical Cookies:</strong> Anonymous
            usage statistics (can be disabled)
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Shield,
    title: 'Security Measures',
    content: (
      <>
        <p className="mb-4">
          We implement robust security measures to protect your data:
        </p>
        <ul className="list-disc list-inside space-y-1 text-foreground-muted">
          <li>All data transmissions are encrypted using SSL/TLS</li>
          <li>Our infrastructure is regularly updated and monitored</li>
          <li>We don&apos;t store personal data or download history</li>
          <li>Regular security assessments and updates</li>
        </ul>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: (
      <>
        <p className="mb-4">
          You have certain rights regarding your personal data:
        </p>
        <ul className="space-y-2 text-foreground-muted">
          <li>
            <strong className="text-foreground">Right to Access:</strong> Request
            information about what data we have
          </li>
          <li>
            <strong className="text-foreground">Right to Erasure:</strong> Request
            deletion of any personal data
          </li>
          <li>
            <strong className="text-foreground">Right to Object:</strong> Object to
            certain types of data processing
          </li>
          <li>
            <strong className="text-foreground">Data Portability:</strong> Request a copy
            of your data
          </li>
        </ul>
        <p className="mt-4">
          To exercise any rights, contact us at:{' '}
          <a href="mailto:privacy@reelspot.com" className="text-primary hover:underline">
            privacy@reelspot.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: 'Policy Changes',
    content: (
      <>
        <p className="mb-4">
          We may update this privacy policy to reflect changes in our practices. We
          will notify users of any material changes through website notifications and
          email announcements.
        </p>
        <p className="text-foreground-muted">
          Your continued use of our services after changes constitutes acceptance of
          the updated policy.
        </p>
      </>
    ),
  },
]

export default function PrivacyPage() {
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
            Privacy <span className="text-gradient">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto mb-6"
          >
            Your privacy is important to us. Learn how we protect your data.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 text-sm text-foreground-muted"
          >
            <Clock className="w-4 h-4" />
            Last updated: January 2025
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="pb-24">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent-pink flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="grow">
                      <h2 className="text-lg font-bold text-foreground mb-4">{section.title}</h2>
                      <div className="text-foreground-muted text-sm leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <GlassCard className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">Questions About Privacy?</h3>
              <p className="text-foreground-muted mb-6">
                If you have any questions or concerns about our privacy practices,
                please don&apos;t hesitate to contact us.
              </p>
              <Link href="/contact">
                <GlowButton>Contact Us</GlowButton>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </>
  )
}
