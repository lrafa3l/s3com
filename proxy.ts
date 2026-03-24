// Next.js 16: middleware renamed to proxy
// See: https://nextjs.org/docs/messages/middleware-to-proxy
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const token = await getToken({ req })
  const pathname = req.nextUrl.pathname

  // Public routes - no auth required
  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup")

  // Admin-only routes
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/service/new")

  // If accessing admin routes without token, redirect to signin
  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  // If accessing admin routes without admin level, redirect to home
  if (token && isAdminRoute && token.level !== "admin") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // If already authenticated and trying to access auth pages, redirect to admin
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/signin", "/signup", "/service/new/:path*"],
}
