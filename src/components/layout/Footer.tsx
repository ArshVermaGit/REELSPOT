import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, ExternalLink, Globe, Cpu } from 'lucide-react'
import { NAV_ITEMS } from '@/types'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-accent-indigo flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-heading font-black text-lg">R</span>
              </div>
              <span className="text-2xl font-heading font-black tracking-tighter text-foreground">
                REEL<span className="text-primary ml-1 tracking-widest">SPOT</span>
              </span>
            </Link>
            <p className="text-foreground/50 text-base leading-relaxed max-w-sm mb-10 font-medium">
              Elevating content management with visually perfect tools. 
              The ultimate high-performance downloader reimagined for the modern creator.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/ArshVermaGit", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/arshvermadev/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/TheArshVerma", label: "Twitter" },
                { icon: Mail, href: "mailto:arshvermadev@gmail.com", label: "Email" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-heading font-black text-foreground text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground/50 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-heading font-black text-foreground text-xs uppercase tracking-[0.2em] mb-8">Resources</h4>
              <nav className="flex flex-col gap-4">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Support Center", href: "/contact" },
                  { label: "Admin Access", href: "/admin" }
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-foreground/50 hover:text-white text-sm font-semibold transition-colors group flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent-indigo transition-all" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-heading font-black text-foreground text-xs uppercase tracking-[0.2em] mb-8">Network Status</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-white text-xs font-bold bg-white/5 border border-white/10 rounded-2xl px-5 py-4 w-fit">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary blur-[4px]" />
                  </div>
                  SYSTEMS NOMINAL
                </div>
                <div className="flex items-center gap-2 text-foreground/40 text-[10px] font-bold uppercase tracking-widest pl-2">
                  <Globe className="w-3 h-3" />
                   v{process.version.substring(1)} Node Engine
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center p-2 bg-white/5">
                <Cpu className="w-5 h-5 text-primary" />
             </div>
             <div>
                <p className="text-foreground/80 text-sm font-bold">REELSPOT OPS</p>
                <p className="text-foreground/40 text-xs font-medium">© {currentYear} Universal Runtime. Built by Arsh Verma.</p>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-foreground/30 font-black uppercase tracking-[0.3em]">
              Next.js 16
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="text-[10px] text-foreground/30 font-black uppercase tracking-[0.3em]">
              TypeScript 5
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="text-[10px] text-foreground/30 font-black uppercase tracking-[0.3em]">
              Prisma PG
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
