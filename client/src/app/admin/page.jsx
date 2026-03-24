// "use client";

// import { useEffect, useMemo, useState } from "react";

// const statusOptions = [
//   "new",
//   "confirmed",
//   "preparing",
//   "out_for_delivery",
//   "delivered",
//   "cancelled",
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

// function getStatusClass(status) {
//   const map = {
//     new: "status-badge status-new",
//     confirmed: "status-badge status-confirmed",
//     preparing: "status-badge status-preparing",
//     out_for_delivery: "status-badge status-delivery",
//     delivered: "status-badge status-delivered",
//     cancelled: "status-badge status-cancelled",
//   };

//   return map[status] || "status-badge";
// }

// export default function AdminPage() {
//   const [accessGranted, setAccessGranted] = useState(false);
//   const [secretInput, setSecretInput] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [updatingId, setUpdatingId] = useState("");
//   const [error, setError] = useState("");

//   const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
//   const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

//   async function fetchOrders() {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`${apiBase}/api/orders`, {
//         headers: {
//           "x-admin-secret": adminSecret,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Could not fetch orders");
//       }

//       setOrders(data.orders || []);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function updateStatus(orderId, status) {
//     try {
//       setUpdatingId(orderId);
//       setError("");

//       const res = await fetch(`${apiBase}/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "x-admin-secret": adminSecret,
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Could not update status");
//       }

//       setOrders((prev) =>
//         prev.map((order) => (order.id === orderId ? data.order : order))
//       );
//     } catch (err) {
//       setError(err.message || "Update failed");
//     } finally {
//       setUpdatingId("");
//     }
//   }

//   useEffect(() => {
//     if (accessGranted) {
//       fetchOrders();
//     }
//   }, [accessGranted]);

//   const stats = useMemo(() => {
//     const totalOrders = orders.length;
//     const newOrders = orders.filter((o) => o.status === "new").length;
//     const preparingOrders = orders.filter((o) => o.status === "preparing").length;
//     const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
//     const totalRevenue = orders
//       .filter((o) => o.status !== "cancelled")
//       .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

//     return {
//       totalOrders,
//       newOrders,
//       preparingOrders,
//       deliveredOrders,
//       totalRevenue,
//     };
//   }, [orders]);

//   if (!accessGranted) {
//     return (
//       <main className="admin-shell">
//         <div className="admin-login-card">
//           <p className="admin-eyebrow">Admin Access</p>
//           <h1 className="admin-title">Gracee Ville Dashboard</h1>
//           <p className="admin-copy">
//             Enter your admin passcode to view and manage incoming orders.
//           </p>

//           <input
//             type="password"
//             value={secretInput}
//             onChange={(e) => setSecretInput(e.target.value)}
//             placeholder="Enter admin passcode"
//             className="admin-input"
//           />

//           <button
//             className="admin-primary-btn"
//             onClick={() => {
//               if (secretInput === adminSecret) {
//                 setAccessGranted(true);
//               } else {
//                 alert("Wrong admin passcode");
//               }
//             }}
//           >
//             Open Dashboard
//           </button>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="admin-shell">
//       <div className="admin-container">
//         <div className="admin-topbar">
//           <div>
//             <p className="admin-eyebrow">Admin Dashboard</p>
//             <h1 className="admin-title">Gracee Ville Kitchen N Events</h1>
//             <p className="admin-copy">Manage orders, monitor progress and update statuses.</p>
//           </div>

//           <button className="admin-secondary-btn" onClick={fetchOrders}>
//             Refresh Orders
//           </button>
//         </div>

//         <div className="admin-stats-grid">
//           <div className="admin-stat-card">
//             <span>Total Orders</span>
//             <strong>{stats.totalOrders}</strong>
//           </div>
//           <div className="admin-stat-card">
//             <span>New Orders</span>
//             <strong>{stats.newOrders}</strong>
//           </div>
//           <div className="admin-stat-card">
//             <span>Preparing</span>
//             <strong>{stats.preparingOrders}</strong>
//           </div>
//           <div className="admin-stat-card">
//             <span>Delivered</span>
//             <strong>{stats.deliveredOrders}</strong>
//           </div>
//           <div className="admin-stat-card wide">
//             <span>Total Revenue</span>
//             <strong>{formatCurrency(stats.totalRevenue)}</strong>
//           </div>
//         </div>

//         {error ? <p className="admin-error">{error}</p> : null}
//         {loading ? <p className="admin-loading">Loading orders...</p> : null}

//         <div className="admin-orders-grid">
//           {orders.map((order) => (
//             <div key={order.id} className="admin-order-card">
//               <div className="admin-order-head">
//                 <div>
//                   <h3>{order.customer_name}</h3>
//                   <p>{order.phone}</p>
//                 </div>

//                 <span className={getStatusClass(order.status)}>
//                   {order.status.replaceAll("_", " ")}
//                 </span>
//               </div>

//               <div className="admin-order-meta">
//                 <p>
//                   <strong>Order ID:</strong> {order.id}
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

