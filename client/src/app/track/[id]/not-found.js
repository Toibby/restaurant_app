import Link from "next/link";

export default function TrackOrderNotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-orange-400">
          Order tracking
        </p>
        <h1 className="mt-4 text-4xl font-bold">Order not found</h1>
        <p className="mt-4 max-w-xl text-slate-400">
          We could not find an order with this tracking link. Please check the link and try again.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]"
        >
          Back to homepage
        </Link>
      </section>
    </main>
  );
}