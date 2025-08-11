import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);
  console.log("✅ Middleware is running for:", url.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static|.*\\..*).*)"], // match everything except static
};
