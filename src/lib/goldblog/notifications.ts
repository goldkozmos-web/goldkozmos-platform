import { createSupabaseServerClient } from "@/lib/supabase/create-server-client";
import { getGoldBlogSessionUser } from "./session";

export type GoldBlogNotification = {
  id: string;
  postId: string;
  commentId: string;
  excerpt: string;
  createdAt: string;
  readAt: string | null;
  actorName: string;
};

export async function listGoldBlogNotifications() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Bildirimler için giriş yap.", status: 401 as const };
  }

  const { data, error } = await supabase
    .from("comment_notifications")
    .select(
      "id, post_id, comment_id, excerpt, created_at, read_at, profiles:actor_id(display_name)",
    )
    .eq("recipient_id", actor.id)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return { error: "Bildirimler yüklenemedi.", status: 500 as const };
  }

  const notifications: GoldBlogNotification[] = (data ?? []).map((row) => {
    const item = row as {
      id: string;
      post_id: string;
      comment_id: string;
      excerpt: string;
      created_at: string;
      read_at: string | null;
      actor:
        | { display_name: string | null }
        | { display_name: string | null }[]
        | null;
      profiles:
        | { display_name: string | null }
        | { display_name: string | null }[]
        | null;
    };

    const actorProfile = Array.isArray(item.profiles)
      ? item.profiles[0]
      : item.profiles;

    return {
      id: item.id,
      postId: item.post_id,
      commentId: item.comment_id,
      excerpt: item.excerpt,
      createdAt: item.created_at,
      readAt: item.read_at,
      actorName: actorProfile?.display_name?.trim() || "Birisi",
    };
  });

  return { notifications };
}

export async function markGoldBlogNotificationsRead() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { error: "Yorum altyapısı henüz bağlanmadı.", status: 503 as const };
  }

  const actor = await getGoldBlogSessionUser();

  if (!actor) {
    return { error: "Bildirimler için giriş yap.", status: 401 as const };
  }

  const { error } = await supabase
    .from("comment_notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("recipient_id", actor.id)
    .is("read_at", null);

  if (error) {
    return { error: "Bildirimler güncellenemedi.", status: 500 as const };
  }

  return { ok: true as const };
}
