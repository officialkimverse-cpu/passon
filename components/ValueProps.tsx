import { valueProps } from "@/lib/mockData";

export default function ValueProps() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-emerald-50/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Why in-unit handoff works
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Same apartment, two renters—less coordination, less waste, and prices that make sense at
            turnover.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{vp.icon}</span>
              <h3 className="font-semibold text-gray-900">{vp.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{vp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
