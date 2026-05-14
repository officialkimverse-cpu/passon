import CartNavLink from "@/components/CartNavLink";
import PassOnBrand from "@/components/PassOnBrand";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <a
          href="/"
          className="mr-auto flex shrink-0 items-center justify-start min-w-0 max-w-[min(280px,58vw)] self-center"
          aria-label="PassOn home"
        >
          <PassOnBrand className="h-9 sm:h-10 w-auto max-h-10" />
        </a>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
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
            className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0 whitespace-nowrap"
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
