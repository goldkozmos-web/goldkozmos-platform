import Link from "next/link";

const archetypeClues = [
  "İlişkilerde tekrar eden rolün",
  "Karar verirken kullandığın temel eğilim",
  "Güçlü yanların ve gölge tarafların",
  "Sana en yakın çalışma alanı",
];

export default function ArchetypeTestSection() {
  return (
    <section className="archetypeTestSection" id="arketip-testi">
      <div className="archetypeTestContainer">
        <div className="archetypeTestCard">
          <div className="archetypeTestCopy">
            <p className="sectionEyebrow">ÜCRETSİZ ARKETİP TESTİ</p>

            <h2>
              Nereden başlayacağını
              <span> bilmiyor musun?</span>
            </h2>

            <p className="archetypeTestLead">
              Kendi Arketipini Bul testi; davranışlarında, ilişkilerinde ve
              seçimlerinde öne çıkan eğilimleri fark etmene yardımcı olan
              kısa bir öz farkındalık deneyimidir.
            </p>

            <div className="archetypeTestClues">
              {archetypeClues.map((item, index) => (
                <div className="archetypeTestClue" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="archetypeTestActions">
              <Link
                className="archetypeTestPrimary"
                href="/sana-uygun-calismayi-bul"
              >
                Teste Başla
                <span aria-hidden="true">→</span>
              </Link>

              <p>Ücretsiz · Kısa · Öz farkındalık odaklı</p>
            </div>
          </div>

          <div className="archetypeTestVisual" aria-hidden="true">
            <div className="archetypeOrbit archetypeOrbitOne" />
            <div className="archetypeOrbit archetypeOrbitTwo" />
            <div className="archetypeOrbit archetypeOrbitThree" />

            <div className="archetypeCore">
              <span>✦</span>
              <strong>BEN</strong>
              <small>MERKEZ</small>
            </div>

            <span className="archetypeWord archetypeWordOne">SEÇİM</span>
            <span className="archetypeWord archetypeWordTwo">SINIR</span>
            <span className="archetypeWord archetypeWordThree">İLİŞKİ</span>
            <span className="archetypeWord archetypeWordFour">DEĞER</span>
          </div>
        </div>

        <p className="archetypeTestNote">
          Test sonucu kesin bir kişilik tanımı veya psikolojik değerlendirme
          değildir. Kendini farklı bir açıdan gözlemlemene yardımcı olmak için
          hazırlanmıştır.
        </p>
      </div>
    </section>
  );
}