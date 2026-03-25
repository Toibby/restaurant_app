// "use client";

// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { formatCurrency } from "@/lib/formatCurrency";

// const initialForm = {
//   customer_name: "",
//   phone: "",
//   address: "",
// };

// export default function CheckoutModal({ isOpen, onClose, items, onSuccessfulOrder }) {
//   const [form, setForm] = useState(initialForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!isOpen) {
//       setForm(initialForm);
//       setSubmitting(false);
//       setMessage("");
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const delivery = items.length ? 1500 : 0;
//   const total = subtotal + delivery;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage("");

//     const payload = {
//         ...form,
//         items,
//         subtotal,
//         delivery_fee: delivery,
//         total_amount: total,
//         status: "new",
//     };

//     try {
//         const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
//         {
//             method: "POST",
//             headers: {
//             "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//         throw new Error(data.error || "Could not place order");
//         }

//         setMessage("Your order has been received. Redirecting...");

//         if (data?.order?.id) {
//         onSuccessfulOrder();
//         window.location.href = `/track/${data.order.id}`;
//         return;
//         }

//         onSuccessfulOrder();
//     } catch (error) {
//         console.error(error);
//         setMessage(error.message || "Something went wrong.");

//         const whatsappText = `Hello, I want to place an order.
//     Name: ${form.customer_name}
//     Phone: ${form.phone}
//     Address: ${form.address}
//     Total: ${formatCurrency(total)}`;

//         window.open(
//         `https://wa.me/2348000000000?text=${encodeURIComponent(whatsappText)}`,
//         "_blank"
//         );
//     } finally {
//         setSubmitting(false);
//     }
//     }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setSubmitting(true);
// //     setMessage("");

// //     const payload = {
// //       ...form,
// //       items,
// //       subtotal,
// //       delivery_fee: delivery,
// //       total_amount: total,
// //       status: "new",
// //     };

// //     try {
// //         const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
// //         {
// //             method: "POST",
// //             headers: {
// //             "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify(payload),
// //         }
// //         );
// //     //   const response = await fetch("http://localhost:5000/api/orders", {
// //     //     method: "POST",
// //     //     headers: {
// //     //       "Content-Type": "application/json",
// //     //     },
// //     //     body: JSON.stringify(payload),
// //     //   });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.error || "Could not place order");
// //       }

// //       setMessage("Order placed successfully.");
// //       onSuccessfulOrder();
// //     } catch (error) {
// //       setMessage(error.message || "Something went wrong.");

// //       const whatsappText = `Hello, I want to place an order.%0AName: ${form.customer_name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0ATotal: ${formatCurrency(total)}`;
// //       window.open(`https://wa.me/2348000000000?text=${whatsappText}`, "_blank");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }

//   return (
//     <>
//       <button
//         onClick={onClose}
//         className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
//         aria-label="Close checkout"
//       />

//       <div className="fixed left-1/2 top-1/2 z-[70] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-slate-950 p-6 shadow-2xl">
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.22em] text-orange-400">Checkout</p>
//             <h3 className="mt-1 text-2xl font-bold text-white">Complete your order</h3>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-2xl border border-white/10 p-3 text-slate-300 hover:bg-white/5 hover:text-white"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               required
//               placeholder="Full name"
//               value={form.customer_name}
//               onChange={(e) => setForm((prev) => ({ ...prev, customer_name: e.target.value }))}
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <input
//               required
//               placeholder="Phone number"
//               value={form.phone}
//               onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <textarea
//               required
//               rows={5}
//               placeholder="Delivery address"
//               value={form.address}
//               onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-slate-950 transition hover:scale-[1.01] disabled:opacity-60"
//             >
//               {submitting ? "Placing order..." : "Place Order"}
//             </button>

//             {message ? (
//               <p className="text-sm text-slate-300">{message}</p>
//             ) : null}
//           </form>

//           <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
//             <h4 className="text-lg font-bold text-white">Order Summary</h4>

//             <div className="mt-4 space-y-3">
//               {items.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
//                   <span className="text-slate-300">
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span className="font-semibold text-white">
//                     {formatCurrency(item.price * item.quantity)}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5 border-t border-white/10 pt-4">
//               <div className="mb-2 flex justify-between text-sm text-slate-400">
//                 <span>Subtotal</span>
//                 <span>{formatCurrency(subtotal)}</span>
//               </div>
//               <div className="mb-2 flex justify-between text-sm text-slate-400">
//                 <span>Delivery</span>
//                 <span>{formatCurrency(delivery)}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-white">
//                 <span>Total</span>
//                 <span>{formatCurrency(total)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { formatCurrency } from "@/lib/formatCurrency";

// const initialForm = {
//   customer_name: "",
//   phone: "",
//   address: "",
// };

// export default function CheckoutModal({
//   isOpen,
//   onClose,
//   items,
//   onSuccessfulOrder,
// }) {
//   const [form, setForm] = useState(initialForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const apiBase =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

