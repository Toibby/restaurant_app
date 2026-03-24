"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = items.length ? 1500 : 0;
  const total = subtotal + delivery;

  return (
    <>
      {isOpen ? (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          aria-label="Close cart overlay"
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-slate-950 shadow-2xl transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-orange-500 p-3 text-slate-950">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Your Cart</h3>
              <p className="text-sm text-slate-400">{items.length} item(s)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 p-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-8 text-center">
              <p className="text-lg font-semibold text-white">Your cart is empty</p>
              <p className="mt-2 text-sm text-slate-400">
                Add some amazing meals to continue.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="truncate font-bold text-white">{item.name}</h4>
                        <p className="mt-1 text-sm text-slate-400">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onIncrease(item.id)}
                          className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="font-bold text-white">
                        {formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
            <span>Delivery</span>
            <span>{formatCurrency(delivery)}</span>
          </div>
          <div className="mb-5 flex items-center justify-between text-lg font-bold text-white">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button
            onClick={onCheckout}
            disabled={!items.length}
            className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50 hover:scale-[1.01]"
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}