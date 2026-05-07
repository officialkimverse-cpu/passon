import { listings } from "@/lib/mockData";
import ItemCard from "./ui/ItemCard";

export default function HeroSection() {
  const previewItems = listings.slice(0, 3);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-emerald-50/60 to-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
            <span>♻️</span>
            <span>The renter marketplace for move-in &amp; move-out</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Leave it in the unit.{" "}
            <span className="text-emerald-600">The next tenant takes it from there.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            <p className="text-lg text-gray-500 leading-relaxed max-w-md md:max-w-none md:flex-1">
              PassOn helps outgoing renters sell furniture and household goods to whoever&apos;s moving
              in next—without coordinating pickups or meetups. Snap photos, we group items and
              draft details; the incoming renter browses one link and decides what to keep.
            </p>

            {/* Fills the “blank” hero space on md; lg uses the listing preview column */}
            <div className="hidden md:block lg:hidden w-full md:w-64 shrink-0">
              <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
                <svg
                  viewBox="0 0 320 220"
                  className="relative block w-full h-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {/* Apartment outline */}
                  <path
                    d="M66 96l94-64 94 64v96H66V96z"
                    className="text-gray-300"
                    fill="#ffffff"
                  />
                  <path d="M118 192v-56h84v56" className="text-gray-300" />
                  <path d="M148 162h24" className="text-gray-300" />

                  {/* “Left behind” box */}
                  <rect
                    x="86"
                    y="136"
                    width="44"
                    height="36"
                    rx="8"
                    className="text-emerald-300"
                    fill="#d1fae5"
                  />
                  <path d="M92 146h32" className="text-emerald-600" />
                  <path d="M92 154h20" className="text-emerald-600" />

                  {/* “Pass on” arrow */}
                  <path d="M132 118h64" className="text-emerald-600" strokeWidth="6" />
                  <path
                    d="M190 102l20 16-20 16"
                    className="text-emerald-600"
                    strokeWidth="6"
                  />

                  {/* “Incoming” sparkles */}
                  <path d="M238 140l6 6-6 6-6-6 6-6z" className="text-emerald-600" />
                  <path d="M256 120l5 5-5 5-5-5 5-5z" className="text-emerald-400" />

                  {/* Caption pill */}
                  <rect x="72" y="52" width="176" height="28" rx="14" fill="#ffffff" />
                  <path
                    d="M86 66h12"
                    className="text-emerald-600"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path d="M108 66h120" className="text-gray-300" strokeWidth="6" />
                </svg>
                <div className="relative px-4 pb-4 -mt-1">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Seller leaves items in place → next tenant chooses what to keep.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#moving-in"
              className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 border border-white/20">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 12h9" />
                  <path d="M9 8l4 4-4 4" />
                  <path d="M13 4h7v16h-7" />
                </svg>
              </span>
              I&apos;m moving in
            </a>
            <a
              href="/move-out/upload"
              className="group inline-flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 12H12" />
                  <path d="M15 8l-4 4 4 4" />
                  <path d="M4 7h6v10H4z" />
                  <path d="M4 7l3-3 3 3" />
                </svg>
              </span>
              I&apos;m moving out
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> No pickup meetups—in the same space
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Timed to lease turnover
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Invite link for the next resident
            </span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-3 rotate-1">
            {previewItems.map((item, i) => (
              <div key={item.id} className={i === 0 ? "col-span-2" : ""}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🏘️</span>
            <div>
              <p className="text-xs text-gray-400">In-unit listings</p>
              <p className="font-bold text-gray-900 text-sm">240+ items at turnover</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
