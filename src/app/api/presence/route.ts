import { NextRequest } from "next/server";

import {
  parsePresencePayload,
  recordPresence,
} from "../../../lib/presence/record";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  let raw: unknown = null;

  try {
    if (contentType.includes("application/json")) {
      raw = await request.json();
    } else {
      const text = await request.text();
      raw = text ? JSON.parse(text) : null;
    }
  } catch {
    raw = null;
  }

  const payload = parsePresencePayload(raw);
  if (!payload) {
    return Response.json({ ok: false }, { status: 400 });
  }

  return recordPresence(request, payload);
}
