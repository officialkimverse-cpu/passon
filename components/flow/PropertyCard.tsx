import Link from "next/link";
import { Property } from "@/lib/flowData";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 h-32 flex items-center justify-center text-6xl">
        {property.thumbnail}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-base leading-snug">{property.name}</h3>
            <span className="shrink-0 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap">
              {property.availableItemCount} available
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{property.neighborhood} · {property.type}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1">{property.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span>📅</span>
          <span>Move-out: <span className="font-medium text-gray-600">{property.moveOutDate}</span></span>
        </div>

        {/* CTA */}
        <Link
          href={`/properties/${property.id}`}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors mt-1"
        >
          View Available Items
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
