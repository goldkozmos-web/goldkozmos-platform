import { NextResponse } from "next/server";

import { isSiteAdminEmail } from "@/lib/admin/access";
import { resolveAdminRequest } from "@/lib/admin/auth.server";
import { REMOVED_MEMBERS_POST, removedMemberContent } from "@/lib/admin/members";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { access, client } = await resolveAdminRequest(request);

  if (access.status !== "ok" || !client) {
    return NextResponse.json({ error: "Üyeleri görmek için admin olmalısın." }, { status: 401 });
  }

  let raw: {
    sync?: unknown;
    remove?: { email?: unknown; id?: unknown };
  } = {};
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (raw.sync === true) {
    await client.rpc("ensure_own_membership");
    await client.rpc("sync_site_members");
    return NextResponse.json({ ok: true });
  }

  const email = String(raw.remove?.email ?? "").trim().toLowerCase();
  const id = String(raw.remove?.id ?? "").trim();
  if (raw.remove && email) {
    if (isSiteAdminEmail(email)) {
      return NextResponse.json({ error: "Yönetici çıkarılamaz." }, { status: 400 });
    }

    const { error } = await client.from("comments").insert({
      post_id: REMOVED_MEMBERS_POST,
      user_id: access.actor.id,
      content: removedMemberContent(email, id),
    });
    if (error) {
      return NextResponse.json({ error: "Üye çıkarılamadı. Tekrar dene." }, { status: 400 });
    }

    await client.from("site_members").delete().eq("email", email);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { error: "Üyeler Google ile girince kaydolur." },
    { status: 400 },
  );
}