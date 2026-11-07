import type { Metadata } from "next";

import CalismalarHub from "../../components/calismalar/CalismalarHub";
import { breadcrumbJsonLd, serviceJsonLd } from "../../lib/jsonld";
import { publicPageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/calismalar-hub.css";
import "../../styles/hub-seo.css";

export const metadata: Metadata = publicPageMetadata({
  title: "Çalışmalar | GoldKozmos",
  description:
    "Kısa enerji çalışması, Kendilik, İlişki, Bolluk Rezonansı ve Aşk Çalışması. Tek günlük veya paket seçeneklerini keşfet.",
  path: "/calismalar",
  absoluteTitle: true,
});

export default function CalismalarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "GoldKozmos Çalışmaları",
              description:
                "Beş ana çalışma alanı: Enerji Rezonansı, Kendilik, İlişki, Bolluk ve Aşk Rezonansı. Tanışma seansı, birebir seans ve beşli paket seçenekleri.",
              path: "/calismalar",
            }),
            breadcrumbJsonLd([
              { name: "Ana Sayfa", path: "/" },
              { name: "Çalışmalar", path: "/calismalar" },
            ]),
          ]),
        }}
      />
      <CalismalarHub />
    </>
  );
}
