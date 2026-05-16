"use client";

import { useEffect, useState } from "react";
import { listings } from "@/lib/mockData";

const IMG = "https://images.unsplash.com/photo-1592078615290-03300735428e?auto=format&fit=crop&w=600&q=80";
const IMG2 = "https://images.unsplash.com/photo-1580480055273-a1033438c0cc?auto=format&fit=crop&w=600&q=80";
const IMG3 = "https://images.unsplash.com/photo-1505693416388-eac992166147?auto=format&fit=crop&w=600&q=80";

type Mode = "looks" | "works";

const workSlides = [
  {
    step: "01",
    title: "Upload photos",
    body: "Snap everything you're leaving—one batch, many angles.",
    visual: "upload",
  },
  {
    step: "02",
    title: "Group into items",
    body: "Drag photos into folders so each listing is one piece.",
    visual: "group",
  },
  {
    step: "03",
    title: "AI drafts details",
    body: "Names, descriptions, and price hints from your photos.",
    visual: "review",
  },
  {
    step: "04",
    title: "Share invite link",
    body: "The next tenant browses, adds to cart, and sends a request.",
    visual: "invite",
  },
] as const;

const previewItems = listings.slice(0, 3);

export default function ProductSimulationSection() {
  const [mode, setMode] = useState<Mode>("looks");
  const [workIndex, setWorkIndex] = useState(0);

  useEffect(() => {
    if (mode !== "works") return;
    const id = window.setInterval(() => {
      setWorkIndex((i) => (i + 1) % workSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [mode]);

  return (
    <section
      id="product-preview"
      className="py-20 px-4 sm:px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            See PassOn in action
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            How it looks · How it works
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A quick preview of what sellers publish and what incoming renters see on the invite
            link—before you start your own listing.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setMode("looks")}
            className={[
              "px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
              mode === "looks"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            ].join(" ")}
          >
            How it looks
          </button>
          <button
            type="button"
            onClick={() => setMode("works")}
            className={[
              "px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
              mode === "works"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            ].join(" ")}
          >
            How it works
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
          {mode === "looks" ? (
            <div className="grid lg:grid-cols-5 gap-6 items-start">
              <div className="lg:col-span-2 flex flex-col gap-4">
                <p className="text-sm font-semibold text-gray-900">Incoming renter view</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Open the invite link, tap an item for photos and notes, add to cart, then send a
                  request—items stay in the unit until handoff.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-emerald-600">✓</span> Real photos per item
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600">✓</span> Buy / offer / pass per line
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600">✓</span> Cart → checkout request
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-2 text-xs text-gray-400 truncate flex-1">
                    passon.app/invite/demo
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-1">
                    Invite listing
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Browse what&apos;s being left behind
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {previewItems.map((it) => (
                      <div
                        key={it.id}
                        className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm"
                      >
                        <div className="h-24 bg-gray-100 relative">
                          {it.imageSrc ? (
                            <img
                              src={it.imageSrc}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-2xl">
                              {it.emoji}
                            </span>
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-semibold text-gray-900 truncate">{it.title}</p>
                          <p className="text-sm font-bold text-emerald-600">${it.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-emerald-600 text-white">
                      Add to cart
                    </span>
                    <span className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border border-gray-200 text-gray-700">
                      View cart
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
                <p className="text-sm font-semibold text-gray-900">
                  Step {workSlides[workIndex].step} — {workSlides[workIndex].title}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {workSlides[workIndex].body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {workSlides.map((s, i) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setWorkIndex(i)}
                      className={[
                        "h-2 rounded-full transition-all",
                        i === workIndex ? "w-8 bg-emerald-600" : "w-2 bg-gray-300 hover:bg-gray-400",
                      ].join(" ")}
                      aria-label={`Go to step ${s.step}`}
                    />
                  ))}
                </div>
                <a
                  href="/move-out/upload"
                  className="inline-flex w-fit items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Try the move-out flow →
                </a>
              </div>
              <div className="lg:col-span-3 order-1 lg:order-2">
                <WorkSlideVisual visual={workSlides[workIndex].visual} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WorkSlideVisual({ visual }: { visual: (typeof workSlides)[number]["visual"] }) {
  if (visual === "upload") {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-emerald-200 p-8 text-center">
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
          {[IMG, IMG2, IMG3].map((src, i) => (
            <img key={i} src={src} alt="" className="h-16 w-full rounded-lg object-cover" />
          ))}
        </div>
        <p className="text-sm font-medium text-gray-700">Drop photos here</p>
        <p className="text-xs text-gray-400 mt-1">Multiple angles, one upload</p>
      </div>
    );
  }
  if (visual === "group") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3 border border-gray-100">
          <p className="text-xs font-bold text-gray-500 mb-2">Unassigned</p>
          <div className="flex gap-1">
            <img src={IMG} alt="" className="h-12 w-12 rounded object-cover" />
            <img src={IMG2} alt="" className="h-12 w-12 rounded object-cover" />
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
          <p className="text-xs font-bold text-emerald-700 mb-2">Item 1</p>
          <img src={IMG3} alt="" className="h-12 w-12 rounded object-cover" />
        </div>
      </div>
    );
  }
  if (visual === "review") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4">
        <img src={IMG} alt="" className="h-28 w-28 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-sm font-bold text-gray-900">Standing desk</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Adjustable height desk in good condition. Minor wear on surface.
          </p>
          <p className="text-xs text-emerald-600 font-semibold">Suggested: $120</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className="text-xs text-gray-400 mb-2">Your invite link</p>
      <div className="flex gap-2 items-center bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 mb-3">
        <span className="text-xs text-emerald-800 font-mono truncate flex-1">
          passon.app/invite/abc123
        </span>
        <span className="text-xs font-semibold text-emerald-700 shrink-0">Copy</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[IMG, IMG2, IMG3].map((src, i) => (
          <img key={i} src={src} alt="" className="h-14 w-full rounded-lg object-cover" />
        ))}
      </div>
    </div>
  );
}
