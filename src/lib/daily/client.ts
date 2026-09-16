"use client";

import { createSupabaseBrowserClient } from "../supabase/browser";
import { recoverMissingTable } from "../platform/ensureSchema";
import { istanbulDay, goldActStorageKey, pickGoldActFallback } from "../../data/goldAct";
import { goldActFromApi, mapGoldActRow } from "./goldact-state";
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
  return (
    mapGoldActRow(row) ?? {
      id: asText(row.id),
      title: asText(row.title),
      body: asText(row.body),
      category: asText(row.category) as ActionCategory,
      assignedOn: asText(row.assigned_on ?? row.assignedOn),
      completedAt: asText(row.completed_at ?? row.completedAt) || null,
    }
  );
}

export async function fetchGoldActState(): Promise<{
  signedIn: boolean;
  action: DailyAction | null;
}> {
  const supabase = client();
  let userId = "";
  if (supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    userId = session?.user?.id ?? "";
  }

  const api = goldActFromApi(
    await fetch("/api/daily/action", { credentials: "same-origin" })
      .then((res) => res.json().catch(() => null))
      .catch(() => null),
  );
  if (api.userId) userId = api.userId;

  const signedIn = Boolean(userId) || api.signedIn;
  if (!signedIn) return { signedIn: false, action: null };

  if (supabase && userId) {
    const { data } = await supabase.rpc("get_today_daily_action");
    const row = Array.isArray(data) ? data[0] : data;
    if (row) return { signedIn: true, action: mapActionRow(row as Record<string, unknown>) };
  }

  if (api.action) return { signedIn: true, action: api.action };
  return {
    signedIn: true,
    action: userId ? pickGoldActFallback(userId, istanbulDay()) : null,
  };
}

export async function fetchTodayAction(): Promise<DailyAction | null> {
  const state = await fetchGoldActState();
  return state.action;
}

export async function completeTodayAction() {
  const before = await fetchTodayAction();
  const wasDone = Boolean(before?.completedAt);
  const supabase = client();

  if (supabase) {
    const { data, error } = await supabase.rpc("complete_today_daily_action");
    if (!error) {
      const row = Array.isArray(data) ? data[0] : data;
      const completedAt = asText(row?.completed_at) || new Date().toISOString();
      return {
        error: null as string | null,
        already: wasDone,
        completedAt,
      };
    }
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
      already: Boolean(api.already) || wasDone,
      completedAt: asText(api.completedAt),
    };
  }

  if (before?.id?.startsWith("local-") && typeof window !== "undefined") {
    const {
      data: { session },
    } = supabase
      ? await supabase.auth.getSession()
      : { data: { session: null } };
    const userId = session?.user?.id;
    if (userId) {
      const completedAt = new Date().toISOString();
      try {
        window.localStorage.setItem(goldActStorageKey(userId, istanbulDay()), completedAt);
      } catch {
        /* ignore */
      }
      return { error: null as string | null, already: wasDone, completedAt };
    }
  }

  return {
    error: api?.error || "Görev kaydedilemedi. Tekrar dene.",
    already: wasDone,
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
    .limit(200);

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

  let { error } = await supabase.from("reminders").insert(row);
  if (error && (await recoverMissingTable(error.message))) {
    ({ error } = await supabase.from("reminders").insert(row));
  }
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

export async function deleteReminder(id: string) {
  const supabase = client();
  if (!supabase) return;
  await supabase.from("reminders").delete().eq("id", id);
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
