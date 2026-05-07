import { Item } from "@/lib/flowData";

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-emerald-100 text-emerald-700",
  },
  reserved: {
    label: "Reserved",
    className: "bg-amber-100 text-amber-700",
  },
  unavailable: {
    label: "Claimed",
    className: "bg-gray-100 text-gray-500",
  },
};

const conditionConfig = {
  "Like New": "bg-emerald-50 text-emerald-700",
  Good: "bg-sky-50 text-sky-700",
  Fair: "bg-orange-50 text-orange-700",
};

interface BrowseItemCardProps {
  item: Item;
  isInCart: boolean;
  onAdd: () => void;
}

export default function BrowseItemCard({ item, isInCart, onAdd }: BrowseItemCardProps) {
  const status = statusConfig[item.status];
  const isSelectable = item.status !== "unavailable";
  const isDisabled = !isSelectable || isInCart;

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm flex flex-col transition-all duration-200 overflow-hidden ${
        item.status === "unavailable"
          ? "border-gray-100 opacity-60"
          : "border-gray-100 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Image */}
      <div className="relative bg-gray-50 h-36 flex items-center justify-center text-5xl">
        {item.image}
        {/* Status badge overlay */}
        {item.status !== "available" && (
          <div className="absolute inset-0 bg-white/50" />
        )}
        <span
          className={`absolute top-2.5 right-2.5 text-xs font-semibold px-2 py-0.5 rounded-full ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
            <span className="shrink-0 font-bold text-emerald-600 text-base">${item.price}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${conditionConfig[item.condition]}`}>
              {item.condition}
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{item.category}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed flex-1">{item.note}</p>

        {item.estimatedOriginalPrice && item.status === "available" && (
          <p className="text-xs text-emerald-600 font-medium">
            Save ${item.estimatedOriginalPrice - item.price} vs. retail
          </p>
        )}

        {/* Action */}
        <button
          onClick={onAdd}
          disabled={isDisabled}
          className={`w-full text-sm font-semibold py-2 rounded-xl transition-colors mt-1 ${
            isInCart
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default"
              : item.status === "unavailable"
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : item.status === "reserved"
              ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isInCart
            ? "✓ Added to request"
            : item.status === "unavailable"
            ? "Not available"
            : item.status === "reserved"
            ? "Join waitlist"
            : "Add to request"}
        </button>
      </div>
    </div>
  );
}
