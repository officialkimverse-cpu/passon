"use client";

import { useEffect, useState } from "react";
import PassOnLogoIconSvg from "@/components/PassOnLogoIconSvg";

const MARK_SRC = "/passon-logo-mark.png";

/**
 * Smaller mark (`public/passon-logo-mark.png`). Preloads to avoid a broken `<img>` flash.
 */
export default function PassOnLogoMark({ className }: { className?: string }) {
  const [pngOk, setPngOk] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setPngOk(true);
    img.onerror = () => setPngOk(false);
    img.src = MARK_SRC;
  }, []);

  const merged = [
    "block object-contain",
    className ?? "h-8 w-auto max-h-8 sm:h-9 sm:max-h-9 object-left",
  ].join(" ");

  if (!pngOk) {
    return <PassOnLogoIconSvg className={merged} />;
  }

  return (
    <img
      src={MARK_SRC}
      alt=""
      className={merged}
      decoding="async"
      onError={() => setPngOk(false)}
    />
  );
}
