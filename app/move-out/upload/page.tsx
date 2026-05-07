"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/moveOut/ProgressIndicator";
import { useMoveOut, type UploadItem } from "@/context/MoveOutContext";

function makeId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export default function MoveOutUploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { photos, setPhotos, setGroups } = useMoveOut();
  const [isDragging, setIsDragging] = useState(false);

  const count = photos.length;
  const canContinue = count > 0;

  const thumbnails = useMemo(() => photos, [photos]);

  function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));

    setPhotos((prev) => {
      const existing = new Set(prev.map((p) => p.id));
      const next: UploadItem[] = [];

      for (const file of files) {
        const id = makeId(file);
        if (existing.has(id)) continue;
        next.push({ file, id, url: URL.createObjectURL(file) });
      }

      return [...prev, ...next];
    });
  }

  function removeItem(id: string) {
    setPhotos((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((p) => p.id !== id);
    });

    setGroups((prev) =>
      prev.map((g) => ({ ...g, photoIds: g.photoIds.filter((pid) => pid !== id) })),
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>📤</span>
              <span>Move-out listing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Upload photos
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Snap everything you&apos;re leaving behind — different angles, different items, all at
              once
            </p>
          </div>

          <ProgressIndicator activeStep={1} />

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div
                className={[
                  "relative rounded-3xl border-2 border-dashed p-8 sm:p-10 transition-colors bg-white shadow-sm",
                  isDragging
                    ? "border-emerald-400 bg-emerald-50/60"
                    : "border-gray-200 hover:border-gray-300",
                ].join(" ")}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />

                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                    📷
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-900 font-semibold text-lg">
                      Drag &amp; drop your photos here
                    </p>
                    <p className="text-sm text-gray-500">
                      Or choose multiple images from your device.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Select photos
                  </button>
                  <p className="text-xs text-gray-400">
                    JPEG, PNG, HEIC supported · Upload as many as you want
                  </p>
                </div>
              </div>

              {thumbnails.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Uploaded photos ({count})
                    </p>
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Add more
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {thumbnails.map((t) => (
                      <div
                        key={t.id}
                        className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                      >
                        <img
                          src={t.url}
                          alt={t.file.name}
                          className="h-28 w-full object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(t.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-gray-800 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold shadow-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Step 1 of 4
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Add at least one photo to continue. More angles help AI group items accurately.
                </p>

                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => router.push("/move-out/group")}
                  className={[
                    "mt-4 w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl transition-colors shadow-sm text-sm",
                    canContinue
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed",
                  ].join(" ")}
                >
                  Continue →
                </button>

                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 leading-relaxed">
                  ✨ Tip: Include wide shots + close-ups (labels, wear, brand marks) for better
                  auto-filled listings.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

