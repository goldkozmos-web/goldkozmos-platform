import { NextResponse } from "next/server";

import {
  listInboxMessages,
  sendMemberMessage,
} from "../../../lib/messages/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const messages = await listInboxMessages();
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  let raw: { title?: unknown; body?: unknown; recipientId?: unknown } = {};

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const result = await sendMemberMessage(raw);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, count: result.count });
}
