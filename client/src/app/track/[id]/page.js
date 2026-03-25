// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "next/navigation";

// const steps = [
//   { key: "new", label: "Order Received" },
//   { key: "confirmed", label: "Confirmed" },
//   { key: "preparing", label: "Preparing" },
//   { key: "out_for_delivery", label: "Out for Delivery" },
//   { key: "delivered", label: "Delivered" },
// ];

// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(Number(amount || 0));
// }

// function formatDate(value) {
//   if (!value) return "-";
//   return new Date(value).toLocaleString();
// }

// export default function TrackOrderPage() {
//   const params = useParams();
//   const orderId = params?.id;

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

//   useEffect(() => {
//     async function fetchOrder() {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`${apiBase}/api/orders/${orderId}`);
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.error || "Could not fetch order");
//         }

//         setOrder(data.order);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (orderId) {
//       fetchOrder();
//     }
//   }, [orderId, apiBase]);

//   const currentStepIndex = useMemo(() => {
//     if (!order?.status) return 0;
//     const index = steps.findIndex((step) => step.key === order.status);
//     return index === -1 ? 0 : index;
//   }, [order]);

//   return (
//     <main className="tracking-shell">
//       <div className="tracking-container">
//         <div className="tracking-hero">
//           <p className="tracking-eyebrow">Order Tracking</p>
//           <h1 className="tracking-title">Track your Gracee Ville order</h1>
//           <p className="tracking-copy">
//             Stay updated on your meal as it moves from confirmation to delivery.
//           </p>
//         </div>

//         {loading ? <p className="tracking-message">Loading order...</p> : null}
//         {error ? <p className="tracking-error">{error}</p> : null}

//         {!loading && !error && order ? (
//           <div className="tracking-grid">
//             <div className="tracking-card">
//               <div className="tracking-head">
//                 <div>
//                   <p className="tracking-label">Order ID</p>
//                   <h2 className="tracking-order-id">{order.id}</h2>
//                 </div>

//                 <span className={`status-badge status-${order.status.replaceAll("_", "-")}`}>
//                   {order.status.replaceAll("_", " ")}
//                 </span>
//               </div>

//               <div className="tracking-timeline">
//                 {steps.map((step, index) => {
//                   const done = index <= currentStepIndex;
//                   const active = index === currentStepIndex;

//                   return (
//                     <div key={step.key} className="timeline-row">
//                       <div className={`timeline-dot ${done ? "done" : ""} ${active ? "active" : ""}`} />
//                       <div className="timeline-content">
//                         <h3>{step.label}</h3>
//                         <p>
//                           {done
//                             ? "This stage has been completed."
//                             : "Pending update from the kitchen team."}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}

//                 {order.status === "cancelled" ? (
//                   <div className="tracking-cancelled">
//                     This order has been cancelled. Please contact support for assistance.
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             <div className="tracking-card">
//               <p className="tracking-label">Customer</p>
//               <h3 className="tracking-section-title">{order.customer_name}</h3>

//               <div className="tracking-meta">
//                 <p>
//                   <strong>Phone:</strong> {order.phone}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {order.address}
//                 </p>
//                 <p>
//                   <strong>Placed:</strong> {formatDate(order.created_at)}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> {formatCurrency(order.total_amount)}
//                 </p>
//               </div>

//               <div className="tracking-items">
//                 <p className="tracking-label">Order Items</p>
//                 {Array.isArray(order.items) && order.items.length ? (
//                   order.items.map((item, index) => (
//                     <div key={`${order.id}-${index}`} className="tracking-item-row">
//                       <span>
//                         {item.name} x {item.quantity}
//                       </span>
//                       <span>{formatCurrency(item.price * item.quantity)}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="tracking-muted">No order items found.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </main>
//   );
// }




// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "next/navigation";

// const steps = [
//   { key: "new", label: "Order Received" },
//   { key: "confirmed", label: "Confirmed" },
//   { key: "preparing", label: "Preparing" },
//   { key: "out_for_delivery", label: "Out for Delivery" },
//   { key: "delivered", label: "Delivered" },
// ];

// function formatCurrency(amount) {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     maximumFractionDigits: 0,
//   }).format(Number(amount || 0));
// }

// function formatDate(value) {
//   if (!value) return "-";
//   return new Date(value).toLocaleString();
// }

// export default function TrackOrderPage() {
//   const params = useParams();
//   const orderId = params?.id;

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [lastUpdated, setLastUpdated] = useState("");

//   const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

//   async function fetchOrder(showLoading = false) {
//     try {
//       if (showLoading) setLoading(true);
//       setError("");

//       const res = await fetch(`${apiBase}/api/orders/${orderId}`, {
//         cache: "no-store",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Could not fetch order");
//       }

//       setOrder(data.order);
//       setLastUpdated(new Date().toLocaleTimeString());
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       if (showLoading) setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (!orderId) return;

//     fetchOrder(true);

//     const interval = setInterval(() => {
//       fetchOrder(false);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [orderId]);

//   const currentStepIndex = useMemo(() => {
//     if (!order?.status) return 0;
//     const index = steps.findIndex((step) => step.key === order.status);
//     return index === -1 ? 0 : index;
//   }, [order]);

