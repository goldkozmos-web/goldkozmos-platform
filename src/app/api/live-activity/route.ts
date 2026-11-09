import { createSupabaseAnonClient } from "@/lib/supabase/anon";

export const dynamic = "force-dynamic";

// Publish counts only. Private event rows, identities and locations never leave the server.
export async function GET() {
  const client = createSupabaseAnonClient();
  if (!client) return Response.json({ error: "Akış şu an kullanılamıyor." }, { status: 503 });
  const now = new Date();
  const [{ data, error }, salesResult, membersResult] = await Promise.all([
    client.rpc("public_activity_totals"), client.rpc("public_confirmed_sales"), client.rpc("public_membership_summary"),
  ]);
  if (error || !data) return Response.json({ error: "Akış şu an güncellenemiyor." }, { status: 503 });
  const { online, visitors, whatsapp, appointments, shopier } = data;
  return Response.json({ online, visitors, whatsapp, appointments, shopier, members: membersResult.error ? null : membersResult.data, sales: salesResult.error ? null : salesResult.data, updatedAt: now.toISOString() }, { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=15" } });
}
