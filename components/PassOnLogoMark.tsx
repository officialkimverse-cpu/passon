/**
 * PassOn wordmark icon: house (sofa + door) between sheltering hands — line art to match brand artwork.
 * Uses currentColor so it works on light nav (emerald/gray) and dark footer (white).
 */
export default function PassOnLogoMark({
  className = "h-9 w-9",
  title,
}: {
  className?: string;
  /** If set, svg is named in the accessibility tree (e.g. standalone mark). */
  title?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bottom hand — supporting */}
        <path d="M8 76 Q50 95 92 76" />
        <path d="M12 70 Q50 88 88 70" />
        {/* House shell */}
        <path d="M34 42 L50 22 L66 42 L66 76 L34 76 Z" />
        {/* Sofa (left interior) */}
        <path d="M38 56v14" />
        <path d="M38 64h12" />
        <path d="M50 62v8" />
        <path d="M42 60v8" />
        <path d="M40 56h6" />
        {/* Door (right interior) */}
        <path d="M58 74 L58 44 L65 44 L65 74 Z" />
        <circle cx="62.5" cy="56" r="1.6" fill="currentColor" stroke="none" />
        {/* Top hand — shielding */}
        <path d="M14 38 Q50 7 86 38" />
        <path d="M18 30 Q50 4 82 30" />
        <path d="M24 24l8-8 8-4" />
        <path d="M76 24l-8-8-8-4" />
      </g>
    </svg>
  );
}
