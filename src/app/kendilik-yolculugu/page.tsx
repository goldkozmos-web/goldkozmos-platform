import type { Metadata } from "next";

import JourneyClient from "./JourneyClient";
import { publicPageMetadata } from "../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "21 Günlük Kendilik Yolculuğu | GoldKozmos",
  description:
    "Günde 5–10 dakikalık gözlem, uygulama ve farkındalık sorusu. Öz-farkındalık için sade 21 günlük yolculuk.",
  path: "/kendilik-yolculugu",
  absoluteTitle: true,
});

export default function KendilikYolculuguPage() {
  return <JourneyClient />;
}
