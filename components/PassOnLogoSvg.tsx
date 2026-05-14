const NAVY = "#14283D";
const GREEN = "#6BCB77";

/** Vector fallback when `/passon-brand.png` is missing or fails to load. */
export default function PassOnLogoSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 118"
      fill="none"
      className={className}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <path
        d="M50 11 L35 27 L35 51 L50 51"
        stroke={NAVY}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M50 15 L65 27 L65 51 L50 51"
        stroke={GREEN}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        fill={NAVY}
        d="M37 51v3h12v-3h-1.5v-5.5c0-1.2-1-2.2-2.2-2.2h-4.6c-1.2 0-2.2 1-2.2 2.2V51H37z"
      />
      <path fill={NAVY} d="M37 48h12v2H37v-2z" />
      <path stroke={NAVY} strokeWidth={1.8} strokeLinecap="round" d="M40 40.5V47" />
      <path fill={NAVY} d="M36.5 38.5h7l-1.8 2.2h-3.4l-1.8-2.2z" />
      <path stroke={NAVY} strokeWidth={2.6} strokeLinecap="round" d="M48.5 47.5H58" />
      <path fill={GREEN} d="M58 43.5l7.5 4-7.5 4v-8z" />
      <rect x="63.5" y="45" width="9" height="5.5" rx="0.6" fill={GREEN} />
      <path stroke={GREEN} strokeWidth={1.6} strokeLinecap="round" d="M65 50.5v3.5M69.5 50.5v3.5M72 50.5v3.5" />
      <text
        x="50"
        y="110"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fontFamily='ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
        letterSpacing="-0.02em"
      >
        <tspan fill={NAVY}>Pass</tspan>
        <tspan fill={GREEN}>On</tspan>
      </text>
    </svg>
  );
}
