// Next.js 16: middleware renamed to proxy
// See: https://nextjs.org/docs/messages/middleware-to-proxy
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req: NextRequest) {
  const token = await getToken({ req })

  // Verifica se a rota atual é /signin (pública)
  const isAuthPage = req.nextUrl.pathname.startsWith("/signin")

  // Se não há token e a rota é /admin, redireciona para login
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  // Se já está autenticado e tenta acessar /signin, redireciona para /admin
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}

// BUG 8 FIX: Include /signin so authenticated users get redirected to /admin
export const config = {
  matcher: ["/admin/:path*", "/signin"],
}
