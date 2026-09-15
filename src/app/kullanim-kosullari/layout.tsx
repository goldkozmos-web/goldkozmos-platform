import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Kullanım Koşulları",
  description:
    "GoldKozmos site kullanım koşulları: içerik, üyelik ve dijital hizmetlere dair kurallar.",
  path: "/kullanim-kosullari",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
