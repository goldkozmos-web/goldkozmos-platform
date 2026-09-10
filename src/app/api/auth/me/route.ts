import { NextResponse } from "next/server";

import { getGoldBlogSessionUser } from "@/lib/goldblog/session";
import { hasSupabaseConfig } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      configured: false,
      user: null,
    });
  }

  const user = await getGoldBlogSessionUser();

  return NextResponse.json({
    configured: true,
    user,
  });
}
