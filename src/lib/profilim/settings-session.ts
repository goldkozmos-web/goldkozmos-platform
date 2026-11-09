import type { SupabaseClient } from "@supabase/supabase-js";
import { profilimUserFromAuth } from "./userFromAuth";
import { isSiteAdminEmail } from "../admin/access";
import { shouldClearProfilimUser } from "./sessionEvents";
import type { ProfilimUser } from "./types";

export type SettingsSessionState = { user: ProfilimUser; ready: boolean; error: string };

// Settings need the session, not a second profile query before they can render.
// All account writes and admin routes still validate authorization on the server.
export function startSettingsSession(
  client: SupabaseClient,
  initialUser: ProfilimUser,
  publish: (state: SettingsSessionState) => void,
  timeoutMs = 8000,
) {
  let active = true;
  let user = initialUser;
  let revision = 0;
  const initialRevision = revision;
  const timer = setTimeout(() => {
    if (active) publish({ user, ready: true, error: user ? "" : "Oturum kontrolü tamamlanamadı. Yeniden deneyebilirsin." });
  }, timeoutMs);

  function accept(authUser: Parameters<typeof profilimUserFromAuth>[0]) {
    const actor = profilimUserFromAuth(authUser);
    if (actor) user = { ...actor, isAdmin: isSiteAdminEmail(actor.email) };
    publish({ user, ready: true, error: "" });
  }

  const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
    if (!active) return;
    if (shouldClearProfilimUser(event)) {
      revision++;
      clearTimeout(timer);
      user = null;
      publish({ user, ready: true, error: "" });
    } else if (session?.user) {
      revision++;
      clearTimeout(timer);
      accept(session.user);
    }
  });

  void client.auth.getSession().then(({ data, error }) => {
    if (!active || revision !== initialRevision) return;
    clearTimeout(timer);
    if (error) throw error;
    accept(data.session?.user ?? null);
  }).catch(() => {
    if (!active || revision !== initialRevision) return;
    clearTimeout(timer);
    publish({ user, ready: true, error: user ? "" : "Oturum kontrol edilemedi. Bağlantını kontrol edip yeniden dene." });
  });

  return () => { active = false; clearTimeout(timer); subscription.unsubscribe(); };
}
