import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const { pathname } = request.nextUrl

  if (!session && !(pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (session && (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/sign-in", "/sign-up"],
};