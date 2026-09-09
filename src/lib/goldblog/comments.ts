import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import {
  COMMENT_COOLDOWN_MS,
  canDeleteComment,
  canEditComment,
  canReplyToParent,
  validateCommentContent,
} from "./commentValidation";
import { isGoldBlogPostId } from "./posts";
import {
  getGoldBlogSessionUser,
  type GoldBlogSessionUser,
} from "./session";

export type GoldBlogComment = {
  id: string;
  postId: string;
  userId: string;
  parentCommentId: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  avatarUrl: string | null;
  likeCount: number;
  likedByMe: boolean;
  canEdit: boolean;
  canDelete: boolean;
  replies: GoldBlogComment[];
};

type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  profiles:
    | {
        display_name: string | null;
        avatar_url: string | null;
      }
    | {
        display_name: string | null;
        avatar_url: string | null;
      }[]
    | null;
};

const COMMENT_SELECT =
  "id, post_id, user_id, parent_comment_id, content, created_at, updated_at, profiles(display_name, avatar_url)";

function profileFields(row: CommentRow) {
  if (Array.isArray(row.profiles)) {
    return row.profiles[0] ?? null;
  }

  return row.profiles;
}

function mapComment(
  row: CommentRow,
  actor: GoldBlogSessionUser | null,
  likeCount: number,
  likedByMe: boolean,
  replies: GoldBlogComment[] = [],
): GoldBlogComment {
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    parentCommentId: row.parent_comment_id ?? null,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    displayName: profileFields(row)?.display_name?.trim() || "GoldKozmos",
    avatarUrl: profileFields(row)?.avatar_url ?? null,
    likeCount,
    likedByMe,
    canEdit: actor ? canEditComment(actor.id, row.user_id) : false,
    canDelete: actor
      ? canDeleteComment(actor.id, row.user_id, actor.isAdmin)
      : false,
    replies,
  };
}

async function loadLikeState(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  commentIds: string[],
  actorId: string | null,
) {
  const likeCount = new Map<string, number>();
  const likedByMe = new Set<string>();

  if (commentIds.length === 0) {
    return { likeCount, likedByMe };
  }

  const { data } = await supabase
    .from("comment_likes")
    .select("comment_id, user_id")
    .in("comment_id", commentIds);

  for (const row of data ?? []) {
    const commentId = (row as { comment_id: string; user_id: string }).comment_id;
    likeCount.set(commentId, (likeCount.get(commentId) ?? 0) + 1);

    if (actorId && (row as { user_id: string }).user_id === actorId) {
      likedByMe.add(commentId);
    }
  }

  return { likeCount, likedByMe };
}

function assembleTree(
  rows: CommentRow[],
  actor: GoldBlogSessionUser | null,
  likeCount: Map<string, number>,
  likedByMe: Set<string>,
) {
  const mapped = rows.map((row) =>
    mapComment(
      row,
      actor,
      likeCount.get(row.id) ?? 0,
      likedByMe.has(row.id),
    ),
  );

  const roots = mapped.filter((item) => item.parentCommentId === null);
  const rootIds = new Set(roots.map((item) => item.id));

  for (const item of mapped) {
    if (!item.parentCommentId || !rootIds.has(item.parentCommentId)) {
      continue;
    }

    const parent = roots.find((root) => root.id === item.parentCommentId);

    parent?.replies.push(item);
  }

  for (const root of roots) {
    root.replies.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  roots.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return roots;
}

export async function listGoldBlogComments(postId: string) {
  if (!isGoldBlogPostId(postId)) {
    return { error: "Yazı bulunamadı.", status: 404 as const };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  const { data, error } = await supabase
    .from("comments")
    .select(COMMENT_SELECT)
    .eq("post_id", postId);

  if (error) {
    return { error: "Yorumlar yüklenemedi.", status: 500 as const };
  }

  const rows = (data ?? []) as unknown as CommentRow[];
  const likes = await loadLikeState(
    supabase,
    rows.map((row) => row.id),
    actor?.id ?? null,
  );

  return {
    comments: assembleTree(rows, actor, likes.likeCount, likes.likedByMe),
    actor,
  };
}

export async function countGoldBlogComments(postIds?: string[]) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  let query = supabase.from("comments").select("post_id");

  if (postIds && postIds.length > 0) {
    query = query.in("post_id", postIds.filter(isGoldBlogPostId));
  }

  const { data, error } = await query;

  if (error) {
    return { error: "Yorum sayıları yüklenemedi.", status: 500 as const };
  }

  const counts: Record<string, number> = {};

  for (const row of data ?? []) {
    const postId = (row as { post_id: string }).post_id;
    counts[postId] = (counts[postId] ?? 0) + 1;
  }

  return { counts };
}

export async function createGoldBlogComment(
  postId: string,
  rawContent: unknown,
  parentCommentId?: string | null,
) {
  if (!isGoldBlogPostId(postId)) {
    return { error: "Yazı bulunamadı.", status: 404 as const };
  }

  const parsed = validateCommentContent(rawContent);

  if (!parsed.ok) {
    return { error: parsed.error, status: 400 as const };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Yorum yapmak için hesabına giriş yap.", status: 401 as const };
  }

  let parentId: string | null = null;

  if (typeof parentCommentId === "string" && parentCommentId.trim()) {
    const { data: parent, error: parentError } = await supabase
      .from("comments")
      .select("id, post_id, parent_comment_id")
      .eq("id", parentCommentId.trim())
      .maybeSingle();

    if (parentError || !parent || parent.post_id !== postId) {
      return { error: "Yanıtlanacak yorum bulunamadı.", status: 404 as const };
    }

    if (!canReplyToParent(parent.parent_comment_id)) {
      return { error: "Yanıtlara tekrar yanıt verilemez.", status: 400 as const };
    }

    parentId = parent.id;
  }

  const { data: latest } = await supabase
    .from("comments")
    .select("created_at")
    .eq("user_id", actor.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latest?.created_at) {
    const elapsed = Date.now() - new Date(latest.created_at).getTime();

    if (elapsed < COMMENT_COOLDOWN_MS) {
      return {
        error: "Lütfen yeni yorum için kısa bir süre bekle.",
        status: 429 as const,
      };
    }
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      user_id: actor.id,
      parent_comment_id: parentId,
      content: parsed.content,
    })
    .select(COMMENT_SELECT)
    .single();

  if (error || !data) {
    return { error: "Yorum kaydedilemedi.", status: 500 as const };
  }

  return {
    comment: mapComment(data as unknown as CommentRow, actor, 0, false),
  };
}

