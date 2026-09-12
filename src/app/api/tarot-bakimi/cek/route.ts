import { NextResponse } from "next/server";

import { drawUniqueCards, topicById } from "@/lib/tarot/reading";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let topic = "";
  try {
    const body = (await request.json()) as { topic?: unknown };
    topic = String(body.topic ?? "");
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!topicById(topic)) {
    return NextResponse.json({ error: "Bir konu seç." }, { status: 400 });
  }

  const cards = drawUniqueCards(3);
  if (cards.length < 3) {
    return NextResponse.json({ error: "Deste hazır değil." }, { status: 500 });
  }

  return NextResponse.json({
    topic,
    cards: cards.map((card) => card.slug),
  });
}
