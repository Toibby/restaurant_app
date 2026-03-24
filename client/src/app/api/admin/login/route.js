import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { passcode } = await req.json();

    if (!passcode || passcode !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set("gv_admin_session", "verified", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}