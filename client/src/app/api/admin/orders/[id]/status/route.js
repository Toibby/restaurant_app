// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function PATCH(req, { params }) {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("gv_admin_session");

//   if (session?.value !== "verified") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${params.id}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-admin-secret": process.env.ADMIN_SECRET,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch {
//     return NextResponse.json(
//       { error: "Could not update order status" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(req, context) {
  const cookieStore = await cookies();
  const session = cookieStore.get("gv_admin_session");

  if (session?.value !== "verified") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = await context.params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.ADMIN_SECRET,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "Could not update order status" },
      { status: 500 }
    );
  }
}