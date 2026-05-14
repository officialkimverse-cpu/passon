"use client";

import { useState } from "react";
import PassOnLogoSvg from "@/components/PassOnLogoSvg";

const BRAND_SRC = "/passon-brand.png";

/**
 * Full brand for the top bar (`public/passon-brand.png`).
 * If the file is missing, falls back to the vector lockup.
 */
export default function PassOnBrand({ className }: { className?: string }) {
  const [useRaster, setUseRaster] = useState(true);

  if (!useRaster) {
    return <PassOnLogoSvg className={className} />;
  }

  return (
    <img
      src={BRAND_SRC}
      alt=""
      className={[
        "block h-9 w-auto max-h-9 object-contain object-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      decoding="async"
      onError={() => setUseRaster(false)}
    />
  );
}
