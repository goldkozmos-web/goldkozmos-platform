import { NextResponse } from "next/server";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { modules, validateData, type Kind } from "@/lib/panel/model";
export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie, Authorization",
};
const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers });
export async function GET(request: Request) {
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client)
    return json({ error: "Yönetici girişi gerekli." }, 401);
  let records: unknown[] = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await client
      .from("panel_records")
      .select("*")
      .eq("owner_id", access.actor.id)
      .order("id")
      .range(offset, offset + 999);
    if (error)
      return json(
        {
          error:
            "Panel veritabanına ulaşılamadı. Kurulum veya bağlantı kontrol edilmeli.",
        },
        503,
      );
    records = records.concat(data);
    if (data.length < 1000) break;
    if (offset >= 49000)
      return json(
        { error: "Kayıt sınırı aşıldı; veri sayfalaması gerekli." },
        503,
      );
  }
  return json({ records });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return json({ error: "İstek kaynağı doğrulanamadı." }, 403);
  const { access, client } = await resolveAdminRequest(request);
  if (access.status !== "ok" || !client)
    return json({ error: "Yönetici girişi gerekli." }, 401);
  try {
    const text = await request.text();
    if (text.length > 100000) return json({ error: "Kayıt çok büyük." }, 413);
    const input = JSON.parse(text);
    const kind = input.kind as Kind;
    if (!Object.hasOwn(modules, kind))
      return json({ error: "Bölüm geçersiz." }, 400);
    if (input.id && !/^[0-9a-f-]{36}$/i.test(input.id))
      return json({ error: "Kayıt geçersiz." }, 400);
    const mutation = input.action || "save";
    if (!["save", "trash", "restore"].includes(mutation))
      return json({ error: "İşlem geçersiz." }, 400);
    if (mutation !== "save" && !input.id)
      return json({ error: "Kayıt gerekli." }, 400);
    const data =
      mutation === "save" ? validateData(kind, input.data) : undefined;
    if (input.id) {
      if (!Number.isInteger(input.version) || input.version < 1)
        return json({ error: "Kayıt sürümü gerekli." }, 400);
      const patch =
        mutation === "save"
          ? { data }
          : {
              deleted_at:
                mutation === "trash" ? new Date().toISOString() : null,
            };
      const { data: row, error } = await client
        .from("panel_records")
        .update(patch)
        .eq("id", input.id)
        .eq("kind", kind)
        .eq("owner_id", access.actor.id)
        .eq("version", input.version)
        .select()
        .maybeSingle();
      if (error)
        return json(
          {
            error:
              "Kaydedilemedi. Bağlı danışan kayıtlarını ve bağlantıyı kontrol et.",
          },
          400,
        );
      if (!row)
        return json(
          {
            error:
              "Bu kayıt başka bir ekranda değişti. Listeyi yenileyip tekrar dene.",
          },
          409,
        );
      return json({ record: row });
    }
    const { data: row, error } = await client
      .from("panel_records")
      .insert({ owner_id: access.actor.id, kind, data })
      .select()
      .single();
    if (error)
      return json(
        { error: "Kayıt eklenemedi. Veritabanı bağlantısını kontrol et." },
        503,
      );
    return json({ record: row });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Geçersiz kayıt." },
      400,
    );
  }
}
