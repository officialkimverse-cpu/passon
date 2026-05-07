export type Condition = "Like New" | "Good" | "Fair";
export type Badge =
  | "Next resident priority"
  | "At turnover"
  | "Price drop"
  | "Popular";

export interface Listing {
  id: string;
  title: string;
  price: number;
  condition: Condition;
  location: string;
  badge?: Badge;
  emoji: string;
  daysAgo: number;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Standing Desk",
    price: 120,
    condition: "Like New",
    location: "Morningside Heights",
    badge: "Next resident priority",
    emoji: "🖥️",
    daysAgo: 2,
  },
  {
    id: "2",
    title: "Office Chair",
    price: 65,
    condition: "Good",
    location: "Williamsburg",
    badge: "At turnover",
    emoji: "🪑",
    daysAgo: 1,
  },
  {
    id: "3",
    title: "Bed Frame (Queen)",
    price: 90,
    condition: "Good",
    location: "Astoria",
    badge: "Price drop",
    emoji: "🛏️",
    daysAgo: 3,
  },
  {
    id: "4",
    title: "Floor Lamp",
    price: 25,
    condition: "Like New",
    location: "Crown Heights",
    badge: "At turnover",
    emoji: "💡",
    daysAgo: 1,
  },
  {
    id: "5",
    title: "Microwave",
    price: 40,
    condition: "Good",
    location: "Inwood",
    badge: "Popular",
    emoji: "📦",
    daysAgo: 4,
  },
  {
    id: "6",
    title: "Storage Shelf",
    price: 35,
    condition: "Fair",
    location: "Bushwick",
    badge: "Next resident priority",
    emoji: "🗄️",
    daysAgo: 2,
  },
];

export const sellerSteps = [
  {
    number: "01",
    title: "Snap your space",
    description:
      "Photograph furniture and household items you're not taking with you—no need to stage a perfect shoot.",
    icon: "📸",
  },
  {
    number: "02",
    title: "We group & fill the listing",
    description:
      "AI clusters items and drafts names, brands, and price hints—original and resale—so you're not starting from a blank form.",
    icon: "✨",
  },
  {
    number: "03",
    title: "Add your notes",
    description:
      "Record voice memos or type condition, quirks, and what's included so the next renter knows what they're getting.",
    icon: "🎙️",
  },
  {
    number: "04",
    title: "Publish for the next tenant",
    description:
      "Share the link; they browse what's already in the unit and respond item by item—no pickup coordination on your side.",
    icon: "🔗",
  },
];

export const valueProps = [
  {
    icon: "📦",
    title: "Move out without the pickup thread",
    description:
      "Buyers are the next tenant—items stay where they are until handoff. Less DM ping-pong, fewer no-shows.",
  },
  {
    icon: "🛋️",
    title: "Furnish from what's already there",
    description:
      "Shop the last tenant's place at turnover prices. What you see is what stays in the unit for you.",
  },
  {
    icon: "♻️",
    title: "Less waste",
    description: "Keep good furniture out of landfills. Every reused item is a small win for the planet.",
  },
  {
    icon: "🏘️",
    title: "Turnover, not random meetups",
    description:
      "Invite links and building context—so both sides know the handoff is tied to the lease, not a parking lot.",
  },
  {
    icon: "🎓",
    title: "Built for renters",
    description: "Designed for students, young professionals, and anyone who moves more than once.",
  },
  {
    icon: "⚡",
    title: "Clear choices per item",
    description:
      "Buy now, offer, negotiate, or pass—incoming renters decide item by item without a scavenger hunt.",
  },
];
