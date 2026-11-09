"use client";

import { createSupabaseBrowserClient } from "../supabase/browser";
import type {
  ActionCategory,
  AppNotification,
  DailyAction,
  DailyMessage,
  EmotionJournalEntry,
  ReminderItem,
  UserActivityItem,
} from "./types";

function asText(value: unknown) {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (value == null) return "";
  return String(value);
}

function client() {
  return createSupabaseBrowserClient();
}

export async function fetchEmotionJournal(): Promise<EmotionJournalEntry[]> {
  const supabase = client();
  if (!supabase) return [];

  const { data } = await supabase
    .from("emotion_journal")
    .select(
      "id, primary_emotion, secondary_emotion, intensity, trigger_text, body_area, need_text, note, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(80);

  return (data ?? []).map((row) => ({
    id: asText(row.id),
    primaryEmotion: asText(row.primary_emotion),
    secondaryEmotion: asText(row.secondary_emotion),
    intensity: Number(row.intensity) || 1,
    triggerText: asText(row.trigger_text),
    bodyArea: asText(row.body_area),
    needText: asText(row.need_text),
    note: asText(row.note),
    createdAt: asText(row.created_at),
  }));
}

export async function createEmotionJournal(input: {
  primaryEmotion: string;
  secondaryEmotion: string;
  intensity: number;
  triggerText: string;
  bodyArea: string;
  needText: string;
  note: string;
}) {
  const supabase = client();
  if (!supabase) return { error: "Oturum yok." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısın." };

  const { error } = await supabase.from("emotion_journal").insert({
    user_id: user.id,
    primary_emotion: input.primaryEmotion.trim(),
    secondary_emotion: input.secondaryEmotion.trim(),
    intensity: input.intensity,
    trigger_text: input.triggerText.trim(),
    body_area: input.bodyArea.trim(),
    need_text: input.needText.trim(),
    note: input.note.trim(),
  });

  return { error: error?.message ?? null };
}

export async function fetchTodayMessage(): Promise<DailyMessage | null> {
  const supabase = client();
  if (!supabase) return null;

  const owned = await supabase.rpc("get_today_daily_message");
  let row = Array.isArray(owned.data) ? owned.data[0] : owned.data;
  if (!row) {
    const pub = await supabase.rpc("get_public_daily_message");
    row = Array.isArray(pub.data) ? pub.data[0] : pub.data;
  }
  if (!row) return null;

  return {
    id: asText(row.id),
    body: asText(row.body),
    assignedOn: asText(row.assigned_on),
  };
}

function mapActionRow(row: Record<string, unknown>): DailyAction {
  return {
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    category: asText(row.category) as ActionCategory,
    assignedOn: asText(row.assigned_on ?? row.assignedOn),
    completedAt: asText(row.completed_at ?? row.completedAt) || null,
  };
}

export async function fetchTodayAction(): Promise<DailyAction | null> {
  const supabase = client();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    const api = await fetch("/api/daily/action", { credentials: "same-origin" })
      .then((res) => res.json().catch(() => null))
      .catch(() => null);
    if (api?.signedIn && api?.action) return mapActionRow(api.action);
    return null;
  }

  const { data } = await supabase.rpc("get_today_daily_action");
  const row = Array.isArray(data) ? data[0] : data;
  if (row) return mapActionRow(row as Record<string, unknown>);

  const api = await fetch("/api/daily/action", { credentials: "same-origin" })
    .then((res) => res.json().catch(() => null))
    .catch(() => null);
  if (api?.action) return mapActionRow(api.action);

  const { pickGoldActFallback, istanbulDay } = await import("../../data/goldAct");
  return pickGoldActFallback(session.user.id, istanbulDay());
}

export async function completeTodayAction() {
  const supabase = client();
  if (!supabase) return { error: "Oturum yok.", already: false };

  const { data, error } = await supabase.rpc("complete_today_daily_action");
  if (!error) {
    const row = Array.isArray(data) ? data[0] : data;
    return {
      error: null as string | null,
      already: Boolean(row?.completed_at),
      completedAt: asText(row?.completed_at) || null,
    };
  }

  const api = await fetch("/api/daily/action", {
    method: "POST",
    credentials: "same-origin",
  })
    .then((res) => res.json().catch(() => null))
    .catch(() => null);
  if (api?.completedAt) {
    return {
      error: null as string | null,
      already: Boolean(api.already),
      completedAt: asText(api.completedAt),
    };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    return { error: error.message, already: false };
  }

  const { goldActStorageKey, istanbulDay } = await import("../../data/goldAct");
  const stamp = new Date().toISOString();
  try {
    window.localStorage.setItem(
      goldActStorageKey(session.user.id, istanbulDay()),
      stamp,
    );
  } catch {
    return { error: error.message, already: false };
  }
  return { error: null as string | null, already: false, completedAt: stamp };
}

export async function fetchActivity(): Promise<UserActivityItem[]> {
  const supabase = client();
  if (!supabase) return [];

  const { data } = await supabase
    .from("user_activity")
    .select("id, kind, title, href, created_at")
    .order("created_at", { ascending: false })
    .limit(80);

  return (data ?? []).map((row) => ({
    id: asText(row.id),
    kind: asText(row.kind),
    title: asText(row.title),
    href: asText(row.href) || null,
    createdAt: asText(row.created_at),
  }));
}

export async function fetchNotifications(): Promise<AppNotification[]> {
  const supabase = client();
  if (!supabase) return [];
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.rpc("materialize_due_reminder_notifications");

  const { data, error } = await supabase
    .from("notifications")
    .select("id, title, body, type, link, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(60);

  const inbox = await supabase.from("member_messages").select("id, title, body, created_at, read_at").eq("recipient_id", session.user.id).order("created_at", { ascending: false }).limit(80);
  if (error && error.code !== "PGRST205" && error.code !== "42P01") throw new Error("Bildirimler yüklenemedi. Yeniden deneyebilirsin.");
  if (inbox.error) throw new Error("Mesaj bildirimleri yüklenemedi.");

  const notifications = (data ?? []).map((row) => ({
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    type: asText(row.type),
    link: asText(row.link) || null,
    isRead: Boolean(row.is_read),
    createdAt: asText(row.created_at),
  }));
  return [...notifications, ...(inbox.data ?? []).map((row) => ({ id: `message:${row.id}`, title: asText(row.title), body: asText(row.body), type: "member_message", link: null, isRead: Boolean(row.read_at), createdAt: asText(row.created_at) }))].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function markNotificationRead(id: string) {
  const supabase = client();
  if (!supabase) return;
  if (id.startsWith("message:")) {
    const { error } = await supabase.from("member_messages").update({ read_at: new Date().toISOString() }).eq("id", id.slice(8)).is("read_at", null);
    if (error) throw new Error("Mesaj güncellenemedi.");
    return;
  }
  const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id);
  if (error) throw new Error("Bildirim güncellenemedi.");
}

export async function markAllNotificationsRead() {
  const supabase = client();
  if (!supabase) return;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  const { error } = await supabase.from("notifications").update({ is_read: true }).eq("is_read", false);
  const inbox = await supabase.from("member_messages").update({ read_at: new Date().toISOString() }).eq("recipient_id", session.user.id).is("read_at", null);
  if (inbox.error || (error && error.code !== "PGRST205" && error.code !== "42P01")) throw new Error("Bildirimler güncellenemedi.");
}

export async function fetchReminders(): Promise<ReminderItem[]> {
  const supabase = client();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reminders")
    .select("id, title, note, due_on, due_time, repeat_rule, completed_at, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error("Görevlerin yüklenemedi.");

  return (data ?? []).map((row) => ({
    id: asText(row.id),
    title: asText(row.title),
    note: asText(row.note),
    dueOn: asText(row.due_on) || null,
    dueTime: asText(row.due_time) || null,
    repeatRule: asText(row.repeat_rule) || "none",
    completedAt: asText(row.completed_at) || null,
    createdAt: asText(row.created_at),
  }));
}

function toSqlTime(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length === 5 ? `${trimmed}:00` : trimmed;
}

export async function createReminder(input: {
  id?: string;
  title: string;
  note: string;
  dueOn: string;
  dueTime: string;
  repeatRule: string;
}) {
  const supabase = client();
  if (!supabase) return { error: "Oturum yok." };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return { error: "Giriş yapmalısın." };

  const row: Record<string, string | null> = {
    user_id: user.id,
    title: input.title.trim(),
    note: input.note.trim(),
    due_on: input.dueOn || null,
    due_time: toSqlTime(input.dueTime),
    repeat_rule: input.repeatRule || "none",
  };
  if (input.id) {
    row.id = input.id;
  }

  const { error } = await supabase.from("reminders").insert(row);
  return { error: error?.message ?? null };
}

export async function completeReminder(id: string) {
  const supabase = client();
  if (!supabase) return;
  const result = await supabase
    .from("reminders")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", id)
    .is("completed_at", null);
  if (result.error) throw new Error("Tamamlama kaydedilemedi.");
  window.dispatchEvent(new Event("goldkozmos-profile-activity"));
}

export async function deleteReminder(id: string) {
  const supabase = client();
  if (!supabase) return;
  const result = await supabase.from("reminders").delete().eq("id", id);
  if (result.error) throw new Error("Görev silinemedi.");
}

export async function recordNamedActivity(kind: string, title: string, href?: string) {
  const supabase = client();
  if (!supabase) return;
  await supabase.rpc("record_user_activity", {
    p_kind: kind,
    p_title: title,
    p_href: href ?? null,
    p_payload: {},
  });
  window.dispatchEvent(new Event("goldkozmos-profile-activity"));
}
