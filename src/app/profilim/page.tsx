import { redirect } from "next/navigation";
import type { Metadata } from "next";

import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import ProfilimDashboard from "../../components/profilim/ProfilimDashboard";
import { canAccessAdmin } from "../../lib/admin/access";
import { loadProfilimDashboard } from "../../lib/profilim/loadDashboard";
import "../../styles/home.css";
import "../../styles/profilim-dashboard.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profilim",
  description:
    "GoldKozmos kişisel gelişim paneli: ilerlemen, kütüphanen, randevuların ve yolculuğun tek yerde.",
};

export default async function ProfilimPage() {
  const data = await loadProfilimDashboard();

  if (data.user && canAccessAdmin(null, data.user.email)) {
    redirect("/admin");
  }

  return (
    <main className="homePage profilimPage" id="top">
      <Navbar />
      <ProfilimDashboard data={data} />
      <FooterSection />
    </main>
  );
}
