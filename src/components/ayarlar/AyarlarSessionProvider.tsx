"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createProfilimBrowserClient } from "../../lib/profilim/auth.client";
import { startSettingsSession, type SettingsSessionState } from "../../lib/profilim/settings-session";
import type { ProfilimUser } from "../../lib/profilim/types";

const SessionContext = createContext<SettingsSessionState & { retry: () => void }>({ user: null, ready: false, error: "", retry() {} });
export const useSettingsSession = () => useContext(SessionContext);

export default function AyarlarSessionProvider({ initialUser, children }: { initialUser: ProfilimUser; children: ReactNode }) {
  const [state, setState] = useState<SettingsSessionState>({ user: initialUser, ready: Boolean(initialUser), error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const client = createProfilimBrowserClient();
    if (!client) {
      const timer = setTimeout(() => setState({ user: initialUser, ready: true, error: initialUser ? "" : "Giriş bağlantısı hazırlanamadı. Yeniden dene." }), 0);
      return () => clearTimeout(timer);
    }
    return startSettingsSession(client, initialUser, setState);
  }, [initialUser, attempt]);

  return <SessionContext.Provider value={{ ...state, retry: () => setAttempt((value) => value + 1) }}>{children}</SessionContext.Provider>;
}
