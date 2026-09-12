import type { Metadata } from "next";

import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: { absolute: "21 Günlük Kendilik Yolculuğu | GoldKozmos" },
  description:
    "Günde 5–10 dakikalık gözlem, uygulama ve farkındalık sorusu. Öz-farkındalık için sade 21 günlük yolculuk.",
};

export default function KendilikYolculuguPage() {
  return <JourneyClient />;
}
