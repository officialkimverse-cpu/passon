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
      className={["block object-contain", className ?? "h-8 w-auto max-h-8 sm:h-9 sm:max-h-9 object-left"].join(
        " ",
      )}
      decoding="async"
      onError={() => setUseRaster(false)}
    />
  );
}
