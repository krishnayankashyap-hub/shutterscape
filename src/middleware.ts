// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard administrative routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isValidSession = false;
    if (sessionCookie) {
      const session = await verifySessionToken(sessionCookie);
      isValidSession = Boolean(session && session.userId);
    }

    // 1. If not logged in and attempting to access any admin page other than login -> Redirect to login
    if (!isValidSession && !isLoginPage) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. If already logged in and visiting /admin/login -> Redirect directly to dashboard
    if (isValidSession && isLoginPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Guard protected admin API mutations
  if (pathname.startsWith("/api/admin")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const session = await verifySessionToken(sessionCookie);
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
