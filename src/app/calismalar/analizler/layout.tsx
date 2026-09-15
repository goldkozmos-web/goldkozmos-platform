import type { Metadata } from "next";

import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Kişisel Analizler",
  description:
    "GoldKozmos kişisel analizler: tarot, numeroloji ve kendine dair okuma seçeneklerini incele.",
  path: "/calismalar/analizler",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
