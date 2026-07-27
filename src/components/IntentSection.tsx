const intentCards = [
  {
    number: "01",
    title: "Aşkı Hayatıma Çağırmak İstiyorum",
    description:
      "Geçmişten taşıdığın duygusal yükleri fark ederek yeni bir ilişkiye daha açık bir alan oluştur.",
    href: "/calismalar/ask",
    linkText: "İlgili Çalışmaları Gör →",
  },
  {
    number: "02",
    title: "İlişkimi Şifalandırmak İstiyorum",
    description:
      "İlişkinde tekrar eden sorunları, iletişim biçimlerini ve görünmeyen dinamikleri keşfet.",
    href: "/calismalar/iliski",
    linkText: "İlgili Çalışmaları Gör →",
  },
  {
    number: "03",
    title: "Para ve Refah Alanında Çalışmak İstiyorum",
    description:
      "Para algını, bollukla ilişkini ve yaşamındaki tekrar eden maddi örüntüleri gözlemle.",
    href: "/calismalar/para",
    linkText: "İlgili Çalışmaları Gör →",
  },
  {
    number: "04",
    title: "Enerjimi Dengelemek İstiyorum",
    description:
      "İçsel denge, odak, uyku, üretkenlik ve enerji alanına yönelik çalışmaları keşfet.",
    href: "/calismalar/enerji",
    linkText: "İlgili Çalışmaları Gör →",
  },
  {
    number: "05",
    title: "Tarot Analizi Yaptırmak İstiyorum",
    description:
      "İlişkinde görünmeyen dinamikleri ve bilinçaltındaki duygu ve düşünceleri sezgisel yorumla incele.",
    href: "/tarot",
    linkText: "Tarot Analizini İncele →",
  },
  {
    number: "06",
    title: "Kendimi Daha İyi Tanımak İstiyorum",
    description:
      "Numeroloji aracılığıyla karakter yapını, güçlü yönlerini ve yaşam döngülerini keşfet.",
    href: "/numeroloji",
    linkText: "Numerolojiyi İncele →",
  },
];

export default function IntentSection() {
  return (
    <section className="intentSection" id="niyetini-sec">
      <div className="intentContainer">
        <div className="sectionHeading">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>
          </p>

          <h2>Bugün Kendin İçin Ne Yapmak İstersin?</h2>

          <p>
            Şu anda hayatında en çok dönüşmesini istediğin alanı seç.
            Goldkozmos® Enerji Ekolü’nde sana uygun başlangıç noktasını keşfet.
          </p>
        </div>

        <div className="intentGrid">
          {intentCards.map((card) => (
            <a
              href={card.href}
              className="intentCard"
              key={card.number}
            >
              <span className="intentNumber">{card.number}</span>

              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <span className="intentLink">{card.linkText}</span>
            </a>
          ))}

          <a
            href="/sana-uygun-calismayi-bul"
            className="intentCard featuredCard"
          >
            <span className="intentNumber">07</span>

            <h3>Nereden Başlayacağımı Bilmiyorum</h3>

            <p>
              Çok katmanlı Goldkozmos® testini tamamla; temel sorun alanlarını
              ve sana önerilen çalışmaları keşfet.
            </p>

            <span className="intentLink">Testi Başlat →</span>
          </a>
        </div>
      </div>
    </section>
  );
}