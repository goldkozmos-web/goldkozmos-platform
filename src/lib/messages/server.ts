import { createSupabaseServerClient } from "../supabase/create-server-client";
import { getAdminAccess } from "../admin/auth.server";
import { getProfilimSessionUser } from "../profilim/auth.server";
import { parseMemberMessageInput } from "./validate";
import type { MemberMessage } from "./types";

export type { MemberMessage };

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function mapRow(row: Record<string, unknown>, recipientName?: string): MemberMessage {
  return {
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    createdAt: asText(row.created_at),
    readAt: asText(row.read_at) || null,
    recipientName,
  };
}

export async function listInboxMessages(): Promise<MemberMessage[]> {
  const supabase = await createSupabaseServerClient();
  const user = await getProfilimSessionUser();

  if (!supabase || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("member_messages")
    .select("id, title, body, created_at, read_at")
    .eq("recipient_id", user.id)
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

export async function listSentMessages(): Promise<MemberMessage[]> {
  const access = await getAdminAccess();
  const supabase = await createSupabaseServerClient();

  if (access.status !== "ok" || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("member_messages")
    .select("id, title, body, created_at, read_at, recipient_id, profiles:recipient_id(display_name)")
    .eq("sender_id", access.actor.id)
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data) {
    return [];
  }

  return data.map((row) => {
    const item = row as {
      id: string;
      title: string;
      body: string;
      created_at: string;
      read_at: string | null;
      profiles:
        | { display_name: string | null }
        | { display_name: string | null }[]
        | null;
    };
    const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
    return mapRow(item as unknown as Record<string, unknown>, profile?.display_name?.trim() || "Üye");
  });
}

export async function sendMemberMessage(raw: {
  title?: unknown;
  body?: unknown;
  recipientId?: unknown;
}) {
  const parsed = parseMemberMessageInput(raw);
  if ("error" in parsed) {
    return { error: parsed.error, status: 400 as const };
  }

  const access = await getAdminAccess();
  const supabase = await createSupabaseServerClient();

  if (access.status !== "ok" || !supabase) {
    return { error: "Mesaj göndermek için admin olmalısın.", status: 401 as const };
  }

  let recipientIds: string[] = [];

  if (parsed.recipientId === "all") {
    const roster = await supabase
      .from("site_members")
      .select("auth_user_id")
      .eq("status", "active")
      .not("auth_user_id", "is", null);
    recipientIds = (roster.data ?? [])
      .map((row) =>
        typeof row.auth_user_id === "string" ? row.auth_user_id : "",
      )
      .filter(Boolean);

    if (recipientIds.length === 0) {
      const { data } = await supabase.from("profiles").select("id");
      recipientIds = (data ?? []).map((row) => String(row.id));
    }
  } else {
    recipientIds = [parsed.recipientId];
  }

  if (recipientIds.length === 0) {
    return { error: "Gönderilecek üye yok.", status: 400 as const };
  }

  const rows = recipientIds.map((recipientId) => ({
    sender_id: access.actor.id,
    recipient_id: recipientId,
    title: parsed.title,
    body: parsed.body,
  }));

  const { error } = await supabase.from("member_messages").insert(rows);

  if (error) {
    return {
      error: "Mesaj kaydedilemedi. Supabase’de üye mesaj tablosunu çalıştır.",
      status: 500 as const,
    };
  }

  return { ok: true as const, count: rows.length };
}

export async function markInboxMessageRead(id: string) {
  const supabase = await createSupabaseServerClient();
  const user = await getProfilimSessionUser();

  if (!supabase || !user || !id) {
    return { error: "Giriş gerekli.", status: 401 as const };
  }

  const { error } = await supabase
    .from("member_messages")
    .update({ read_at: new Date().toISOString() })
    .eq("id", id)
    .eq("recipient_id", user.id)
    .is("read_at", null);

  if (error) {
    return { error: "Mesaj güncellenemedi.", status: 500 as const };
  }

  return { ok: true as const };
}
