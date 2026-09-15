import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldBook | GoldKozmos",
  description:
    "GoldBook: GoldKozmos rehber, çalışma kitabı ve dijital yayın alanı. İçindeki Kozmosu Kucakla ve Aşk Manifestosu tanıtım sayfaları.",
  path: "/goldbook",
  absoluteTitle: true,
});

export default function GoldBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
