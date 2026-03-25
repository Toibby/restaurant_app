"use client";

const steps = [
  {
    key: "new",
    title: "Order received",
    description: "We have received your order and it is waiting for confirmation.",
  },
  {
    key: "confirmed",
    title: "Order confirmed",
    description: "Your order has been confirmed by the kitchen team.",
  },
  {
    key: "preparing",
    title: "Preparing your meal",
    description: "Your meal is being prepared fresh and packed carefully.",
  },
  {
    key: "out_for_delivery",
    title: "Out for delivery",
    description: "Your rider is on the way with your order.",
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "Your order has been delivered successfully.",
  },
];

const statusOrder = {
  new: 0,
  confirmed: 1,
  preparing: 2,
  out_for_delivery: 3,
  delivered: 4,
  cancelled: -1,
};

export default function TrackingTimeline({ status }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-6">
        <h3 className="text-lg font-bold text-white">Order cancelled</h3>
        <p className="mt-2 text-sm text-slate-300">
          This order has been cancelled. If you need help, please contact support or the restaurant directly.
        </p>
      </div>
    );
  }

  const currentIndex =
    typeof statusOrder[status] === "number" ? statusOrder[status] : 0;

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-lg font-bold text-white">Tracking progress</h3>

      <div className="mt-6 space-y-6">
        {steps.map((step, index) => {
          const completed = index <= currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`h-4 w-4 rounded-full border ${
                    completed
                      ? "border-orange-400 bg-orange-400"
                      : "border-white/20 bg-transparent"
                  }`}
                />
                {index < steps.length - 1 ? (
                  <div
                    className={`mt-2 w-px flex-1 ${
                      completed ? "bg-orange-400/70" : "bg-white/10"
                    }`}
                  />
                ) : null}
              </div>

              <div className="pb-6">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-semibold ${
                      completed ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h4>

                  {active ? (
                    <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs font-semibold text-orange-300">
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-slate-400">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}