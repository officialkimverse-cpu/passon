export default function FutureFeatureTeaser() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full w-fit uppercase tracking-widest">
            Coming soon · Moving out
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
            Snap your room.{" "}
            <span className="text-emerald-400">We group, price, and draft listings.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-md">
            Upload photos before you move out and our AI clusters items, suggests names and brands,
            and estimates original and resale value. Add voice or text notes—then publish for the
            next tenant in a few taps.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Automatic grouping from multiple photos",
              "Draft titles, brands, and price hints in seconds",
              "Voice or text notes for condition and what's included",
              "One flow from shoot to shareable invite link",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors w-fit text-sm mt-2"
          >
            Join the waitlist →
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div className="bg-white/10 rounded-xl h-40 flex items-center justify-center text-gray-500 text-sm border-2 border-dashed border-white/20">
            <div className="text-center">
              <p className="text-3xl mb-2">📸</p>
              <p className="text-white/40 text-xs">Upload your room photos</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "Standing Desk", value: "$110–130", confidence: 92 },
              { label: "Office Chair", value: "$55–70", confidence: 87 },
              { label: "Floor Lamp", value: "$20–30", confidence: 95 },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5 border border-white/10"
              >
                <div>
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-emerald-400 text-xs font-semibold">{item.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Confidence</p>
                  <p className="text-white text-sm font-bold">{item.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl py-2.5 text-sm font-medium transition-colors">
            Draft 3 listings →
          </button>
        </div>
      </div>
    </section>
  );
}
