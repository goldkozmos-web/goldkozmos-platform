"use client";

import { useEffect, useMemo, useState } from "react";

import { assembleDashboard } from "../../lib/profilim/dashboard";
import type { ProfilimDashboardData } from "../../lib/profilim/types";
import { profilimUserFromAuth } from "../../lib/profilim/userFromAuth";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import ProfilimGate from "./ProfilimGate";
import ProfilimHero from "./ProfilimHero";
import AppointmentsSection from "./sections/AppointmentsSection";
import ContinueSection from "./sections/ContinueSection";
import FavoritesSection from "./sections/FavoritesSection";
import JournalSection from "./sections/JournalSection";
import JourneySection from "./sections/JourneySection";
import LetterSection from "./sections/LetterSection";
import LibrarySection from "./sections/LibrarySection";
import PdfAnalysesSection from "./sections/PdfAnalysesSection";
import ProgressSection from "./sections/ProgressSection";
import PurchasesSection from "./sections/PurchasesSection";
import TodayNeedSection from "./sections/TodayNeedSection";

export default function ProfilimDashboard({
  data,
}: {
  data: ProfilimDashboardData;
}) {
  const [user, setUser] = useState(data.user);
  const [checking, setChecking] = useState(!data.user);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      setUser(profilimUserFromAuth(session?.user ?? null));
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(profilimUserFromAuth(session?.user ?? null));
      setChecking(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const view = useMemo(
    () => assembleDashboard({ ...data, user }),
    [data, user],
  );

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

            <div className="profilimDashGrid">
              <div className="profilimDashWide">
                <TodayNeedSection todayNeed={view.todayNeed} />
              </div>

              <ProgressSection progress={view.progress} />
              <ContinueSection items={view.continueItems} />
              <FavoritesSection items={view.favorites} />
              <PurchasesSection items={view.purchases} />
              <PdfAnalysesSection items={view.pdfAnalyses} />
              <AppointmentsSection items={view.appointments} />
              <LibrarySection items={view.library} />
              <JournalSection items={view.journalEntries} />
              <LetterSection items={view.letters} />

              <div className="profilimDashWide">
                <JourneySection items={view.recentActivity} />
              </div>
            </div>
          </>
        ) : (
          <ProfilimGate />
        )}
      </div>
    </section>
  );
}
