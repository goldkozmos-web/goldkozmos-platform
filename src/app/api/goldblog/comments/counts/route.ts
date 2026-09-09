import { NextResponse } from "next/server";

import { countGoldBlogComments } from "@/lib/goldblog/comments";
import { listGoldBlogPostIds } from "@/lib/goldblog/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await countGoldBlogComments(listGoldBlogPostIds());

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error, counts: {} },
      { status: result.status },
    );
  }

  return NextResponse.json({ counts: result.counts ?? {} });
}
