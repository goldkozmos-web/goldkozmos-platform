import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldFrekans",
  description:
    "GoldFrekans: GoldKozmos frekans ve ses alanı. Günlük pratik için sade dinleme içerikleri.",
  path: "/goldfrekans",
});

export default function GoldFrekansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
