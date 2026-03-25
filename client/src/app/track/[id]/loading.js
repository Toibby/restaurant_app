export default function LoadingTrackPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="mt-4 h-10 w-64 rounded bg-white/10" />
          <div className="mt-2 h-4 w-96 max-w-full rounded bg-white/10" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <div className="h-6 w-48 rounded bg-white/10" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="h-24 rounded-2xl bg-white/10" />
                  <div className="h-24 rounded-2xl bg-white/10" />
                  <div className="h-24 rounded-2xl bg-white/10 sm:col-span-2" />
                  <div className="h-24 rounded-2xl bg-white/10 sm:col-span-2" />
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <div className="h-6 w-40 rounded bg-white/10" />
                <div className="mt-6 space-y-5">
                  <div className="h-16 rounded bg-white/10" />
                  <div className="h-16 rounded bg-white/10" />
                  <div className="h-16 rounded bg-white/10" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <div className="h-6 w-40 rounded bg-white/10" />
                <div className="mt-6 space-y-4">
                  <div className="h-20 rounded-2xl bg-white/10" />
                  <div className="h-20 rounded-2xl bg-white/10" />
                  <div className="h-20 rounded-2xl bg-white/10" />
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <div className="h-20 rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}