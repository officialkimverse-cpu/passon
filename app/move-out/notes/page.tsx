"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/moveOut/ProgressIndicator";
import PhotoCard from "@/components/moveOut/PhotoCard";
import {
  useMoveOut,
  type MoveOutItemCondition,
  type MoveOutItemNotes,
} from "@/context/MoveOutContext";
import { compressImageToDataUrl } from "@/lib/compressImageClient";

export default function MoveOutNotesPage() {
  const { photos, groups, drafts, setDrafts, notes, setNotes } = useMoveOut();
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  const photoById = useMemo(() => new Map(photos.map((p) => [p.id, p])), [photos]);
  const nonEmpty = useMemo(() => groups.filter((g) => g.photoIds.length > 0), [groups]);

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = 0; y <= 20; y++) list.push(y);
    return list;
  }, []);

  function ensure(groupId: string): MoveOutItemNotes {
    return (
      notes[groupId] ?? {
        groupId,
        negotiable: true,
        usageNotes: "",
      }
    );
  }

  function update(groupId: string, patch: Partial<MoveOutItemNotes>) {
    setNotes((prev) => {
      const base = prev[groupId] ?? { groupId, negotiable: true, usageNotes: "" };
      return { ...prev, [groupId]: { ...base, ...patch } };
    });
  }

  function computeFinalPrice(groupId: string) {
    const draft = drafts[groupId];
    const current = ensure(groupId);
    const basePrice = draft?.marketPrice;
    const salePercent = current.salePercent;
    const isCustom = current.customPrice !== undefined;
    const derivedPrice =
      basePrice !== undefined && salePercent !== undefined
        ? Math.round((basePrice * (1 - salePercent / 100)) * 100) / 100
        : undefined;
    const finalPrice = isCustom ? current.customPrice : salePercent === 0 ? 0 : derivedPrice;
    return { basePrice, salePercent, isCustom, finalPrice };
  }

  async function publishInvite() {
    setPublishError(null);
    setPublishing(true);
    try {
      const nonEmptyGroups = groups.filter((g) => g.photoIds.length > 0);
      const photoById = new Map(photos.map((p) => [p.id, p]));

      const items = [];
      for (const g of nonEmptyGroups) {
        const draft = drafts[g.id];
        const n = ensure(g.id);
        const pricing = computeFinalPrice(g.id);

        const photoDataUrls: string[] = [];
        for (const pid of g.photoIds.slice(0, 3)) {
          const ph = photoById.get(pid);
          if (!ph) continue;
          photoDataUrls.push(
            await compressImageToDataUrl(ph.file, { maxDim: 280, quality: 0.5 }),
          );
        }
        const thumbnailDataUrl = photoDataUrls[0];

        items.push({
          id: g.id,
          title: draft?.name ?? "Untitled item",
          description: draft?.description ?? "",
          marketPrice: pricing.basePrice,
          salePercent: n.salePercent,
          customPrice: n.customPrice,
          finalPrice: pricing.finalPrice,
          condition: n.condition,
          yearsOfUse: n.yearsOfUse,
          negotiable: n.negotiable,
          usageNotes: n.usageNotes,
          thumbnailDataUrl,
          photoDataUrls: photoDataUrls.length > 0 ? photoDataUrls : undefined,
        });
      }

      const res = await fetch("/api/invite/publish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Publish failed (${res.status})`);
      }

      const out = (await res.json()) as { id: string; url: string };
      const full = `${window.location.origin}${out.url}`;
      setPublishedUrl(full);

      try {
        await navigator.clipboard.writeText(full);
      } catch {
        // ignore
      }
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Failed to publish");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>📝</span>
              <span>Move-out listing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Add notes &amp; publish
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Next we’ll collect item notes (voice/text) and publish your invite link.
            </p>
          </div>

          <ProgressIndicator activeStep={4} />

          {nonEmpty.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <p className="text-gray-900 font-semibold mb-2">No items yet</p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                Group your photos into items first, then come back here to add notes and publish.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/move-out/group"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Back to Step 2 →
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 flex flex-col gap-5">
                {nonEmpty.map((g) => {
                  const draft = drafts[g.id];
                  const current = ensure(g.id);
                  const basePrice = draft?.marketPrice;
                  const salePercent = current.salePercent;
                  const isCustom = current.customPrice !== undefined;
                  const derivedPrice =
                    basePrice !== undefined && salePercent !== undefined
                      ? Math.round((basePrice * (1 - salePercent / 100)) * 100) / 100
                      : undefined;
                  const finalPrice =
                    isCustom
                      ? current.customPrice
                      : salePercent === 0
                        ? 0
                        : derivedPrice;

                  return (
                    <div
                      key={g.id}
                      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-7"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                            {g.title}
                          </p>
                          <label className="text-xs font-semibold text-gray-500 mt-1 block">
                            Title
                          </label>
                          <input
                            value={draft?.name ?? ""}
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
                            placeholder="e.g. Brown suede sofa"
                            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          />
                          {draft?.description?.trim() && (
                            <p className="text-sm text-gray-500 leading-relaxed mt-1 max-w-2xl">
                              {draft.description}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">
                          {g.photoIds.length} photos
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5 items-start">
                        {/* Left: photo carousel */}
                        <div className="flex flex-col gap-3">
                          {(() => {
                            const idx = Math.min(
                              Math.max(carouselIndex[g.id] ?? 0, 0),
                              Math.max(g.photoIds.length - 1, 0),
                            );
                            const pid = g.photoIds[idx];
                            const p = pid ? photoById.get(pid) : undefined;

                            return (
                              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                                {p ? (
                                  <img
                                    src={p.url}
                                    alt={p.file.name}
                                    className="w-full h-64 sm:h-72 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-64 sm:h-72 flex items-center justify-center text-sm text-gray-400">
                                    No photo
                                  </div>
                                )}

                                {g.photoIds.length > 1 && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCarouselIndex((prev) => ({
                                          ...prev,
                                          [g.id]: Math.max(idx - 1, 0),
                                        }))
                                      }
                                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 rounded-xl h-10 w-10 shadow-sm text-gray-900 font-bold"
                                      aria-label="Previous photo"
                                    >
                                      ←
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCarouselIndex((prev) => ({
                                          ...prev,
                                          [g.id]: Math.min(idx + 1, g.photoIds.length - 1),
                                        }))
                                      }
                                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 rounded-xl h-10 w-10 shadow-sm text-gray-900 font-bold"
                                      aria-label="Next photo"
                                    >
                                      →
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                                      {idx + 1} / {g.photoIds.length}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Right: notes + controls */}
                        <div className="flex flex-col gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500">
                              Notes (how long you used it, quirks, what’s included)
                            </label>
                            <textarea
                              value={current.usageNotes}
                              onChange={(e) => update(g.id, { usageNotes: e.target.value })}
                              placeholder="e.g. Used for 10 months, minor scuffs on the left leg, includes screws + wrench…"
                              className="mt-1 w-full min-h-[170px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                          </div>
                        </div>
                    </div>

                      {/* Full-width controls row */}
                      <div className="mt-5">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
                          <div className="sm:col-span-1">
                            <label className="text-xs font-semibold text-gray-500">Condition</label>
                            <select
                              value={current.condition ?? ""}
                              onChange={(e) =>
                                update(g.id, {
                                  condition: (e.target.value || undefined) as
                                    | MoveOutItemCondition
                                    | undefined,
                                })
                              }
                              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {(
                                [
                                  "new",
                                  "nearly new",
                                  "used but fine",
                                  "a little damaged",
                                  "very damaged",
                                ] as MoveOutItemCondition[]
                              ).map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-1">
                            <label className="text-xs font-semibold text-gray-500">Years of use</label>
                            <select
                              value={current.yearsOfUse ?? ""}
                              onChange={(e) =>
                                update(g.id, {
                                  yearsOfUse: e.target.value ? Number(e.target.value) : undefined,
                                })
                              }
                              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {years.map((y) => (
                                <option key={y} value={y}>
                                  {y === 0 ? "< 1" : String(y)}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-1">
                            <label className="text-xs font-semibold text-gray-500">Current</label>
                            <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                              <span className="text-sm font-semibold text-gray-700">$</span>
                              <span className="text-sm text-gray-900">
                                {basePrice !== undefined ? basePrice : "—"}
                              </span>
                            </div>
                          </div>

                          <div className="sm:col-span-1">
                            <label className="text-xs font-semibold text-gray-500">Sale</label>
                            <select
                              value={salePercent !== undefined ? String(salePercent) : ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                if (v === "custom") {
                                  update(g.id, {
                                    salePercent: undefined,
                                    customPrice: current.customPrice ?? 0,
                                  });
                                } else {
                                  const n = Number(v);
                                  update(g.id, {
                                    salePercent: Number.isFinite(n) ? n : undefined,
                                    customPrice: undefined,
                                  });
                                }
                              }}
                              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {[10, 15, 20, 30, 50, 99].map((p) => (
                                <option key={p} value={p}>
                                  {p}%
                                </option>
                              ))}
                              <option value={0}>free</option>
                              <option value="custom">custom</option>
                            </select>
                          </div>

                          <div className="sm:col-span-1">
                            <label className="text-xs font-semibold text-gray-500">Final</label>
                            <div className="mt-1 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
                              <span className="text-sm font-semibold text-emerald-700">$</span>
                              <span className="text-sm font-bold text-emerald-900">
                                {finalPrice !== undefined ? finalPrice : "—"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-start">
                          {isCustom && (
                            <div>
                              <label className="text-xs font-semibold text-gray-500">Custom price</label>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-700">$</span>
                                <input
                                  inputMode="decimal"
                                  value={current.customPrice !== undefined ? String(current.customPrice) : ""}
                                  onChange={(e) => {
                                    const n = Number(e.target.value);
                                    update(g.id, {
                                      customPrice: Number.isFinite(n) ? n : undefined,
                                      salePercent: undefined,
                                    });
                                  }}
                                  placeholder="e.g. 80"
                                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                />
                              </div>
                              <p className="mt-1 text-xs text-gray-400">This overrides the sale %.</p>
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
                              <input
                                type="checkbox"
                                checked={current.negotiable}
                                onChange={(e) => update(g.id, { negotiable: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-200"
                              />
                              Price is negotiable
                            </label>
                            <p className="text-xs text-gray-400">Toggle off if you want “buy now only”</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-1 lg:sticky lg:top-24">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Review
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Add condition, purchase year, and any notes for each item. You can publish after
                    everything looks right.
                  </p>

                  <button
                    type="button"
                    onClick={publishInvite}
                    disabled={publishing}
                    className={[
                      "mt-4 w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl transition-colors shadow-sm text-sm",
                      publishing
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white",
                    ].join(" ")}
                  >
                    {publishing ? "Publishing…" : "Publish invite link →"}
                  </button>

                  {publishError && (
                    <div className="mt-4 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs text-rose-800 leading-relaxed">
                      {publishError}
                    </div>
                  )}

                  {publishedUrl && (
                    <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                      <p className="text-xs font-semibold text-emerald-800">Invite link</p>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          value={publishedUrl}
                          readOnly
                          className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-gray-800"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(publishedUrl);
                            } catch {
                              // ignore
                            }
                          }}
                          className="shrink-0 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="mt-2">
                        <Link
                          href={publishedUrl.replace(window.location.origin, "")}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          Open buyer view →
                        </Link>
                      </div>
                      <p className="mt-2 text-[11px] text-emerald-700/80 leading-relaxed">
                        Prototype note: this link works while your dev server is running.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 leading-relaxed">
                    This is a test flow. Next we can generate a real shareable link and buyer view.
                  </div>

                  <div className="mt-5">
                    <Link
                      href="/move-out/review"
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      ← Back to Step 3
                    </Link>
                  </div>
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

