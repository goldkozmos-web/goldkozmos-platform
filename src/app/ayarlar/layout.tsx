import type { Metadata } from "next";

import "../../styles/admin.css";
import "../../styles/ayarlar-desk.css";

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
  return (
    <main
      className="adminPage ayarlarPage"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg, #b89a82 0%, #e4d8cc 42%, #ffffff 100%)",
        color: "#1c1410",
      }}
    >
      {children}
    </main>
  );
}
