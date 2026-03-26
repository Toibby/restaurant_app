// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { API_BASE_URL, fetchWithTimeout } from "@/lib/api";

// export default function PaymentCallbackPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [message, setMessage] = useState("Verifying payment...");

//   useEffect(() => {
//     const reference = searchParams.get("reference");

//     async function verify() {
//       if (!reference) {
//         setMessage("Missing payment reference.");
//         return;
//       }

//       try {
//         const response = await fetchWithTimeout(
//           `${API_BASE_URL}/api/payments/verify/${reference}`,
//           {
//             method: "GET",
//           }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.error || "Payment verification failed");
//         }

//         if (!data?.order?.id) {
//           throw new Error("Payment verified but no order was created");
//         }

//         router.replace(`/track/${data.order.id}`);
//       } catch (error) {
//         console.error(error);
//         setMessage(error.message || "Could not verify payment.");
//       }
//     }

//     verify();
//   }, [router, searchParams]);

//   return (
//     <main className="min-h-screen bg-slate-950 text-white">
//       <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
//         <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
//           Payment status
//         </p>
//         <h1 className="mt-4 text-4xl font-bold">Processing your payment</h1>
//         <p className="mt-4 max-w-xl text-slate-400">{message}</p>
//       </section>
//     </main>
//   );
// }


"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL, fetchWithTimeout } from "@/lib/api";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const reference = searchParams.get("reference");

    async function verify() {
      if (!reference) {
        setMessage("Missing payment reference.");
        return;
      }

      try {
        const response = await fetchWithTimeout(
          `${API_BASE_URL}/api/payments/verify/${reference}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Payment verification failed");
        }

        if (!data?.order?.id) {
          throw new Error("Payment verified but no order was created");
        }

        router.replace(`/track/${data.order.id}`);
      } catch (error) {
        console.error(error);
        setMessage(error.message || "Could not verify payment.");
      }
    }

    verify();
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
          Payment status
        </p>
        <h1 className="mt-4 text-4xl font-bold">Processing your payment</h1>
        <p className="mt-4 max-w-xl text-slate-400">{message}</p>
      </section>
    </main>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
              Payment status
            </p>
            <h1 className="mt-4 text-4xl font-bold">Processing your payment</h1>
            <p className="mt-4 max-w-xl text-slate-400">
              Verifying payment...
            </p>
          </section>
        </main>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}