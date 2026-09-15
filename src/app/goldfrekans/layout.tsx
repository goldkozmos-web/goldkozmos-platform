import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldFrekans | GoldKozmos",
  description:
    "Frekans, ses ve odak deneyimlerinin yer aldığı GoldKozmos alanı. Yağmur, deniz ve mevcut frekans kayıtlarını dinle. Tedavi iddiası yoktur.",
  path: "/goldfrekans",
  absoluteTitle: true,
});

export default function GoldFrekansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
