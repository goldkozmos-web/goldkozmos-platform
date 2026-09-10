"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { assembleDashboard } from "../../lib/profilim/dashboard";
import {
  readJournalEntries,
  readLetters,
  readTodayNeedChoice,
  writeJournalEntries,
  writeLetters,
  writeTodayNeedChoice,
} from "../../lib/profilim/localStore";
import type {
  ProfilimContinueItem,
  ProfilimDashboardData,
  ProfilimDrawerId,
  ProfilimJournalEntry,
  ProfilimLetter,
  ProfilimPlatformTrack,
  ProfilimTodayNeedChoiceId,
} from "../../lib/profilim/types";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import {
  TODAY_NEED_CHOICES,
  goldmindUrlForFocus,
  todayNeedChoiceById,
} from "../../lib/profilim/todayNeed";
import {
  getLatestProgress,
  getProgressForPlatform,
  readPlatformProgressMap,
} from "../../lib/platformProgress";
import { fetchOwnProfileFlags, isAdminProfile } from "../../lib/admin/profile";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimCompactTile from "./ProfilimCompactTile";
import ProfilimDrawer from "./ProfilimDrawer";
import ProfilimFeaturedCard from "./ProfilimFeaturedCard";
import ProfilimGate from "./ProfilimGate";
import ProfilimHero from "./ProfilimHero";
import {
  AppointmentsPanel,
  ContinuePanel,
  FavoritesPanel,
  JournalPanel,
  JourneyPanel,
  LetterPanel,
  LibraryPanel,
  PdfPanel,
  ProgressPanel,
  PurchasesPanel,
  TodayNeedPanel,
  AwarenessPanel,
} from "./ProfilimPanels";

const TRACKS: { id: "goldmind" | "goldbook" | "rezonans"; label: string }[] = [
  { id: "goldmind", label: "GoldMind" },
  { id: "goldbook", label: "GoldBook" },
  { id: "rezonans", label: "Rezonans Eğitimleri" },
];

const DRAWERS: Record<
  ProfilimDrawerId,
  { eyebrow: string; title: string }
> = {
  today: { eyebrow: "BUGÜN", title: "Bugün Neye İhtiyacın Var?" },
  progress: { eyebrow: "GELİŞİM", title: "İlerlemen" },
  continue: { eyebrow: "DEVAM", title: "Kaldığın Yerden Devam Et" },
  favorites: { eyebrow: "KAYITLI", title: "Favorilerim" },
  purchases: { eyebrow: "ÇALIŞMALAR", title: "Satın Aldıklarım" },
  pdfs: { eyebrow: "ANALİZ", title: "PDF Analizlerim" },
  appointments: { eyebrow: "SEANSLAR", title: "Randevularım" },
  library: { eyebrow: "ARŞİV", title: "Kütüphanem" },
  journal: { eyebrow: "YAZI", title: "Kişisel Günlüğüm" },
  letter: { eyebrow: "MEKTUP", title: "Kendime Mektup" },
  journey: { eyebrow: "YOLCULUK", title: "Gelişim Yolculuğum" },
  understand: { eyebrow: "FARKINDALIK", title: "Kendimi Anlamak" },
};

