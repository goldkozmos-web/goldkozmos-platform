import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "../../lib/seo";
import { GOLDLINK_LINKS } from "../../data/goldlink";
import GoldlinkTracker from "../../components/GoldlinkTracker";
import styles from "./page.module.css";

export const metadata = pageMetadata("/goldlink", "GoldLink · Kendi Kozmosunu Bul", "GoldKozmos ücretsiz rehberi, enerji çalışmaları, birebir seanslar, GoldBook ve topluluk bağlantıları. Kendine bir alan seç.");



export default function GoldlinkPage() {
  return <main className={styles.page}>
    <GoldlinkTracker />
    <div className={styles.inner}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="GoldKozmos ana sayfa">GOLDKOZMOS<sup>®</sup></Link>
        <p className={styles.motto}>Kendi Kozmosunu Bul</p>
        <div className={styles.portraitFrame}><Image src="/images/basla/ozge-portre.webp" alt="Özge Batıgün" width={160} height={160} sizes="160px" /></div>
        <h1 className={styles.srOnly}>GoldLink · GoldKozmos bağlantıları</h1>
        <p className={styles.intro}>Bu alandaki tüm yenilikleri keşfet.<br />Sana uygun bağlantıya tıklayarak başla.</p>
      </header>
      <nav aria-label="GoldKozmos bağlantıları" className={styles.links}>
        {GOLDLINK_LINKS.map(item => <a data-goldlink-id={item.id} key={item.title} href={item.href} className={`${styles.link} ${item.featured ? styles.featured : ""}`}>
          <span className={styles.thumbnail}><Image src={item.image} alt="" fill sizes="(max-width: 380px) 68px, 84px" /></span>
          <span className={styles.copy}>{item.featured ? <span className={styles.tag}>İLK ADIMIN</span> : null}<strong>{item.title}</strong><span>{item.description}</span></span>
          <span className={styles.arrow} aria-hidden="true">{item.href.startsWith("https:") ? "↗" : "→"}</span>
        </a>)}
      </nav>
      <footer className={styles.footer}><span aria-hidden="true">✧</span><p>Özge Batıgün · GoldKozmos®</p><Link href="/">Web sitesini keşfet →</Link></footer>
    </div>
  </main>;
}
