import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { groupService, registrationCookie, tokenHash } from "../../../../../lib/group-events/server";
import { groupTrackingPath, REGISTRATION_ID, REGISTRATION_TOKEN } from "../../../../../lib/group-events/tracking";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!REGISTRATION_ID.test(id)) return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404, headers });
  const authorization = request.headers.get("Authorization");
  const token = authorization === null
    ? (await cookies()).get(registrationCookie(id))?.value
    : /^Bearer ([A-Za-z0-9_-]{43})$/.exec(authorization)?.[1];
  if (!token || !REGISTRATION_TOKEN.test(token)) return NextResponse.json({ error: "Bu kaydı görüntüleyemiyorsun." }, { status: 401, headers });
  try {
    const { data, error } = await groupService().rpc("group_event_tracking_status", { p_id: id, p_token_hash: tokenHash(token) });
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404, headers });
    return NextResponse.json({ ...data, trackingPath: groupTrackingPath(id, token) }, { headers });
  } catch { return NextResponse.json({ error: "Kayıt durumu şu an kontrol edilemiyor." }, { status: 503, headers }); }
}
