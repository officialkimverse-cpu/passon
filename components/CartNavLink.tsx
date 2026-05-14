"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartNavLink() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span aria-hidden>🛒</span>
      <span className="hidden sm:inline">Cart</span>
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </Link>
  );
}
