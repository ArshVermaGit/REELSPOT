import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react'
import { NAV_ITEMS } from '@/types'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-black/5 bg-background-subtle z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent-pink flex items-center justify-center shadow-sm">
                <span className="text-white font-heading font-black text-sm">R</span>
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-foreground">
                REEL<span className="text-primary">SPOT</span>
              </span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-sm mb-6">
              A premium content management platform for creators. 
              Designed for speed, visual perfection, and reliability.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
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
                  className="w-10 h-10 rounded-full bg-white border border-black/8 flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-5">Product</h4>
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground-muted hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-5">Resources</h4>
              <nav className="flex flex-col gap-3">
                <Link href="/privacy" className="text-foreground-muted hover:text-primary text-sm transition-colors">Privacy</Link>
                <Link href="/contact" className="text-foreground-muted hover:text-primary text-sm transition-colors">Support</Link>
                <Link href="/admin" className="text-foreground-muted hover:text-primary text-sm transition-colors">Admin</Link>
              </nav>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-5">Status</h4>
              <div className="flex items-center gap-2 text-foreground-muted text-sm bg-white border border-black/8 rounded-full px-4 py-2.5 w-fit shadow-sm">
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_6px_var(--color-success)]" />
                All Systems Operational
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-14 pt-6 border-t border-black/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground-muted text-xs font-medium">
            © {currentYear} REELSPOT. Built by{' '}
            <a
              href="https://github.com/ArshVermaGit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
            >
              Arsh Verma
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-foreground-muted tracking-wider font-semibold uppercase">
              Next.js 15
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground-muted/30" />
            <span className="text-[10px] text-foreground-muted tracking-wider font-semibold uppercase">
              Prisma
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground-muted/30" />
            <span className="text-[10px] text-foreground-muted tracking-wider font-semibold uppercase">
              Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
