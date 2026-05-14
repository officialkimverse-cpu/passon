"use client";

import { useEffect, useState } from "react";
import PassOnLogoSvg from "@/components/PassOnLogoSvg";

const BRAND_SRC = "/passon-brand.png";

/**
 * Full brand (`public/passon-brand.png`). Preloads so we never flash a broken `<img>` if the file is missing.
 * Falls back to vector lockup.
 */
export default function PassOnBrand({ className }: { className?: string }) {
  const [pngOk, setPngOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setPngOk(true);
    img.onerror = () => setPngOk(false);
    img.src = BRAND_SRC;
  }, []);

  const merged = ["block object-contain object-left", className ?? "h-9 w-auto max-h-9"].join(" ");

  if (!pngOk) {
    return <PassOnLogoSvg className={merged} />;
  }

  return (
    <img
      src={BRAND_SRC}
      alt=""
      className={merged}
      decoding="async"
      onError={() => setPngOk(false)}
    />
  );
}
