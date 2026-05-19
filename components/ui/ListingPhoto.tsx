"use client";

import { useEffect, useState } from "react";

type Props = {
  localSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  emoji?: string;
};

/**
 * Shows Unsplash (or other fallback) immediately, then swaps to your file in
 * `public/images/listings/` if that file exists.
 */
export default function ListingPhoto({
  localSrc,
  fallbackSrc,
  alt,
  className = "absolute inset-0 w-full h-full object-cover",
  emoji,
}: Props) {
  const [src, setSrc] = useState(fallbackSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSrc(localSrc);
    probe.onerror = () => {
      /* keep fallback */
    };
    probe.src = localSrc;
  }, [localSrc]);

  if (failed && emoji) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-5xl bg-gray-50">
        {emoji}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (src !== fallbackSrc) {
          setSrc(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
