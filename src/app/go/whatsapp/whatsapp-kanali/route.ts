import { NextRequest, NextResponse } from "next/server";

import { recordPresence, visitorKeyFromRequest, withVisitorCookie } from "../../../../lib/presence/record";

export async function GET(request: NextRequest) {
  const visitorKey = visitorKeyFromRequest(request);
  const dest =
    "https://www.whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s";

  await recordPresence(request, {
    kind: "whatsapp",
    path: request.nextUrl.pathname,
    referrer: request.headers.get("referer") || "",
    href: dest,
  });

  return withVisitorCookie(
    NextResponse.redirect(new URL(dest), 307),
    visitorKey,
  );
}