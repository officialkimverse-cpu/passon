import { ItemCategory } from "@/lib/flowData";

export type FilterOption = "All" | ItemCategory;

const categories: FilterOption[] = ["All", "Furniture", "Kitchen", "Decor", "Essentials"];

interface CategoryFilterProps {
  active: FilterOption;
  onChange: (cat: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-150 ${
            active === cat
              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
          }`}
        >
          {cat}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              active === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {counts[cat]}
          </span>
        </button>
      ))}
    </div>
  );
}
