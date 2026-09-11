import { createSupabaseServerClient } from "../supabase/create-server-client";
import { getAdminAccess } from "../admin/auth.server";
import { getProfilimSessionUser } from "../profilim/auth.server";
import {
  encodeSuggestionContent,
  parseSuggestionContent,
  parseSuggestionInput,
  SUGGESTIONS_POST,
  type SiteSuggestion,
} from "./suggestions";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function mapRow(row: Record<string, unknown>): SiteSuggestion {
  const parsed = parseSuggestionContent(asText(row.content));
  const profiles = row.profiles as
    | { display_name?: string | null }
    | { display_name?: string | null }[]
    | null;
  const profile = Array.isArray(profiles) ? profiles[0] : profiles;

  return {
    id: asText(row.id),
    name: asText(profile?.display_name) || "Üye",
    title: parsed.title,
    body: parsed.body,
    createdAt: asText(row.created_at),
  };
}

export async function listSiteSuggestions(): Promise<SiteSuggestion[]> {
  const access = await getAdminAccess();
  const supabase = await createSupabaseServerClient();

  if (access.status !== "ok" || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at, profiles:user_id(display_name)")
    .eq("post_id", SUGGESTIONS_POST)
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
}

export async function createSiteSuggestion(raw: {
  title?: unknown;
  body?: unknown;
}) {
  const parsed = parseSuggestionInput(raw);
  if ("error" in parsed) {
    return { error: parsed.error, status: 400 as const };
  }

  const user = await getProfilimSessionUser();
  const supabase = await createSupabaseServerClient();

  if (!user || !supabase) {
    return { error: "Öneri için giriş yap.", status: 401 as const };
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: SUGGESTIONS_POST,
      user_id: user.id,
      content: encodeSuggestionContent(parsed.title, parsed.body),
    })
    .select("id, content, created_at")
    .single();

  if (error || !data) {
    return { error: "Öneri kaydedilemedi.", status: 400 as const };
  }

  return {
    suggestion: {
      id: asText((data as { id?: string }).id),
      name: user.displayName || "Üye",
      title: parsed.title,
      body: parsed.body,
      createdAt:
        asText((data as { created_at?: string }).created_at) ||
        new Date().toISOString(),
    } satisfies SiteSuggestion,
  };
}
