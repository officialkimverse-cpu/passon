"use client";

import { useState } from "react";
import PassOnLogoSvg from "@/components/PassOnLogoSvg";

const BRAND_PNG = "/passon-brand.png";

/**
 * Prefer your exported PNG at `public/passon-brand.png` (transparent background, ~2–3× height for retina).
 * If the file is missing or errors, falls back to the built-in SVG so the site never breaks.
 */
export default function PassOnLogo({ className }: { className?: string }) {
  const [useRaster, setUseRaster] = useState(true);

  if (!useRaster) {
    return <PassOnLogoSvg className={className} />;
  }

  return (
    <img
      src={BRAND_PNG}
      alt=""
      className={["block h-9 w-auto max-h-9 object-contain object-left", className].filter(Boolean).join(" ")}
      decoding="async"
      onError={() => setUseRaster(false)}
    />
  );
}
