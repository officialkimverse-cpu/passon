import CartNavLink from "@/components/CartNavLink";
import PassOnBrand from "@/components/PassOnBrand";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0" aria-label="PassOn home">
          <PassOnBrand className="max-w-[min(260px,62vw)]" />
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <a href="#what-is-passon" className="hover:text-gray-900 transition-colors">
            What is PassOn
          </a>
          <a href="/move-out/upload" className="hover:text-gray-900 transition-colors">
            Moving out
          </a>
          <a href="#moving-in" className="hover:text-gray-900 transition-colors">
            Moving in
          </a>
          <a href="/properties" className="hover:text-gray-900 transition-colors">
            Browse
          </a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-1 sm:gap-2">
          <CartNavLink />
          <a
            href="/properties"
            className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse Items
          </a>
          <a
            href="/move-out/upload"
            className="inline-flex text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            List your items
          </a>
        </div>
      </div>
    </nav>
  );
}
