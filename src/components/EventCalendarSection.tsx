const calendarEvents = [
  {
    day: "03",
    month: "AĞU",
    year: "2026",
    dateRange: "03–07 Ağustos",
    title: "Aşkı Hayatına Çağır",
    description:
      "Geçmiş ilişkilerden kalan yükleri geride bırakmaya ve kalp alanını yeni bir başlangıca hazırlamaya yönelik 5 günlük online grup çalışması.",
    type: "5 Günlük Online Grup Çalışması",
    status: "Kayıtlar Açık",
    href: "/calismalar/aski-hayatina-cagir",
    featured: true,
  },
  {
    day: "10",
    month: "AĞU",
    year: "2026",
    dateRange: "10–14 Ağustos",
    title: "İlişkini Şifalandır",
    description:
      "İlişkide tekrar eden sorunları, güven kırılmalarını ve iletişim döngülerini fark etmeye yönelik 5 günlük online grup çalışması.",
    type: "5 Günlük Online Grup Çalışması",
    status: "Yakında Başlıyor",
    href: "/calismalar/iliskini-sifalandir",
    featured: false,
  },
  {
    day: "17",
    month: "AĞU",
    year: "2026",
    dateRange: "17–21 Ağustos",
    title: "Para Enerjisi Aktivasyonu",
    description:
      "Para ile kurduğun ilişkiyi, bolluk algını ve tekrar eden sınırlayıcı döngülerini fark etmeye yönelik 5 günlük online grup çalışması.",
    type: "5 Günlük Online Grup Çalışması",
    status: "Ön Kayıt",
    href: "/calismalar/para-enerjisi-aktivasyonu",
    featured: false,
  },
];

export default function EventCalendarSection() {
  return (
    <section className="eventCalendarSection" id="etkinlik-takvimi">
      <div className="eventCalendarContainer">
        <header className="eventCalendarHeading">
          <div>
            <p className="sectionEyebrow">
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup> ETKİNLİK TAKVİMİ
            </p>

            <h2>
              Yaklaşan çalışmaları
              <span> takvimine ekle.</span>
            </h2>
          </div>

          <p>
            Goldkozmos® grup çalışmaları, ücretsiz buluşmalar ve yeni program
            tarihlerini tek bir alandan takip et.
          </p>
        </header>

        <div className="eventCalendarList">
          {calendarEvents.map((event, index) => (
            <article
              className={`eventCalendarItem ${
                event.featured ? "eventCalendarItemFeatured" : ""
              }`}
              key={event.title}
            >
              <div className="eventCalendarDate">
                <span className="eventCalendarDay">{event.day}</span>
                <span className="eventCalendarMonth">{event.month}</span>
                <span className="eventCalendarYear">{event.year}</span>
              </div>

              <div className="eventCalendarDivider" />

              <div className="eventCalendarContent">
                <div className="eventCalendarMeta">
                  <span>{event.dateRange}</span>
                  <span>{event.type}</span>
                </div>

                <h3>{event.title}</h3>

                <p>{event.description}</p>
              </div>

              <div className="eventCalendarAction">
                <span className="eventCalendarStatus">
                  <span />
                  {event.status}
                </span>

                <a href={event.href}>
                  Detayları İncele
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <span className="eventCalendarIndex" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className="eventCalendarNotification">
          <div>
            <p>GOLDKOZMOS® DUYURULARI</p>

            <h3>
              Yeni grup çalışmaları ve ücretsiz etkinlikler duyurulduğunda ilk
              sen öğren.
            </h3>
          </div>

          <a href="/whatsapp-kanali">
            WhatsApp Kanalına Katıl
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}