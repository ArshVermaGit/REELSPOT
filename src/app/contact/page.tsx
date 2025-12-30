'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Bug, Lightbulb, Send, Loader2, CheckCircle } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: "Send us an email and we'll respond within 24 hours",
    link: 'mailto:support@reelspot.com',
    linkText: 'support@reelspot.com',
  },
  {
    icon: Bug,
    title: 'Report Issue',
    description: 'Found a bug or having trouble? Let us know',
    link: 'mailto:bugs@reelspot.com',
    linkText: 'bugs@reelspot.com',
  },
  {
    icon: Lightbulb,
    title: 'Suggestions',
    description: "Have ideas to improve ReelSpot? We'd love to hear",
    link: 'mailto:ideas@reelspot.com',
    linkText: 'ideas@reelspot.com',
  },
]

const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Contact <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Get in touch with us for any questions, feedback, or support
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Let&apos;s Talk</h2>
              <p className="text-foreground-muted mb-8">
                We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <GlassCard className="p-5 flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-linear-to-br from-primary to-accent-pink flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                        <method.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                        <p className="text-sm text-foreground-muted mb-1">
                          {method.description}
                        </p>
                        <a
                          href={method.link}
                          className="text-sm text-primary hover:underline"
                        >
                          {method.linkText}
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-8">
                {isSuccess ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-foreground-muted mb-6">
                      Thank you for contacting us. We&apos;ll get back to you soon.
                    </p>
                    <GlowButton onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </GlowButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h3>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject <span className="text-error">*</span>
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input"
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input textarea"
                        placeholder="How can we help you?"
                        maxLength={1000}
                      />
                      <div className="text-right text-xs text-foreground-muted mt-1">
                        {formData.message.length}/1000
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
                        {error}
                      </div>
                    )}

                    <GlowButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </GlowButton>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
