import LandingIllustration from "@/components/LandingIllustration";
import { sellerSteps } from "@/lib/mockData";

export default function HowItWorks() {
  return (
    <section id="moving-out" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Moving out: four quick steps
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto leading-relaxed">
            From photos to a shareable listing—built so the next tenant can shop what&apos;s
            already in the apartment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sellerSteps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100"
            >
              <LandingIllustration src={step.imageSrc} alt={step.imageAlt} />
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
