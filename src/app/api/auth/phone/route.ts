import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import {
  PHONE_STEP_COOKIE,
  accessTokenHasFreshPhone,
  phoneStepCookieHeader,
} from "@/lib/auth/phone";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

function recentlyConfirmed(iso: string | null | undefined) {
  if (!iso) return false;
  const at = new Date(iso).getTime();
  return Number.isFinite(at) && Date.now() - at < 10 * 60 * 1000;
}

async function currentAuth() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: userPack } = await supabase.auth.getUser();
  if (!userPack.user) return null;
  const { data: sessionPack } = await supabase.auth.getSession();
  if (!sessionPack.session) return null;
  return { ...sessionPack.session, user: userPack.user };
}

export async function GET() {
  const session = await currentAuth();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(PHONE_STEP_COOKIE)?.value;

  return NextResponse.json({
    ok: cookie === session.user.id,
    phone: session.user.phone ?? null,
  });
}

export async function POST() {
  const session = await currentAuth();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const fresh =
    accessTokenHasFreshPhone(session.access_token) ||
    recentlyConfirmed(session.user.phone_confirmed_at);
  if (!fresh) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const host = (await headers()).get("x-forwarded-host") || (await headers()).get("host");
  const response = NextResponse.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    phoneStepCookieHeader(session.user.id, host?.split(":")[0]),
  );
  return response;
}
