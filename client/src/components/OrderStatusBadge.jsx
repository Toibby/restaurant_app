"use client";

const statusMap = {
  new: {
    label: "New",
    className: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  },
  preparing: {
    label: "Preparing",
    className: "bg-orange-500/15 text-orange-300 border-orange-400/20",
  },
  out_for_delivery: {
    label: "Out for delivery",
    className: "bg-purple-500/15 text-purple-300 border-purple-400/20",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  },
};

export default function OrderStatusBadge({ status }) {
  const config =
    statusMap[status] || {
      label: status?.replaceAll("_", " ") || "Unknown",
      className: "bg-slate-500/15 text-slate-300 border-slate-400/20",
    };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold capitalize ${config.className}`}
    >
      {config.label}
    </span>
  );
}