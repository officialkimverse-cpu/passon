import Link from "next/link";
import { Property } from "@/lib/flowData";

interface PropertyHeaderProps {
  property: Property;
  availableCount: number;
}

export default function PropertyHeader({ property, availableCount }: PropertyHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Emoji */}
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-4xl shrink-0">
        {property.thumbnail}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Link
            href="/properties"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← All Properties
          </Link>
        </div>
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{property.name}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {property.address} · {property.type}
        </p>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-xl">{property.description}</p>
      </div>

      {/* Stats */}
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">{availableCount}</p>
          <p className="text-xs text-gray-500">items available</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span>📅</span>
          <span>Move-out <span className="font-medium text-gray-600">{property.moveOutDate}</span></span>
        </div>
      </div>
    </div>
  );
}
