import { createSupabaseAnonClient } from "@/lib/supabase/anon";
export const dynamic = "force-dynamic";
export async function GET() {
  const client = createSupabaseAnonClient();
  if (!client) return Response.json({ error: "Satış bilgileri şu an kullanılamıyor." }, { status: 503 });
  const { data, error } = await client.rpc("public_confirmed_sales");
  if (error || !Array.isArray(data)) return Response.json({ error: "Satış bilgileri şu an güncellenemiyor." }, { status: 503 });
  return Response.json({ sales: data, updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30" } });
}
