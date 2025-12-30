import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/downloads/:path*'],
}
