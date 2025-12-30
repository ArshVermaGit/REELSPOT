import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { GlassCard, GlowButton } from '@/components/ui/Cards'
import { PlatformIcon } from '@/components/ui/PlatformCard'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { Download as DownloadIcon, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Platform } from '@/types'

export const metadata = {
  title: 'My Downloads | REELSPOT',
  description: 'Your video download history',
}

export default async function DownloadsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/downloads')
  }

  const downloads = await prisma.download.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            My <span className="text-gradient">Downloads</span>
          </h1>
          <p className="text-foreground-muted">
            Track your video download history across all platforms.
          </p>
        </div>
        <Link href="/">
          <GlowButton variant="primary">
            New Download
          </GlowButton>
        </Link>
      </div>

      {downloads.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <DownloadIcon className="w-8 h-8 text-foreground-muted" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">No downloads yet</h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            Start downloading videos from Instagram, TikTok, YouTube, and more to see your history here.
          </p>
          <Link href="/">
            <GlowButton variant="secondary">
              Get Started
            </GlowButton>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {downloads.map((download) => (
            <GlassCard key={download.id} className="flex flex-col h-full overflow-hidden group">
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/5">
                {download.thumbnail ? (
                  <Image
                    src={download.thumbnail}
                    alt={download.videoTitle || 'Video thumbnail'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PlatformIcon platform={download.platform as Platform} size="lg" animated={false} />
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10">
                  <PlatformIcon platform={download.platform as Platform} size="sm" />
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   {download.downloadUrl && (
                    <a 
                      href={download.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <DownloadIcon className="w-5 h-5 text-foreground" />
                    </a>
                   )}
                   <a 
                      href={download.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5 text-foreground" />
                    </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col grow">
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {download.videoTitle || 'Untitled Video'}
                </h3>
                <div className="flex items-center justify-between text-sm text-foreground-muted mt-auto pt-4 border-t border-black/8">
                  <span>{formatDistanceToNow(new Date(download.createdAt), { addSuffix: true })}</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/5 border border-black/8 text-xs">
                    {download.quality || 'HD'}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </main>
  )
}
