"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PassOnBrand from "@/components/PassOnBrand";
import PassOnLogoMark from "@/components/PassOnLogoMark";

export default function AppNavbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center gap-2 sm:gap-3">
        <div className="flex-1 flex items-center justify-start min-w-0">
          <Link href="/" className="shrink-0 flex items-center" aria-label="PassOn home">
            <PassOnLogoMark className="h-8 w-auto max-h-8 max-w-[72px] sm:max-w-[88px] object-left" />
          </Link>
        </div>

        <div className="shrink-0 flex justify-center px-1 sm:px-2">
          <Link href="/" className="inline-flex items-center" aria-label="PassOn home">
            <PassOnBrand className="h-9 sm:h-10 w-auto max-h-10 max-w-[min(220px,48vw)] object-center" />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 mr-2">
            <Link href="/properties" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              Browse Properties
            </Link>
            <Link href="/move-out/upload" className="hover:text-gray-900 transition-colors whitespace-nowrap">
              List items
            </Link>
          </div>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 sm:px-4 py-2 rounded-xl transition-colors shrink-0"
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
      </div>
    </nav>
  );
}
