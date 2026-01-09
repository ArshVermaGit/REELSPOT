'use client'

import { useEffect, Suspense } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function SignInContent() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl })
    } else if (status === 'authenticated') {
      router.push(callbackUrl)
    }
  }, [status, callbackUrl, router])

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      <Suspense fallback={null}>
        <SignInContent />
      </Suspense>
    </div>
  )
}
