import Link from "next/link";
import "../../styles/appointment-journey.css";

export default function AppointmentJourney() {
  return <section className="appointmentJourney" aria-label="Randevu süreci">
    <header><p>İLK ADIMDAN GÖRÜŞMEYE</p><h2>Randevun nasıl ilerler?</h2></header>
    <ol>
      <li><span>01</span><h3>Çalışmanı seç</h3><p>İhtiyacına uygun içeriği, süreyi ve ücreti incele. Kararsızsan WhatsApp’tan sorabilirsin.</p></li>
      <li><span>02</span><h3>Gün ve saati konuşalım</h3><p>Seçtiğin çalışma için WhatsApp’tan yaz. Uygun gün, saat ve katılım ayrıntılarını birlikte netleştirelim.</p></li>
      <li><span>03</span><h3>Randevunu teyit edelim</h3><p>Ödeme ve online katılım bilgileri görüşme öncesinde paylaşılır. Randevun karşılıklı teyitle kesinleşir.</p></li>
    </ol>
    <footer><span>Online · Birebir · Özge Batıgün ile</span><Link href="/hakkimda">Çalışma yaklaşımımı tanı →</Link></footer>
  </section>;
}
