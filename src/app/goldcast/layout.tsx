import type { Metadata } from "next";

import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldCast",
  description:
    "GoldCast bölümleri: bolluk, karma, atalar ve GoldKozmos sohbetleri. YouTube’da yayınlanan konuşmalar.",
  path: "/goldcast",
});

export default function GoldCastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
