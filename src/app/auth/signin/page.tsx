import { AuthForm } from '@/components/auth/AuthForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
       {/* Background Elements */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
       
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-pink-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[150px]" />
       </div>

       <div className="relative z-10 w-full">
         <AuthForm />
       </div>
    </div>
  )
}
