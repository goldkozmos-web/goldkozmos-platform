import { NextResponse } from "next/server";

import {
  deleteGoldBlogComment,
  updateGoldBlogComment,
} from "@/lib/goldblog/comments";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: { content?: unknown } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek." },
      { status: 400 },
    );
  }

  const result = await updateGoldBlogComment(id, body.content);

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({ comment: result.comment });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const result = await deleteGoldBlogComment(id);

  if ("error" in result && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
