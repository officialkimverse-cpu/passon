import type { Item, ItemCondition, Property } from "@/lib/flowData";
import type { InviteItem } from "@/lib/inviteStore";

export function invitePropertyFromId(inviteId: string): Property {
  return {
    id: `invite-${inviteId}`,
    name: "Invite listing",
    address: "In-unit handoff at turnover",
    neighborhood: "Your new place",
    type: "PassOn invite",
    moveOutDate: "Coordinated with seller",
    availableItemCount: 0,
    thumbnail: "🔗",
    description: "Items from a PassOn invite — browse, add to cart, and send a request to the seller.",
  };
}

export function mapInviteCondition(raw?: string): ItemCondition {
  if (!raw) return "Good";
  const t = raw.toLowerCase();
  if (t.includes("like new") || t === "new" || t.includes("nearly new")) return "Like New";
  if (t.includes("damaged") || t.includes("fair") || t.includes("worn")) return "Fair";
  return "Good";
}

/** Stable cart line id so the same listing item cannot be added twice. */
export function flowItemFromInvite(inviteId: string, it: InviteItem): Item {
  const price = typeof it.finalPrice === "number" ? it.finalPrice : 0;
  const thumb =
    it.thumbnailDataUrl && it.thumbnailDataUrl.length > 0 ? it.thumbnailDataUrl : "📦";
  const noteParts = [it.description?.trim(), it.usageNotes?.trim()].filter(Boolean);
  return {
    id: `inv-${inviteId}-${it.id}`,
    propertyId: `invite-${inviteId}`,
    name: it.title?.trim() || "Untitled item",
    category: "Furniture",
    price,
    estimatedOriginalPrice: it.marketPrice,
    condition: mapInviteCondition(it.condition),
    status: "available",
    note: noteParts.join("\n\n") || "—",
    image: thumb,
  };
}

export function parseInviteIdFromPropertyId(propertyId: string): string | null {
  const m = propertyId.match(/^invite-(.+)$/);
  return m ? m[1] : null;
}
