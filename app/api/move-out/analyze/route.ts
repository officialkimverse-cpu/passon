import { NextResponse } from "next/server";

type ImageInput = {
  mediaType: string;
  base64: string;
};

type AnalyzeRequest = {
  groupId: string;
  images: ImageInput[];
};

function stripDataUrl(data: string) {
  // Accept either raw base64 or `data:image/jpeg;base64,...`
  const idx = data.indexOf("base64,");
  if (idx !== -1) return data.slice(idx + "base64,".length);
  return data;
}

function extractJsonObject(raw: string) {
  let s = raw.trim();

  // Strip Markdown code fences, e.g. ```json ... ```
  if (s.startsWith("```")) {
    s = s.replace(/^```[a-zA-Z0-9_-]*\s*/m, "");
    s = s.replace(/```$/m, "");
    s = s.trim();
  }

  // If there's still surrounding text, extract first {...} block.
  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    s = s.slice(firstBrace, lastBrace + 1);
  }

  return s.trim();
}

export async function POST(req: Request) {
  let body: AnalyzeRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.groupId || !Array.isArray(body.images) || body.images.length === 0) {
    return NextResponse.json({ error: "Missing groupId or images" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

  // Test-mode fallback: no key configured.
  if (!apiKey) {
    return NextResponse.json({
      groupId: body.groupId,
      name: "Untitled item",
      description:
        "Draft generated in test mode (no ANTHROPIC_API_KEY set). Add a key to enable AI auto-fill.",
    });
  }

  const contentBlocks = [
    ...body.images.slice(0, 6).map((img) => ({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
        data: stripDataUrl(img.base64),
      },
    })),
    {
      type: "text",
      text:
        "You are helping an outgoing renter create a listing for items they are leaving behind in a rental. " +
        "Look at the photos (multiple angles of the SAME item group). " +
        "Return a JSON object with keys: name (short), description (1-2 sentences), category (one word), condition (one of: Like New, Good, Fair), marketPrice (number, USD). " +
        "marketPrice should be a realistic low online price for a similar used item (if uncertain, estimate conservatively). " +
        "Do not include any extra keys. Output ONLY valid JSON (no markdown, no code fences).",
    },
  ];

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model,
      max_tokens: 300,
      temperature: 0.2,
      messages: [{ role: "user", content: contentBlocks }],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    return NextResponse.json(
      { error: "Anthropic request failed", status: resp.status, details: text },
      { status: 500 },
    );
  }

  const json = (await resp.json()) as any;
  const textBlock = Array.isArray(json?.content)
    ? json.content.find((b: any) => b?.type === "text")?.text
    : null;

  if (!textBlock || typeof textBlock !== "string") {
    return NextResponse.json({ error: "No text response from model" }, { status: 500 });
  }

  let parsed: any;
  try {
    parsed = JSON.parse(extractJsonObject(textBlock));
  } catch {
    return NextResponse.json(
      { error: "Model did not return valid JSON", raw: textBlock },
      { status: 500 },
    );
  }

  return NextResponse.json({
    groupId: body.groupId,
    name: String(parsed?.name ?? ""),
    description: String(parsed?.description ?? ""),
    category: parsed?.category ? String(parsed.category) : undefined,
    condition: parsed?.condition ? String(parsed.condition) : undefined,
    marketPrice:
      typeof parsed?.marketPrice === "number"
        ? parsed.marketPrice
        : parsed?.marketPrice
          ? Number(parsed.marketPrice) || undefined
          : undefined,
  });
}

