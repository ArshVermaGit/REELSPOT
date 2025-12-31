'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Bug, Lightbulb, Send, Loader2, CheckCircle, ShieldCheck, Zap, Orbit } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'

const contactMethods = [
  {
    icon: Mail,
    title: 'Extraction Support',
    description: "Neural bridge assistance for complex signal manifests.",
    link: 'mailto:support@reelspot.com',
    linkText: 'support@reelspot.com',
  },
  {
    icon: Bug,
    title: 'Signal Leak',
    description: 'Found a vulnerability or signal corruption? Report immediately.',
    link: 'mailto:bugs@reelspot.com',
    linkText: 'bugs@reelspot.com',
  },
  {
    icon: Lightbulb,
    title: 'Protocol Growth',
    description: "Architectural suggestions for the next system evolution.",
    link: 'mailto:ideas@reelspot.com',
    linkText: 'ideas@reelspot.com',
  },
]

const subjectOptions = [
  { value: '', label: 'Select Protocol' },
  { value: 'general', label: 'General Signal' },
  { value: 'support', label: 'Technical Bridge' },
  { value: 'bug', label: 'Corruption Report' },
  { value: 'feature', label: 'Architecture Request' },
  { value: 'other', label: 'Other Vector' },
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
        throw new Error(data.error || 'Connection handshake failed.')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neural bridge disconnected.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hyper-Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/2 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/1 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl mb-10 shadow-2xl"
          >
             <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Subspace Communication</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-black text-white mb-8 tracking-tighter"
          >
            SIGNAL <span className="text-white/10 italic">REACH</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-sm md:text-2xl"
          >
            Establish a secure connection with the lead architects for signals, leaks, or protocol evolutions.
          </motion.p>
        </div>
      </section>

      {/* Interface Section */}
      <section className="pb-32 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Intel Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-10"
            >
              <div>
                <h2 className="text-4xl font-heading font-black text-white mb-6 tracking-tight">Direct Access</h2>
                <p className="text-white/40 text-xl font-medium leading-relaxed mb-12">
                  Our neural network is always listening. Select the appropriate strata for your inquiry to ensure high-priority processing.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="p-8 flex gap-6 border-white/5 bg-white/2 group hover:border-white/40 transition-all duration-500 rounded-4xl">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-black text-white mb-2 tracking-tight">{method.title}</h3>
                        <p className="text-sm font-bold text-white/40 mb-3 leading-relaxed">
                          {method.description}
                        </p>
                        <a
                          href={method.link}
                          className="text-xs font-black text-white/60 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2"
                        >
                          {method.linkText}
                          <Orbit className="w-3 h-3 group-hover:rotate-180 transition-transform duration-1000" />
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Neural Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <GlassCard className="p-10 md:p-14 border-white/5 bg-white/3 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                  <Send className="w-64 h-64" />
                </div>
                
                {isSuccess ? (
                  <div className="text-center py-20 relative z-10">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-24 h-24 mx-auto mb-10 rounded-4xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-4xl font-heading font-black text-white mb-6 tracking-tight">Signal Received</h3>
                    <p className="text-white/40 text-lg font-bold mb-12 max-w-md mx-auto uppercase tracking-widest">
                      Extraction receipt confirmed. Our architects will decrypt your manifest soon.
                    </p>
                    <GlowButton onClick={() => setIsSuccess(false)} variant="secondary" className="px-12 py-5 rounded-2xl">
                      Deliver New Signal
                    </GlowButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                         <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-heading font-black text-white tracking-tight">Transmission Interface</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-4">
                          Extraction Identity
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-bold"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="email" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-4">
                          Secure Frequency
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-bold"
                          placeholder="john@extractions.io"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="subject" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-4">
                        Protocol Stratum
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-bold appearance-none cursor-pointer"
                      >
                        {subjectOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-background">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-4">
                        Signal Manifest
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-4xl px-8 py-6 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all font-bold resize-none"
                        placeholder="Detail your architecture or report corruption..."
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center px-4">
                         <div className="flex items-center gap-2 opacity-20">
                            <ShieldCheck className="w-3 h-3 text-white" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Neural Encryption Enabled</span>
                         </div>
                         <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                           {formData.message.length}/1000 VECTORS
                         </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 rounded-2xl bg-error/10 border border-error/20 text-error text-xs font-bold flex items-center gap-4"
                      >
                         <Zap className="w-5 h-5 shrink-0" />
                         {error}
                      </motion.div>
                    )}

                    <GlowButton
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full rounded-4xl py-6 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          PROCESSING HANDSHAKE...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          TRANSMIT SIGNAL
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
    </main>
  )
}

