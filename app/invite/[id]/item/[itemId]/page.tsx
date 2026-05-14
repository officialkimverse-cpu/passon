"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { InviteItem } from "@/lib/inviteStore";
import { flowItemFromInvite, invitePropertyFromId } from "@/lib/inviteCart";
import { useCart } from "@/context/CartContext";

type InvitePayload = {
  id: string;
  createdAt: string;
  items: InviteItem[];
};

function formatPrice(p?: number) {
  if (p === 0) return "FREE";
  if (p === undefined || Number.isNaN(p)) return "—";
  return `$${p}`;
}

export default function InviteItemDetailPage({
  params,
}: {
  params: Promise<{ id: string; itemId: string }>;
}) {
  const { id: inviteId, itemId: rawItemId } = use(params);
  const itemId = decodeURIComponent(rawItemId);
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

  const [data, setData] = useState<InvitePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [carousel, setCarousel] = useState(0);
  const [cartMsg, setCartMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setError(null);
      const res = await fetch(`/api/invite/${inviteId}`);
      if (!res.ok) {
        setError("Invite not found or expired.");
        return;
      }
      setData(await res.json());
    };
    run();
  }, [inviteId]);

  const item = useMemo(
    () => data?.items.find((it) => it.id === itemId) ?? null,
    [data, itemId],
  );

  const images = useMemo(() => {
    if (!item) return [];
    const fromGallery = item.photoDataUrls?.filter(Boolean) ?? [];
    if (fromGallery.length > 0) return fromGallery;
    if (item.thumbnailDataUrl) return [item.thumbnailDataUrl];
    return [];
  }, [item]);

  const flowItem = item ? flowItemFromInvite(inviteId, item) : null;
  const inCart = flowItem ? isInCart(flowItem.id) : false;

  function handleAddToCart() {
    if (!item || !flowItem) return;
    setCartMsg(null);
    const property = invitePropertyFromId(inviteId);
    const result = addToCart(flowItem, property);
    setCartMsg(result.message);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="text-sm text-gray-500">
            <Link href={`/invite/${inviteId}`} className="hover:text-gray-800 transition-colors">
              ← Back to listing
            </Link>
          </div>

          {error ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-sm text-gray-700">
              {error}
            </div>
          ) : !data || !item ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-sm text-gray-700">
              {!data ? "Loading…" : "This item is not on the listing anymore."}
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3] bg-gray-100">
                  {images.length > 0 ? (
                    <img
                      src={images[carousel % images.length]}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-contain bg-gray-50"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      No photos
                    </div>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous photo"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-gray-200 w-9 h-9 text-lg shadow-sm hover:bg-white"
                        onClick={() => setCarousel((c) => (c - 1 + images.length) % images.length)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next photo"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-gray-200 w-9 h-9 text-lg shadow-sm hover:bg-white"
                        onClick={() => setCarousel((c) => (c + 1) % images.length)}
                      >
                        ›
                      </button>
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Photo ${i + 1}`}
                            onClick={() => setCarousel(i)}
                            className={[
                              "h-1.5 rounded-full transition-all",
                              i === carousel % images.length
                                ? "w-6 bg-emerald-600"
                                : "w-1.5 bg-gray-300",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {item.title || "Untitled item"}
                    </h1>
                    <p className="text-2xl font-bold text-emerald-600 shrink-0">
                      {formatPrice(item.finalPrice)}
                    </p>
                  </div>

                  {item.description ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                        Description
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {item.description}
                      </p>
                    </div>
                  ) : null}

                  {item.usageNotes ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                        Seller notes
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {item.usageNotes}
                      </p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-gray-100 pt-5">
                    {item.condition ? (
                      <span>
                        <span className="text-gray-400">Condition:</span> {item.condition}
                      </span>
                    ) : null}
                    {item.yearsOfUse !== undefined ? (
                      <span>
                        <span className="text-gray-400">Years of use:</span> {item.yearsOfUse}
                      </span>
                    ) : null}
                    <span>
                      <span className="text-gray-400">Price:</span>{" "}
                      {item.negotiable ? "Negotiable" : "Firm"}
                    </span>
                    {item.marketPrice !== undefined ? (
                      <span>
                        <span className="text-gray-400">Reference / market:</span> $
                        {item.marketPrice}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {inCart ? (
                      <Link
                        href="/cart"
                        className="inline-flex flex-1 justify-center items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 transition-colors"
                      >
                        View cart →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="inline-flex flex-1 justify-center items-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 transition-colors"
                      >
                        Add to cart
                      </button>
                    )}
                    <Link
                      href="/cart"
                      className="inline-flex flex-1 justify-center items-center rounded-xl border border-gray-200 hover:border-gray-300 text-gray-800 text-sm font-semibold py-3 transition-colors"
                    >
                      Go to cart
                    </Link>
                  </div>
                  {cartMsg ? (
                    <p
                      className={`text-sm ${cartMsg.includes("Clear") || cartMsg.includes("different") ? "text-amber-700" : "text-emerald-700"}`}
                    >
                      {cartMsg}
                    </p>
                  ) : null}

                  <div className="grid sm:grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      className="rounded-xl border border-gray-200 hover:border-gray-300 text-gray-800 text-sm font-semibold py-3 transition-colors"
                      onClick={() =>
                        alert(
                          "After you add items to your cart, continue to checkout to send a message to the seller. You can note your offer there.",
                        )
                      }
                    >
                      Offer / negotiate
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-sm font-semibold py-3 border border-gray-100 transition-colors"
                      onClick={() => router.push(`/invite/${inviteId}`)}
                    >
                      Not interested
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Checkout sends a request to the seller — not a payment. You&apos;ll confirm details on
                the next step.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
