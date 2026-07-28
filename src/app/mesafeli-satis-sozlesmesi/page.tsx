import Navbar from "../../components/Navbar";
import LegalDocumentLayout from "../../components/LegalDocumentLayout";
import FooterSection from "../../components/FooterSection";
import "../../styles/home.css";

export default function DistanceSalesAgreementPage() {
  return (
    <main className="homePage" id="top">
      <Navbar />

      <LegalDocumentLayout
        eyebrow="MESAFELİ SATIŞ SÖZLEŞMESİ"
        title="Mesafeli Satış Sözleşmesi"
        description="Goldkozmos® Enerji Ekolü kapsamında çevrim içi olarak satın alınan hizmetler, analizler ve dijital içeriklere ilişkin tarafların hak ve yükümlülüklerini incele."
        updatedAt="28 Temmuz 2026"
      >
        <section className="legalDocumentBlock">
          <h2>1. Taraflar</h2>

          <p>
            İşbu Mesafeli Satış Sözleşmesi, aşağıdaki bilgileri bulunan
            sağlayıcı ile elektronik ortamda sipariş oluşturan alıcı veya
            tüketici arasında kurulmuştur.
          </p>
        </section>

        <section className="legalDocumentBlock legalDocumentContact">
          <p>SAĞLAYICI BİLGİLERİ</p>

          <h2>Goldkozmos® Enerji Ekolü</h2>

          <dl>
            <div>
              <dt>Ad, soyad veya unvan</dt>
              <dd>[Ad Soyad veya Ticari Unvan]</dd>
            </div>

            <div>
              <dt>Marka</dt>
              <dd>Goldkozmos® Enerji Ekolü</dd>
            </div>

            <div>
              <dt>Vergi veya MERSİS no.</dt>
              <dd>[Vergi veya MERSİS numarası eklenecek]</dd>
            </div>

            <div>
              <dt>Adres</dt>
              <dd>[Tebligat adresi eklenecek]</dd>
            </div>

            <div>
              <dt>Telefon</dt>
              <dd>[Telefon numarası eklenecek]</dd>
            </div>

            <div>
              <dt>E-posta</dt>
              <dd>[E-posta adresi eklenecek]</dd>
            </div>
          </dl>
        </section>

        <section className="legalDocumentBlock legalDocumentContact">
          <p>ALICI VEYA TÜKETİCİ BİLGİLERİ</p>

          <h2>Sipariş sırasında beyan edilen bilgiler.</h2>

          <dl>
            <div>
              <dt>Ad ve soyad</dt>
              <dd>[Sipariş sırasında doldurulacak]</dd>
            </div>

            <div>
              <dt>Telefon</dt>
              <dd>[Sipariş sırasında doldurulacak]</dd>
            </div>

            <div>
              <dt>E-posta</dt>
              <dd>[Sipariş sırasında doldurulacak]</dd>
            </div>

            <div>
              <dt>Adres</dt>
              <dd>[Gerekliyse sipariş sırasında doldurulacak]</dd>
            </div>
          </dl>
        </section>

        <section className="legalDocumentBlock">
          <h2>2. Sözleşmenin konusu</h2>

          <p>
            İşbu sözleşmenin konusu, tüketicinin elektronik ortamda sipariş
            verdiği hizmetin veya dijital içeriğin sunulması karşılığında
            ödeyeceği bedel ile tarafların hak ve yükümlülüklerinin
            belirlenmesidir.
          </p>

          <p>
            Sipariş Özeti, Ön Bilgilendirme Formu, hizmet açıklaması,
            ödeme bilgileri ve tüketicinin elektronik ortamda verdiği
            onaylar bu sözleşmenin ayrılmaz parçasıdır.
          </p>
        </section>

        <section className="legalDocumentBlock legalDocumentContact">
          <p>SİPARİŞ VE HİZMET BİLGİLERİ</p>

          <h2>Satın alınan hizmet veya dijital içerik.</h2>

          <dl>
            <div>
              <dt>Hizmet veya ürün</dt>
              <dd>[Satın alınan çalışma veya içerik adı]</dd>
            </div>

            <div>
              <dt>Hizmet türü</dt>
              <dd>
                [Birebir seans, grup çalışması, tarot, numeroloji, dijital
                kitap veya ses kaydı]
              </dd>
            </div>

            <div>
              <dt>Temel nitelikler</dt>
              <dd>[İlgili hizmet sayfasındaki açıklama]</dd>
            </div>

            <div>
              <dt>Adet veya süre</dt>
              <dd>[Siparişe göre doldurulacak]</dd>
            </div>

            <div>
              <dt>Toplam ücret</dt>
              <dd>[Vergiler dâhil toplam ücret]</dd>
            </div>

            <div>
              <dt>Ödeme yöntemi</dt>
              <dd>[IBAN, banka kartı, kredi kartı veya satış platformu]</dd>
            </div>

            <div>
              <dt>İfa veya teslim tarihi</dt>
              <dd>[Randevu, program veya dijital teslim tarihi]</dd>
            </div>

            <div>
              <dt>Teslim yöntemi</dt>
              <dd>
                [Google Meet, e-posta, WhatsApp veya dijital erişim bağlantısı]
              </dd>
            </div>
          </dl>
        </section>

        <section className="legalDocumentBlock">
          <h2>3. Sözleşmenin kurulması</h2>

          <p>
            Sözleşme, tüketicinin ön bilgilendirme metnini ve işbu sözleşmeyi
            elektronik ortamda okuyarak onaylaması ve ödeme yükümlülüğü
            doğuran siparişi tamamlamasıyla kurulur.
          </p>

          <p>
            Tüketici, sipariş vermeden önce hizmetin temel nitelikleri,
            toplam fiyatı, ödeme yöntemi, ifa veya teslim koşulları,
            cayma hakkı ve cayma istisnaları hakkında bilgilendirildiğini
            kabul eder.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>4. Ücret ve ödeme</h2>

          <p>
            Sözleşme konusu hizmetin veya dijital içeriğin vergiler dâhil
            toplam bedeli, sipariş özeti ve ödeme ekranında gösterilen
            tutardır.
          </p>

          <p>
            Tüketicinin ayrıca açık onayı alınmadıkça, sipariş sırasında
            belirtilen toplam bedelin dışında ilave ücret talep edilmez.
          </p>

          <p>
            Ödeme, sipariş sırasında sunulan banka, IBAN, ödeme kuruluşu
            veya aracı satış platformu üzerinden gerçekleştirilebilir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>5. Hizmetin ifası ve dijital teslim</h2>

          <p>
            Birebir seanslar, grup çalışmaları ve çevrim içi programlar,
            sipariş sırasında belirtilen tarih, saat ve dijital platform
            üzerinden gerçekleştirilir.
          </p>

          <p>
            Tarot ve numeroloji analizleri, sipariş sırasında alınan bilgiler
            doğrultusunda hazırlanarak belirtilen iletişim kanalı üzerinden
            teslim edilir.
          </p>

          <p>
            GoldBook, GoldFrekans, ses kaydı, doküman ve diğer dijital
            içerikler; e-posta, WhatsApp, indirme bağlantısı veya kullanıcıya
            tanımlanan dijital erişim aracılığıyla teslim edilebilir.
          </p>

          <p>
            Dijital içeriğin teslim edilmiş sayılacağı an, erişim
            bağlantısının tüketiciye gönderildiği veya içeriğin kullanıma
            açıldığı andır.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>6. Tüketicinin yükümlülükleri</h2>

          <p>Tüketici aşağıdaki yükümlülüklere uymayı kabul eder:</p>

          <ul>
            <li>
              Sipariş ve başvuru sırasında doğru ve güncel bilgi vermek
            </li>

            <li>
              Çevrim içi çalışma için gerekli cihaz ve internet bağlantısını
              hazırlamak
            </li>

            <li>
              Seans veya program saatinde belirtilen platformda hazır olmak
            </li>

            <li>
              Satın alınan dijital içerikleri yalnızca kişisel amaçla
              kullanmak
            </li>

            <li>
              Başka kişilere ait bilgi, fotoğraf veya belge paylaşırken
              gerekli izinleri almak
            </li>

            <li>
              Hizmet açıklamalarında belirtilen hazırlık ve kullanım
              koşullarına uymak
            </li>
          </ul>
        </section>

        <section className="legalDocumentBlock">
          <h2>7. Cayma hakkı</h2>

          <p>
            Tüketici, cayma hakkı istisnaları saklı kalmak üzere, mesafeli
            hizmet sözleşmesinin kurulduğu tarihten itibaren on dört gün
            içinde herhangi bir gerekçe göstermeden ve cezai şart ödemeden
            sözleşmeden cayabilir.
          </p>

          <p>
            Cayma bildiriminin süresi içinde yazılı olarak veya e-posta gibi
            kalıcı veri saklayıcısı aracılığıyla sağlayıcıya yöneltilmesi
            yeterlidir.
          </p>

          <p>
            Cayma hakkının kullanılması için örnek cayma formunun kullanılması
            zorunlu değildir. Tüketici, cayma kararını açıkça ifade eden
            yazılı bir bildirim de gönderebilir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>8. Cayma hakkının kullanılamayabileceği durumlar</h2>

          <p>
            Yürürlükteki mevzuatta belirtilen koşulların oluşması hâlinde
            aşağıdaki sözleşmelerde cayma hakkı kullanılamayabilir:
          </p>

          <ul>
            <li>
              Elektronik ortamda anında ifa edilen hizmetler
            </li>

            <li>
              Tüketiciye anında teslim edilen dijital kitap, ses kaydı,
              doküman veya diğer gayrimaddi içerikler
            </li>

            <li>
              Cayma süresi sona ermeden önce tüketicinin açık onayıyla
              ifasına başlanan birebir seanslar ve diğer hizmetler
            </li>

            <li>
              Tüketicinin kişisel talebi doğrultusunda hazırlanmasına
              başlanmış, kişiye özgü hizmet veya içerikler
            </li>
          </ul>

          <p>
            Cayma hakkının kaybedileceği bir işlem söz konusuysa tüketici,
            satın alma tamamlanmadan önce ayrıca bilgilendirilir ve gereken
            onayı vermesi istenir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>9. Cayma bildirimi ve bedel iadesi</h2>

          <p>
            Cayma bildirimi aşağıdaki iletişim kanallarından biri üzerinden
            yapılabilir:
          </p>

          <ul>
            <li>[Cayma bildirimi e-posta adresi]</li>
            <li>[Varsa çevrim içi cayma veya iade formu]</li>
            <li>[Yazılı bildirim adresi]</li>
          </ul>

          <p>
            Geçerli bir cayma hakkının kullanılması hâlinde tahsil edilen
            ödemeler, mevzuatta öngörülen süre içinde ve tüketicinin satın
            alma sırasında kullandığı ödeme aracına uygun biçimde iade edilir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>10. Randevu değişikliği ve katılım</h2>

          <p>
            Birebir seanslara ilişkin tarih veya saat değişikliği talepleri,
            mümkün olduğunca randevu başlamadan önce sağlayıcıya
            bildirilmelidir.
          </p>

          <p>
            Grup çalışmaları belirli tarih ve saatlerde, sınırlı kontenjanla
            düzenlenebilir. Katılımcının kişisel nedenlerle toplantılara
            katılamaması, hizmetin sunulmadığı anlamına gelmez.
          </p>

          <p>
            Tüketicinin mevzuattan doğan cayma, ayıplı hizmet ve bedel iadesi
            hakları saklıdır.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>11. Sağlayıcı tarafından iptal</h2>

          <p>
            Hizmetin sağlayıcı tarafından gerçekleştirilememesi hâlinde,
            tüketiciye yeni tarih, eş değer başka bir hizmet veya ücret
            iadesi seçeneklerinden uygun olanı sunulur.
          </p>

          <p>
            Hizmetin sunulmasının imkânsızlaştığı durumlarda tüketiciye
            yazılı olarak veya kalıcı veri saklayıcısı ile bilgi verilir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>12. Ayıplı veya eksik hizmet</h2>

          <p>
            Sağlayıcı, sözleşme konusu hizmeti sipariş sırasında belirtilen
            temel niteliklere uygun biçimde sunmakla yükümlüdür.
          </p>

          <p>
            Hizmetin hiç sunulmaması, eksik sunulması veya vaat edilen temel
            özelliklere uygun olmaması hâlinde tüketicinin yürürlükteki
            mevzuattan doğan hakları saklıdır.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>13. Hizmetlerin niteliği</h2>

          <p>
            Goldkozmos® Enerji Ekolü kapsamında sunulan enerji, tarot,
            numeroloji, ses kaydı ve farkındalık çalışmaları kişisel
            farkındalık ve içsel denge sürecini desteklemeyi amaçlar.
          </p>

          <p>
            Bu hizmetler tıbbi teşhis, psikoterapi, psikolojik tedavi,
            hukuki danışmanlık veya sağlık hizmeti yerine geçmez.
          </p>

          <p>
            Belirli bir sonuç, ilişki, gelir, sağlık durumu veya gelecek
            gelişmesi garanti edilmez.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>14. Fikrî mülkiyet hakları</h2>

          <p>
            Dijital kitaplar, ses kayıtları, analizler, program dokümanları,
            eğitim içerikleri ve diğer özgün materyaller yalnızca satın alan
            kişinin kişisel kullanımı içindir.
          </p>

          <p>
            İçeriklerin izinsiz kaydedilmesi, çoğaltılması, paylaşılması,
            yeniden satılması, yayınlanması veya ticari amaçla kullanılması
            yasaktır.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>15. Kişisel veriler</h2>

          <p>
            Tüketicinin kişisel verileri, hizmetin yürütülmesi, iletişim,
            ödeme, muhasebe ve yasal yükümlülüklerin yerine getirilmesi
            amacıyla işlenebilir.
          </p>

          <p>
            Kişisel verilerin işlenmesine ilişkin ayrıntılar Gizlilik
            Politikası ve KVKK Aydınlatma Metni içerisinde açıklanır.
          </p>

          <ul>
            <li>
              <a href="/gizlilik-politikasi">
                Gizlilik Politikasını İncele
              </a>
            </li>

            <li>
              <a href="/kvkk-aydinlatma-metni">
                KVKK Aydınlatma Metnini İncele
              </a>
            </li>
          </ul>
        </section>

        <section className="legalDocumentBlock">
          <h2>16. Uyuşmazlıkların çözümü</h2>

          <p>
            Tüketici, uyuşmazlık hâlinde yürürlükteki parasal sınırlar
            çerçevesinde Tüketici Hakem Heyetine veya Tüketici Mahkemesine
            başvurabilir.
          </p>

          <p>
            Tüketicilerin yürürlükteki mevzuattan doğan emredici hakları bu
            sözleşme ile sınırlandırılamaz.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>17. Bildirimler</h2>

          <p>
            Taraflar, sipariş sırasında beyan ettikleri iletişim bilgilerinin
            doğru olduğunu kabul eder.
          </p>

          <p>
            E-posta, kullanıcı hesabı, ödeme platformu veya diğer kalıcı veri
            saklayıcıları üzerinden yapılan bildirimler geçerli kabul edilir.
          </p>
        </section>

        <section className="legalDocumentBlock">
          <h2>18. Yürürlük</h2>

          <p>
            Tüketici, siparişi tamamlamadan önce Ön Bilgilendirme Formunu ve
            işbu Mesafeli Satış Sözleşmesini okuyup kabul ettiğini elektronik
            ortamda teyit eder.
          </p>

          <p>
            İşbu sözleşme, tüketicinin ödeme yükümlülüğü doğuran siparişi
            onayladığı tarihte elektronik ortamda yürürlüğe girer.
          </p>
        </section>

        <section className="legalDocumentBlock legalDocumentContact">
          <p>CAYMA, İADE VE SÖZLEŞME İLETİŞİMİ</p>

          <h2>Talebini yazılı olarak ilet.</h2>

          <dl>
            <div>
              <dt>Sağlayıcı</dt>
              <dd>[Ad Soyad veya Ticari Unvan]</dd>
            </div>

            <div>
              <dt>Marka</dt>
              <dd>Goldkozmos® Enerji Ekolü</dd>
            </div>

            <div>
              <dt>E-posta</dt>
              <dd>[Cayma ve sözleşme e-postası eklenecek]</dd>
            </div>

            <div>
              <dt>Adres</dt>
              <dd>[Tebligat adresi eklenecek]</dd>
            </div>
          </dl>
        </section>
      </LegalDocumentLayout>

      <FooterSection />
    </main>
  );
}