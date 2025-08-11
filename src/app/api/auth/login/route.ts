// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  // Call NextAuth credentials provider using signIn()
  // This part must be called from client side (not here directly)
  // So instead: redirect them to signIn or return a flag
  return NextResponse.json({ success: true });
}
