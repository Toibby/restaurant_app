// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("gv_admin_session");

//   if (session?.value !== "verified") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
//       {
//         headers: {
//           "x-admin-secret": process.env.ADMIN_SECRET,
//         },
//         cache: "no-store",
//       }
//     );

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch {
//     return NextResponse.json(
//       { error: "Could not fetch admin orders" },
//       { status: 500 }
//     );
//   }
// }
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    if (!adminSecret) {
      return NextResponse.json(
        { error: "ADMIN_SECRET is not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiBaseUrl}/api/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminSecret,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Could not fetch orders" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      orders: data.orders || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not fetch orders" },
      { status: 500 }
    );
  }
}