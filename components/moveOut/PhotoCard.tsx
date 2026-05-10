"use client";

import type { UploadItem } from "@/context/MoveOutContext";

export default function PhotoCard({
  photo,
  size = "md",
  onRemove,
  onDelete,
  selected = false,
  alwaysShowActions = false,
}: {
  photo: UploadItem;
  size?: "sm" | "md";
  onRemove?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  /** On touch devices, hover never fires — show × / Remove without hovering */
  alwaysShowActions?: boolean;
}) {
  const heightClass = size === "sm" ? "h-16" : "h-28";
  const actionVisibility = alwaysShowActions
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border bg-gray-50",
        selected ? "border-emerald-200 ring-2 ring-emerald-400" : "border-gray-100 ring-0",
      ].join(" ")}
    >
      <img
        src={photo.url}
        alt={photo.file.name}
        className={`${heightClass} w-full object-cover`}
        loading="lazy"
      />
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className={`absolute top-1.5 right-1.5 ${actionVisibility} transition-opacity bg-white/90 hover:bg-white text-gray-800 border border-gray-200 rounded-md h-5 w-5 inline-flex items-center justify-center text-[10px] font-bold shadow-sm`}
          aria-label="Delete photo"
          title="Delete"
        >
          ×
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className={[
            "absolute top-2 transition-opacity bg-white/90 hover:bg-white text-gray-800 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold shadow-sm",
            actionVisibility,
            onDelete ? "right-10" : "right-2",
          ].join(" ")}
        >
          Remove
        </button>
      )}
    </div>
  );
}

