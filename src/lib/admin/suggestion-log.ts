import { createSupabaseServerClient } from "../supabase/create-server-client";
import { getAdminAccess } from "../admin/auth.server";
import { getProfilimSessionUser } from "../profilim/auth.server";
import { parseSuggestionInput, type SiteSuggestion } from "./suggestions";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function mapSuggestion(row: Record<string, unknown>): SiteSuggestion {
  const profiles = row.profiles as
    | { display_name?: string | null }
    | { display_name?: string | null }[]
    | null;
  const profile = Array.isArray(profiles) ? profiles[0] : profiles;

  return {
    id: asText(row.id),
    name: asText(profile?.display_name) || "Üye",
    title: asText(row.subject) || asText(row.title),
    body: asText(row.message) || asText(row.body),
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
    .from("suggestions")
    .select("id, subject, message, created_at, profiles:user_id(display_name)")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error || !data) {
    console.warn("suggestions list", error?.message);
    return [];
  }

  return data.map((row) => mapSuggestion(row as Record<string, unknown>));
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
    .from("suggestions")
    .insert({
      user_id: user.id,
      subject: parsed.title,
      message: parsed.body,
      status: "new",
    })
    .select("id, subject, message, created_at")
    .single();

  if (error || !data) {
    return { error: error?.message || "Öneri kaydedilemedi.", status: 400 as const };
  }

  await supabase.rpc("record_analytics_event", {
    p_event_name: "suggestion_submit",
    p_path: "/ayarlar",
    p_user_id: user.id,
    p_anonymous_session_id: null,
    p_metadata: { id: asText((data as { id?: string }).id) },
  });

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
