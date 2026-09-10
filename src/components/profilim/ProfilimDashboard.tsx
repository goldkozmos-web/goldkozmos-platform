import type { ProfilimDashboardData } from "../../lib/profilim/types";
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
  return (
    <section className="profilimDash">
      <div className="profilimDashInner">
        {data.user ? (
          <>
            <ProfilimHero user={data.user} level={data.level} />

            <div className="profilimDashGrid">
              <div className="profilimDashWide">
                <TodayNeedSection todayNeed={data.todayNeed} />
              </div>

              <ProgressSection progress={data.progress} />
              <ContinueSection items={data.continueItems} />
              <FavoritesSection items={data.favorites} />
              <PurchasesSection items={data.purchases} />
              <PdfAnalysesSection items={data.pdfAnalyses} />
              <AppointmentsSection items={data.appointments} />
              <LibrarySection items={data.library} />
              <JournalSection items={data.journalEntries} />
              <LetterSection items={data.letters} />

              <div className="profilimDashWide">
                <JourneySection items={data.recentActivity} />
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
