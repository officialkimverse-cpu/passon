export default function WhatIsPassOnSection() {
  return (
    <section id="what-is-passon" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            What is PassOn?
          </h2>
          <p className="mt-3 text-gray-500 max-w-3xl mx-auto leading-relaxed">
            PassOn is a marketplace designed for renter turnover. The outgoing tenant lists what
            stays behind, and the incoming tenant shops it in place—so there’s no pickup scheduling,
            no meetups, and no “can you hold it?” chaos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div
            id="why-passon"
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <span aria-hidden>💡</span>
              Why we started
            </div>

            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
              <div className="relative aspect-[16/9] w-full">
                <img
                  src="https://images.unsplash.com/photo-1714647211902-bb711d643a17?auto=format&fit=crop&w=1600&q=80"
                  alt="Moving boxes in an apartment living room"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/0 to-white/0" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 text-lg leading-snug">
              Moving creates unnecessary waste and friction
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every lease change turns good furniture into a logistics problem: listings, DMs,
              no-shows, and last-minute hauling. PassOn exists to make passing things on the default,
              not a weekend project.
            </p>
          </div>

          <div
            id="how-passon-works"
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <span aria-hidden>🔁</span>
              How it works
            </div>

            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
              <div className="relative aspect-[16/9] w-full">
                <img
                  src="https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&w=1600&q=80"
                  alt="A hand holding apartment keys in front of a doorway"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/0 to-white/0" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 text-lg leading-snug">
              One listing. Two renters.
            </h3>
            <div className="text-sm text-gray-500 leading-relaxed space-y-3">
              <p>
                <span className="font-semibold text-gray-900">Moving out:</span> take photos, let AI
                draft details and pricing, add notes, and share the listing.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Moving in:</span> open the invite
                link and choose for each item: buy now, offer, negotiate, or pass.
              </p>
            </div>
          </div>

          <div
            id="impact-passon"
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              <span aria-hidden>🌱</span>
              Environmental impact
            </div>

            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
              <div className="relative aspect-[16/9] w-full">
                <img
                  src="https://images.unsplash.com/photo-1525695230005-efd074980869?auto=format&fit=crop&w=1600&q=80"
                  alt="A plant growing from a reused tin can"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/0 to-white/0" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 text-lg leading-snug">
              Reuse wins when it’s effortless
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              When items stay in the unit through turnover, they’re far more likely to be reused.
              That means fewer curb piles, fewer disposal trips, and fewer new purchases to replace
              perfectly usable goods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

