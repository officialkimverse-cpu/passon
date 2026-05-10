import LandingIllustration from "@/components/LandingIllustration";
import { buyerSteps } from "@/lib/mockData";

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
              <LandingIllustration
                src={step.imageSrc}
                alt={step.imageAlt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest">
                <span aria-hidden>{step.icon}</span>
                <span>Step {step.number}</span>
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
