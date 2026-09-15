import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldBook",
  description:
    "GoldKozmos dijital kitapları: İçindeki Kozmosu Kucakla ve Aşk Manifestosu. Özdeğer, sınırlar ve ilişkiler.",
  path: "/goldbook",
});

export default function GoldBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
