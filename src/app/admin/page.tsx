'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  Users, 
  Download, 
  Trash2, 
  MailOpen, 
  Reply, 
  FileDown,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui'
import { formatTimeAgo } from '@/lib/utils'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

interface Stats {
  totalFeedback: number
  unreadFeedback: number
  thisMonthFeedback: number
  totalUsers: number
  totalDownloads: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [statsRes, feedbackRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/feedback'),
      ])

      if (!statsRes.ok || !feedbackRes.ok) {
        if (session?.user?.role !== 'ADMIN') {
          throw new Error('You do not have admin access')
        }
        throw new Error('Failed to fetch data')
      }

      const statsData = await statsRes.json()
      const feedbackData = await feedbackRes.json()

      setStats(statsData.stats)
      setContacts(feedbackData.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/admin' })
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData()
    }
  }, [status, fetchData])

  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read }),
      })

      if (res.ok) {
        setContacts(prev =>
          prev.map(c => (c.id === id ? { ...c, read } : c))
        )
        if (stats) {
          setStats({
            ...stats,
            unreadFeedback: read 
              ? stats.unreadFeedback - 1 
              : stats.unreadFeedback + 1,
          })
        }
      }
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return

    try {
      const res = await fetch(`/api/admin/feedback?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        const deleted = contacts.find(c => c.id === id)
        setContacts(prev => prev.filter(c => c.id !== id))
        if (stats && deleted) {
          setStats({
            ...stats,
            totalFeedback: stats.totalFeedback - 1,
            unreadFeedback: deleted.read 
              ? stats.unreadFeedback 
              : stats.unreadFeedback - 1,
          })
        }
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const handleExport = () => {
    if (contacts.length === 0) return

    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date', 'Read']
    const rows = contacts.map(c => [
      c.name,
      c.email,
      c.subject,
      c.message.replace(/"/g, '""'),
      new Date(c.createdAt).toLocaleString(),
      c.read ? 'Yes' : 'No',
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reelspot-feedback-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-24">
        <GlassCard className="p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-error" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-foreground-muted">{error}</p>
        </GlassCard>
      </div>
    )
  }

  const statItems = [
    { label: 'Total Feedback', value: stats?.totalFeedback || 0, icon: MessageSquare, color: 'text-primary' },
    { label: 'Unread', value: stats?.unreadFeedback || 0, icon: Mail, color: 'text-accent-pink' },
    { label: 'This Month', value: stats?.thisMonthFeedback || 0, icon: Calendar, color: 'text-accent-cyan' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-success' },
    { label: 'Downloads', value: stats?.totalDownloads || 0, icon: Download, color: 'text-accent-violet' },
  ]

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-6 border-b border-black/8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-foreground-muted">
                Welcome back, {session?.user?.name || 'Admin'}
              </p>
            </div>
            <GlowButton onClick={fetchData} variant="secondary">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="p-5 text-center">
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-foreground-muted">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback List */}
      <section className="pb-24">
        <div className="container">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                User Feedback
              </h2>
              <GlowButton variant="secondary" size="sm" onClick={handleExport}>
                <FileDown className="w-4 h-4" />
                Export
              </GlowButton>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 mx-auto mb-4 text-foreground-muted/30" />
                <p className="text-foreground-muted">No feedback messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border transition-colors ${
                      contact.read
                        ? 'border-white/5 bg-white/5'
                        : 'border-primary/30 bg-primary/10'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="grow">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-white font-bold text-sm">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{contact.name}</h4>
                            <p className="text-sm text-foreground-muted">{contact.email}</p>
                          </div>
                        </div>
                        <div className="ml-13">
                          <h5 className="font-medium text-foreground text-sm mb-1">{contact.subject}</h5>
                          <p className="text-sm text-foreground-muted line-clamp-2">
                            {contact.message}
                          </p>
                          <p className="text-xs text-foreground-muted mt-2">
                            {formatTimeAgo(contact.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-13 md:ml-0">
                        <button
                          onClick={() => handleMarkRead(contact.id, !contact.read)}
                          className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                          title={contact.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {contact.read ? (
                            <Mail className="w-4 h-4 text-foreground-muted" />
                          ) : (
                            <MailOpen className="w-4 h-4 text-primary" />
                          )}
                        </button>
                        <a
                          href={`mailto:${contact.email}`}
                          className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                          title="Reply"
                        >
                          <Reply className="w-4 h-4 text-foreground-muted" />
                        </a>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 rounded-lg hover:bg-error/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </section>
    </>
  )
}