export default function ProfilimDashboard({
  data,
}: {
  data: ProfilimDashboardData;
}) {
  const [user, setUser] = useState(data.user);
  const [checking, setChecking] = useState(!data.user);
  const [open, setOpen] = useState<ProfilimDrawerId | null>(null);
  const [continueItems, setContinueItems] = useState(data.continueItems);
  const [tracks, setTracks] = useState<ProfilimPlatformTrack[]>(
    TRACKS.map((track) => ({ ...track, progress: 0 })),
  );
  const [needId, setNeedId] = useState("");
  const [journal, setJournal] = useState(data.journalEntries);
  const [letters, setLetters] = useState(data.letters);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      const next = profilimUserFromAuth(session?.user ?? null);
      if (next) {
        const flags = await fetchOwnProfileFlags(supabase, next.id);
        next.isAdmin = isAdminProfile(flags);
      }
      if (cancelled) return;
      setUser(next);
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void (async () => {
        const next = profilimUserFromAuth(session?.user ?? null);
        if (next) {
          const flags = await fetchOwnProfileFlags(supabase, next.id);
          next.isAdmin = isAdminProfile(flags);
        }
        setUser(next);
        setChecking(false);
      })();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const map = readPlatformProgressMap();
    const latest = getLatestProgress(map);
    const nextContinue: ProfilimContinueItem[] = latest
      ? [
          {
            id: `${latest.platform}-${latest.contentId}`,
            title: latest.title,
            href: latest.href,
            progress: latest.progress,
            platform: latest.platform,
          },
        ]
      : [];

    setContinueItems(nextContinue);
    setTracks(
      TRACKS.map((track) => {
        if (track.id === "rezonans") {
          return { ...track, progress: 0 };
        }

        const entry = getProgressForPlatform(map, track.id);
        return { ...track, progress: entry?.progress ?? 0 };
      }),
    );
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    setNeedId(readTodayNeedChoice(user.id));
    setJournal(readJournalEntries(user.id));
    setLetters(readLetters(user.id));
  }, [user?.id]);

  const view = useMemo(
    () =>
      assembleDashboard({
        ...data,
        user,
        continueItems,
        journalEntries: journal,
        letters,
      }),
    [data, user, continueItems, journal, letters],
  );

  const close = useCallback(() => setOpen(null), []);

  function selectNeed(id: ProfilimTodayNeedChoiceId) {
    setNeedId(id);
    if (user?.id) {
      writeTodayNeedChoice(user.id, id);
    }

    const choice = todayNeedChoiceById(id);
    if (!choice) {
      return;
    }

    if (choice.action.type === "goldmind") {
      setOpen(null);
      window.location.assign(goldmindUrlForFocus(choice.action.focus));
      return;
    }

    if (choice.action.type === "journal") {
      setOpen("journal");
      return;
    }

    setOpen("understand");
  }

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

  function addLetter(title: string, body: string) {
    if (!user?.id) return;
    const entry: ProfilimLetter = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: new Date().toISOString(),
    };
    const next = [entry, ...letters];
    setLetters(next);
    writeLetters(user.id, next);
  }

  const latest = continueItems[0];
  const meta = open ? DRAWERS[open] : null;

  return (
    <section className="profilimDash">
      <div className="profilimDashInner">
        {checking ? (
          <section className="profilimGate">
            <p className="profilimGateEyebrow">GOLDKOZMOS · PROFİLİM</p>
            <h1>Profilin açılıyor…</h1>
          </section>
        ) : view.user ? (
          <>
            <ProfilimHero user={view.user} level={view.level} />

            <div className="profilimFeaturedStack">
              <ProfilimFeaturedCard
                eyebrow="BUGÜN"
                title="Bugün Neye İhtiyacın Var?"
                onOpen={() => setOpen("today")}
              >
                {needId
                  ? TODAY_NEED_CHOICES.find((choice) => choice.id === needId)
                      ?.label
                  : "Bugün nasıl ilerlemek istersin?"}
              </ProfilimFeaturedCard>

              <ProfilimFeaturedCard
                eyebrow="GELİŞİM"
                title="İlerlemen"
                onOpen={() => setOpen("progress")}
              >
                <span className="profilimMiniTracks">
                  {tracks.map((track) => (
                    <span key={track.id}>
                      {track.label} %{Math.round(track.progress * 100)}
                    </span>
                  ))}
                </span>
              </ProfilimFeaturedCard>

              <ProfilimFeaturedCard
                eyebrow="DEVAM"
                title="Kaldığın Yerden Devam Et"
                onOpen={() => setOpen("continue")}
              >
                {latest ? (
                  <>
                    {latest.title}
                    <span className="profilimInlineBar">
                      <span
                        style={{ width: `${Math.round(latest.progress * 100)}%` }}
                      />
                    </span>
                  </>
                ) : null}
              </ProfilimFeaturedCard>
            </div>

            <div className="profilimTileGrid">
              <ProfilimCompactTile
                eyebrow="KAYITLI"
                title="Favorilerim"
                onOpen={() => setOpen("favorites")}
              />
              <ProfilimCompactTile
                eyebrow="ÇALIŞMALAR"
                title="Satın Aldıklarım"
                onOpen={() => setOpen("purchases")}
              />
              <ProfilimCompactTile
                eyebrow="ANALİZ"
                title="PDF Analizlerim"
                onOpen={() => setOpen("pdfs")}
              />
              <ProfilimCompactTile
                eyebrow="SEANSLAR"
                title="Randevularım"
                onOpen={() => setOpen("appointments")}
              />
              <ProfilimCompactTile
                eyebrow="ARŞİV"
                title="Kütüphanem"
                onOpen={() => setOpen("library")}
              />
              <ProfilimCompactTile
                eyebrow="YAZI"
                title="Kişisel Günlüğüm"
                onOpen={() => setOpen("journal")}
              />
              <ProfilimCompactTile
                eyebrow="MEKTUP"
                title="Kendime Mektup"
                onOpen={() => setOpen("letter")}
              />
              <ProfilimCompactTile
                eyebrow="YOLCULUK"
                title="Gelişim Yolculuğum"
                onOpen={() => setOpen("journey")}
              />
            </div>
          </>
        ) : (
          <ProfilimGate />
        )}
      </div>

      {open && meta ? (
        <ProfilimDrawer
          eyebrow={meta.eyebrow}
          title={meta.title}
          onClose={close}
        >
          {open === "today" ? (
            <TodayNeedPanel selectedId={needId} onSelect={selectNeed} />
          ) : null}
          {open === "progress" ? (
            <ProgressPanel
              tracks={tracks}
              completedCount={view.progress.completedCount}
              xp={view.xp}
            />
          ) : null}
          {open === "continue" ? (
            <ContinuePanel items={continueItems} />
          ) : null}
          {open === "favorites" ? (
            <FavoritesPanel items={view.favorites} />
          ) : null}
          {open === "purchases" ? (
            <PurchasesPanel items={view.purchases} />
          ) : null}
          {open === "pdfs" ? <PdfPanel items={view.pdfAnalyses} /> : null}
          {open === "appointments" ? (
            <AppointmentsPanel items={view.appointments} />
          ) : null}
          {open === "library" ? (
            <LibraryPanel items={view.library} />
          ) : null}
          {open === "journal" ? (
            <JournalPanel items={journal} onCreate={addJournal} />
          ) : null}
          {open === "letter" ? (
            <LetterPanel items={letters} onCreate={addLetter} />
          ) : null}
          {open === "journey" ? (
            <JourneyPanel
              items={view.recentActivity}
              levelLabel={`${view.level.level} · ${view.level.title}`}
              xp={view.xp}
            />
          ) : null}
          {open === "understand" ? <AwarenessPanel /> : null}
        </ProfilimDrawer>
      ) : null}
    </section>
  );
}
