import AppNavbar from "@/components/flow/AppNavbar";
import PropertyCard from "@/components/flow/PropertyCard";
import Footer from "@/components/Footer";
import { properties } from "@/lib/flowData";

export const metadata = {
  title: "Browse Properties — PassOn",
  description: "Choose a property to see available items for handoff.",
};

export default function PropertiesPage() {
  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full w-fit">
              <span>🏘️</span>
              <span>Available properties near you</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Choose your property
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Browse items left behind by outgoing residents. Add what you need
              to your request and send it directly to them.
            </p>
          </div>

          {/* How it works strip */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🏠", step: "1", label: "Pick a property" },
              { icon: "🛋️", step: "2", label: "Add items to your request" },
              { icon: "📬", step: "3", label: "Send request to resident" },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm"
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Step {s.step}</p>
                  <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Property grid */}
          <div>
            <p className="text-sm text-gray-500 mb-5">
              {properties.length} properties with available items
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
