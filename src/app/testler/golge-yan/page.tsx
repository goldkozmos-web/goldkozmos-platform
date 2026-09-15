import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import { SHADOW_QUESTIONS } from "../../../data/selfTests";
import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Gölge Yan Testi | GoldKozmos",
  description:
    "Zorlandığın eğilimleri suçlamadan gören öz-farkındalık aracı. Klinik bir teşhis değildir.",
  path: "/testler/golge-yan",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <SelfTestClient
      kind="shadow"
      title="Gölge Yan Testi"
      lead="Bu test seni suçlamaz. Zorlandığın eğilimleri fark etmek, onları dönüştürmenin ilk adımıdır. Klinik bir teşhis değildir."
      questions={SHADOW_QUESTIONS}
      href="/testler/golge-yan"
      intro={[
        "Gölge Yan Testi, zorlandığın eğilimleri suçlamadan görünür kılar. Klinik bir teşhis veya terapi protokolü değildir.",
        "Cevapların sonucu kişiseldir ve arama motoruna açılmaz. Landing sayfası yalnızca testin neye baktığını anlatır.",
      ]}
    />
  );
}
