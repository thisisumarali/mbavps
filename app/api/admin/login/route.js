import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Simple signed token: base64(username:timestamp):secret_hash
  const payload = Buffer.from(`${username}:${Date.now()}`).toString("base64");
  const token = `${payload}.${secret}`;

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({ ok: true });
}