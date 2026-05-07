import Link from "next/link";
import { SubmittedRequest } from "./RequestForm";

interface SuccessSummaryProps {
  request: SubmittedRequest;
}

export default function SuccessSummary({ request }: SuccessSummaryProps) {
  const { property, items, name } = request;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-emerald-100 flex items-center justify-center text-4xl">
          ✅
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request sent!</h1>
          <p className="text-gray-600 leading-relaxed max-w-md">
            Your request has been sent to the resident at{" "}
            <span className="font-semibold text-gray-900">{property.name}</span>.
            They can now review your interest and coordinate the handoff.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">What happens next</h2>
        <ol className="flex flex-col gap-3">
          {[
            { icon: "📬", text: "The resident receives your request and reviews the items you selected." },
            { icon: "💬", text: "They'll reach out to coordinate pickup timing and any details." },
            { icon: "🤝", text: "You meet up, exchange items, and complete the handoff." },
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{step.icon}</span>
              <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Request details */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-gray-900">Your request summary</h2>

        {/* Property */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">
            {property.thumbnail}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{property.name}</p>
            <p className="text-xs text-gray-500">{property.neighborhood} · Move-out {property.moveOutDate}</p>
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Items requested ({items.length})
          </p>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.image}</span>
                  <span className="text-sm text-gray-800">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0">${item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-700">Total</span>
            <span className="text-base font-bold text-gray-900">
              ${items.reduce((s, i) => s + i.price, 0)}
            </span>
          </div>
        </div>

        {/* Sent to */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500">
          Sent by <span className="font-semibold text-gray-700">{name}</span> ·{" "}
          {new Date(request.submittedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/properties"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Browse More Properties
        </Link>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
