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
    imageSrc:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Person taking photos of a furnished room with a smartphone",
  },
  {
    number: "02",
    title: "We group & fill the listing",
    description:
      "AI clusters items and drafts names, brands, and price hints—original and resale—so you're not starting from a blank form.",
    icon: "✨",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Laptop on a desk with charts and notes, suggesting listing and pricing work",
  },
  {
    number: "03",
    title: "Add your notes",
    description:
      "Record voice memos or type condition, quirks, and what's included so the next renter knows what they're getting.",
    icon: "🎙️",
    imageSrc:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hands writing notes in a notebook at a desk",
  },
  {
    number: "04",
    title: "Publish for the next tenant",
    description:
      "Share the link; they browse what's already in the unit and respond item by item—no pickup coordination on your side.",
    icon: "🔗",
    imageSrc:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "House keys on a table, suggesting lease turnover and handoff",
  },
];

export const buyerSteps = [
  {
    number: "01",
    title: "Open your invite link",
    description:
      "Access the listing for your new place and browse what's already in the unit before you arrive.",
    icon: "🔗",
    imageSrc:
      "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A hand holding apartment keys in front of a doorway, suggesting a new lease and invite link",
  },
  {
    number: "02",
    title: "Buy now",
    description: "Lock it in at the listed price when you're ready to commit.",
    icon: "🛒",
    imageSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Contactless card payment at a checkout terminal",
  },
  {
    number: "03",
    title: "Make an offer or negotiate",
    description:
      "Propose a price, then chat to land somewhere fair—item by item, without back-and-forth pickup planning.",
    icon: "💬",
    imageSrc:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Two people having a friendly conversation at a table",
  },
  {
    number: "04",
    title: "Pass on what you don't want",
    description: "Mark items as not interested so your view stays focused on your essentials.",
    icon: "✅",
    imageSrc:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bright, minimal apartment living space with open floor",
  },
];

export const valueProps = [
  {
    icon: "📦",
    title: "Move out without the pickup thread",
    description:
      "Buyers are the next tenant—items stay where they are until handoff. Less DM ping-pong, fewer no-shows.",
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Moving boxes and belongings in a bright home interior",
  },
  {
    icon: "🛋️",
    title: "Furnish from what's already there",
    description:
      "Shop the last tenant's place at turnover prices. What you see is what stays in the unit for you.",
    imageSrc:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Cozy living room with a sofa and warm lighting",
  },
  {
    icon: "♻️",
    title: "Less waste",
    description: "Keep good furniture out of landfills. Every reused item is a small win for the planet.",
    imageSrc:
      "https://images.unsplash.com/photo-1525695230005-efd074980869?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A plant growing from a reused container, suggesting reuse and less waste",
  },
  {
    icon: "🏘️",
    title: "Turnover, not random meetups",
    description:
      "Invite links and building context—so both sides know the handoff is tied to the lease, not a parking lot.",
    imageSrc:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Desk with laptop and notes, suggesting planning and scheduled turnover",
  },
  {
    icon: "🎓",
    title: "Built for renters",
    description: "Designed for students, young professionals, and anyone who moves more than once.",
    imageSrc:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Friends relaxing together in a shared apartment living room",
  },
  {
    icon: "⚡",
    title: "Clear choices per item",
    description:
      "Buy now, offer, negotiate, or pass—incoming renters decide item by item without a scavenger hunt.",
    imageSrc:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Notebook with a checklist and pen on a wooden table",
  },
];
