import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Yasal Bilgiler",
  description:
    "GoldKozmos gizlilik, KVKK, kullanım koşulları, iptal-iade ve mesafeli satış metinlerine buradan ulaş.",
  path: "/yasal-bilgiler",
});

export default function YasalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
