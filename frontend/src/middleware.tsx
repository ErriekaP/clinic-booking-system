import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  // If there is no session and the requested URL is not "/login" or "/register", redirect to "/login"
  if (
    !session &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  ) {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }

  // If there is a session and the requested URL is "/login" or "/register", redirect to "/home"
  if (
    session &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!auth|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
