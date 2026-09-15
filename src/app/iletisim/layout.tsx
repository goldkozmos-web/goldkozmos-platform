import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "İletişim",
  description:
    "GoldKozmos ile iletişim: soru, randevu ve çalışma talepleri için ulaşım kanalları.",
  path: "/iletisim",
});

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
