import { Listing } from "@/lib/mockData";
import Badge from "./Badge";

export default function ItemCard({ item }: { item: Listing }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      {/* Emoji thumbnail */}
      <div className="bg-gray-50 rounded-xl h-32 flex items-center justify-center text-5xl">
        {item.emoji}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.title}</h3>
          <span className="text-base font-bold text-emerald-600 shrink-0">${item.price}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
            {item.condition}
          </span>
          <span>·</span>
          <span>{item.location}</span>
        </div>
      </div>

      {/* Badge */}
      {item.badge && <Badge text={item.badge} />}
    </div>
  );
}
