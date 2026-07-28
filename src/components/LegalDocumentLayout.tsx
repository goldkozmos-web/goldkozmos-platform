import Link from "next/link";
import type { ReactNode } from "react";

type LegalDocumentLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

export default function LegalDocumentLayout({
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <>
      <section className="innerPageHero legalDocumentHero">
        <div className="innerPageHeroContainer">
          <p className="sectionEyebrow">
            <span>
              GOLDKOZMOS
              <sup className="registeredSymbol">®</sup>
            </span>

            <br />

            <span>ENERJİ EKOLÜ</span>

            <br />

            <span>{eyebrow}</span>
          </p>

          <h1>{title}</h1>

          <p>{description}</p>

          <div className="innerPageHeroActions">
            <a href="#yasal-metin">
              Metni İncele
              <span aria-hidden="true">↓</span>
            </a>

            <Link href="/yasal-bilgiler">
              Tüm Yasal Metinler
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="legalDocumentSection" id="yasal-metin">
        <div className="legalDocumentContainer">
          <aside className="legalDocumentSidebar">
            <p>YASAL BİLGİLENDİRME</p>

            <h2>{title}</h2>

            {updatedAt && (
              <div className="legalDocumentDate">
                <span>Son güncelleme</span>
                <strong>{updatedAt}</strong>
              </div>
            )}

            <nav aria-label="Yasal sayfa bağlantıları">
              <Link href="/gizlilik-politikasi">
                Gizlilik Politikası
              </Link>

              <Link href="/kvkk-aydinlatma-metni">
                KVKK Aydınlatma Metni
              </Link>

              <Link href="/kullanim-kosullari">
                Kullanım Koşulları
              </Link>

              <Link href="/iptal-ve-iade-politikasi">
                İptal ve İade Politikası
              </Link>

              <Link href="/mesafeli-satis-sozlesmesi">
                Mesafeli Satış Sözleşmesi
              </Link>

              <Link href="/erisilebilirlik">
                Erişilebilirlik Bildirimi
              </Link>
            </nav>

            <Link
              href="/iletisim"
              className="legalDocumentContactLink"
            >
              Bir Sorun mu Var?
              <span aria-hidden="true">→</span>
            </Link>
          </aside>

          <article className="legalDocumentContent">
            {children}

            <div className="legalDocumentNotice">
              <span aria-hidden="true">i</span>

              <p>
                Bu sayfadaki bilgiler genel bilgilendirme amacıyla
                sunulmaktadır. Yasal metinlerin güncel mevzuata ve işletmenin
                gerçek hizmet süreçlerine uygunluğu ayrıca kontrol
                edilmelidir.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}