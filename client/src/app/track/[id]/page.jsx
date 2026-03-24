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




"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

const steps = [
  { key: "new", label: "Order Received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function fetchOrder(showLoading = false) {
    try {
      if (showLoading) setLoading(true);
      setError("");

      const res = await fetch(`${apiBase}/api/orders/${orderId}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not fetch order");
      }

      setOrder(data.order);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      if (showLoading) setLoading(false);
    }
  }

  useEffect(() => {
    if (!orderId) return;

    fetchOrder(true);

    const interval = setInterval(() => {
      fetchOrder(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  const currentStepIndex = useMemo(() => {
    if (!order?.status) return 0;
    const index = steps.findIndex((step) => step.key === order.status);
    return index === -1 ? 0 : index;
  }, [order]);

  return (
    <main className="tracking-shell">
      <div className="tracking-container">
        <div className="tracking-hero">
          <p className="tracking-eyebrow">Order Tracking</p>
          <h1 className="tracking-title">Track your Gracee Ville order</h1>
          <p className="tracking-copy">
            Stay updated on your meal as it moves from confirmation to delivery.
          </p>
          {lastUpdated ? (
            <p className="tracking-last-updated">Last updated: {lastUpdated}</p>
          ) : null}
        </div>

        {loading ? <p className="tracking-message">Loading order...</p> : null}
        {error ? <p className="tracking-error">{error}</p> : null}

        {!loading && !error && order ? (
          <div className="tracking-grid">
            <div className="tracking-card">
              <div className="tracking-head">
                <div>
                  <p className="tracking-label">Order ID</p>
                  <h2 className="tracking-order-id">{order.id}</h2>
                </div>

                <span className={`status-badge status-${order.status.replaceAll("_", "-")}`}>
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="tracking-timeline">
                {steps.map((step, index) => {
                  const done = index <= currentStepIndex;
                  const active = index === currentStepIndex;

                  return (
                    <div key={step.key} className="timeline-row">
                      <div className={`timeline-dot ${done ? "done" : ""} ${active ? "active" : ""}`} />
                      <div className="timeline-content">
                        <h3>{step.label}</h3>
                        <p>
                          {done
                            ? "This stage has been completed."
                            : "Pending update from the kitchen team."}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {order.status === "cancelled" ? (
                  <div className="tracking-cancelled">
                    This order has been cancelled. Please contact support for assistance.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="tracking-card">
              <p className="tracking-label">Customer</p>
              <h3 className="tracking-section-title">{order.customer_name}</h3>

              <div className="tracking-meta">
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Placed:</strong> {formatDate(order.created_at)}
                </p>
                <p>
                  <strong>Total:</strong> {formatCurrency(order.total_amount)}
                </p>
              </div>

              <div className="tracking-items">
                <p className="tracking-label">Order Items</p>
                {Array.isArray(order.items) && order.items.length ? (
                  order.items.map((item, index) => (
                    <div key={`${order.id}-${index}`} className="tracking-item-row">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))
                ) : (
                  <p className="tracking-muted">No order items found.</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}