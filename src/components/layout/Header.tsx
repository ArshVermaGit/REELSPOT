'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, Shield, ChevronDown } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/types'

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'py-4 bg-background/40 backdrop-blur-2xl border-b border-white/5'
          : 'py-6 bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-accent-indigo flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-500">
                <span className="text-white font-heading font-black text-xl italic">R</span>
              </div>
              <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-heading font-black tracking-tighter text-foreground">
              REEL<span className="text-primary tracking-widest ml-1">SPOT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                    isActive
                      ? 'text-white'
                      : 'text-foreground/60 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="hidden md:flex items-center gap-4">
                {session.user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all group"
                    title="Admin Console"
                  >
                    <Shield className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  </Link>
                )}
                
                <div className="h-8 w-px bg-white/10 mx-1" />
                
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                   <div className="w-8 h-8 rounded-full border border-white/20 p-0.5 overflow-hidden group-hover:border-primary/50 transition-colors">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full p-1.5 text-foreground/40" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground/80 group-hover:text-white">{session.user?.name?.split(' ')[0]}</span>
                  <LogOut className="w-3.5 h-3.5 text-foreground/30 group-hover:text-error transition-colors" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="hidden md:flex items-center gap-2 px-7 py-3 rounded-2xl bg-primary text-background text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Sign In
                <div className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-foreground active:scale-90 transition-all"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 px-4 pb-4 overflow-hidden"
            >
              <div className="p-6 rounded-3xl bg-background-subtle/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold transition-all',
                      pathname === item.href 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-foreground/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("w-5 h-5 -rotate-90 transition-transform", pathname === item.href && "text-primary")} />
                  </Link>
                ))}
                
                <div className="pt-4 mt-2 border-t border-white/5 flex flex-col gap-3">
                  {session ? (
                    <button
                      onClick={() => signOut()}
                      className="w-full py-4 rounded-2xl bg-error/10 text-error font-bold border border-error/20"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => signIn('google')}
                      className="w-full py-4 rounded-2xl bg-primary text-background font-black shadow-lg shadow-primary/20"
                    >
                      Sign In with Google
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
