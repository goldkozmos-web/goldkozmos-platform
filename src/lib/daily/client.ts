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

  const { data } = await supabase.rpc("get_today_daily_message");
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  return {
    id: asText(row.id),
    body: asText(row.body),
    assignedOn: asText(row.assigned_on),
  };
}

export async function fetchTodayAction(): Promise<DailyAction | null> {
  const supabase = client();
  if (!supabase) return null;

  const { data } = await supabase.rpc("get_today_daily_action");
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  return {
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    category: asText(row.category) as ActionCategory,
    assignedOn: asText(row.assigned_on),
    completedAt: asText(row.completed_at) || null,
  };
}

export async function completeTodayAction() {
  const supabase = client();
  if (!supabase) return { error: "Oturum yok.", already: false };

  const { data, error } = await supabase.rpc("complete_today_daily_action");
  if (error) {
    return { error: error.message, already: false };
  }

  const row = Array.isArray(data) ? data[0] : data;
  return {
    error: null as string | null,
    already: Boolean(row?.completed_at),
    completedAt: asText(row?.completed_at) || null,
  };
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

  await supabase.rpc("materialize_due_reminder_notifications");

  const { data } = await supabase
    .from("notifications")
    .select("id, title, body, type, link, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(60);

  return (data ?? []).map((row) => ({
    id: asText(row.id),
    title: asText(row.title),
    body: asText(row.body),
    type: asText(row.type),
    link: asText(row.link) || null,
    isRead: Boolean(row.is_read),
    createdAt: asText(row.created_at),
  }));
}

export async function markNotificationRead(id: string) {
  const supabase = client();
  if (!supabase) return;
  await supabase.from("notifications").update({ is_read: true }).eq("id", id);
}

export async function markAllNotificationsRead() {
  const supabase = client();
  if (!supabase) return;
  await supabase.from("notifications").update({ is_read: true }).eq("is_read", false);
}

export async function fetchReminders(): Promise<ReminderItem[]> {
  const supabase = client();
  if (!supabase) return [];

  const { data } = await supabase
    .from("reminders")
    .select("id, title, note, due_on, due_time, repeat_rule, completed_at, created_at")
    .order("created_at", { ascending: false })
    .limit(80);

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

export async function createReminder(input: {
  title: string;
  note: string;
  dueOn: string;
  dueTime: string;
  repeatRule: string;
}) {
  const supabase = client();
  if (!supabase) return { error: "Oturum yok." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısın." };

  const { error } = await supabase.from("reminders").insert({
    user_id: user.id,
    title: input.title.trim(),
    note: input.note.trim(),
    due_on: input.dueOn || null,
    due_time: input.dueTime || null,
    repeat_rule: input.repeatRule || "none",
  });

  return { error: error?.message ?? null };
}

export async function completeReminder(id: string) {
  const supabase = client();
  if (!supabase) return;
  await supabase
    .from("reminders")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", id)
    .is("completed_at", null);
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
}
