import { NextResponse } from "next/server";
import { getInvite } from "@/lib/inviteStore";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const invite = await getInvite(id);
  if (!invite) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(invite);
}

