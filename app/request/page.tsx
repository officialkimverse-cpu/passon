"use client";

import { useRouter } from "next/navigation";
import AppNavbar from "@/components/flow/AppNavbar";
import RequestForm from "@/components/flow/RequestForm";
import EmptyState from "@/components/flow/EmptyState";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function RequestPage() {
  const router = useRouter();
  const { cartItems, cartProperty } = useCart();

  const isEmpty = cartItems.length === 0 || !cartProperty;

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-7">
            <p className="text-sm text-gray-400 mb-1">
              <button
                onClick={() => router.back()}
                className="hover:text-gray-700 transition-colors"
              >
                ← Back to cart
              </button>
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Send request to resident
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 max-w-xl leading-relaxed">
              Fill in a few quick details so the resident knows who you are and what you need.
              This is a request — not a payment.
            </p>
          </div>

          {isEmpty ? (
            <EmptyState
              icon="📭"
              title="Nothing to send yet"
              description="Add items from a property before sending a request to the resident."
              action={{ label: "Browse properties", href: "/properties" }}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Form */}
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-bold text-gray-900 mb-6">Your details</h2>
                <RequestForm
                  property={cartProperty!}
                  items={cartItems.map((e) => e.item)}
                  onSuccess={() => router.push("/request/success")}
                />
              </div>

              {/* Sidebar — request preview */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Property */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Sending to
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cartProperty!.thumbnail}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{cartProperty!.name}</p>
                      <p className="text-xs text-gray-500">
                        {cartProperty!.neighborhood} · {cartProperty!.moveOutDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Items in request ({cartItems.length})
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {cartItems.map(({ item }) => (
                      <div key={item.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg shrink-0">{item.image}</span>
                          <span className="text-sm text-gray-700 truncate">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 shrink-0">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">Total</span>
                    <span className="text-sm font-bold text-gray-900">
                      ${cartItems.reduce((s, e) => s + e.item.price, 0)}
                    </span>
                  </div>
                </div>

                {/* Reassurance note */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-700 leading-relaxed">
                  🤝 <span className="font-semibold">This is just a request.</span> The resident
                  will review your interest and reach out to coordinate pickup. No payment is
                  collected here.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
