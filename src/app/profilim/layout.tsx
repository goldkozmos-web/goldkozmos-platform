import type { Metadata } from "next";

import { noIndexFollow } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profilim",
  robots: noIndexFollow,
};

export default function ProfilimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
