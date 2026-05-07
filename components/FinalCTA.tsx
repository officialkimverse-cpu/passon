export default function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          Moving out or moving in—start from the same place.
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          List what you&apos;re leaving, or shop what the last tenant left. PassOn is built around
          the lease, not the parking lot.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#moving-in"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm text-sm"
          >
            I&apos;m moving in
          </a>
          <a
            href="/move-out/upload"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm text-sm"
          >
            I&apos;m moving out
          </a>
        </div>
        <p className="text-xs text-gray-400">
          Free to use · In-unit handoff at turnover · Invite links for next residents
        </p>
      </div>
    </section>
  );
}
