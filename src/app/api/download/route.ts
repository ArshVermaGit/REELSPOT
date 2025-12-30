import { NextRequest, NextResponse } from 'next/server'
import { detectPlatform } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Platform } from '@prisma/client'

// RapidAPI configurations for different platforms
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || ''

interface DownloadOption {
  quality: string
  format: string
  url: string
  size?: number
}

interface DownloadResult {
  success: boolean
  platform: string
  title?: string
  thumbnail?: string
  duration?: number
  downloads: DownloadOption[]
  error?: string
}


// Instagram downloader
async function downloadInstagram(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://instagram-media-downloader.p.rapidapi.com/rapid/post.php?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API')
    }

    const data = await response.json()
    
    if (!data.video) {
      throw new Error('No video found')
    }

    return {
      success: true,
      platform: 'INSTAGRAM',
      title: data.caption || 'Instagram Video',
      thumbnail: data.thumbnail || data.image,
      downloads: [
        { quality: 'HD', format: 'mp4', url: data.video },
      ],
    }
  } catch (error) {
    console.error('Instagram download error:', error)
    throw error
  }
}

// TikTok downloader
async function downloadTikTok(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(url)}&hd=1`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from TikTok API')
    }

    const data = await response.json()
    
    if (!data.data) {
      throw new Error('No video data found')
    }

    const downloads: DownloadOption[] = []
    if (data.data.hdplay) {
      downloads.push({ quality: 'HD (No Watermark)', format: 'mp4', url: data.data.hdplay })
    }
    if (data.data.play) {
      downloads.push({ quality: 'SD (No Watermark)', format: 'mp4', url: data.data.play })
    }
    if (data.data.wmplay) {
      downloads.push({ quality: 'With Watermark', format: 'mp4', url: data.data.wmplay })
    }

    return {
      success: true,
      platform: 'TIKTOK',
      title: data.data.title || 'TikTok Video',
      thumbnail: data.data.cover || data.data.origin_cover,
      duration: data.data.duration,
      downloads,
    }
  } catch (error) {
    console.error('TikTok download error:', error)
    throw error
  }
}

// YouTube downloader
async function downloadYouTube(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://yt-api.p.rapidapi.com/dl?id=${extractYouTubeId(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from YouTube API')
    }

    const data = await response.json()
    
    if (!data.formats) {
      throw new Error('No video formats found')
    }

    const downloads: DownloadOption[] = data.formats
      .filter((f: { hasVideo: boolean; hasAudio: boolean }) => f.hasVideo && f.hasAudio)
      .slice(0, 4)
      .map((f: { qualityLabel: string; container: string; url: string; contentLength: string }) => ({
        quality: f.qualityLabel || 'Unknown',
        format: f.container || 'mp4',
        url: f.url,
        size: f.contentLength ? parseInt(f.contentLength) : undefined,
      }))

    return {
      success: true,
      platform: 'YOUTUBE',
      title: data.title || 'YouTube Video',
      thumbnail: data.thumbnail?.[0]?.url,
      duration: data.lengthSeconds,
      downloads,
    }
  } catch (error) {
    console.error('YouTube download error:', error)
    throw error
  }
}

// Twitter/X downloader
async function downloadTwitter(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://twitter-video-downloader.p.rapidapi.com/download?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'twitter-video-downloader.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Twitter API')
    }

    const data = await response.json()
    
    if (!data.videos || data.videos.length === 0) {
      throw new Error('No video found')
    }

    const downloads: DownloadOption[] = data.videos.map((v: { quality: string; url: string }) => ({
      quality: v.quality || 'Unknown',
      format: 'mp4',
      url: v.url,
    }))

    return {
      success: true,
      platform: 'TWITTER',
      title: data.title || 'Twitter Video',
      thumbnail: data.thumbnail,
      downloads,
    }
  } catch (error) {
    console.error('Twitter download error:', error)
    throw error
  }
}

// Facebook downloader
async function downloadFacebook(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://facebook-video-downloader.p.rapidapi.com/download?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'facebook-video-downloader.p.rapidapi.com',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Facebook API')
    }

    const data = await response.json()
    
    const downloads: DownloadOption[] = []
    if (data.hd) {
      downloads.push({ quality: 'HD', format: 'mp4', url: data.hd })
    }
    if (data.sd) {
      downloads.push({ quality: 'SD', format: 'mp4', url: data.sd })
    }

    if (downloads.length === 0) {
      throw new Error('No video found')
    }

    return {
      success: true,
      platform: 'FACEBOOK',
      title: data.title || 'Facebook Video',
      thumbnail: data.thumbnail,
      downloads,
    }
  } catch (error) {
    console.error('Facebook download error:', error)
    throw error
  }
}

// Helper to extract YouTube video ID
function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return ''
}

export async function POST(request: NextRequest) {
  try {
    if (!RAPIDAPI_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Download service is not configured. Please add RAPIDAPI_KEY to environment variables.',
          platform: 'OTHER',
          downloads: []
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required', platform: 'OTHER', downloads: [] },
        { status: 400 }
      )
    }

    const platform = detectPlatform(url)
    
    let result: DownloadResult

    switch (platform) {
      case 'INSTAGRAM':
        result = await downloadInstagram(url)
        break
      case 'TIKTOK':
        result = await downloadTikTok(url)
        break
      case 'YOUTUBE':
        result = await downloadYouTube(url)
        break
      case 'TWITTER':
        result = await downloadTwitter(url)
        break
      case 'FACEBOOK':
        result = await downloadFacebook(url)
        break
      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Unsupported platform. Please use Instagram, YouTube, TikTok, Twitter, or Facebook.',
            platform: 'OTHER',
            downloads: []
          },
          { status: 400 }
        )
    }

    // Track download in database if user is authenticated
    const session = await getServerSession(authOptions)
    if (session?.user?.id) {
      try {
        await prisma.download.create({
          data: {
            userId: session.user.id,
            platform: result.platform as Platform,
            videoUrl: url,
            videoTitle: result.title,
            thumbnail: result.thumbnail,
            quality: result.downloads[0]?.quality,
            downloadUrl: result.downloads[0]?.url,
            status: 'COMPLETED',
          },
        })
      } catch (dbError) {
        // Log but don't fail the request if DB save fails
        console.error('Failed to save download record:', dbError)
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Download API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process download request',
        platform: 'OTHER',
        downloads: []
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST with { url: "..." }' },
    { status: 405 }
  )
}
