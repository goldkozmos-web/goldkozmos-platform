import type {Metadata} from 'next';
import HomeNavbar from '../../components/HomeNavbar';
import FooterSection from '../../components/FooterSection';
import CircleNotifications from '../../components/community/CircleNotifications';
import '../../styles/home.css';
import '../../styles/community.css';
export const metadata:Metadata={title:'Bildirimler | Goldkozmos',robots:{index:false,follow:false}};
export default function Page(){return <main className="homeV3Page circlePage"><HomeNavbar/><header className="circleHero"><div><p>GOLDKOZMOS · SANA GELENLER</p><h1>Bildirimler</h1><p>Bir yorum, bir yanıt, bir küçük destek.</p></div></header><div className="circleContainer"><CircleNotifications/></div><FooterSection/></main>;}
