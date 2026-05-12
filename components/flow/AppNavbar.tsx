"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PassOnLogoMark from "@/components/PassOnLogoMark";

export default function AppNavbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="PassOn home">
          <PassOnLogoMark className="h-9 w-9 shrink-0 text-emerald-800" />
          <span className="font-bold text-xl text-gray-900 tracking-tight">PassOn</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/properties" className="hover:text-gray-900 transition-colors">
            Browse Properties
          </Link>
          <Link href="/move-out/upload" className="hover:text-gray-900 transition-colors">
            List items
          </Link>
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl transition-colors"
        >
          <span>🛒</span>
          <span className="hidden sm:inline">My Request</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
