# GoldKozmos grup çalışmaları — geliştirme ve açılış notları

## Kapsam

Güncel uygulama kaynakları korunarak `codex/group-event-registration-20261109` dalında geliştirildi. Mevcut sayfalardan yalnızca `src/app/calismalar/ResonancePage.tsx` değişti: mevcut içeriğin önüne Yaklaşan Etkinlikler eklendi. Ana sayfa, genel menüler ve diğer mevcut sayfalar değiştirilmedi. Yeni yönetim ekranı `/admin/grup-calismalari`; mevcut yönetim oturum kontrolünü kullanır. Menüye yeni bağlantı eklenmedi.

Başlangıç commit'i güncel yerel uygulamanın korunmuş kaynaklarını içerir. Daha önce Git'e kaydedilmemiş güncel kaynaklar bu temel commit'tedir. Grup sistemi değişikliklerini yalnızca bu temel commit'e göre incele; eski GitHub dalıyla karşılaştırma, önceki site geliştirmelerini de fark olarak gösterebilir. Yerel ekran görüntüleri ve geçmiş inceleme dokümanları Git dalına ve dağıtım paketine eklenmez.

## Etkinlikler

- 14 Kasım 2026 Cumartesi: Karmalarından Arın.
- 17 Kasım 2026 Salı: Mekân Enerjisi Arınması.
- 20 Kasım 2026 Cuma: Dişil–Eril Enerji Dengeleme.
- 22 Kasım 2026 Pazar: İlişkisel Blokajlardan Arınma.

Hepsi 20.30 Türkiye saati (`Europe/Istanbul`, UTC+03:00), 600 TL, Google Meet, tek günlük canlı grup çalışması. Kontenjan sınırı uygulanmaz. Açıklamalar kullanıcı incelemesi için hazırlanmıştır. Yeni görsel üretilmedi; ileride `src/data/groupEvents.ts` içindeki etkinliklere isteğe bağlı `cover: { src, alt }` eklenebilir.

## Şu anda kapalı olan işlemler

Kullanıcı Shopier bilgilerinin hazır olmadığını belirtti. Bu nedenle gerçek ödeme ve yeni kayıt alma varsayılan olarak kapalıdır. Önizlemede kartlar, detay alanları ve form görülebilir; başvuruyu ödeme aşamasına gönderen düğme kapalıdır. Sahte ödeme onayı, sahte katılımcı veya sahte Meet bağlantısı kullanılmaz.

Yerel kaynakların ortam dosyalarında Supabase service-role, Shopier ve e-posta sağlayıcı anahtarları bulunmadı. Mevcut Vercel gizli ayarlarının değerleri okunmadı. Üretim veri tabanı geçişi uygulanmadı.

## Gerekli ayarlar

Gizli değerleri Git'e veya sohbete yazma. Önce ayrı test veri tabanı ve Vercel Preview ortamı kullan:

```dotenv
GROUP_EVENTS_ENABLED=false
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GROUP_EVENT_RATE_SECRET=
SHOPIER_PAT=
SHOPIER_WEBHOOK_TOKEN=
SHOPIER_EVENT_KARMA_PRODUCT_ID=
SHOPIER_EVENT_MEKAN_PRODUCT_ID=
SHOPIER_EVENT_DENGE_PRODUCT_ID=
SHOPIER_EVENT_ILISKI_PRODUCT_ID=
RESEND_API_KEY=
GROUP_EVENT_EMAIL_FROM=
```

`GROUP_EVENT_RATE_SECRET` en az 32 karakterlik rastgele sunucu sırrı olmalı. Service-role anahtarı yalnızca sunucu tarafında kullanılır; `NEXT_PUBLIC_` ön ekiyle tanımlama.

Yeni `supabase/migrations/20261109210000_group_event_registration.sql` dosyasını önce test veri tabanında uygula. Eski geçişleri tekrar çalıştırma ve veri tabanını sıfırlama. Yeni tablolar RLS ile kapalıdır; anon ve authenticated rollerine doğrudan okuma/yazma yetkisi verilmez. Uygulama, sunucu tarafındaki mevcut yönetici kimlik doğrulamasından sonra service-role istemcisiyle erişir.

Shopier'de bu dört tarih için dört ayrı dijital ürün oluşturulmalı; her biri 600 TL olmalı, kargo veya indirim uygulanmamalı. Sayısal ürün kimliklerini ilgili dört ayara gir. Aynı ürün kimliğini iki etkinlikte kullanmak kayıt açılışını engeller. Katılımcı formdaki e-postayla, yalnızca seçtiği etkinliği 1 adet olarak satın alır. Farklı e-posta veya sepetin başka ürünler içermesi otomatik eşleşmez; yönetici kontrolü gerekir. Ürün bağlantısı yalnızca sunucu tarafından bu kimliklerden oluşturulur.

PAT için sipariş okuma yetkisi ve ilgili Shopier hesabına erişim gerekir. Shopier'de `order.created` webhook'u, ilgili ortamın `https://HOST/api/group-events/shopier/webhook` adresine bağlanmalı. Webhook token'ı bu aboneliğin token'ı olmalı. Resmi REST webhook akışı kullanılır; eski, doğrulanmamış PHP modül örnekleri kullanılmaz.

Google Meet bağlantılarını yeni yönetim ekranında her etkinlik için ayrı kaydet. Bağlantılar genel HTML'e veya kayıt durumu yanıtına eklenmez. Onay e-postası yalnızca ödeme yeniden doğrulandıktan sonra kayıtlı e-postaya gönderilebilir. Resend hesabında gönderen alan adı doğrulanmış olmalıdır. Burada e-posta hizmeti oluşturulmadı ve gerçek e-posta gönderilmedi.

