import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { groupService, registrationCookie, tokenHash } from "../../../../../lib/group-events/server";

export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  const token = (await cookies()).get(registrationCookie(id))?.value;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return NextResponse.json({ error: "Bu kaydı görüntüleyemiyorsun." }, { status: 401 });
  try {
    const { data, error } = await groupService().from("group_event_registrations").select("event_title,payment_status,approved_at,confirmation_sent_at").eq("id", id).eq("access_token_hash", tokenHash(token)).maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
    // No personal fields or meeting URL in the browser response, even after payment.
    return NextResponse.json({ eventTitle: data.event_title, paymentStatus: data.payment_status, approved: !!data.approved_at, confirmationSent: !!data.confirmation_sent_at }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ error: "Kayıt durumu şu an kontrol edilemiyor." }, { status: 503 }); }
}
