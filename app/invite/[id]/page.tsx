"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type InvitePayload = {
  id: string;
  createdAt: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    finalPrice?: number;
    negotiable: boolean;
    condition?: string;
    yearsOfUse?: number;
    thumbnailDataUrl?: string;
  }>;
};

export default function InvitePage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<InvitePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setError(null);
      const res = await fetch(`/api/invite/${params.id}`);
      if (!res.ok) {
        setError("Invite not found (this test link works while the dev server is running).");
        return;
      }
      setData(await res.json());
    };
    run();
  }, [params.id]);

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
              Choose what you want from this unit. This is a prototype buyer view.
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
                <div
                  key={it.id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="h-40 bg-gray-50 flex items-center justify-center">
                    {it.thumbnailDataUrl ? (
                      <img
                        src={it.thumbnailDataUrl}
                        alt={it.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-gray-900">{it.title || "Untitled item"}</p>
                      <p className="font-bold text-emerald-600 shrink-0">
                        {it.finalPrice === 0 ? "FREE" : it.finalPrice ? `$${it.finalPrice}` : "—"}
                      </p>
                    </div>
                    {it.description && (
                      <p className="text-sm text-gray-500 leading-relaxed">{it.description}</p>
                    )}
                    <div className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
                      {it.condition && <span>Condition: {it.condition}</span>}
                      {it.yearsOfUse !== undefined && <span>Used: {it.yearsOfUse}y</span>}
                      <span>{it.negotiable ? "Negotiable" : "Not negotiable"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 transition-colors">
                        Buy now
                      </button>
                      <button className="rounded-xl border border-gray-200 hover:border-gray-300 text-gray-800 text-sm font-semibold py-2.5 transition-colors">
                        Offer / Negotiate
                      </button>
                      <button className="col-span-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2.5 border border-gray-100 transition-colors">
                        Not interested
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

