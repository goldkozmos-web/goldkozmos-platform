import type { ProfilimJournalEntry, ProfilimLetter } from "./types";
import type { ReminderItem } from "../daily/types";

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, items: T[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore private-mode storage errors.
  }
}

export function journalStorageKey(userId: string) {
  return `goldkozmos-profilim-journal-${userId}`;
}

export function letterStorageKey(userId: string) {
  return `goldkozmos-profilim-letters-${userId}`;
}

export function todoStorageKey(userId: string) {
  return `goldkozmos-profilim-todos-${userId}`;
}

export function todayNeedStorageKey(userId: string) {
  return `goldkozmos-profilim-today-need-${userId}`;
}

export function readJournalEntries(userId: string) {
  return readList<ProfilimJournalEntry>(journalStorageKey(userId));
}

export function writeJournalEntries(
  userId: string,
  items: ProfilimJournalEntry[],
) {
  writeList(journalStorageKey(userId), items);
}

export function readLetters(userId: string) {
  return readList<ProfilimLetter>(letterStorageKey(userId));
}

export function writeLetters(userId: string, items: ProfilimLetter[]) {
  writeList(letterStorageKey(userId), items);
}

export function readTodayNeedChoice(userId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(todayNeedStorageKey(userId)) ?? "";
  } catch {
    return "";
  }
}

export function writeTodayNeedChoice(userId: string, choiceId: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(todayNeedStorageKey(userId), choiceId);
  } catch {
    // Ignore private-mode storage errors.
  }
}

export function readTodos(userId: string) {
  if (!userId) return [];
  return readList<ReminderItem>(todoStorageKey(userId)).filter(
    (item) => item && typeof item.id === "string" && typeof item.title === "string",
  );
}

export function writeTodos(userId: string, items: ReminderItem[]) {
  if (!userId) return;
  writeList(todoStorageKey(userId), items.slice(0, 200));
}
