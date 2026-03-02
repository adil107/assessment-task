import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname.startsWith("/auth")
  console.log('token============', token)

  // If user not logged in and trying to access home
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If logged in and trying to access login/signup
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/auth/:path*"],
}