import type { Metadata } from "next";

import "../../styles/ayarlar.css";
import "../../styles/profilim-dashboard.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ayarlar",
  robots: { index: false, follow: false },
};

export default function AyarlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="ayarlarPage">{children}</main>;
}
