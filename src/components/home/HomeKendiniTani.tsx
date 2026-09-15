"use client";

const TESTS = [
  {
    title: "Arketip Testi",
    text: "Baskın üç arketipini gör.",
    href: "/arketip-testi",
  },
  {
    title: "Karakter Analizi",
    text: "Karar, sınır, stres ve ilişki ritmin.",
    href: "/testler/karakter-analizi",
  },
  {
    title: "Gölge Yan Testi",
    text: "Zorlandığın eğilimleri suçlamadan fark et.",
    href: "/testler/golge-yan",
  },
  {
    title: "İlişki Örüntüsü",
    text: "Yakınlık, mesafe ve tekrar eden kalıplar.",
    href: "/testler/iliski-oruntusu",
  },
];

export default function HomeKendiniTani() {
  return (
    <section className="kendiniTaniRail" id="kendini-tani" aria-label="Kendini Tanı">
      <div className="kendiniTaniHead">
        <p className="dailyEyebrow">KENDİNİ TANI</p>
        <h2>Öz-farkındalık testleri</h2>
      </div>
      <div className="kendiniTaniTrack">
        {TESTS.map((test) => (
          <a key={test.href} className="kendiniTaniCard" href={test.href}>
            <strong>{test.title}</strong>
            <span>{test.text}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
