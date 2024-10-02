import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/libs/i18n/routing";
import { ProtectedRouters, PublicRouters } from "./constants/router";
import { CookieSessionKey } from "./libs/session/constants";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const match = path.match(/^\/(en|de)?/);
  const locale = match ? match[0] : "/";
  const remainingPath = path.slice(locale.length);

  const token = cookies().get(CookieSessionKey.user)?.value;

  const isProtectedRoute = ProtectedRouters.includes(remainingPath);
  const isPublicRoute = PublicRouters.includes(remainingPath);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && token && !path.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const intlResponse = createMiddleware(routing)(req);
  if (intlResponse) return intlResponse; // Handle localization

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/",
    "/(de|en)/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
