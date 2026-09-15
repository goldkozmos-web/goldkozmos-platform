import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Etkinlikler",
  description:
    "GoldKozmos çevrim içi grup çalışmaları, program tarihleri ve etkinlik duyuruları.",
  path: "/etkinlikler",
});

export default function EtkinliklerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
