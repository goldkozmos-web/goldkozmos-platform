import { after, NextResponse } from "next/server";
import { sendAdminPush } from "@/lib/admin/push-server";

import {
  isMemberProfileComplete,
  memberDisplayName,
  persistMemberProfile,
  parseMemberProfile,
} from "@/lib/auth/membership";
import { isSiteAdminEmail } from "@/lib/admin/access";
import { recordMemberJoin } from "@/lib/admin/member-log";
import { toE164 } from "@/lib/auth/phone";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

async function currentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user };
}

export async function GET() {
  const { user } = await currentUser();
  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({
    ok: isSiteAdminEmail(user.email) || isMemberProfileComplete(user),
  });
}

export async function POST(request: Request) {
  const { supabase, user } = await currentUser();
  if (!supabase || !user) {
    return NextResponse.json({ ok: false, error: "Önce Google ile gir." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const phone =
    toE164(String(body?.dial ?? "90"), String(body?.phone ?? "")) ||
    String(body?.phone ?? "").replace(/\s/g, "");
  const parsed = parseMemberProfile({ ...(body ?? {}), phone });
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const displayName = memberDisplayName(parsed);
  const saved = await persistMemberProfile(supabase, parsed);
  if (!saved.ok) return NextResponse.json(saved, { status: 503 });
  await recordMemberJoin(
    user,
    {
      displayName,
      city: parsed.city,
      phone: parsed.phone,
    },
    supabase,
  );

  if (!isMemberProfileComplete(user)) after(() => sendAdminPush({ title: "Yeni üye", body: "Yeni bir üye kayıt formunu tamamladı.", url: "/admin/kullanicilar" }).then(() => undefined));
  return NextResponse.json({ ok: true });
}
