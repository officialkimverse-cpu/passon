"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PassOnBrand from "@/components/PassOnBrand";

export default function AppNavbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link
          href="/"
          className="mr-auto flex shrink-0 items-center justify-start min-w-0 max-w-[min(280px,58vw)] self-center"
          aria-label="PassOn home"
        >
          <PassOnBrand className="h-9 sm:h-10 w-auto max-h-10" />
        </Link>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
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
