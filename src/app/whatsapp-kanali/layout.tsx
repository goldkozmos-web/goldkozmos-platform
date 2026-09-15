import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "WhatsApp Kanalı",
  description:
    "GoldKozmos WhatsApp kanalı: duyurular, yeni çalışmalar ve ücretsiz içerik hatırlatmaları.",
  path: "/whatsapp-kanali",
});

export default function WhatsAppKanalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
