import type { Metadata } from "next";

import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Aşk ve İlişki Çalışmaları",
  description:
    "Aşkı hayatına çağırmak veya mevcut ilişkiyi dönüştürmek için GoldKozmos ilişki çalışmaları.",
  path: "/calismalar/ask-ve-iliski",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
