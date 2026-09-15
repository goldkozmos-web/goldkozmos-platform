import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import { CHARACTER_QUESTIONS } from "../../../data/selfTests";
import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Karakter Analizi Testi | GoldKozmos",
  description:
    "Klinik test değil. Sosyal enerji, karar, sınır ve stres eğilimlerini gören öz-farkındalık aracı.",
  path: "/testler/karakter-analizi",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <SelfTestClient
      kind="character"
      title="Karakter Analizi"
      lead="Bu bir klinik değerlendirme değil. Nasıl karar verdiğini, sınır koyduğunu ve stres altında nasıl durduğunu görmek için bir öz-farkındalık aracı."
      questions={CHARACTER_QUESTIONS}
      href="/testler/karakter-analizi"
    />
  );
}
