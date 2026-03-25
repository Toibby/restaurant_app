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

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function PATCH(req, context) {
//   const cookieStore = await cookies();
//   const session = cookieStore.get("gv_admin_session");

//   if (session?.value !== "verified") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { id } = await context.params;

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/${id}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-admin-secret": process.env.ADMIN_SECRET,
//         },
//         body: JSON.stringify(body),
//         cache: "no-store",
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


// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function PATCH(req, context) {
//   try {
//     const cookieStore = await cookies();
//     const session = cookieStore.get("admin_session");

//     if (session?.value !== "authenticated") {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const { id } = await context.params;
//     const { status } = await req.json();

//     const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const adminSecret = process.env.ADMIN_SECRET;

//     if (!apiBaseUrl) {
//       return NextResponse.json(
//         { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
//         { status: 500 }
//       );
//     }

//     if (!adminSecret) {
//       return NextResponse.json(
//         { error: "ADMIN_SECRET is not configured" },
//         { status: 500 }
//       );
//     }

//     const res = await fetch(`${apiBaseUrl}/api/orders/${id}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "x-admin-secret": adminSecret,
//       },
//       body: JSON.stringify({ status }),
//       cache: "no-store",
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data.error || "Could not update status" },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message || "Could not update order status" },
//       { status: 500 }
//     );
//   }
// }



// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function PATCH(req, { params }) {
//   try {
//     const cookieStore = await cookies();
//     const session = cookieStore.get("admin_session");

//     if (session?.value !== "authenticated") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = params;
//     const { status } = await req.json();

//     const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const adminSecret = process.env.ADMIN_SECRET;

//     if (!apiBaseUrl) {
//       console.error("Missing NEXT_PUBLIC_API_BASE_URL on Vercel");
//       return NextResponse.json(
//         { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
//         { status: 500 }
//       );
//     }

//     if (!adminSecret) {
//       console.error("Missing ADMIN_SECRET on Vercel");
//       return NextResponse.json(
//         { error: "ADMIN_SECRET is not configured" },
//         { status: 500 }
//       );
//     }

//     const response = await fetch(`${apiBaseUrl}/api/orders/${id}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "x-admin-secret": adminSecret,
//       },
//       body: JSON.stringify({ status }),
//       cache: "no-store",
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Render status update failed:", response.status, data);
//       return NextResponse.json(
//         { error: data.error || "Could not update status" },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Vercel /api/admin/orders/[id]/status crashed:", error);
//     return NextResponse.json(
//       { error: error.message || "Could not update order status" },
//       { status: 500 }
//     );
//   }
// }




// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { API_BASE_URL } from "@/lib/api";

// export const dynamic = "force-dynamic";

// export async function PATCH(req, { params }) {
//   try {
//     const cookieStore = await cookies();
//     const session = cookieStore.get("admin_session");

//     if (session?.value !== "authenticated") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const adminSecret = process.env.ADMIN_SECRET;

//     if (!API_BASE_URL) {
//       return NextResponse.json(
//         { error: "NEXT_PUBLIC_API_BASE_URL is not configured" },
//         { status: 500 }
//       );
//     }

//     if (!adminSecret) {
//       return NextResponse.json(
//         { error: "ADMIN_SECRET is not configured" },
//         { status: 500 }
//       );
//     }

//     const { id } = params;
//     const { status } = await req.json();

//     const targetUrl = `${API_BASE_URL}/api/orders/${id}/status`;

//     const response = await fetch(targetUrl, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "x-admin-secret": adminSecret,
//       },
//       body: JSON.stringify({ status }),
//       cache: "no-store",
//     });

//     const rawText = await response.text();

//     let data;
//     try {
//       data = JSON.parse(rawText);
//     } catch {
//       return NextResponse.json(
//         {
//           error: "Upstream API did not return JSON",
//           targetUrl,
//           upstreamStatus: response.status,
//         },
//         { status: 500 }
//       );
//     }

//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           error: data.error || "Could not update status",
//           targetUrl,
//           upstreamStatus: response.status,
//         },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message || "Could not update order status" },
//       { status: 500 }
//     );
//   }
// }

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { status } = await req.json();

    const adminSecret = process.env.ADMIN_SECRET;

    if (!API_BASE_URL) {
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

    const targetUrl = `${API_BASE_URL}/api/orders/${id}/status`;

    const response = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminSecret,
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });

    const rawText = await response.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        {
          error: "Upstream API did not return JSON",
          targetUrl,
          upstreamStatus: response.status,
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error || "Could not update status",
          targetUrl,
          upstreamStatus: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not update order status" },
      { status: 500 }
    );
  }
}