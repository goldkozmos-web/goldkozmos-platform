import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

const MIN_DREAM = 80;

function providerKey() {
  return (
    process.env.DREAM_INTERPRET_API_KEY?.trim() ||
    process.env.OPENAI_API_KEY?.trim() ||
    ""
  );
}

export async function POST(request: Request) {
  let raw: { title?: unknown; dreamText?: unknown; relatedSlug?: unknown } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const dreamText = String(raw.dreamText ?? "").trim();
  const title = String(raw.title ?? "").trim();
  const relatedSlug = String(raw.relatedSlug ?? "").trim();

  if (dreamText.length < MIN_DREAM) {
    return NextResponse.json(
      { error: "Yorum için rüyanı daha ayrıntılı yaz." },
      { status: 400 },
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user) {
    return NextResponse.json(
      { error: "Spiritüel yorum için giriş yapmalısın.", ready: false },
      { status: 401 },
    );
  }

  const key = providerKey();
  if (!key) {
    return NextResponse.json({
      ready: false,
      error:
        "Spiritüel yorum sağlayıcısı henüz bağlanmadı. Sunucuya DREAM_INTERPRET_API_KEY veya OPENAI_API_KEY eklendiğinde bu düğme gerçek yorum üretir.",
    });
  }

  const endpoint =
    process.env.DREAM_INTERPRET_API_URL?.trim() ||
    "https://api.openai.com/v1/chat/completions";

  const system = `GoldKozmos rüya yorumcususun. Dilin Türkçe, premium, editoryal ve spiritüel. Sembolik, enerjisel, sezgisel, dönüşüm, yaşam döngüleri, bağlar, yön değişimleri ve içsel farkındalık üzerinden yaz. Psikoloji, travma, terapi, bilinçaltı, zihinsel süreç ifadeleri kullanma. Kesin kehanet verme. "sembolize edebilir", "işaret ediyor olabilir" dili kullan. Yorum uzun olsun: semboller, renkler, kişiler, mekanlar, hayvanlar, nesneler, tekrarlar, hisler, aşk/ilişki, iş-para-yaşam yolu ve dönüşüm temalarını rüyada varsa ele al.`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DREAM_INTERPRET_MODEL?.trim() || "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Başlık: ${title || "Yok"}\nİlgili hazır rüya: ${relatedSlug || "Yok"}\nRüya:\n${dreamText}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ready: false, error: "Yorum sağlayıcısından yanıt alınamadı." },
      { status: 502 },
    );
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
    interpretation?: string;
  };
  const interpretation =
    payload.interpretation?.trim() ||
    payload.choices?.[0]?.message?.content?.trim() ||
    "";

  if (!interpretation) {
    return NextResponse.json(
      { ready: false, error: "Yorum metni boş döndü." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ready: true, interpretation });
}
