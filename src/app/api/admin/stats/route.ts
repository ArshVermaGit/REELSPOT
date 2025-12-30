import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Check if user is admin
async function isAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'ADMIN'
}

export async function GET() {
  try {
    // Check admin access
    if (!await isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalFeedback, unreadFeedback, thisMonthFeedback, totalUsers, totalDownloads] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } }),
      prisma.contact.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.user.count(),
      prisma.download.count(),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalFeedback,
        unreadFeedback,
        thisMonthFeedback,
        totalUsers,
        totalDownloads,
      },
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
