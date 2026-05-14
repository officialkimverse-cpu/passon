"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { InviteItem } from "@/lib/inviteStore";

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

export default function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<InvitePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setError(null);
      const res = await fetch(`/api/invite/${id}`);
      if (!res.ok) {
        setError(
          "Invite not found. If you’re on the live site, the project needs Redis (Upstash) env vars so invites persist across servers.",
        );
        return;
      }
      setData(await res.json());
    };
    run();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>🔗</span>
              <span>Invite listing</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Browse what’s being left behind
            </h1>
            <p className="mt-2 text-gray-500 max-w-2xl">
              Tap an item for photos and full details, then add what you want to your cart. Continue
              to checkout to send a request to the seller.
            </p>
            <p className="mt-3">
              <Link
                href="/cart"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View cart →
              </Link>
            </p>
          </div>

          {error ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-sm text-gray-700">
              {error}
            </div>
          ) : !data ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-sm text-gray-700">
              Loading…
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.items.map((it) => (
                <Link
                  key={it.id}
                  href={`/invite/${id}/item/${encodeURIComponent(it.id)}`}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:border-emerald-200 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-40 bg-gray-50 flex items-center justify-center relative">
                    {it.thumbnailDataUrl ? (
                      <img
                        src={it.thumbnailDataUrl}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">
                      View details
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-gray-900 group-hover:text-emerald-800 transition-colors">
                        {it.title || "Untitled item"}
                      </p>
                      <p className="font-bold text-emerald-600 shrink-0">{formatPrice(it.finalPrice)}</p>
                    </div>
                    {it.description ? (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {it.description}
                      </p>
                    ) : null}
                    <div className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-2">
                      {it.condition ? <span>{it.condition}</span> : null}
                      {it.yearsOfUse !== undefined ? <span>{it.yearsOfUse}y use</span> : null}
                      <span>{it.negotiable ? "Negotiable" : "Firm price"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
