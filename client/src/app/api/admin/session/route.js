// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("gv_admin_session");

//   return NextResponse.json({
//     authenticated: session?.value === "verified",
//   });
// }
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    return NextResponse.json({
      authenticated: session?.value === "authenticated",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not check session" },
      { status: 500 }
    );
  }
}