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
import { shouldClearProfilimUser } from "../../lib/profilim/sessionEvents";
import { isMemberProfileComplete } from "../../lib/auth/membership";
import { recordMemberJoin } from "../../lib/admin/member-log";
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
import { canShowMemberProfilim } from "../../lib/admin/profile";
import { isSiteAdminEmail } from "../../lib/admin/access";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimDrawer from "./ProfilimDrawer";
import ProfilimFeaturedCard from "./ProfilimFeaturedCard";
import ProfilimGate from "./ProfilimGate";
import ProfilimHero from "./ProfilimHero";
import ProfilimTileRails from "./ProfilimTileRails";
import {
  AppointmentsPanel,
  ContinuePanel,
  JournalPanel,
  JourneyPanel,
  LetterPanel,
  LibraryPanel,
  PdfPanel,
  ProgressPanel,
  PurchasesPanel,
  TodayNeedPanel,
  AwarenessPanel,
  InboxPanel,
  SuggestPanel,
} from "./ProfilimPanels";
import EmotionJournalPanel from "../daily/EmotionJournalPanel";
import DuyguRehberiPanel from "./DuyguRehberiPanel";
import RuyaGunluguPanel from "./RuyaGunluguPanel";
import GoldRituelPanel from "./GoldRituelPanel";
import {
  LiveFavoritesPanel,
  ProfilimBadgeRow,
  ProfilimBadgesPanel,
  ProfilimStatsPanel,
} from "./ProfilimLivePanels";
import ActivityTimelinePanel from "../daily/ActivityTimelinePanel";
import RemindersPanel from "../daily/RemindersPanel";
import ProfilimIntentionCard from "./ProfilimIntentionCard";
import WaterPanel from "./WaterPanel";
import ProfilimWaterCard from './ProfilimWaterCard';
import { PROFILE_ACTIVITY_EVENT, mapProfileActivity } from "../../lib/profilim/activity";

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
  pdfs: { eyebrow: "ANALİZ", title: "Analizlerim" },
  appointments: { eyebrow: "SEANSLAR", title: "Randevularım" },
  library: { eyebrow: "ARŞİV", title: "Kütüphanem" },
  journal: { eyebrow: "YAZI", title: "Kişisel Günlüğüm" },
  letter: { eyebrow: "MEKTUP", title: "Kendime Mektup" },
  journey: { eyebrow: "YOLCULUK", title: "Gelişim Yolculuğum" },
  understand: { eyebrow: "FARKINDALIK", title: "Kendimi Anlamak" },
  inbox: { eyebrow: "MESAJ", title: "Gelen Mesajlar" },
  suggest: { eyebrow: "ÖNERİ", title: "Gold’a Öneri" },
  emotionJournal: { eyebrow: "DUYGU", title: "Duygu Günlüğüm" },
  duyguRehberi: { eyebrow: "DUYGU REHBERİ", title: "Duygularını Tanı" },
  badges: { eyebrow: "ROZET", title: "Rozetlerim" },
  dreamJournal: { eyebrow: "RÜYA", title: "Rüya Günlüğüm" },
  ritualSaved: { eyebrow: "GOLDRİTÜEL", title: "Kayıtlı Ritüeller" },
  ritualDone: { eyebrow: "GOLDRİTÜEL", title: "Uyguladığım Ritüeller" },
  ritualNotes: { eyebrow: "GOLDRİTÜEL", title: "Ritüel Notlarım" },
  activityHistory: { eyebrow: "GEÇMİŞ", title: "İlerleme Geçmişim" },
  todos: { eyebrow: "GÖREV", title: "Yapılacaklarım" },
  stats: { eyebrow: "İSTATİSTİK", title: "Kişisel İstatistikler" },
  water: { eyebrow: "SU", title: "Su Hatırlatıcısı" },
};

