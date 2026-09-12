import type { Metadata } from "next";

import ArchetypeClient from "./ArchetypeClient";

export const metadata: Metadata = {
  title: { absolute: "GoldKozmos Arketip Testi | Öz-farkındalık" },
  description:
    "12 arketip üzerinden baskın, ikinci ve üçüncü yönünü gören öz-farkındalık aracı. Klinik test değildir.",
};

export default function ArketipTestiPage() {
  return <ArchetypeClient />;
}
