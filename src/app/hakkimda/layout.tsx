import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Hakkımda",
  description:
    "Özge Batıgün ve GoldKozmos yaklaşımı: kendilik, Stoa, ilişkiler ve rezonans çalışmaları.",
  path: "/hakkimda",
});

export default function HakkimdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
