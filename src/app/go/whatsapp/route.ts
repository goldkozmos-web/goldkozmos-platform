import { NextRequest, NextResponse } from "next/server";

import { recordPresence, withVisitorCookie, visitorKeyFromRequest } from "../../../lib/presence/record";

export async function GET(request: NextRequest) {
  const visitorKey = visitorKeyFromRequest(request);
  await recordPresence(request, {
    kind: "whatsapp",
    path: request.nextUrl.pathname,
    referrer: request.headers.get("referer") || "",
    href: "https://wa.me/905054722153",
  });

  return withVisitorCookie(
    NextResponse.redirect(new URL("https://wa.me/905054722153"), 307),
    visitorKey,
  );
}