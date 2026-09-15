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
      title="İlişki Örüntüsü"
      lead="Bu bir bağlanma teşhisi değil. Yakınlık, mesafe, çatışma ve tekrar eden kalıplarını gözlemlemek için bir araç."
      questions={RELATIONSHIP_QUESTIONS}
      href="/testler/iliski-oruntusu"
    />
  );
}