Mevcut KVKK metninde veri sorumlusu/iletişim için doldurulmamış alanlar görüldü. Kayıt formu mevcut KVKK, satış ve iade metinlerine bağlanır; bu sayfalar değiştirilmedi. Gerçek kayıt almadan önce işletmeye ait bilgileri ve grup çalışmasına uygulanacak metinleri tamamlayıp onayla. Formda pazarlama izni istenmez; hizmet başvurusu için ayrı aydınlatma okundu bilgisi ve katılım koşulları kabulü kaydedilir.

Bu hazırlıklar, gerçek sağlayıcı testi ve kullanıcı incelemesi tamamlandıktan sonra ilgili ortamda `GROUP_EVENTS_ENABLED=true` tanımlanıp yeniden dağıtılmalı. Üretime geçiş kullanıcı onayına bağlıdır.

## Kayıt ve ödeme güvenliği

- Formdan ücret veya ödeme durumu alınmaz; 60.000 kuruş/TRY sunucuda belirlenir.
- Kayıt önce `pending` olur. Tarayıcıda başarı mesajı veya URL parametresi ödeme sayılmaz.
- Webhook'un ham gövdesi HMAC-SHA256 ile doğrulanır; ardından sipariş sunucudan Shopier REST API'siyle tekrar okunur. İmza, ürün, adet, tutar, para birimi, e-posta, iade ve sipariş tarihi kontrol edilir.
- Yalnızca ilgili başvurudan sonra ve etkinlikten önce oluşan sipariş kabul edilir. Yeni başvuru öncesi eski makbuz kullanılamaz.
- Başarılı ödeme, tek koşullu veri tabanı işlemiyle kesin kayda çevrilir. Aynı sipariş iki kayda bağlanamaz; tekrarlanan webhook ikinci kayıt oluşturmaz.
- Etkinlik/e-posta çifti benzersizdir. Tekrar başvuru 409 döndürür; kişisel veriler veya mevcut kaydın erişim anahtarı açıklanmaz. Yanlış e-postalı başvurular yönetici desteği gerektirir; kullanıcıya açık bir e-posta değiştirme veya mevcut kaydı ele geçirme yolu eklenmedi.
- Kayıt durumuna erişim için rastgele 256-bit HttpOnly/SameSite çerezi gerekir; veri tabanında yalnızca anahtar özeti saklanır. Bu yanıt kişisel veriler ve Meet bağlantısı içermez. Tarayıcı çerezi kaybolursa onay e-postası kullanılmalıdır; yalnızca kayıt numarası erişim vermez.
- Saatlik IP tabanlı sunucu limiti ve form tuzağı spam'i azaltır. Bu limit etkinlik kontenjanı değildir. Vercel dışında yayımlanırsa güvenilir proxy IP başlığını ayrıca doğrula. Süresi geçmiş rate-limit satırları zamanlanmış bakımda temizlenebilir.
- Başarısız webhook işlemleri tekrar denenebilmesi için 503 döndürür. İş eşleşmesi olmayan ödemeler 200 ile alınır; yönetici sipariş numarasıyla güvenli yeniden eşleştirme yapabilir.

## Yönetici kullanımı

Mevcut yönetici hesabıyla `/admin/grup-calismalari` adresini aç. Her etkinliğin başvuru ve kesin kayıt sayısı, katılımcı bilgileri, ödeme durumu ve kayıt tarihi görülebilir. Liste 50 kayıtlık sayfalarla açılır.

Otomatik bildirim gecikirse kayıt satırına Shopier sipariş numarasını yazıp “Shopier’den doğrula” düğmesini kullan. Bu işlem elle “ödendi” işaretlemez; siparişi Shopier'den okuyarak aynı kontrolleri uygular. Yanlış tutar/e-posta/etkinlik kabul edilmez.

Ödeme doğrulandıktan ve etkinlik Meet bağlantısı kaydedildikten sonra “Onay e-postası gönder” kullanılabilir. Gönderimde tekrar ödeme doğrulaması yapılır; bekleyen/iade edilen ödeme veya eksik bağlantıyla e-posta gönderilmez. Onaylar yönetici tarafından gönderilir; otomatik toplu e-posta veya zamanlanmış hatırlatma bu kapsamda eklenmedi. İade oluşturma işlemi yoktur; Shopier panelinden yapılan iadelerin durumu gönderim öncesinde tekrar kontrol edilir.

## Test

```powershell
node --test scripts/group-events.test.ts
$env:GROUP_EVENT_TEST_BASE_URL='http://127.0.0.1:3100'
node --test scripts/group-events.test.ts
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

Testler gerçek Shopier tahsilatı veya e-posta gönderimi yapmaz. SQL geçişi, RLS/rol erişimi, tekil ödeme, tekrarlanan callback ve rate-limit davranışı PGlite PostgreSQL motoruyla test edilir. API testi, yapılandırılmamış bir geliştirme sunucusunda güvenli reddetme akışlarını kontrol eder. Gerçek Shopier ve Supabase uçtan uca testi gerekli erişimler sağlanana kadar tamamlanamaz.

Resmi kaynaklar: https://developer.shopier.com/reference/get-orders-id , https://developer.shopier.com/reference/the-order-model , https://developer.shopier.com/reference/webhook-configuration , https://developer.shopier.com/reference/events-headers-payloads , https://resend.com/docs/api-reference/emails/send-email , https://resend.com/docs/dashboard/emails/idempotency-keys .
