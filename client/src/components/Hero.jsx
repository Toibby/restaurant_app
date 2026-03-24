"use client";

import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="container-shell grid gap-10 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-16">
      <div className="flex flex-col justify-center">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm text-orange-300">
          <Star size={16} fill="currentColor" />
          Premium meals delivered hot and fast
        </div>

        <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
          Beautiful food ordering for a modern restaurant brand.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
          Elegant visuals, fast cart flow, clean checkout and a premium experience
          that feels better than a template.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Order Now
            <ArrowRight size={18} />
          </a>
          <a
            href="#specials"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            View Specials
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
          <div>
            <p className="text-2xl font-bold text-white">4.9/5</p>
            <p>Customer rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">20 min</p>
            <p>Average delivery</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">50+</p>
            <p>Curated meals</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="accent-ring overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant hero"
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div className="glass absolute -bottom-6 left-6 rounded-3xl px-5 py-4 text-white">
          <p className="text-sm text-slate-300">Today’s standout</p>
          <p className="mt-1 text-xl font-bold">Smoky Jollof Rice</p>
          <p className="mt-1 text-sm text-slate-300">Loved for taste, aroma and presentation</p>
        </div>
      </div>
    </section>
  );
}