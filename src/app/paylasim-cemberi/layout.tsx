import type {Metadata} from 'next';
import HomeNavbar from '../../components/HomeNavbar';
import CircleHero from '../../components/community/CircleHero';
import FooterSection from '../../components/FooterSection';
import Link from 'next/link';
import '../../styles/home.css';
import '../../styles/community.css';
import '../../styles/community-feed-refined.css';
export const metadata:Metadata={title:'Paylaşım Çemberi | Goldkozmos',description:'Birbirimizi dinlediğimiz, deneyimlerimizi paylaştığımız kişisel gelişim topluluğu.',robots:{index:false,follow:false}};
export default function CircleLayout({children}:{children:React.ReactNode}){return <main className="homeV3Page circlePage"><HomeNavbar/><CircleHero/><div className="circleContainer"><nav className="circleNavigation" aria-label="Topluluk gezinmesi"><Link href="/paylasim-cemberi">Akış</Link><Link href="/paylasim-cemberi/kaydettiklerim">Kaydettiklerim</Link><Link href="/bildirimler">Bildirimler</Link></nav>{children}<aside className="circleGuidelines"><strong>Bu çemberde birbirimize alan açıyoruz.</strong><p>Deneyimini kendi dilinle anlat. Farklı düşüncelere saygı göster; kişisel bilgileri, hakaretleri ve izinsiz tanıtımları paylaşma. Rahatsız edici içerikleri Rapor et seçeneğiyle yöneticiye iletebilirsin.</p><p>GoldKozmos burada topluluğun moderatörü ve rehberi. Yönetici cevapları müsaitliğe göre gelir.</p></aside></div><FooterSection/></main>;}
