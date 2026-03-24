"use client";

import { ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/30">
            <UtensilsCrossed size={22} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide text-white">SavoryBite</p>
            <p className="text-xs text-slate-400">Premium Food Experience</p>
          </div>
        </a>

        <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="#menu" className="transition hover:text-white">
            Menu
          </a>
          <a href="#specials" className="transition hover:text-white">
            Specials
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </nav>

        <button
          onClick={onCartOpen}
          className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <ShoppingBag size={18} />
          <span>Cart</span>
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-slate-950">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}