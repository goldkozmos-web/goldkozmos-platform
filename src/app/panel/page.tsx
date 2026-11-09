import type { Metadata } from "next";
import { getAdminAccess } from "@/lib/admin/auth.server";
import Panel from "@/components/panel/Panel";
import "@/styles/business-panel.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "GoldKozmos | Özel Yönetim Merkezi",
  robots: { index: false, follow: false },
  manifest: "/panel/manifest.webmanifest",
};
export default async function PanelPage() {
  const access = await getAdminAccess();
  if (access.status !== "ok")
    return (
      <main className="businessPanel panelLocked">
        <p>GOLDKOZMOS · ÖZEL ALAN</p>
        <h1>Yönetim merkezine giriş</h1>
        <p>Bu alan yalnızca yönetici hesabına açıktır.</p>
        <a href="/auth/google?next=%2Fpanel">Yönetici hesabımla giriş yap →</a>
      </main>
    );
  return <Panel />;
}
