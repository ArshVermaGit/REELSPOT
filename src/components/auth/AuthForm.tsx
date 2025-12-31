'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react'
import { GlassCard, GlowButton } from '@/components/ui/Cards'

export function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        const res = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })

        if (res?.error) {
          setError('Invalid credentials')
        } else {
          router.push('/')
          router.refresh()
        }
      } else {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        // Login after signup
        await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })
        
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto relative">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

       <GlassCard className="p-8 sm:p-10 border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-black text-white mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Core'}
            </h2>
            <p className="text-white/40 text-sm font-medium">
              {isLogin ? 'Enter your credentials to access the extraction interface.' : 'Create an identity to maintain your signal history.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                     <div className="relative group">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                        <input
                          type="text"
                          placeholder="Username"
                          required={!isLogin}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all font-medium"
                        />
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>

             <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all font-medium"
                />
             </div>

             <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all font-medium"
                />
             </div>

             {error && (
               <motion.div 
                 initial={{ opacity: 0, y: -10 }} 
                 animate={{ opacity: 1, y: 0 }}
                 className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200 text-xs font-bold"
               >
                 <AlertCircle className="w-4 h-4 text-red-400" />
                 {error}
               </motion.div>
             )}

             <GlowButton 
               disabled={isLoading}
               className="w-full py-4 mt-4"
             >
               {isLoading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <>
                   {isLogin ? 'Establish Connection' : 'Initialize Identity'}
                   <ArrowRight className="w-4 h-4" />
                 </>
               )}
             </GlowButton>
          </form>

          <div className="relative my-8">
             <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-white/10"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-[#0a0a0a] px-4 text-white/30 font-bold tracking-widest">Or access with</span>
             </div>
          </div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-3.5 transition-all text-white font-bold text-sm"
          >
             <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
          </button>

          <p className="mt-8 text-center text-xs font-medium text-white/40">
             {isLogin ? "New to the system?" : "Already possess an identity?"}{' '}
             <button 
               onClick={() => setIsLogin(!isLogin)}
               className="text-white hover:underline underline-offset-4 font-bold"
             >
               {isLogin ? 'Initialize Protocol' : 'Access Interface'}
             </button>
          </p>
       </GlassCard>
    </div>
  )
}
