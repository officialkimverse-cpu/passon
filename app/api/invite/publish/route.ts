import { NextResponse } from "next/server";
import { getInvite, saveInvite, type InviteItem, type InvitePayload } from "@/lib/inviteStore";

type PublishRequest = {
  items: InviteItem[];
};

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

  const id = makeId();
  const payload: InvitePayload = {
    id,
    createdAt: new Date().toISOString(),
    items: body.items.map((it, idx) => ({
      ...it,
      id: it.id || `item_${idx + 1}`,
    })),
  };

  saveInvite(payload);

  // sanity read
  const saved = getInvite(id);
  if (!saved) return NextResponse.json({ error: "Failed to save invite" }, { status: 500 });

  return NextResponse.json({ id, url: `/invite/${id}` });
}

