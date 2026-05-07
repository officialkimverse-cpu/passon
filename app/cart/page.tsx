"use client";

import { useRouter } from "next/navigation";
import AppNavbar from "@/components/flow/AppNavbar";
import CartItem from "@/components/flow/CartItem";
import CartSummary from "@/components/flow/CartSummary";
import EmptyState from "@/components/flow/EmptyState";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartProperty, removeFromCart, clearCart, subtotal, estimatedSavings } =
    useCart();

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="mb-7">
            <p className="text-sm text-gray-400 mb-1">
              <button
                onClick={() => router.back()}
                className="hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your request</h1>
            {!isEmpty && cartProperty && (
              <p className="text-sm text-gray-500 mt-1">
                Items from{" "}
                <span className="font-medium text-gray-700">{cartProperty.name}</span>
              </p>
            )}
          </div>

          {isEmpty ? (
            <EmptyState
              icon="🛒"
              title="Your request is empty"
              description="Browse a property and add items you're interested in. Then come back here to send your request to the resident."
              action={{ label: "Browse properties", href: "/properties" }}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              {/* Item list */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Property context */}
                {cartProperty && (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-3">
                    <span className="text-3xl">{cartProperty.thumbnail}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{cartProperty.name}</p>
                      <p className="text-xs text-gray-500">
                        {cartProperty.neighborhood} · Move-out {cartProperty.moveOutDate}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/properties/${cartProperty.id}`)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium shrink-0 transition-colors"
                    >
                      Add more →
                    </button>
                  </div>
                )}

                {/* Items */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5">
                  {cartItems.map((entry) => (
                    <CartItem
                      key={entry.item.id}
                      entry={entry}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                {/* Clear cart */}
                <div className="text-right">
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    Clear all items
                  </button>
                </div>
              </div>

              {/* Sidebar summary */}
              <div className="lg:sticky lg:top-24">
                <CartSummary
                  propertyName={cartProperty?.name ?? ""}
                  itemCount={cartItems.length}
                  subtotal={subtotal}
                  estimatedSavings={estimatedSavings}
                  ctaLabel="Send Request to Resident →"
                  onCta={() => router.push("/request")}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
