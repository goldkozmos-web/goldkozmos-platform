import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import { PHONE_STEP_COOKIE, phoneStepCookieHeader } from "@/lib/auth/phone";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

function aalFromToken(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1] ?? "", "base64").toString("utf8"),
    ) as { aal?: string };
    return String(payload.aal ?? "");
  } catch {
    return "";
  }
}

function recentlyConfirmed(iso: string | null | undefined) {
  if (!iso) return false;
  const at = new Date(iso).getTime();
  return Number.isFinite(at) && Date.now() - at < 10 * 60 * 1000;
}

async function currentAuth() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) return null;
  return data.session;
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

  const aal = aalFromToken(session.access_token);
  const fresh = aal === "aal2" || recentlyConfirmed(session.user.phone_confirmed_at);
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
