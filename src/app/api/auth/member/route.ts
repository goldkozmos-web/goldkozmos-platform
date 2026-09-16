import { NextResponse } from "next/server";

import { persistSiteMemberFromUser } from "@/lib/admin/persist-member";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

async function currentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user };
}

export async function POST(request: Request) {
  const { user } = await currentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Önce Google ile gir." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const saved = await persistSiteMemberFromUser(user, {
    displayName: typeof body?.displayName === "string" ? body.displayName : undefined,
    city: typeof body?.city === "string" ? body.city : undefined,
    phone: typeof body?.phone === "string" ? body.phone : undefined,
    firstName: typeof body?.firstName === "string" ? body.firstName : undefined,
    lastName: typeof body?.lastName === "string" ? body.lastName : undefined,
    age: typeof body?.age === "string" || typeof body?.age === "number" ? body.age : undefined,
    interests: typeof body?.interests === "string" ? body.interests : undefined,
    profileCompleted: body?.profileCompleted === true,
  });

  if (!saved.ok) {
    return NextResponse.json(
      { ok: false, error: saved.error || "Kayıt düşmedi." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, saved: true });
}
