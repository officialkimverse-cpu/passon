export default function TwoWaysSection() {
  return (
    <section
      id="two-ways"
      className="py-20 px-4 sm:px-6 bg-gray-50 border-y border-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            One apartment. Two roles.
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            PassOn is built around lease turnover: the outgoing renter lists what stays behind,
            and the incoming renter shops it in place—no pickup meetups or curb swaps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <span aria-hidden>📤</span>
              Moving out
            </div>
            <h3 className="text-xl font-semibold text-gray-900 leading-snug">
              List what you&apos;re leaving in the unit
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Photograph what you won&apos;t take. AI groups items, suggests names, brands, and
              prices; you add the details in text or voice. When you go, it stays—priced for
              whoever gets your keys next.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm ring-1 ring-emerald-100/80 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <span aria-hidden>📥</span>
              Moving in
            </div>
            <h3 className="text-xl font-semibold text-gray-900 leading-snug">
              Shop from your invite link
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Open the link for your new place, see what&apos;s already there, and decide item
              by item what you want—without coordinating pickups or meeting strangers at the curb.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
