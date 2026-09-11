import { NextResponse } from "next/server";

import { appOriginFromUrl, profilimAfterAuthUrl } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const origin = appOriginFromUrl(request.url);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(profilimAfterAuthUrl(origin, true));
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.redirect(profilimAfterAuthUrl(origin, true));
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(profilimAfterAuthUrl(origin, true));
    }
  }

  return NextResponse.redirect(profilimAfterAuthUrl(origin));
}
