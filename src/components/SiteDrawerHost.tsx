"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ProfilimDrawer from "./profilim/ProfilimDrawer";
import DuyguRehberiPanel from "./profilim/DuyguRehberiPanel";
import { JournalPanel } from "./profilim/ProfilimPanels";
import {
  readJournalEntries,
  writeJournalEntries,
} from "../lib/profilim/localStore";
import type { ProfilimJournalEntry, ProfilimUser } from "../lib/profilim/types";
import { profilimUserFromAuth } from "../lib/profilim/userFromAuth";
import { createSupabaseBrowserClient } from "../lib/supabase/browser";
import {
  SITE_DRAWER_EVENT,
  type SiteDrawerId,
} from "../lib/siteDrawer";
import "../styles/profilim-dashboard.css";

const COPY: Record<SiteDrawerId, { eyebrow: string; title: string }> = {
  journal: { eyebrow: "YAZI", title: "Kişisel Günlüğüm" },
  duyguRehberi: { eyebrow: "DUYGU REHBERİ", title: "Duygularını Tanı" },
};

export default function SiteDrawerHost() {
  const pathname = usePathname();
  const [open, setOpen] = useState<SiteDrawerId | null>(null);
  const [user, setUser] = useState<ProfilimUser>(null);
  const [journal, setJournal] = useState<ProfilimJournalEntry[]>([]);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    function onOpen(event: Event) {
      const id = (event as CustomEvent<{ id?: SiteDrawerId }>).detail?.id;
      if (id === "journal" || id === "duyguRehberi") {
        setOpen(id);
      }
    }

    window.addEventListener(SITE_DRAWER_EVENT, onOpen);
    return () => window.removeEventListener(SITE_DRAWER_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    void supabase.auth.getUser().then(({ data }) => {
      const next = profilimUserFromAuth(data.user);
      setUser(next);
      setJournal(next?.id ? readJournalEntries(next.id) : []);
    });
  }, [open]);

  function addJournal(body: string) {
    if (!user?.id) return;
    const entry: ProfilimJournalEntry = {
      id: crypto.randomUUID(),
      excerpt: body.slice(0, 140),
      body,
      createdAt: new Date().toISOString(),
    };
    const next = [entry, ...journal];
    setJournal(next);
    writeJournalEntries(user.id, next);
  }

  if (pathname.startsWith("/admin") || !open) {
    return null;
  }

  const copy = COPY[open];

  return (
    <ProfilimDrawer eyebrow={copy.eyebrow} title={copy.title} onClose={close}>
      {open === "journal" ? (
        <JournalPanel items={journal} onCreate={addJournal} />
      ) : (
        <DuyguRehberiPanel />
      )}
    </ProfilimDrawer>
  );
}
