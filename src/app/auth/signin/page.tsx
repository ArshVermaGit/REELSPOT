'use client'

import { useEffect, Suspense, useRef } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'
import { GlowButton } from '@/components/ui/Cards'

function SignInContent() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')
  const signInAttempted = useRef(false)

  useEffect(() => {
    if (status === 'unauthenticated' && !error && !signInAttempted.current) {
      signInAttempted.current = true
      signIn('google', { callbackUrl })
    } else if (status === 'authenticated') {
      router.push(callbackUrl)
    }
  }, [status, callbackUrl, router, error])

  if (error) {
    return (
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 max-w-md w-full">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-2xl">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-heading font-black text-white tracking-tight uppercase">
            Authentication Error
          </h2>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed">
            There was a problem connecting to the identity node. Error code: <span className="text-red-400">{error}</span>
          </p>
          <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em] pt-4">
            Verify your Google Cloud Console configuration and environment variables.
          </p>
        </div>
        <div className="pt-8 w-full">
          <GlowButton 
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full py-5 rounded-2xl"
          >
            Retry Connection
          </GlowButton>
          <button 
            onClick={() => router.push('/')}
            className="w-full mt-4 text-white/20 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
          >
            Return to Core
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-heading font-black text-white mb-2 tracking-tight uppercase">
          Redirecting to Google
        </h2>
        <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
          Please wait while we connect to the identity node...
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/2 rounded-full blur-[120px]" />
      
      <Suspense fallback={null}>
        <SignInContent />
      </Suspense>
    </div>
  )
}
