import type { Metadata } from "next";

import SelfTestClient from "../SelfTestClient";
import { RELATIONSHIP_QUESTIONS } from "../../../data/selfTests";
import { publicPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "İlişki Örüntüsü Testi | GoldKozmos",
  description:
    "Yakınlık, sınır ve çatışma ritmini gören öz-farkındalık aracı. Klinik bağlanma teşhisi değildir.",
  path: "/testler/iliski-oruntusu",
  absoluteTitle: true,
});

export default function Page() {
  return (
    <SelfTestClient
      kind="relationship"
      title="İlişki Örüntüsü Testi"
      lead="Bu bir bağlanma teşhisi değil. Yakınlık, mesafe, çatışma ve tekrar eden kalıplarını gözlemlemek için bir araç."
      questions={RELATIONSHIP_QUESTIONS}
      href="/testler/iliski-oruntusu"
      intro={[
        "İlişki Örüntüsü Testi yakınlık, mesafe, çatışma ve tekrar eden bağ kalıplarına bakar. Bağlanma teşhisi değildir.",
        "Test nasıl uygulanır: her maddeye 1–5 arası yanıt verirsin. Sonuç private kalır; bu sayfa public tanıttır.",
      ]}
    />
  );
}
