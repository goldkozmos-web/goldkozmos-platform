import { NextResponse } from "next/server";
import { readLimitedBody, reconcileOrder } from "../../../../../lib/group-events/server";
import { verifyShopierSignature } from "../../../../../lib/group-events/payment";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.SHOPIER_WEBHOOK_TOKEN;
  if (!secret || !process.env.SHOPIER_PAT) return NextResponse.json({ error: "Ödeme doğrulaması yapılandırılmadı." }, { status: 503 });
  let body: string;
  try { body = await readLimitedBody(request, 128_000); } catch { return new NextResponse("Invalid payload", { status: 413 }); }
  if (!verifyShopierSignature(body, request.headers.get("shopier-signature"), secret)) return new NextResponse("Invalid signature", { status: 401 });
  // Do not trust an unsigned event name to mark paid. The order is fetched again via PAT.
  if (request.headers.get("shopier-event") !== "order.created") return new NextResponse("Ignored", { status: 200 });
  let id: unknown;
  try { id = (JSON.parse(body) as { id?: unknown }).id; } catch { return new NextResponse("Invalid JSON", { status: 400 }); }
  if (typeof id !== "string" || !/^[0-9]{1,30}$/.test(id)) return new NextResponse("Invalid order", { status: 400 });
  try { await reconcileOrder(id); return new NextResponse("OK", { status: 200 }); }
  catch { return new NextResponse("Retry", { status: 503 }); }
}
