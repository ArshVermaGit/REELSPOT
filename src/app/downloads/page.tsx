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
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/10" />
              <span className="text-xs font-black text-white/40 uppercase tracking-[0.4em]">Personal Vault</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-4 tracking-tighter">
            SAVED <span className="text-white/10 italic">SIGNALS</span>
          </h1>
          <p className="text-white/40 font-medium max-w-xl uppercase tracking-widest text-sm md:text-xl">
            Access your encrypted download history across the neural network.
          </p>
        </div>
        <Link href="/">
          <GlowButton size="lg" className="rounded-full shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            Secure New Vector
          </GlowButton>
        </Link>
      </div>

      {downloads.length === 0 ? (
        <GlassCard className="p-24 text-center border-white/5 bg-white/2 rounded-4xl">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <DownloadIcon className="w-10 h-10 text-white/20" />
          </div>
          <h2 className="text-3xl font-heading font-black text-white mb-4 tracking-tight">Vault is Empty</h2>
          <p className="text-white/20 font-bold mb-10 max-w-md mx-auto uppercase tracking-widest leading-none text-xs md:text-lg">
            No signal manifests detected in your sectors.
          </p>
          <Link href="/">
            <GlowButton variant="secondary" className="px-12 py-5 rounded-2xl">
              Initialize Downloader
            </GlowButton>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.map((download) => (
            <GlassCard key={download.id} className="flex flex-col h-full overflow-hidden group border-white/5 bg-white/3 shadow-2xl rounded-4xl">
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                {download.thumbnail ? (
                  <Image
                    src={download.thumbnail}
                    alt={download.videoTitle || 'Video thumbnail'}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <PlatformIcon platform={download.platform as Platform} size="lg" animated={false} />
                  </div>
                )}
                <div className="absolute top-5 right-5 z-20">
                  <div className="p-2 rounded-xl bg-background/60 backdrop-blur-md border border-white/10">
                    <PlatformIcon platform={download.platform as Platform} size="sm" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-10">
                   {download.downloadUrl && (
                    <a 
                      href={download.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white text-black rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-2xl flex items-center justify-center"
                    >
                      <DownloadIcon className="w-6 h-6" />
                    </a>
                   )}
                   <a 
                      href={download.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white/10 text-white rounded-2xl hover:scale-110 active:scale-90 transition-all border border-white/20 backdrop-blur-md flex items-center justify-center"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col grow">
                <h3 className="text-lg font-heading font-black text-white mb-3 line-clamp-2 group-hover:text-white/60 transition-colors leading-tight tracking-tight">
                  {download.videoTitle || 'Untitled Signal'}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{formatDistanceToNow(new Date(download.createdAt), { addSuffix: true })}</span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 shadow-lg">
                    {download.quality || 'MASTER'}
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
