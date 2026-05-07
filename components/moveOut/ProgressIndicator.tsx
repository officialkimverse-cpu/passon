"use client";

const steps = ["Upload Photos", "Group Items", "Review Listings", "Add Notes & Publish"] as const;

export default function ProgressIndicator({ activeStep }: { activeStep: 1 | 2 | 3 | 4 }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((label, idx) => {
          const stepNumber = (idx + 1) as 1 | 2 | 3 | 4;
          const isActive = stepNumber === activeStep;
          const isComplete = stepNumber < activeStep;

          return (
            <div
              key={label}
              className={[
                "rounded-2xl border px-4 py-3 flex items-start gap-3 shadow-sm",
                isActive
                  ? "bg-emerald-50 border-emerald-200"
                  : isComplete
                    ? "bg-white border-gray-100"
                    : "bg-white border-gray-100",
              ].join(" ")}
            >
              <div
                className={[
                  "h-8 w-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                  isActive
                    ? "bg-emerald-600 text-white"
                    : isComplete
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500",
                ].join(" ")}
              >
                {isComplete ? "✓" : String(stepNumber).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-widest",
                    isActive ? "text-emerald-700" : "text-gray-400",
                  ].join(" ")}
                >
                  Step {stepNumber}
                </p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

