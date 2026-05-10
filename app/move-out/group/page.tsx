"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/moveOut/ProgressIndicator";
import Link from "next/link";
import PhotoCard from "@/components/moveOut/PhotoCard";
import { useMoveOut, type MoveOutGroup } from "@/context/MoveOutContext";

export default function MoveOutGroupPage() {
  const { photos, setPhotos, groups, setGroups } = useMoveOut();
  const [activeDrop, setActiveDrop] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectedRef = useRef<Set<string>>(new Set());
  const [lastClick, setLastClick] = useState<{ scope: string; id: string } | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const photoById = useMemo(() => new Map(photos.map((p) => [p.id, p])), [photos]);
  const assigned = useMemo(() => new Set(groups.flatMap((g) => g.photoIds)), [groups]);
  const unassigned = useMemo(() => photos.filter((p) => !assigned.has(p.id)), [photos, assigned]);

  function getItemIndex(id: string) {
    const match = id.match(/^item-(\d+)$/);
    return match ? Number(match[1]) : Number.NaN;
  }

  const normalizedGroups = useMemo(() => {
    const base: MoveOutGroup[] =
      groups.length > 0
        ? groups
        : [
            { id: "item-1", title: "Item 1", photoIds: [] },
            { id: "item-2", title: "Item 2", photoIds: [] },
          ];

    // Ensure there is always at least one empty item so users never have to click “Add”.
    const last = base[base.length - 1];
    if (last && last.photoIds.length > 0) {
      const nextIndex = base.length + 1;
      const withNew = [...base, { id: `item-${nextIndex}`, title: `Item ${nextIndex}`, photoIds: [] }];

      const empties = withNew
        .filter((g) => g.photoIds.length === 0)
        .sort((a, b) => getItemIndex(a.id) - getItemIndex(b.id)); // next-to-fill first
      const nonEmpty = withNew
        .filter((g) => g.photoIds.length > 0)
        .sort((a, b) => getItemIndex(b.id) - getItemIndex(a.id)); // newer items above older ones

      return [...empties, ...nonEmpty];
    }

    const empties = base
      .filter((g) => g.photoIds.length === 0)
      .sort((a, b) => getItemIndex(a.id) - getItemIndex(b.id));
    const nonEmpty = base
      .filter((g) => g.photoIds.length > 0)
      .sort((a, b) => getItemIndex(b.id) - getItemIndex(a.id));

    return [...empties, ...nonEmpty];
  }, [groups]);

  const allAssigned = photos.length > 0 && unassigned.length === 0;
  const canContinue = allAssigned && normalizedGroups.some((g) => g.photoIds.length > 0);

  function setInitialGroupsIfNeeded() {
    if (groups.length === 0) {
      setGroups([
        { id: "item-1", title: "Item 1", photoIds: [] },
        { id: "item-2", title: "Item 2", photoIds: [] },
      ]);
    }
  }

  function assignSelectedToGroup(groupId: string) {
    const ids = Array.from(selectedRef.current);
    if (ids.length === 0) return;
    addPhotosToGroup(ids, groupId);
    const next = new Set<string>();
    selectedRef.current = next;
    setSelected(next);
  }

  function addPhotosToGroup(photoIds: string[], groupId: string) {
    setGroups((prev) => {
      const base =
        prev.length > 0
          ? prev
          : [
              { id: "item-1", title: "Item 1", photoIds: [] },
              { id: "item-2", title: "Item 2", photoIds: [] },
            ];

      const ids = photoIds.length > 0 ? photoIds : [];

      // Remove from any other group first.
      const cleaned = base.map((g) => ({
        ...g,
        photoIds: g.photoIds.filter((pid) => !ids.includes(pid)),
      }));

      let next = cleaned.map((g) =>
        g.id === groupId ? { ...g, photoIds: [...g.photoIds, ...ids] } : g,
      );

      // Auto-create the next item when the last item gets its first photo.
      const last = next[next.length - 1];
      if (last && last.photoIds.length > 0) {
        const nextIndex = next.length + 1;
        next = [...next, { id: `item-${nextIndex}`, title: `Item ${nextIndex}`, photoIds: [] }];
      }

      return next;
    });
  }

  function getSelectedForDrag(fallbackId: string) {
    const cur = selectedRef.current;
    return cur.has(fallbackId) ? Array.from(cur) : [fallbackId];
  }

  function toggleSelect(scope: string, id: string, e: React.MouseEvent) {
    const isRange = e.shiftKey && lastClick?.scope === scope;
    const isToggle = e.metaKey || e.ctrlKey;

    if (isRange) {
      const ordered =
        scope === "unassigned"
          ? unassigned.map((p) => p.id)
          : (normalizedGroups.find((g) => g.id === scope)?.photoIds ?? []);

      const start = ordered.indexOf(lastClick.id);
      const end = ordered.indexOf(id);
      if (start !== -1 && end !== -1) {
        const [a, b] = start < end ? [start, end] : [end, start];
        const range = ordered.slice(a, b + 1);
        const next = new Set(selectedRef.current);
        range.forEach((rid) => next.add(rid));
        selectedRef.current = next;
        setSelected(next);
      }
    } else if (isToggle) {
      const next = new Set(selectedRef.current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selectedRef.current = next;
      setSelected(next);
      setLastClick({ scope, id });
    } else {
      const next = new Set([id]);
      selectedRef.current = next;
      setSelected(next);
      setLastClick({ scope, id });
    }
  }

  function selectOnMouseDown(scope: string, id: string, e: React.MouseEvent) {
    // Do NOT preventDefault; it can break native drag in some browsers.
    // If user starts dragging an already-selected photo, keep the multi-selection (file-manager behavior).
    const hasModifiers = e.shiftKey || e.metaKey || e.ctrlKey;
    if (!hasModifiers && selectedRef.current.has(id)) {
      setLastClick({ scope, id });
      return;
    }
    toggleSelect(scope, id, e);
  }

  function deletePhotoEverywhere(photoId: string) {
    const p = photoById.get(photoId);
    if (p) URL.revokeObjectURL(p.url);

    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(photoId);
      selectedRef.current = next;
      return next;
    });

    setGroups((prev) =>
      prev.map((g) => ({ ...g, photoIds: g.photoIds.filter((pid) => pid !== photoId) })),
    );

    setPhotos((prev) => prev.filter((ph) => ph.id !== photoId));
  }

  function deleteEmptyGroup(groupId: string) {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }

  function removePhotoFromGroup(photoId: string, groupId: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, photoIds: g.photoIds.filter((pid) => pid !== photoId) } : g,
      ),
    );
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(photoId);
      selectedRef.current = next;
      return next;
    });
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>✨</span>
              <span>Move-out listing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Group items
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Next up: we&apos;ll group your photos into items and bundles.
            </p>
          </div>

          <ProgressIndicator activeStep={2} />

          {photos.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <p className="text-gray-900 font-semibold mb-2">Upload photos to continue</p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                This step starts after you add photos in Step 1.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/move-out/upload"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Go to Upload Photos →
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
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left: unassigned photos */}
              <div className="flex flex-col gap-4 md:sticky md:top-24">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold text-gray-900">Unassigned photos</p>
                    <Link
                      href="/move-out/upload"
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                      onClick={setInitialGroupsIfNeeded}
                    >
                      Add more →
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {coarsePointer ? (
                      <>
                        <span className="font-medium text-gray-700">On this device:</span> tap a photo
                        to select it, then tap{" "}
                        <span className="font-medium text-gray-700">Add to this item</span> on the
                        folder you want. Group different angles of the same piece together.
                      </>
                    ) : (
                      <>
                        Drag each photo into an item folder (or select several with Ctrl/Cmd-click,
                        then drag one of them). Group different angles of the same item together.
                      </>
                    )}
                  </p>

                  {!allAssigned && (
                    <div className="mb-4 rounded-xl bg-amber-50 border border-amber-100 p-4 text-xs text-amber-800 leading-relaxed">
                      Assign every photo to an item folder to continue. ({unassigned.length} left)
                    </div>
                  )}

                  {unassigned.length === 0 ? (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 leading-relaxed">
                      ✓ All photos assigned. You can continue when you’re ready.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {unassigned.map((p) => (
                        <div
                          key={p.id}
                          draggable={!coarsePointer}
                          onDragStart={(e) => {
                            const ids = getSelectedForDrag(p.id);
                            // Some browsers drop custom types; always include JSON in text/plain.
                            const payload = JSON.stringify(ids);
                            e.dataTransfer.setData("application/passon-photo-ids", payload);
                            e.dataTransfer.setData("text/plain", payload);
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onMouseDown={(e) => selectOnMouseDown("unassigned", p.id, e)}
                          className="cursor-grab active:cursor-grabbing select-none rounded-xl"
                        >
                          <PhotoCard
                            photo={p}
                            size="sm"
                            selected={selected.has(p.id)}
                            alwaysShowActions={coarsePointer}
                            onDelete={() => deletePhotoEverywhere(p.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: item folders */}
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Item folders</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {coarsePointer
                          ? "Tap photos to select, then use Add to this item on a folder. A new item appears when the last folder gets its first photo."
                          : "Drop photos into Item 1, Item 2, etc. A new item appears automatically when the last one has a photo."}
                      </p>
                    </div>
                    <Link
                      href="/move-out/review"
                      className={[
                        "inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm",
                        canContinue
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none",
                      ].join(" ")}
                    >
                      Go to Step 3 →
                    </Link>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {normalizedGroups.map((g) => {
                      const isActive = activeDrop === g.id;
                      const groupPhotos = g.photoIds.map((pid) => photoById.get(pid)).filter(Boolean);
                      const itemIndex = getItemIndex(g.id);
                      const canDeleteGroup =
                        g.photoIds.length === 0 && Number.isFinite(itemIndex) && itemIndex > 2;

                      return (
                        <div
                          key={g.id}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDrop(g.id);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDrop(g.id);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDrop((cur) => (cur === g.id ? null : cur));
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDrop(null);
                            const raw = e.dataTransfer.getData("text/plain");
                            if (!raw) return;

                            let ids: string[] = [];
                            try {
                              ids = raw.trim().startsWith("[") ? JSON.parse(raw) : [raw];
                            } catch {
                              ids = [raw];
                            }

                            addPhotosToGroup(ids, g.id);
                            setSelected(new Set(ids));
                          }}
                          className={[
                            "rounded-2xl border p-4 min-h-[140px] transition-colors",
                            isActive
                              ? "bg-emerald-50 border-emerald-200"
                              : "bg-gray-50 border-gray-100",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <p className="text-sm font-semibold text-gray-900">{g.title}</p>
                              {canDeleteGroup && (
                                <button
                                  type="button"
                                  onClick={() => deleteEmptyGroup(g.id)}
                                  className="text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-2 py-1 transition-colors"
                                  title="Delete empty item folder"
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{g.photoIds.length} photos</span>
                          </div>

                          {groupPhotos.length === 0 ? (
                            coarsePointer ? (
                              <button
                                type="button"
                                onClick={() => assignSelectedToGroup(g.id)}
                                disabled={selected.size === 0}
                                className={[
                                  "w-full h-[88px] rounded-xl border border-dashed flex flex-col items-center justify-center gap-1 px-3 text-xs font-medium transition-colors",
                                  selected.size === 0
                                    ? "border-gray-200 bg-white/60 text-gray-400 cursor-not-allowed"
                                    : "border-emerald-300 bg-emerald-50/80 text-emerald-800 active:bg-emerald-100",
                                ].join(" ")}
                              >
                                <span>Add to this item</span>
                                <span className="text-[11px] font-normal text-gray-500">
                                  {selected.size === 0
                                    ? "Tap a photo first"
                                    : `${selected.size} photo${selected.size === 1 ? "" : "s"} selected`}
                                </span>
                              </button>
                            ) : (
                              <div className="h-[88px] rounded-xl border border-dashed border-gray-200 bg-white/60 flex items-center justify-center text-xs text-gray-400">
                                Drop photos here
                              </div>
                            )
                          ) : (
                            <div className="grid grid-cols-3 gap-2">
                              {groupPhotos.slice(0, 6).map((p) => (
                                <div
                                  key={p!.id}
                                  draggable={!coarsePointer}
                                  onDragStart={(e) => {
                                    const ids = getSelectedForDrag(p!.id);
                                    const payload = JSON.stringify(ids);
                                    e.dataTransfer.setData("application/passon-photo-ids", payload);
                                    e.dataTransfer.setData("text/plain", payload);
                                    e.dataTransfer.effectAllowed = "move";
                                  }}
                                  onMouseDown={(e) => selectOnMouseDown(g.id, p!.id, e)}
                                  className="cursor-grab active:cursor-grabbing select-none"
                                >
                                  <PhotoCard
                                    photo={p!}
                                    size="sm"
                                    alwaysShowActions={coarsePointer}
                                    onRemove={() => removePhotoFromGroup(p!.id, g.id)}
                                    onDelete={() => deletePhotoEverywhere(p!.id)}
                                    selected={selected.has(p!.id)}
                                  />
                                </div>
                              ))}
                              {groupPhotos.length > 6 && (
                                <div className="h-20 rounded-xl border border-gray-100 bg-white flex items-center justify-center text-xs text-gray-500 font-semibold">
                                  +{groupPhotos.length - 6}
                                </div>
                              )}
                            </div>
                          )}
                          {coarsePointer && groupPhotos.length > 0 && (
                            <button
                              type="button"
                              onClick={() => assignSelectedToGroup(g.id)}
                              disabled={selected.size === 0}
                              className={[
                                "mt-3 w-full rounded-xl py-2.5 text-xs font-semibold transition-colors border",
                                selected.size === 0
                                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-800 active:bg-emerald-100",
                              ].join(" ")}
                            >
                              {selected.size === 0
                                ? "Tap a photo to select, then add here"
                                : `Add ${selected.size} selected photo${selected.size === 1 ? "" : "s"} to this item`}
                            </button>
                          )}
                        </div>
                      );
                    })}
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

