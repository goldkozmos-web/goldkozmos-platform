import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Sana Uygun Çalışmayı Bul",
  description:
    "İhtiyacına göre GoldKozmos çalışmasını seç: kendilik, ilişki, bolluk, tarot ve enerji seansları.",
  path: "/sana-uygun-calismayi-bul",
});

export default function WorkFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
