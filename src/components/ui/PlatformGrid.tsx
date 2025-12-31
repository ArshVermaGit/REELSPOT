'use client'

import { useState } from 'react'
import { PlatformCard } from './PlatformCard'
import { DownloadModal } from './DownloadModal'
import { PLATFORMS } from '@/types'

export function PlatformGrid() {
  const [selectedPlatform, setSelectedPlatform] = useState<keyof typeof PLATFORMS | null>(null)
  
  const platforms = Object.keys(PLATFORMS) as Array<keyof typeof PLATFORMS>

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full max-w-7xl mx-auto px-6">
        {platforms.map((platform, index) => (
          <PlatformCard
            key={platform}
            platform={platform}
            delay={index + 2}
            onClick={() => setSelectedPlatform(platform)}
          />
        ))}
      </div>

      <DownloadModal 
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
        initialPlatform={selectedPlatform}
      />
    </>
  )
}