export async function updateGoldBlogComment(id: string, rawContent: unknown) {
  const parsed = validateCommentContent(rawContent);

  if (!parsed.ok) {
    return { error: parsed.error, status: 400 as const };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Yorum yapmak için hesabına giriş yap.", status: 401 as const };
  }

  const { data: existing, error: loadError } = await supabase
    .from("comments")
    .select("id, user_id")
    .eq("id", id)
    .maybeSingle();

  if (loadError || !existing) {
    return { error: "Yorum bulunamadı.", status: 404 as const };
  }

  if (!canEditComment(actor.id, existing.user_id)) {
    return { error: "Bu yorumu düzenleyemezsin.", status: 403 as const };
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: parsed.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", actor.id)
    .select(COMMENT_SELECT)
    .single();

  if (error || !data) {
    return { error: "Yorum güncellenemedi.", status: 500 as const };
  }

  const likes = await loadLikeState(supabase, [id], actor.id);

  return {
    comment: mapComment(
      data as unknown as CommentRow,
      actor,
      likes.likeCount.get(id) ?? 0,
      likes.likedByMe.has(id),
    ),
  };
}

export async function deleteGoldBlogComment(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Yorum silmek için hesabına giriş yap.", status: 401 as const };
  }

  const { data: existing, error: loadError } = await supabase
    .from("comments")
    .select("id, user_id, post_id")
    .eq("id", id)
    .maybeSingle();

  if (loadError || !existing) {
    return { error: "Yorum bulunamadı.", status: 404 as const };
  }

  if (!canDeleteComment(actor.id, existing.user_id, actor.isAdmin)) {
    return { error: "Bu yorumu silemezsin.", status: 403 as const };
  }

  let query = supabase.from("comments").delete().eq("id", id);

  if (!actor.isAdmin) {
    query = query.eq("user_id", actor.id);
  }

  const { error } = await query;

  if (error) {
    return { error: "Yorum silinemedi.", status: 500 as const };
  }

  return { ok: true as const, postId: existing.post_id as string };
}

export async function toggleGoldBlogCommentLike(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Beğenmek için hesabına giriş yap.", status: 401 as const };
  }

  const { data: existing, error: loadError } = await supabase
    .from("comments")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (loadError || !existing) {
    return { error: "Yorum bulunamadı.", status: 404 as const };
  }

  const { data: like } = await supabase
    .from("comment_likes")
    .select("comment_id")
    .eq("comment_id", id)
    .eq("user_id", actor.id)
    .maybeSingle();

  if (like) {
    const { error } = await supabase
      .from("comment_likes")
      .delete()
      .eq("comment_id", id)
      .eq("user_id", actor.id);

    if (error) {
      return { error: "Beğeni kaldırılamadı.", status: 500 as const };
    }
  } else {
    const { error } = await supabase.from("comment_likes").insert({
      comment_id: id,
      user_id: actor.id,
    });

    if (error) {
      return { error: "Beğeni kaydedilemedi.", status: 500 as const };
    }
  }

  const likes = await loadLikeState(supabase, [id], actor.id);

  return {
    likedByMe: likes.likedByMe.has(id),
    likeCount: likes.likeCount.get(id) ?? 0,
  };
}