export default function ProfilimDashboard({
  data,
}: {
  data: ProfilimDashboardData;
}) {
  const [user, setUser] = useState(data.user);
  const [checking, setChecking] = useState(!data.user);
  const [authError, setAuthError] = useState("");
  const [open, setOpen] = useState<ProfilimDrawerId | null>(null);
  const [recentActivity,setRecentActivity] = useState(data.recentActivity);
  const [continueItems, setContinueItems] = useState(data.continueItems);
  const [tracks, setTracks] = useState<ProfilimPlatformTrack[]>(
    TRACKS.map((track) => ({ ...track, progress: 0 })),
  );
  const [needId, setNeedId] = useState("");
  const [journal, setJournal] = useState(data.journalEntries);
  const [letters, setLetters] = useState(data.letters);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const preview = new URLSearchParams(window.location.search).get("design");
      if (preview === "1") {
        setUser({
          id: "design-preview",
          displayName: "Gold",
          email: "design@local",
          avatarUrl: null,
        });
        setChecking(false);
        return;
      }
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setChecking(false);
      return;
    }

    const client = supabase;
    let cancelled = false;
    const sessionTimer = setTimeout(() => { if (!cancelled) { setChecking(false); setAuthError("Oturum kontrolü uzadı. Bağlantını kontrol edip yeniden deneyebilirsin."); } }, 12000);

    async function resolveUser(
      sessionUser: Parameters<typeof profilimUserFromAuth>[0],
      event?: string,
    ) {
      clearTimeout(sessionTimer);
      const next = profilimUserFromAuth(sessionUser);
      if (!next) {
        if (shouldClearProfilimUser(event) && !cancelled) {
          setUser(null);
          setChecking(false);
        }
        if (!cancelled) setChecking(false);
        return;
      }

      if (!cancelled) {
        if (!isSiteAdminEmail(next.email) && !isMemberProfileComplete(sessionUser)) {
          window.location.replace("/auth/kayit");
          return;
        }
        setAuthError("");
        setUser({
          ...next,
          isAdmin: isSiteAdminEmail(next.email),
        });
        setChecking(false);
        void client.rpc("ensure_own_membership").then(() => undefined, () => undefined);
        void recordMemberJoin(sessionUser, undefined, client).catch(() => undefined);
      }
    }

    void client.auth.getSession().then(({ data: { session }, error }) => {
      if (error && !cancelled) setAuthError("Oturum kontrol edilemedi. Bağlantını kontrol edip yeniden dene.");
      void resolveUser(session?.user ?? null, "GET_SESSION");
    }).catch(() => {
      if (!cancelled) {
        setChecking(false);
        setAuthError("Oturum kontrol edilemedi. Sayfayı yeniden yükleyebilirsin.");
      }
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      void resolveUser(session?.user ?? null, event);
    });

    return () => {
      cancelled = true;
      clearTimeout(sessionTimer);
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
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const next = params.get("open");
    if (
      next === "inbox" || next === "suggest" || next === "water" || next === "todos" || next === "badges" ||
      next === "duyguRehberi" ||
      next === "journal" ||
      next === "dreamJournal" ||
      next === "ritualSaved" ||
      next === "ritualDone" ||
      next === "ritualNotes"
    ) {
      setOpen(next);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    setNeedId(readTodayNeedChoice(user.id));
    setJournal(readJournalEntries(user.id));
    setLetters(readLetters(user.id));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const client = createSupabaseBrowserClient();
    if (!client) return;
    let active = true;
    async function reload() { const result = await client!.from("user_activity").select("id,kind,title,created_at").eq("user_id",user!.id).order("created_at",{ascending:false}).limit(500); if(active && result.data)setRecentActivity(result.data.map(mapProfileActivity)); }
    void reload(); const timer=setInterval(()=>{if(document.visibilityState==="visible")void reload();},20000);
    window.addEventListener(PROFILE_ACTIVITY_EVENT,reload);window.addEventListener("focus",reload);
    return()=>{active=false;clearInterval(timer);window.removeEventListener(PROFILE_ACTIVITY_EVENT,reload);window.removeEventListener("focus",reload);};
  },[user]);

  const view = useMemo(
    () =>
      assembleDashboard({
        ...data,
        user,
        recentActivity,
        continueItems,
        journalEntries: journal,
        letters,
      }),
    [data, user, recentActivity, continueItems, journal, letters],
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
  const showMemberTiles = canShowMemberProfilim(user, checking);

  return (
    <section className="profilimDash">
      <div className="profilimDashInner">
        {showMemberTiles ? (
          <>
            {user ? (
              <div className="profilimIdentityBand">
                <ProfilimHero user={user} level={view.level} />
                <ProfilimBadgeRow onOpen={() => setOpen("badges")} />
              </div>
            ) : null}

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
                      <span>{track.label}<b>%{Math.round(track.progress * 100)}</b></span><i><i style={{ width: `${Math.round(track.progress * 100)}%` }} /></i>
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
                ) : "Son dinlediğin içerikten devam et."}
              </ProfilimFeaturedCard>

              <ProfilimFeaturedCard
                eyebrow="GÖREV"
                title="Yapılacaklarım"
                onOpen={() => setOpen("todos")}
              >Küçük adımlarını planla.</ProfilimFeaturedCard>

              <ProfilimFeaturedCard
                eyebrow="İSTATİSTİK"
                title="Kişisel İstatistikler"
                onOpen={() => setOpen("stats")}
              >Yolculuğuna bir bakış.</ProfilimFeaturedCard>

              <ProfilimIntentionCard userId={user?.id ?? ""} />
              <ProfilimWaterCard userId={user?.id ?? ''} onOpen={() => setOpen('water')} />
            </div>


            <ProfilimTileRails onOpenTile={(id) => setOpen(id)} />
            <div className="circleProfileLinks"><a href="/paylasim-cemberi">Paylaşım Çemberi<small>Deneyimler, sorular ve küçük destekler ↗</small></a><a href="/paylasim-cemberi/kaydettiklerim">Kaydettiklerim<small>Toplulukta sakladığın paylaşımlar ↗</small></a></div>
            <button type="button" className="profilimFeedbackCard" onClick={() => setOpen("suggest")}>
              <span className="profilimFeedbackMark" aria-hidden="true">✧</span>
              <span className="profilimFeedbackCopy"><span className="profilimFeedbackEyebrow">BİRLİKTE GELİŞTİRELİM</span><strong>Gold’a önerin var mı?</strong><span>Bir fikrinle bu alana iz bırak.</span></span>
              <span className="profilimFeedbackAction">Önerini paylaş <span aria-hidden="true">↗</span></span>
            </button>
          </>
        ) : (
          checking ? <div className="profilimAuthLoading" role="status"><span />Kişisel alanın hazırlanıyor…</div> : <>
            {authError ? <p className="profilimGoogleError" role="alert">{authError}</p> : null}
            <ProfilimGate />
          </>
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
          {open === "favorites" ? <LiveFavoritesPanel /> : null}
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
          {open === "inbox" ? <InboxPanel /> : null}
          {open === "suggest" ? <SuggestPanel /> : null}
          {open === "emotionJournal" ? <EmotionJournalPanel /> : null}
          {open === "duyguRehberi" ? <DuyguRehberiPanel /> : null}
          {open === "dreamJournal" ? <RuyaGunluguPanel /> : null}
          {open === "ritualSaved" ? <GoldRituelPanel tab="saved" /> : null}
          {open === "ritualDone" ? <GoldRituelPanel tab="done" /> : null}
          {open === "ritualNotes" ? <GoldRituelPanel tab="notes" /> : null}
          {open === "activityHistory" ? <ActivityTimelinePanel /> : null}
          {open === "todos" ? (
            <RemindersPanel userId={user?.id ?? ""} />
          ) : null}
          {open === "stats" ? <ProfilimStatsPanel /> : null}
          {open === "water" ? <WaterPanel userId={user?.id ?? ""} /> : null}
          {open === "badges" ? <ProfilimBadgesPanel /> : null}
        </ProfilimDrawer>
      ) : null}
    </section>
  );
}
