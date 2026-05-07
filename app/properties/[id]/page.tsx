"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AppNavbar from "@/components/flow/AppNavbar";
import PropertyHeader from "@/components/flow/PropertyHeader";
import CategoryFilter, { FilterOption } from "@/components/flow/CategoryFilter";
import BrowseItemCard from "@/components/flow/BrowseItemCard";
import EmptyState from "@/components/flow/EmptyState";
import Footer from "@/components/Footer";
import { properties, items, Item, ItemCategory } from "@/lib/flowData";
import { useCart } from "@/context/CartContext";

// Conflict dialog shown when user tries to add from a different property
function ConflictDialog({
  currentPropertyName,
  onKeep,
  onSwitch,
}: {
  currentPropertyName: string;
  onKeep: () => void;
  onSwitch: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full p-6 flex flex-col gap-4">
        <div className="text-3xl text-center">⚠️</div>
        <div className="text-center">
          <h3 className="font-bold text-gray-900 mb-1">Different property</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your current request has items from{" "}
            <span className="font-semibold text-gray-800">{currentPropertyName}</span>.
            Requests can only include items from one property at a time.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={onSwitch}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            Clear cart &amp; browse this property
          </button>
          <button
            onClick={onKeep}
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            Keep my current request
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline toast notification
function Toast({ message, type }: { message: string; type: "success" | "info" | "error" }) {
  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    info: "bg-sky-50 border-sky-200 text-sky-700",
    error: "bg-rose-50 border-rose-200 text-rose-600",
  };
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 border rounded-xl px-4 py-2.5 text-sm font-medium shadow-md whitespace-nowrap ${styles[type]}`}
    >
      {message}
    </div>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { addToCart, clearCart, isInCart, cartProperty } = useCart();

  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [conflictItem, setConflictItem] = useState<Item | null>(null);

  const property = properties.find((p) => p.id === id);
  const propertyItems = items.filter((i) => i.propertyId === id);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return propertyItems;
    return propertyItems.filter((i) => i.category === (activeFilter as ItemCategory));
  }, [propertyItems, activeFilter]);

  const availableCount = propertyItems.filter((i) => i.status === "available").length;

  // Build counts per category for filter tabs
  const counts = useMemo(() => {
    const all = propertyItems.length;
    const byCat = (cat: ItemCategory) =>
      propertyItems.filter((i) => i.category === cat).length;
    return {
      All: all,
      Furniture: byCat("Furniture"),
      Kitchen: byCat("Kitchen"),
      Decor: byCat("Decor"),
      Essentials: byCat("Essentials"),
    };
  }, [propertyItems]);

  const showToast = (message: string, type: "success" | "info" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (item: Item) => {
    if (!property) return;
    const result = addToCart(item, property);
    if (result.conflict) {
      setConflictItem(item);
    } else if (result.success) {
      showToast("Added to your request!", "success");
    } else {
      showToast(result.message, "info");
    }
  };

  const handleConflictSwitch = () => {
    if (!conflictItem || !property) return;
    clearCart();
    addToCart(conflictItem, property);
    setConflictItem(null);
    showToast("Cart cleared. Added to your request!", "success");
  };

  if (!property) {
    return (
      <>
        <AppNavbar />
        <main className="min-h-screen pt-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <EmptyState
              icon="🏚️"
              title="Property not found"
              description="We couldn't find that property. It may have been removed or the link is incorrect."
              action={{ label: "Browse all properties", href: "/properties" }}
            />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-7">
          {/* Property header */}
          <PropertyHeader property={property} availableCount={availableCount} />

          {/* Cart conflict warning (different from dialog — shown if cart already has other property) */}
          {cartProperty && cartProperty.id !== property.id && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900">
                  Your request has items from {cartProperty.name}
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  You can only request items from one property at a time.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => router.push("/cart")}
                  className="text-xs font-semibold text-amber-800 border border-amber-300 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  View cart
                </button>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Clear &amp; start here
                </button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CategoryFilter
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
            <p className="text-sm text-gray-400 shrink-0">
              Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Item grid */}
          {filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <BrowseItemCard
                  key={item.id}
                  item={item}
                  isInCart={isInCart(item.id)}
                  onAdd={() => handleAddToCart(item)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📦"
              title="No items in this category"
              description="There are no items in this category. Try a different filter."
            />
          )}

          {/* Bottom sticky CTA — visible when cart has items from this property */}
          {cartProperty?.id === property.id && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-4 z-30 sm:hidden">
              <p className="text-sm font-medium text-gray-700">
                Request ready to send
              </p>
              <button
                onClick={() => router.push("/cart")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
              >
                Review request →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* View cart floating button (desktop) */}
      {cartProperty?.id === property.id && (
        <div className="fixed bottom-6 right-6 hidden sm:block z-30">
          <button
            onClick={() => router.push("/cart")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-2xl shadow-lg transition-colors flex items-center gap-2"
          >
            🛒 Review your request →
          </button>
        </div>
      )}

      {/* Conflict dialog */}
      {conflictItem && cartProperty && (
        <ConflictDialog
          currentPropertyName={cartProperty.name}
          onKeep={() => setConflictItem(null)}
          onSwitch={handleConflictSwitch}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      <Footer />
    </>
  );
}
