"use client";

import { useState } from "react";
import PassOnLogoIconSvg from "@/components/PassOnLogoIconSvg";

const MARK_SRC = "/passon-logo-mark.png";

/**
 * Smaller mark for footer, emails, etc. (`public/passon-logo-mark.png`).
 * If missing, falls back to the compact vector icon (no wordmark).
 */
export default function PassOnLogoMark({ className }: { className?: string }) {
  const [useRaster, setUseRaster] = useState(true);

  if (!useRaster) {
    return <PassOnLogoIconSvg className={className} />;
  }

  return (
    <img
      src={MARK_SRC}
      alt=""
      className={[
        "block h-8 w-auto max-h-10 object-contain object-left sm:h-9 sm:max-h-9",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      decoding="async"
      onError={() => setUseRaster(false)}
    />
  );
}
