type Props = {
  src: string;
  alt: string;
};

/**
 * Same image frame as “What is PassOn” (native img so it behaves like that section everywhere).
 */
export default function LandingIllustration({ src, alt }: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white" />
      <div className="relative aspect-[16/9] w-full">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/0 to-white/0" />
      </div>
    </div>
  );
}
