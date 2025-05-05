import type { auth } from '@/lib/auth'
import { betterFetch } from '@better-fetch/fetch'
import { type NextRequest, NextResponse } from 'next/server'
import { urlFromSlug } from './lib/redirect'

type Session = typeof auth.$Infer.Session

const publicRoutes = ['/', '/login']
const protectedRoutes = ['/dashboard', '/settings']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const route = pathname.split('/').pop()

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (route && !protectedRoutes.includes(route)) {
    const data = await urlFromSlug(route)
    if (data.success) {
      return NextResponse.redirect(new URL(data.url, request.url))
    }
  }

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    }
  )

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
