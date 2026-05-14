import CartNavLink from "@/components/CartNavLink";
import PassOnBrand from "@/components/PassOnBrand";
import PassOnLogoMark from "@/components/PassOnLogoMark";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center gap-2 sm:gap-3">
        {/* Left: compact home mark */}
        <div className="flex-1 flex items-center justify-start min-w-0">
          <a href="/" className="shrink-0 flex items-center" aria-label="PassOn home">
            <PassOnLogoMark className="h-8 w-auto max-h-8 max-w-[72px] sm:max-w-[88px] object-left" />
          </a>
        </div>

        {/* Center: full brand image */}
        <div className="shrink-0 flex justify-center px-1 sm:px-2">
          <a href="/" className="inline-flex items-center" aria-label="PassOn home">
            <PassOnBrand className="h-9 sm:h-10 w-auto max-h-10 max-w-[min(240px,48vw)] sm:max-w-[min(280px,40vw)] object-center" />
          </a>
        </div>

        {/* Right: nav + cart + CTAs */}
        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2 min-w-0">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 mr-2">
            <a href="#what-is-passon" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              What is PassOn
            </a>
            <a href="/move-out/upload" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              Moving out
            </a>
            <a href="#moving-in" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              Moving in
            </a>
            <a href="/properties" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              Browse
            </a>
          </div>
          <CartNavLink />
          <a
            href="/properties"
            className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          >
            Browse Items
          </a>
          <a
            href="/move-out/upload"
            className="inline-flex text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors shrink-0 whitespace-nowrap"
          >
            List your items
          </a>
        </div>
      </div>
    </nav>
  );
}
