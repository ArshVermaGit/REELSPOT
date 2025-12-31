import Link from 'next/link'
import { Github, Linkedin, Twitter, Globe, Cpu } from 'lucide-react'
import { NAV_ITEMS } from '@/types'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden z-10">
      {/* Background decoration - Monochrome */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/2 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand & Mission */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-110 transition-transform duration-500">
                <span className="text-black font-heading font-black text-xl italic">R</span>
              </div>
              <span className="text-2xl font-heading font-black tracking-tighter text-white">
                REEL<span className="text-white/20 ml-1">SPOT</span>
              </span>
            </Link>
            <p className="text-white/40 text-base leading-relaxed max-w-sm mb-12 font-medium">
              Elevating content management with visually perfect tools. 
              The ultimate high-performance downloader reimagined for the modern creator.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/ArshVermaGit", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/arshvermadev/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/TheArshVerma", label: "Twitter" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl bg-white/3 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Core System</h4>
              <nav className="flex flex-col gap-5">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white transition-all" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Legal Protocol</h4>
              <nav className="flex flex-col gap-5">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Support Center", href: "/contact" },
                  { label: "Admin Access", href: "/admin" }
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors group flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white transition-all" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Neural Status</h4>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-white text-[10px] font-black bg-white/3 border border-white/10 rounded-2xl px-6 py-5 w-fit uppercase tracking-widest shadow-2xl">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>
                  Systems Normalized
                </div>
                <div className="flex items-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-[0.3em] pl-2">
                  <Globe className="w-4 h-4" />
                   Universal Grid Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center p-3 bg-white/3 shadow-xl">
                <Cpu className="w-6 h-6 text-white/60" />
             </div>
             <div>
                <p className="text-white font-black text-xs uppercase tracking-widest">REELSPOT PRIME</p>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">© {currentYear} ZERO POINT CORE. BY ARSH VERMA.</p>
             </div>
          </div>
          
          <div className="flex items-center gap-8">
            <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
              TS.5.X
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
            <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
              NX.16.X
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
            <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
              PS.PG.V
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
