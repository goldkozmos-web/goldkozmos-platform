import { NextResponse } from "next/server";

import {
  isMemberProfileComplete,
  memberDisplayName,
  parseMemberProfile,
} from "@/lib/auth/membership";
import { isSiteAdminEmail } from "@/lib/admin/access";
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

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      first_name: parsed.firstName,
      last_name: parsed.lastName,
      full_name: memberDisplayName(parsed),
      display_name: memberDisplayName(parsed),
      city: parsed.city,
      age: parsed.age,
      interests: parsed.interests.join(","),
      phone: parsed.phone,
      gk_member_complete: true,
      privacy_accepted_at: new Date().toISOString(),
    },
  });

  if (metaError) {
    return NextResponse.json({ ok: false, error: "Kayıt kaydedilemedi. Tekrar dene." }, { status: 400 });
  }

  const displayName = memberDisplayName(parsed);
  await supabase.from("profiles").update({ display_name: displayName }).eq("id", user.id);
  await supabase.rpc("ensure_own_membership");
  await supabase.rpc("save_own_membership_profile", {
    p_first_name: parsed.firstName,
    p_last_name: parsed.lastName,
    p_city: parsed.city,
    p_age: parsed.age,
    p_interests: parsed.interests.join(","),
    p_phone: parsed.phone,
  });

  return NextResponse.json({ ok: true });
}
