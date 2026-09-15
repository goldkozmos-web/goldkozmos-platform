import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Gizlilik Politikası",
  description:
    "GoldKozmos gizlilik politikası: sitede paylaşılan bilgilerin nasıl ele alındığını açıklar.",
  path: "/gizlilik-politikasi",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
