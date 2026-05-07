"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/moveOut/ProgressIndicator";
import PhotoCard from "@/components/moveOut/PhotoCard";
import { useMoveOut } from "@/context/MoveOutContext";

export default function MoveOutReviewPage() {
  const { photos, groups, drafts, setDrafts } = useMoveOut();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const photoById = useMemo(() => new Map(photos.map((p) => [p.id, p])), [photos]);

  const nonEmpty = groups.filter((g) => g.photoIds.length > 0);
  const assigned = new Set(nonEmpty.flatMap((g) => g.photoIds));
  const allAssigned = photos.length > 0 && assigned.size === photos.length;

  function fileToDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async function generateForGroup(groupId: string, photoIds: string[]) {
    const images = [];
    for (const pid of photoIds.slice(0, 6)) {
      const p = photoById.get(pid);
      if (!p) continue;
      const dataUrl = await fileToDataUrl(p.file);
      const mediaType = p.file.type || "image/jpeg";
      images.push({ mediaType, base64: dataUrl });
    }

    const res = await fetch("/api/move-out/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ groupId, images }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `AI request failed (${res.status})`);
    }

    return (await res.json()) as {
      groupId: string;
      name: string;
      description: string;
      category?: string;
      condition?: string;
      marketPrice?: number;
    };
  }

  async function generateAll() {
    setError(null);
    setIsGenerating(true);
    try {
      for (const g of nonEmpty) {
        const result = await generateForGroup(g.id, g.photoIds);
        setDrafts((prev) => ({
          ...prev,
          [g.id]: {
            groupId: g.id,
            name: result.name || prev[g.id]?.name || "",
            description: result.description || prev[g.id]?.description || "",
            category: result.category,
            condition: result.condition,
            marketPrice:
              typeof result.marketPrice === "number"
                ? result.marketPrice
                : prev[g.id]?.marketPrice,
          },
        }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate drafts");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>🧾</span>
              <span>Move-out listing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Review groups
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Quick check before we turn each group into a listing.
            </p>
          </div>

          <ProgressIndicator activeStep={3} />

          {photos.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <p className="text-gray-900 font-semibold mb-2">No photos yet</p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                Start by uploading photos in Step 1.
              </p>
              <div className="mt-5">
                <Link
                  href="/move-out/upload"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Go to Upload Photos →
                </Link>
              </div>
            </div>
          ) : !allAssigned ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <p className="text-gray-900 font-semibold mb-2">Finish grouping to continue</p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                Some photos aren’t assigned to an item yet. Go back to Step 2 and place every photo
                into an item folder.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/move-out/group"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Back to Group Items →
                </Link>
                <Link
                  href="/move-out/upload"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Edit uploads
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {nonEmpty.length} items grouped
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Generate draft names and descriptions from your photos, then edit before publishing.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    type="button"
                    onClick={generateAll}
                    disabled={isGenerating}
                    className={[
                      "inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm",
                      isGenerating
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white",
                    ].join(" ")}
                  >
                    {isGenerating ? "Generating…" : "Generate AI details"}
                  </button>
                  <Link
                    href="/move-out/notes"
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    Continue →
                  </Link>
                </div>
              </div>

              {error && (
                <div className="mb-6 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs text-rose-800 leading-relaxed">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                {nonEmpty.map((g) => (
                  <div
                    key={g.id}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-sm font-semibold text-gray-900">{g.title}</p>
                      <span className="text-xs text-gray-400">{g.photoIds.length} photos</span>
                    </div>

                    <div className="grid gap-3 mb-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500">Name</label>
                        <input
                          value={drafts[g.id]?.name ?? ""}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [g.id]: {
                                groupId: g.id,
                                name: e.target.value,
                                description: prev[g.id]?.description ?? "",
                                category: prev[g.id]?.category,
                                condition: prev[g.id]?.condition,
                                marketPrice: prev[g.id]?.marketPrice,
                              },
                            }))
                          }
                          placeholder="e.g. Standing desk"
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500">Description</label>
                        <textarea
                          value={drafts[g.id]?.description ?? ""}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [g.id]: {
                                groupId: g.id,
                                name: prev[g.id]?.name ?? "",
                                description: e.target.value,
                                category: prev[g.id]?.category,
                                condition: prev[g.id]?.condition,
                                marketPrice: prev[g.id]?.marketPrice,
                              },
                            }))
                          }
                          placeholder="Condition, what’s included, any quirks…"
                          className="mt-1 w-full min-h-[88px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-500">
                          Current market price (AI estimate)
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">$</span>
                          <input
                            inputMode="decimal"
                            value={
                              drafts[g.id]?.marketPrice !== undefined
                                ? String(drafts[g.id]!.marketPrice)
                                : ""
                            }
                            onChange={(e) => {
                              const n = Number(e.target.value);
                              setDrafts((prev) => ({
                                ...prev,
                                [g.id]: {
                                  groupId: g.id,
                                  name: prev[g.id]?.name ?? "",
                                  description: prev[g.id]?.description ?? "",
                                  category: prev[g.id]?.category,
                                  condition: prev[g.id]?.condition,
                                  marketPrice: Number.isFinite(n) ? n : undefined,
                                },
                              }));
                            }}
                            placeholder="e.g. 120"
                            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {g.photoIds.slice(0, 6).map((pid) => {
                        const p = photoById.get(pid);
                        if (!p) return null;
                        return <PhotoCard key={pid} photo={p} size="sm" />;
                      })}
                      {g.photoIds.length > 6 && (
                        <div className="h-20 rounded-xl border border-gray-100 bg-white flex items-center justify-center text-xs text-gray-500 font-semibold">
                          +{g.photoIds.length - 6}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

