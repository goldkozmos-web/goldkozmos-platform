import { NextResponse } from "next/server";

import { toggleGoldBlogCommentLike } from "../../../../../../lib/goldblog/comments";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const result = await toggleGoldBlogCommentLike(id);

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({
    likedByMe: result.likedByMe,
    likeCount: result.likeCount,
  });
}
