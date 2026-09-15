import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "GoldKozmos KVKK aydınlatma metni: kişisel verilerin işlenme amaçları ve hakların özeti.",
  path: "/kvkk-aydinlatma-metni",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
