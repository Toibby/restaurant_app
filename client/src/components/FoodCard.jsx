"use client";

import { Plus, Star } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function FoodCard({ item, onAdd }) {
  return (
    <div className="group overflow-hidden rounded-[28px] soft-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {item.tag}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{item.category}</p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm text-amber-300">
            <Star size={14} fill="currentColor" />
            {item.rating}
          </div>
        </div>

        <p className="min-h-12 text-sm leading-6 text-slate-300">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-black text-white">
            {formatCurrency(item.price)}
          </p>

          <button
            onClick={() => onAdd(item)}
            className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}