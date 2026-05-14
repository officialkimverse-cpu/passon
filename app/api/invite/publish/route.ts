import { NextResponse } from "next/server";
import { getInvite, saveInvite, type InviteItem, type InvitePayload } from "@/lib/inviteStore";

type PublishRequest = {
  items: InviteItem[];
};

/** Vercel serverless request bodies are capped (~4.5MB). Thumbnails are the usual overflow. */
const MAX_JSON_BYTES = 4_000_000;
const MAX_THUMB_CHARS = 100_000;
const MAX_GALLERY_URL_CHARS = 85_000;
const MAX_GALLERY_PER_ITEM = 3;
const MAX_DESCRIPTION = 12_000;
const MAX_USAGE_NOTES = 8_000;

function slimGallery(urls: unknown): string[] | undefined {
  if (!Array.isArray(urls)) return undefined;
  const out = urls
    .filter((u): u is string => typeof u === "string")
    .slice(0, MAX_GALLERY_PER_ITEM)
    .map((u) => u.slice(0, MAX_GALLERY_URL_CHARS))
    .filter((u) => u.length > 0);
  return out.length ? out : undefined;
}

function slimInviteItems(items: InviteItem[]): InviteItem[] {
  return items.map((it) => ({
    ...it,
    thumbnailDataUrl:
      typeof it.thumbnailDataUrl === "string" && it.thumbnailDataUrl.length <= MAX_THUMB_CHARS
        ? it.thumbnailDataUrl
        : undefined,
    photoDataUrls: slimGallery(it.photoDataUrls),
    description:
      typeof it.description === "string" && it.description.length > MAX_DESCRIPTION
        ? it.description.slice(0, MAX_DESCRIPTION)
        : it.description,
    usageNotes:
      typeof it.usageNotes === "string" && it.usageNotes.length > MAX_USAGE_NOTES
        ? it.usageNotes.slice(0, MAX_USAGE_NOTES)
        : it.usageNotes,
  }));
}

function makeId() {
  return `inv_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export async function POST(req: Request) {
  let body: PublishRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Missing items" }, { status: 400 });
  }

  let items = slimInviteItems(body.items);
  let serialized = JSON.stringify({ items });
  if (serialized.length > MAX_JSON_BYTES) {
    items = items.map((it) => ({ ...it, photoDataUrls: undefined }));
    serialized = JSON.stringify({ items });
  }
  if (serialized.length > MAX_JSON_BYTES) {
    items = items.map((it) => ({ ...it, thumbnailDataUrl: undefined }));
    serialized = JSON.stringify({ items });
  }
  if (serialized.length > MAX_JSON_BYTES) {
    return NextResponse.json(
      { error: "Listing too large to publish. Try fewer items or shorter notes." },
      { status: 413 },
    );
  }

  const id = makeId();
  const payload: InvitePayload = {
    id,
    createdAt: new Date().toISOString(),
    items: items.map((it, idx) => ({
      ...it,
      id: it.id || `item_${idx + 1}`,
    })),
  };

  await saveInvite(payload);

  const saved = await getInvite(id);
  if (!saved) return NextResponse.json({ error: "Failed to save invite" }, { status: 500 });

  return NextResponse.json({ id, url: `/invite/${id}` });
}

