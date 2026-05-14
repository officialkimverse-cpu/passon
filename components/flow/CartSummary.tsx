interface CartSummaryProps {
  propertyName: string;
  itemCount: number;
  subtotal: number;
  estimatedSavings: number;
  ctaLabel: string;
  onCta: () => void;
  ctaDisabled?: boolean;
}

export default function CartSummary({
  propertyName,
  itemCount,
  subtotal,
  estimatedSavings,
  ctaLabel,
  onCta,
  ctaDisabled = false,
}: CartSummaryProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Request summary
        </p>
        <p className="text-sm font-semibold text-gray-900 leading-snug">{propertyName}</p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Items selected</span>
          <span className="font-medium text-gray-900">{itemCount}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">
            {subtotal === 0 && itemCount > 0 ? "FREE" : `$${subtotal}`}
          </span>
        </div>
        {estimatedSavings > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span className="font-medium">Est. savings vs. retail</span>
            <span className="font-bold">−${estimatedSavings}</span>
          </div>
        )}
      </div>

      {estimatedSavings > 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-emerald-700 font-medium">
          🎉 You're saving up to ${estimatedSavings} compared to buying new
        </div>
      )}

      <button
        onClick={onCta}
        disabled={ctaDisabled}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {ctaLabel}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        This is a request — not a purchase. The resident will review your interest and coordinate the handoff.
      </p>
    </div>
  );
}
