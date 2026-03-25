// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { passcode } = await req.json();

//     if (!passcode || passcode !== process.env.ADMIN_SECRET) {
//       return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
//     }

//     const response = NextResponse.json({ ok: true });

//     response.cookies.set("gv_admin_session", "verified", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 8,
//     });

//     return response;
//   } catch {
//     return NextResponse.json({ error: "Login failed" }, { status: 500 });
//   }
// }

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { passcode } = await req.json();

    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Admin secret is not configured" },
        { status: 500 }
      );
    }

    if (!passcode || passcode !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Wrong admin passcode" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      authenticated: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}