import { listings } from "@/lib/mockData";
import ItemCard from "./ui/ItemCard";

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sample listings at turnover
            </h2>
            <p className="mt-2 text-gray-500 max-w-lg">
              Furniture and household goods passed on in place—priced for the next renter, not a
              cross-town pickup.
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View all →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {listings.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            Browse all listings
          </a>
        </div>
      </div>
    </section>
  );
}
