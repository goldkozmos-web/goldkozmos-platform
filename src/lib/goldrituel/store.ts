export type RitualNote = {
  slug: string;
  body: string;
  updatedAt: string;
};

export type RitualPractice = {
  slug: string;
  at: string;
};

export type RitualStore = {
  saved: string[];
  practiced: RitualPractice[];
  notes: RitualNote[];
};

const EMPTY: RitualStore = { saved: [], practiced: [], notes: [] };

function guestKey() {
  return "goldkozmos-goldrituel-guest";
}

export function ritualStoreKey(userId?: string | null) {
  return userId ? `goldkozmos-goldrituel-${userId}` : guestKey();
}

function readRaw(key: string): RitualStore {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<RitualStore>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved.filter((item) => typeof item === "string") : [],
      practiced: Array.isArray(parsed.practiced)
        ? parsed.practiced.filter(
            (item): item is RitualPractice =>
              Boolean(item) && typeof item.slug === "string" && typeof item.at === "string",
          )
        : [],
      notes: Array.isArray(parsed.notes)
        ? parsed.notes.filter(
            (item): item is RitualNote =>
              Boolean(item) && typeof item.slug === "string" && typeof item.body === "string",
          )
        : [],
    };
  } catch {
    return { ...EMPTY };
  }
}

function writeRaw(key: string, store: RitualStore) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(store));
  } catch {
    // Ignore private-mode storage errors.
  }
}

export function readRitualStore(userId?: string | null): RitualStore {
  const own = readRaw(ritualStoreKey(userId));
  if (userId) {
    const guest = readRaw(guestKey());
    return mergeStores(own, guest);
  }
  return own;
}

function mergeStores(primary: RitualStore, extra: RitualStore): RitualStore {
  const saved = [...new Set([...primary.saved, ...extra.saved])];
  const practicedMap = new Map<string, RitualPractice>();
  [...extra.practiced, ...primary.practiced].forEach((item) => practicedMap.set(item.slug, item));
  const notesMap = new Map<string, RitualNote>();
  [...extra.notes, ...primary.notes].forEach((item) => notesMap.set(item.slug, item));
  return {
    saved,
    practiced: [...practicedMap.values()].sort((a, b) => b.at.localeCompare(a.at)),
    notes: [...notesMap.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  };
}

export function writeRitualStore(store: RitualStore, userId?: string | null) {
  writeRaw(ritualStoreKey(userId), store);
}

export function toggleSavedSlug(slug: string, userId?: string | null) {
  const store = readRitualStore(userId);
  const saved = store.saved.includes(slug)
    ? store.saved.filter((item) => item !== slug)
    : [slug, ...store.saved];
  const next = { ...store, saved };
  writeRitualStore(next, userId);
  return next;
}

export function markPracticed(slug: string, userId?: string | null) {
  const store = readRitualStore(userId);
  const practiced = [
    { slug, at: new Date().toISOString() },
    ...store.practiced.filter((item) => item.slug !== slug),
  ];
  const next = { ...store, practiced };
  writeRitualStore(next, userId);
  return next;
}

export function saveRitualNote(slug: string, body: string, userId?: string | null) {
  const store = readRitualStore(userId);
  const trimmed = body.trim();
  const notes = trimmed
    ? [
        { slug, body: trimmed, updatedAt: new Date().toISOString() },
        ...store.notes.filter((item) => item.slug !== slug),
      ]
    : store.notes.filter((item) => item.slug !== slug);
  const next = { ...store, notes };
  writeRitualStore(next, userId);
  return next;
}
