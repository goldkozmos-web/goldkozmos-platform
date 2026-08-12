import Link from "next/link";

const recordings = [
  {
    number: "01",
    title: "7 Çakra Dengeleme Çalışması",
    description:
      "Daha önce canlı gerçekleştirilen çalışmanın kayıtlı versiyonu. Kendi zamanında izleyip uygulayabileceğin dijital erişim.",
    format: "Canlı Yayın Kaydı",
    price: "750 TL",
    href: "/calismalar/ses-kayitlari",
  },
];

export default function LiveRecordingsSection() {
  return (
    <section className="liveRecordingsSection" id="canli-yayin-kayitlari">
      <div className="liveRecordingsContainer">
        <div className="liveRecordingsHeader">
          <div>
            <p className="sectionEyebrow">CANLI YAYIN KAYITLARI</p>

            <h2>
              Kaçırdığın çalışmaları
              <span> kendi zamanında izle.</span>
            </h2>
          </div>

          <p>
            Daha önce canlı gerçekleştirilen seçili çalışmaların kayıtlarına
            dijital olarak erişebilirsin.
          </p>
        </div>

        <div className="liveRecordingsGrid">
          {recordings.map((recording) => (
            <article className="liveRecordingCard" key={recording.title}>
              <div className="liveRecordingIndex">
                <span>{recording.number}</span>
                <span aria-hidden="true">▶</span>
              </div>

              <div className="liveRecordingBody">
                <p className="liveRecordingEyebrow">{recording.format}</p>

                <h3>{recording.title}</h3>

                <p className="liveRecordingDescription">
                  {recording.description}
                </p>
              </div>

              <div className="liveRecordingFooter">
                <strong>{recording.price}</strong>

                <Link href={recording.href}>
                  Kaydı İncele
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="liveRecordingsNote">
          Kayıtlı çalışmalar genel kişisel farkındalık ve bireysel uygulama
          amacıyla sunulur; tıbbi veya psikolojik destek yerine geçmez.
        </p>
      </div>
    </section>
  );
}