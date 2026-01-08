import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'REELSPOT - Premium Video Downloader',
  description: 'Download high-definition videos from any platform with a world-class experience. Fast, batch-ready, and beautifully designed.',
  keywords: ['video downloader', 'premium downloader', 'instagram downloader', 'youtube downloader', 'tiktok downloader', 'social media downloader'],
  authors: [{ name: 'Arsh Verma', url: 'https://github.com/ArshVermaGit' }],
  creator: 'Arsh Verma',
  openGraph: {
    title: 'REELSPOT - Premium Video Downloader',
    description: 'The ultimate video download experience. Reimagined for visual perfection.',
    url: 'https://reelspot.vercel.app',
    siteName: 'REELSPOT',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REELSPOT - Premium Video Downloader',
    description: 'The ultimate video download experience.',
    creator: '@TheArshVerma',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased selection:bg-white/20 selection:text-white bg-background text-white`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
