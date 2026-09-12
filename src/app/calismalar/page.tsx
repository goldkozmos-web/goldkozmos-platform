import type { Metadata } from "next";
import Link from "next/link";

import FooterSection from "../../components/FooterSection";
import HomeNavbar from "../../components/HomeNavbar";
import { WORK_GROUPS, allWorkCards } from "../../data/worksCatalog";
import "../../styles/home.css";
import "../../styles/daily-practice.css";

export const metadata: Metadata = {
  title: { absolute: "Çalışmalar | GoldKozmos" },
  description:
    "Numeroloji, tarot, birebir seanslar, enerji çalışmaları ve rezonans eğitimleri tek merkezde.",
};

export default function CalismalarPage() {
  const cards = allWorkCards();

  return (
    <main className="homeV3Page gkRouteIn" id="top">
      <HomeNavbar />
      <div className="homeSoftCard" style={{ marginTop: 28 }}>
        <p className="dailyEyebrow">ÇALIŞMALAR</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>Tüm çalışmalar</h1>
        <p>Ana sayfadaki hizmetlerin tek listesi. Fiyat ve Shopier bağlantıları aynı kaynaktan gelir.</p>
      </div>
      {WORK_GROUPS.map((group) => {
        const items = cards.filter((item) => item.group === group.id);
        if (!items.length) return null;
        return (
          <section key={group.id} className="homeSoftCard">
            <p className="dailyEyebrow">{group.title}</p>
            <div className="gkWorkGrid" style={{ marginTop: 12 }}>
              {items.map((item) => (
                <article key={`${group.id}-${item.title}`} className="gkWorkCard">
                  <img src={item.image} alt="" style={{ borderRadius: 12, aspectRatio: "16/10", objectFit: "cover" }} />
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                  <small>
                    {[item.duration, item.price].filter(Boolean).join(" · ")}
                  </small>
                  <div className="dailyMessageActions">
                    <Link href={item.href}>{item.cta}</Link>
                    {item.buyHref ? (
                      <a href={item.buyHref} target={item.buyHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {item.buyHref.includes("shopier") ? "Satın Al" : "Randevu / Detay"}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      <FooterSection />
    </main>
  );
}
