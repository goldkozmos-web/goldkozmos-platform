import { NextResponse } from "next/server";

import {
  countGoldBlogComments,
  createGoldBlogComment,
  listGoldBlogComments,
} from "../../../../lib/goldblog/comments";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId")?.trim() ?? "";

  if (!postId) {
    return NextResponse.json(
      { error: "Yazı belirtilmedi." },
      { status: 400 },
    );
  }

  const result = await listGoldBlogComments(postId);

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({
    comments: result.comments,
    viewer: result.actor,
  });
}

export async function POST(request: Request) {
  let body: { postId?: unknown; content?: unknown; parentCommentId?: unknown } =
    {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const postId = typeof body.postId === "string" ? body.postId.trim() : "";
  const parentCommentId =
    typeof body.parentCommentId === "string" ? body.parentCommentId : null;
  const result = await createGoldBlogComment(
    postId,
    body.content,
    parentCommentId,
  );

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  const counts = await countGoldBlogComments([postId]);

  return NextResponse.json({
    comment: result.comment,
    count:
      "counts" in counts && counts.counts
        ? (counts.counts[postId] ?? 1)
        : 1,
  });
}