//   return (
//     <main className="tracking-shell">
//       <div className="tracking-container">
//         <div className="tracking-hero">
//           <p className="tracking-eyebrow">Order Tracking</p>
//           <h1 className="tracking-title">Track your Gracee Ville order</h1>
//           <p className="tracking-copy">
//             Stay updated on your meal as it moves from confirmation to delivery.
//           </p>
//           {lastUpdated ? (
//             <p className="tracking-last-updated">Last updated: {lastUpdated}</p>
//           ) : null}
//         </div>

//         {loading ? <p className="tracking-message">Loading order...</p> : null}
//         {error ? <p className="tracking-error">{error}</p> : null}

//         {!loading && !error && order ? (
//           <div className="tracking-grid">
//             <div className="tracking-card">
//               <div className="tracking-head">
//                 <div>
//                   <p className="tracking-label">Order ID</p>
//                   <h2 className="tracking-order-id">{order.id}</h2>
//                 </div>

//                 <span className={`status-badge status-${order.status.replaceAll("_", "-")}`}>
//                   {order.status.replaceAll("_", " ")}
//                 </span>
//               </div>

//               <div className="tracking-timeline">
//                 {steps.map((step, index) => {
//                   const done = index <= currentStepIndex;
//                   const active = index === currentStepIndex;

//                   return (
//                     <div key={step.key} className="timeline-row">
//                       <div className={`timeline-dot ${done ? "done" : ""} ${active ? "active" : ""}`} />
//                       <div className="timeline-content">
//                         <h3>{step.label}</h3>
//                         <p>
//                           {done
//                             ? "This stage has been completed."
//                             : "Pending update from the kitchen team."}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}

//                 {order.status === "cancelled" ? (
//                   <div className="tracking-cancelled">
//                     This order has been cancelled. Please contact support for assistance.
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             <div className="tracking-card">
//               <p className="tracking-label">Customer</p>
//               <h3 className="tracking-section-title">{order.customer_name}</h3>

//               <div className="tracking-meta">
//                 <p>
//                   <strong>Phone:</strong> {order.phone}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {order.address}
//                 </p>
//                 <p>
//                   <strong>Placed:</strong> {formatDate(order.created_at)}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> {formatCurrency(order.total_amount)}
//                 </p>
//               </div>

//               <div className="tracking-items">
//                 <p className="tracking-label">Order Items</p>
//                 {Array.isArray(order.items) && order.items.length ? (
//                   order.items.map((item, index) => (
//                     <div key={`${order.id}-${index}`} className="tracking-item-row">
//                       <span>
//                         {item.name} x {item.quantity}
//                       </span>
//                       <span>{formatCurrency(item.price * item.quantity)}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="tracking-muted">No order items found.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </main>
//   );
// }


import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, Phone, ReceiptText, ShoppingBag } from "lucide-react";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import TrackingTimeline from "@/components/TrackingTimeline";
import { formatCurrency } from "@/lib/formatCurrency";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

async function getOrder(id) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  const rawText = await response.text();

  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error("Tracking API did not return valid JSON");
  }

  if (!response.ok) {
    throw new Error(data.error || "Could not fetch order");
  }

  return data.order || null;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export async function generateMetadata({ params }) {
  return {
    title: `Track Order ${params.id} | Gracee Ville Kitchen N Events`,
    description: "Track your restaurant order in real time.",
  };
}

export default async function TrackOrderPage({ params }) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
              Order tracking
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Track your order
            </h1>
            <p className="mt-2 text-slate-400">
              Stay updated on the progress of your meal and delivery.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to menu
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Order ID</p>
                  <h2 className="mt-1 text-xl font-bold break-all">{order.id}</h2>
                </div>

                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-300">
                    <ReceiptText size={16} />
                    <span className="text-sm font-medium">Customer</span>
                  </div>
                  <p className="font-semibold text-white">{order.customer_name}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-300">
                    <Phone size={16} />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="font-semibold text-white">{order.phone}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-slate-300">
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Delivery address</span>
                  </div>
                  <p className="font-semibold text-white">{order.address}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-slate-300">
                    <Clock3 size={16} />
                    <span className="text-sm font-medium">Placed</span>
                  </div>
                  <p className="font-semibold text-white">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <TrackingTimeline status={order.status} />
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
              <div className="mb-5 flex items-center gap-2">
                <ShoppingBag size={18} className="text-orange-400" />
                <h3 className="text-xl font-bold">Order summary</h3>
              </div>

              <div className="space-y-4">
                {Array.isArray(order.items) && order.items.length ? (
                  order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-slate-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-white">
                        {formatCurrency(
                          Number(item.price || 0) * Number(item.quantity || 0)
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-400">
                    No items found for this order.
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(Number(order.subtotal || 0))}</span>
                </div>

                <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                  <span>Delivery fee</span>
                  <span>{formatCurrency(Number(order.delivery_fee || 0))}</span>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                  <span>Total</span>
                  <span>{formatCurrency(Number(order.total_amount || 0))}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/10 p-6">
              <h3 className="text-lg font-bold text-white">Need help?</h3>
              <p className="mt-2 text-sm text-slate-200">
                If you need to confirm details or get delivery assistance, please contact the restaurant directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}