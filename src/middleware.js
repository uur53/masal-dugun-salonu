import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // adminlerin route
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  // giriş route
  if (pathname.startsWith("/profile")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"]
};
