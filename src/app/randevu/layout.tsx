import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Randevu",
  description:
    "GoldKozmos randevu ve WhatsApp iletişim bilgileri. Çalışma talebini netleştirmek için buradan başla.",
  path: "/randevu",
});

export default function RandevuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