//   useEffect(() => {
//     if (!isOpen) {
//       setForm(initialForm);
//       setSubmitting(false);
//       setMessage("");
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const subtotal = items.reduce(
//     (sum, item) => sum + Number(item.price) * Number(item.quantity),
//     0
//   );
//   const delivery = items.length ? 1500 : 0;
//   const total = subtotal + delivery;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage("");

//     const payload = {
//       ...form,
//       items,
//       subtotal,
//       delivery_fee: delivery,
//       total_amount: total,
//       status: "new",
//     };

//     try {
//       const response = await fetch(`${apiBase}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Could not place order");
//       }

//       setMessage("Your order has been received. Redirecting...");

//       if (data?.order?.id) {
//         onSuccessfulOrder();
//         window.location.href = `/track/${data.order.id}`;
//         return;
//       }

//       onSuccessfulOrder();
//     } catch (error) {
//       console.error(error);
//       setMessage(error.message || "Something went wrong.");

//       const whatsappText = `Hello, I want to place an order.
// Name: ${form.customer_name}
// Phone: ${form.phone}
// Address: ${form.address}
// Total: ${formatCurrency(total)}`;

//       window.open(
//         `https://wa.me/2348000000000?text=${encodeURIComponent(whatsappText)}`,
//         "_blank"
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <>
//       <button
//         onClick={onClose}
//         className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
//         aria-label="Close checkout"
//       />

//       <div className="fixed left-1/2 top-1/2 z-[70] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-slate-950 p-6 shadow-2xl">
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
//               Checkout
//             </p>
//             <h3 className="mt-1 text-2xl font-bold text-white">
//               Complete your order
//             </h3>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-2xl border border-white/10 p-3 text-slate-300 hover:bg-white/5 hover:text-white"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               required
//               placeholder="Full name"
//               value={form.customer_name}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   customer_name: e.target.value,
//                 }))
//               }
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <input
//               required
//               placeholder="Phone number"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   phone: e.target.value,
//                 }))
//               }
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <textarea
//               required
//               rows={5}
//               placeholder="Delivery address"
//               value={form.address}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   address: e.target.value,
//                 }))
//               }
//               className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
//             />

//             <button
//               type="submit"
//               disabled={submitting || !items.length}
//               className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {submitting ? "Placing order..." : "Place Order"}
//             </button>

//             {message ? <p className="text-sm text-slate-300">{message}</p> : null}
//           </form>

//           <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
//             <h4 className="text-lg font-bold text-white">Order Summary</h4>

//             <div className="mt-4 space-y-3">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center justify-between gap-3 text-sm"
//                 >
//                   <span className="text-slate-300">
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span className="font-semibold text-white">
//                     {formatCurrency(item.price * item.quantity)}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5 border-t border-white/10 pt-4">
//               <div className="mb-2 flex justify-between text-sm text-slate-400">
//                 <span>Subtotal</span>
//                 <span>{formatCurrency(subtotal)}</span>
//               </div>
//               <div className="mb-2 flex justify-between text-sm text-slate-400">
//                 <span>Delivery</span>
//                 <span>{formatCurrency(delivery)}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-white">
//                 <span>Total</span>
//                 <span>{formatCurrency(total)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import { API_BASE_URL, fetchWithTimeout } from "@/lib/api";

const initialForm = {
  customer_name: "",
  phone: "",
  address: "",
};

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccessfulOrder,
}) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setSubmitting(false);
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const delivery = items.length ? 1500 : 0;
  const total = subtotal + delivery;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const payload = {
      customer_name: form.customer_name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      items: items.map((item) => ({
        id: item.id ?? null,
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      subtotal: Number(subtotal),
      delivery_fee: Number(delivery),
      total_amount: Number(total),
      status: "new",
    };

    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not place order");
      }

      setMessage("Your order has been received successfully. Redirecting to tracking...");

      if (typeof onSuccessfulOrder === "function") {
        onSuccessfulOrder(data.order);
      }

      if (data?.order?.id) {
        window.location.href = `/track/${data.order.id}`;
        return;
      }

      onClose();
    } catch (error) {
      console.error("Checkout failed:", error);
      setMessage(error.message || "Something went wrong.");

      const whatsappText = `Hello, I want to place an order.

Name: ${form.customer_name}
Phone: ${form.phone}
Address: ${form.address}

Items:
${items.map((item) => `${item.name} x ${item.quantity}`).join("\n")}

Total: ${formatCurrency(total)}`;

      window.open(
        `https://wa.me/2348023567823?text=${encodeURIComponent(whatsappText)}`,
        "_blank"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        aria-label="Close checkout"
      />

      <div className="fixed left-1/2 top-1/2 z-[70] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-slate-950 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
              Checkout
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">
              Complete your order
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 p-3 text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Full name"
              value={form.customer_name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  customer_name: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <input
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <textarea
              required
              rows={5}
              placeholder="Delivery address"
              value={form.address}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={submitting || !items.length}
              className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Placing order..." : "Place Order"}
            </button>

            {message ? <p className="text-sm text-slate-300">{message}</p> : null}
          </form>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <h4 className="text-lg font-bold text-white">Order Summary</h4>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-slate-300">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-white">
                    {formatCurrency(Number(item.price) * Number(item.quantity))}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-2 flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="mb-2 flex justify-between text-sm text-slate-400">
                <span>Delivery</span>
                <span>{formatCurrency(delivery)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}