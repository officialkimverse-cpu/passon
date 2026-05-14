/** Compact mark (no wordmark) — matches `public/passon-logo.svg`. */
export default function PassOnLogoIconSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <path
        d="M50 14 L33 31 L33 56 L50 56"
        stroke="#14283D"
        strokeWidth={2.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M50 18 L67 31 L67 56 L50 56"
        stroke="#6BCB77"
        strokeWidth={2.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        fill="#14283D"
        d="M36 48v6h11v-2.5H38.5V48c0-1.1.9-2 2-2h4.5c1.1 0 2 .9 2 2v1.5H36z"
      />
      <path stroke="#14283D" strokeWidth={2} strokeLinecap="round" d="M39 39v5" />
      <path fill="#14283D" d="M35 36h8l-1.5 3h-5L35 36z" />
      <path stroke="#14283D" strokeWidth={3} strokeLinecap="round" d="M48 46.5h10" />
      <path fill="#6BCB77" d="M58 42.5l7 4-7 4v-8z" />
      <path
        fill="#6BCB77"
        d="M63 44h10v5H63v-5zm1.5 5v4h2v-4h3v4h2v-4h1.5"
      />
    </svg>
  );
}
