interface BadgeProps {
  text: string;
}

const badgeStyles: Record<string, string> = {
  "Next resident priority": "bg-emerald-100 text-emerald-700",
  "At turnover": "bg-amber-100 text-amber-700",
  "Price drop": "bg-rose-100 text-rose-700",
  "Popular": "bg-violet-100 text-violet-700",
};

export default function Badge({ text }: BadgeProps) {
  const style = badgeStyles[text] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${style}`}>
      {text}
    </span>
  );
}
