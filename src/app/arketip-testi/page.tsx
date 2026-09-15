import type { Metadata } from "next";

import ArchetypeClient from "./ArchetypeClient";
import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "GoldKozmos Arketip Testi | Öz-farkındalık",
  description:
    "12 arketip üzerinden baskın, ikinci ve üçüncü yönünü gören öz-farkındalık aracı. Klinik test değildir.",
  path: "/arketip-testi",
  absoluteTitle: true,
});

export default function ArketipTestiPage() {
  return <ArchetypeClient />;
}
