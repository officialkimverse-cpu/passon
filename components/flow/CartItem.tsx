import { CartEntry } from "@/context/CartContext";

interface CartItemProps {
  entry: CartEntry;
  onRemove: (itemId: string) => void;
}

const conditionColor = {
  "Like New": "text-emerald-600",
  Good: "text-sky-600",
  Fair: "text-orange-600",
};

export default function CartItem({ entry, onRemove }: CartItemProps) {
  const { item } = entry;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
        {item.image}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs font-medium ${conditionColor[item.condition]}`}>
            {item.condition}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-500">{item.category}</span>
        </div>
        {item.estimatedOriginalPrice && (
          <p className="text-xs text-gray-400 mt-0.5 line-through">
            Retail ~${item.estimatedOriginalPrice}
          </p>
        )}
      </div>

      {/* Price + Remove */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="font-bold text-gray-900">${item.price}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-gray-400 hover:text-rose-500 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
