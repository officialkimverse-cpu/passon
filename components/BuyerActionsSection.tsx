const buyerSteps = [
  {
    number: "01",
    title: "Open your invite link",
    description:
      "Access the listing for your new place and browse what’s already in the unit before you arrive.",
    icon: "🔗",
  },
  {
    number: "02",
    title: "Buy now",
    description: "Lock it in at the listed price when you're ready to commit.",
    icon: "🛒",
  },
  {
    number: "03",
    title: "Make an offer or negotiate",
    description:
      "Propose a price, then chat to land somewhere fair—item by item, without back-and-forth pickup planning.",
    icon: "💬",
  },
  {
    number: "04",
    title: "Pass on what you don’t want",
    description: "Mark items as not interested so your view stays focused on your essentials.",
    icon: "✅",
  },
];

export default function BuyerActionsSection() {
  return (
    <section id="moving-in" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Moving in: four quick steps
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Open the invite, browse what&apos;s in the space, and decide item by item—buy now, offer,
            negotiate, or pass.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {buyerSteps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100"
            >
              <div className="text-3xl">{step.icon}</div>
              <div className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
                Step {step.number}
              </div>
              <h3 className="font-semibold text-gray-900 text-base leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
