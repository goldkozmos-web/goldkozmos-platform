import AdminEmpty from "../../../components/admin/AdminEmpty";

export default function AdminContentPage() {
  return (
    <div className="adminStack">
      <AdminEmpty
        eyebrow="İçerik"
        title="Kataloglar bağlı"
        text="Günün mesajları, eylemler, blog, bildirimler, 21 günlük yolculuk ve topluluk bekleme listesi mevcut tablolardan okunur. Bu ekran ileride yönetim için açılır; sahte içerik üretilmez."
      />
      <ul className="adminQuiet">
        <li>Günün Mesajları → daily_messages</li>
        <li>GoldKozmos Eylemleri → daily_actions</li>
        <li>Blog → GoldBlog veri kaynağı</li>
        <li>Kullanıcı Bildirimleri → notifications</li>
        <li>21 Günlük Yolculuk → user_journey_days</li>
        <li>Topluluk Bekleme Listesi → community_waitlist</li>
      </ul>
    </div>
  );
}
