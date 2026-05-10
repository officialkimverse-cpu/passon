import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Tailwind `sizes` hint for responsive `fill` images */
  sizes?: string;
};

/** Hero-style image frame used across landing sections (matches What is PassOn). */
export default function LandingIllustration({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-emerald-50/40 via-white/0 to-white/0" />
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
