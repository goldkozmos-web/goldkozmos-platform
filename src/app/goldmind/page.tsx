import type { Metadata } from "next";
import Link from "next/link";

import HomeNavbar from "../../components/HomeNavbar";
import FooterSection from "../../components/FooterSection";
import MeditationLibrary from "../../components/meditation/MeditationLibrary";
import { breadcrumbJsonLd } from "../../lib/jsonld";
import { publicPageMetadata } from "../../lib/seo";
import "../../styles/home.css";
import "../../styles/live-activity.css";
import "../../styles/goldmind-flow.css";
import "../../styles/hub-seo.css";

export const metadata: Metadata = publicPageMetadata({
  title: "Meditasyon ve Nefes Egzersizleri | GoldMind – GoldKozmos",
  description:
    "GoldMind meditasyon, nefes egzersizleri, gevşeme, odaklanma, uyku öncesi sakinleşme ve günlük farkındalık alanı. Tıbbi tedavi değildir.",
  path: "/goldmind",
  absoluteTitle: true,
});

export default async function GoldMindPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawFocus = params.focus;
  const initialFocus = Array.isArray(rawFocus) ? rawFocus[0] : rawFocus;
  const jsonLd = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "GoldMind", path: "/goldmind" },
  ]);

  return (
    <main className="homeV3Page meditationPage" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <section className="meditationSection">
        <div className="meditationInner">
          <header className="goldmindWelcome">
            <p className="goldmindBrandMark">GoldMind</p>
            <h1>GoldMind – Meditasyon ve Nefes Alanı</h1>
            <p className="goldmindHello">Bugün kendine küçük bir alan aç.</p>
            <div className="goldmindSeo">
              <p>
                GoldMind, GoldKozmos içindeki meditasyon ve nefes alanıdır.
                Yazı okumak GoldBlog’da, frekans dinlemek GoldFrekans’ta, ritüel
                uygulamak GoldRitüel’dedir. Burada amaç dikkatini bedene ve
                nefes ritmine yaklaştırmaktır.
              </p>
              <p>
                Meditasyon, düşünceyi durdurma vaadi değil; farkındalığı kısa
                bir aralığa toplamaktır. Nefes egzersizleri tempo ve süre ile
                çalışır: sakinleşme, odaklanma veya uyku öncesi geçiş için
                seçilir. Gevşeme, kas ve zihin uyarılmasını düşürmeye yardım
                edebilir; hastalık tedavisi değildir.
              </p>
              <p>
                Odaklanma pratikleri dağılmış dikkati bir nesneye, nefese veya
                kısa bir süreye bağlar. Uyku öncesi sakinleşme, geceye yumuşak
                bir iniş arayanlar içindir; uyku bozukluğunu iyileştirmez.
                Günlük farkındalık, gün içinde birkaç dakikalık duruştur.
              </p>
              <p>
                Kütüphanede henüz yayınlanmış ses pratiği yoktur. Bu yüzden
                /goldmind/meditasyon veya /goldmind/nefes-egzersizleri gibi
                boş detay sayfaları açılmamıştır. Uygulamalar eklendiğinde her
                biri kendi rehberi, süresi ve kaydı ile yayınlanır.{" "}
                <Link href="/goldfrekans">GoldFrekans</Link> doğa ve frekans
                kayıtları için ayrı merkezdir.
              </p>
            </div>
          </header>
          <MeditationLibrary initialFocus={initialFocus} hideWelcome />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
