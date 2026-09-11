import { Suspense } from "react";

import "../../../styles/home.css";
import "../../../styles/profilim-dashboard.css";

export const dynamic = "force-dynamic";

export default function AuthKayitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
