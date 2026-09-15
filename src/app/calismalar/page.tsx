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
    "Numeroloji, tarot, birebir seanslar, enerji çalışmaları ve rezonans eğitimleri tek merkezde.",
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
                "Birebir seanslar, enerji çalışmaları, tarot, numeroloji ve rezonans eğitimleri.",
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
