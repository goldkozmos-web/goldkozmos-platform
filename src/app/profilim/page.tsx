import type { Metadata } from "next";

import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import ProfilimDashboard from "../../components/profilim/ProfilimDashboard";
import { loadProfilimDashboard } from "../../lib/profilim/loadDashboard";
import "../../styles/home.css";
import "../../styles/profilim-dashboard.css";
import "../../styles/daily-practice.css";
import "../../styles/ruya-tabirleri.css";
import "../../styles/profilim-premium.css";
import "../../styles/profilim-cards-refined.css";
import "../../styles/water-reminder-premium.css";
import "../../styles/profilim-welcome-refined.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profilim",
  robots: { index: false, follow: true },
  description:
    "GoldKozmos kişisel gelişim paneli: ilerlemen, kütüphanen, randevuların ve yolculuğun tek yerde.",
};

export default async function ProfilimPage() {
  const data = await loadProfilimDashboard();

  return (
    <main className="homePage profilimPage" id="top">
      <Navbar />
      <ProfilimDashboard data={data} />
      <FooterSection />
    </main>
  );
}
