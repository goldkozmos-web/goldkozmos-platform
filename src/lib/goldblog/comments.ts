import { createSupabaseServerClient } from "../supabase/server";
import {
  COMMENT_COOLDOWN_MS,
  canDeleteComment,
  canEditComment,
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
  content: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  avatarUrl: string | null;
  canEdit: boolean;
  canDelete: boolean;
};

type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
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

function profileFields(row: CommentRow) {
  if (Array.isArray(row.profiles)) {
    return row.profiles[0] ?? null;
  }

  return row.profiles;
}

function mapComment(
  row: CommentRow,
  actor: GoldBlogSessionUser | null,
): GoldBlogComment {
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    displayName: profileFields(row)?.display_name?.trim() || "GoldKozmos",
    avatarUrl: profileFields(row)?.avatar_url ?? null,
    canEdit: actor ? canEditComment(actor.id, row.user_id) : false,
    canDelete: actor
      ? canDeleteComment(actor.id, row.user_id, actor.isAdmin)
      : false,
  };
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
    .select(
      "id, post_id, user_id, content, created_at, updated_at, profiles(display_name, avatar_url)",
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: "Yorumlar yüklenemedi.", status: 500 as const };
  }

  const comments = ((data ?? []) as unknown as CommentRow[]).map((row) =>
    mapComment(row, actor),
  );

  return { comments, actor };
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

export async function createGoldBlogComment(postId: string, rawContent: unknown) {
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
      content: parsed.content,
    })
    .select(
      "id, post_id, user_id, content, created_at, updated_at, profiles(display_name, avatar_url)",
    )
    .single();

  if (error || !data) {
    return { error: "Yorum kaydedilemedi.", status: 500 as const };
  }

  return { comment: mapComment(data as unknown as CommentRow, actor) };
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
    .select(
      "id, post_id, user_id, content, created_at, updated_at, profiles(display_name, avatar_url)",
    )
    .single();

  if (error || !data) {
    return { error: "Yorum güncellenemedi.", status: 500 as const };
  }

  return { comment: mapComment(data as unknown as CommentRow, actor) };
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
    .select("id, user_id")
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

  return { ok: true as const };
}
