'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, Shield } from 'lucide-react'
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-white/80 backdrop-blur-lg border-b border-black/5 shadow-sm'
          : 'py-5 bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary to-accent-pink flex items-center justify-center overflow-hidden shadow-md">
              <span className="text-white font-heading font-black text-lg">R</span>
            </div>
            <span className="text-xl font-heading font-bold tracking-tight text-foreground">
              REEL<span className="text-primary">SPOT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md border border-black/5 p-1.5 rounded-full shadow-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'text-white bg-primary shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-black/5'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="hidden md:flex items-center gap-3">
                {session.user?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="p-2.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                    title="Admin"
                  >
                    <Shield className="w-4 h-4 text-primary" />
                  </Link>
                )}
                <Link
                  href="/downloads"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/10 hover:border-primary/30 hover:shadow-md transition-all text-sm font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  History
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-10 h-10 rounded-full border-2 border-black/10 p-0.5 group overflow-hidden relative hover:border-primary/30 transition-colors"
                >
                   {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-foreground/50" />
                  )}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <LogOut className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="hidden md:flex px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-md shadow-primary/25"
              >
                Get Started
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/10 text-foreground active:scale-90 transition-all shadow-sm"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 p-6 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                      pathname === item.href 
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground/70 hover:bg-black/5'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-black/10 flex flex-col gap-3">
                  {session ? (
                    <>
                      <Link
                        href="/downloads"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-3 rounded-xl text-foreground font-medium hover:bg-black/5"
                      >
                        Download History
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="px-4 py-3 rounded-xl text-red-500 font-medium text-left hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => signIn('google')}
                      className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold shadow-md"
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
