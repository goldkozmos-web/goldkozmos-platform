import { createSupabaseBrowserClient } from "../supabase/browser";

export type DreamJournalEntry = {
  id: string;
  title: string;
  dreamDate: string;
  dreamText: string;
  spiritualInterpretation: string;
  relatedDreamSlug: string;
  createdAt: string;
  updatedAt: string;
};

function asText(value: unknown) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

function mapRow(row: Record<string, unknown>): DreamJournalEntry {
  return {
    id: asText(row.id),
    title: asText(row.title),
    dreamDate: asText(row.dream_date),
    dreamText: asText(row.dream_text),
    spiritualInterpretation: asText(row.spiritual_interpretation),
    relatedDreamSlug: asText(row.related_dream_slug),
    createdAt: asText(row.created_at),
    updatedAt: asText(row.updated_at),
  };
}

export async function fetchDreamJournal(): Promise<DreamJournalEntry[]> {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("dream_journal_entries")
    .select(
      "id, title, dream_date, dream_text, spiritual_interpretation, related_dream_slug, created_at, updated_at",
    )
    .order("created_at", { ascending: false });
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

export async function updateDreamJournal(
  id: string,
  patch: {
    title?: string;
    dreamDate?: string;
    dreamText?: string;
    spiritualInterpretation?: string;
  },
) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return { error: "Oturum yok." };
  const payload: Record<string, string> = {
    updated_at: new Date().toISOString(),
  };
  if (patch.title !== undefined) payload.title = patch.title;
  if (patch.dreamDate !== undefined) payload.dream_date = patch.dreamDate;
  if (patch.dreamText !== undefined) payload.dream_text = patch.dreamText;
  if (patch.spiritualInterpretation !== undefined) {
    payload.spiritual_interpretation = patch.spiritualInterpretation;
  }
  const { error } = await supabase
    .from("dream_journal_entries")
    .update(payload)
    .eq("id", id);
  return { error: error?.message ?? null };
}

export async function deleteDreamJournal(id: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return { error: "Oturum yok." };
  const { error } = await supabase
    .from("dream_journal_entries")
    .delete()
    .eq("id", id);
  return { error: error?.message ?? null };
}
