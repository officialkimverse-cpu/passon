const trustPoints = [
  {
    icon: "🔗",
    title: "Invite links for incoming renters",
    description:
      "The next tenant opens a single link to browse what's in the unit—not a public feed of random curb deals.",
  },
  {
    icon: "🗓️",
    title: "Aligned with real move dates",
    description:
      "Handoff is built around lease turnover, so what's for sale is what's actually there when you arrive.",
  },
  {
    icon: "🏢",
    title: "Building-aware context",
    description:
      "Sellers confirm building or neighborhood so both sides know where the items live today—and tomorrow.",
  },
  {
    icon: "🌱",
    title: "Sustainable by design",
    description:
      "Keeping usable items in circulation is one of the easiest ways to reduce household waste.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Turnover you can trust
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            PassOn is built for renters passing things on in place—not anonymous strangers on the
            internet.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start"
            >
              <span className="text-3xl shrink-0">{point.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
