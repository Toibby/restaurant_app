"use client";

import Link from "next/link";

export default function TrackOrderError({ error, reset }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-bold">Unable to load tracking page</h1>
        <p className="mt-4 max-w-xl text-slate-400">
          {error?.message || "An unexpected error occurred while loading your order."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}