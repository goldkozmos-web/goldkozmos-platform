import { NextResponse } from "next/server";

import {
  listGoldBlogNotifications,
  markGoldBlogNotificationsRead,
} from "@/lib/goldblog/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await listGoldBlogNotifications();

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error, notifications: [] },
      { status: result.status },
    );
  }

  return NextResponse.json({
    notifications: result.notifications ?? [],
  });
}

export async function POST() {
  const result = await markGoldBlogNotificationsRead();

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