//               <div className="admin-order-items">
//                 <p className="admin-section-label">Items</p>
//                 {Array.isArray(order.items) && order.items.length ? (
//                   order.items.map((item, index) => (
//                     <div key={`${order.id}-${index}`} className="admin-item-row">
//                       <span>
//                         {item.name} x {item.quantity}
//                       </span>
//                       <span>{formatCurrency(item.price * item.quantity)}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="admin-muted">No items found.</p>
//                 )}
//               </div>

//               <div className="admin-status-row">
//                 <select
//                   className="admin-select"
//                   defaultValue={order.status}
//                   onChange={(e) => updateStatus(order.id, e.target.value)}
//                   disabled={updatingId === order.id}
//                 >
//                   {statusOptions.map((status) => (
//                     <option key={status} value={status}>
//                       {status.replaceAll("_", " ")}
//                     </option>
//                   ))}
//                 </select>

//                 <a
//                   className="admin-track-link"
//                   href={`/track/${order.id}`}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   View Tracking
//                 </a>
//               </div>
//             </div>
//           ))}

//           {!loading && !orders.length ? (
//             <div className="admin-empty-card">
//               <h3>No orders yet</h3>
//               <p>Incoming customer orders will appear here.</p>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";

const statusOptions = [
  "new",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
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

function getStatusClass(status) {
  const map = {
    new: "status-badge status-new",
    confirmed: "status-badge status-confirmed",
    preparing: "status-badge status-preparing",
    out_for_delivery: "status-badge status-delivery",
    delivered: "status-badge status-delivered",
    cancelled: "status-badge status-cancelled",
  };

  return map[status] || "status-badge";
}

export default function AdminPage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [secretInput, setSecretInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data = await res.json();
      setAccessGranted(Boolean(data.authenticated));
    } finally {
      setCheckingSession(false);
    }
  }

  async function login() {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode: secretInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setAccessGranted(true);
    } catch (err) {
      alert(err.message || "Wrong admin passcode");
    }
  }

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/orders", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId, status) {
    try {
      setUpdatingId(orderId);
      setError("");

      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not update status");
      }

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? data.order : order))
      );
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setUpdatingId("");
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (!accessGranted) return;

    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, [accessGranted]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === "new").length;
    const preparingOrders = orders.filter((o) => o.status === "preparing").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    return {
      totalOrders,
      newOrders,
      preparingOrders,
      deliveredOrders,
      totalRevenue,
    };
  }, [orders]);

  if (checkingSession) {
    return (
      <main className="admin-shell">
        <div className="admin-login-card">
          <p className="admin-copy">Checking admin session...</p>
        </div>
      </main>
    );
  }

  if (!accessGranted) {
    return (
      <main className="admin-shell">
        <div className="admin-login-card">
          <p className="admin-eyebrow">Admin Access</p>
          <h1 className="admin-title">Gracee Ville Dashboard</h1>
          <p className="admin-copy">
            Enter your admin passcode to view and manage incoming orders.
          </p>

          <input
            type="password"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            placeholder="Enter admin passcode"
            className="admin-input"
          />

          <button className="admin-primary-btn" onClick={login}>
            Open Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="admin-container">
        <div className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Admin Dashboard</p>
            <h1 className="admin-title">Gracee Ville Kitchen N Events</h1>
            <p className="admin-copy">Manage orders, monitor progress and update statuses.</p>
          </div>

          <button className="admin-secondary-btn" onClick={fetchOrders}>
            Refresh Orders
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span>Total Orders</span>
            <strong>{stats.totalOrders}</strong>
          </div>
          <div className="admin-stat-card">
            <span>New Orders</span>
            <strong>{stats.newOrders}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Preparing</span>
            <strong>{stats.preparingOrders}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Delivered</span>
            <strong>{stats.deliveredOrders}</strong>
          </div>
          <div className="admin-stat-card wide">
            <span>Total Revenue</span>
            <strong>{formatCurrency(stats.totalRevenue)}</strong>
          </div>
        </div>

        {error ? <p className="admin-error">{error}</p> : null}
        {loading ? <p className="admin-loading">Loading orders...</p> : null}

        <div className="admin-orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-order-head">
                <div>
                  <h3>{order.customer_name}</h3>
                  <p>{order.phone}</p>
                </div>

                <span className={getStatusClass(order.status)}>
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="admin-order-meta">
                <p>
                  <strong>Order ID:</strong> {order.id}
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

              <div className="admin-order-items">
                <p className="admin-section-label">Items</p>
                {Array.isArray(order.items) && order.items.length ? (
                  order.items.map((item, index) => (
                    <div key={`${order.id}-${index}`} className="admin-item-row">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))
                ) : (
                  <p className="admin-muted">No items found.</p>
                )}
              </div>

              <div className="admin-status-row">
                <select
                  className="admin-select"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>

                <a
                  className="admin-track-link"
                  href={`/track/${order.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Tracking
                </a>
              </div>
            </div>
          ))}

          {!loading && !orders.length ? (
            <div className="admin-empty-card">
              <h3>No orders yet</h3>
              <p>Incoming customer orders will appear here.</p>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}