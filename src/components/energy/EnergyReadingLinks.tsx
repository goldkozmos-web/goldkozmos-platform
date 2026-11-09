import Link from "next/link";

export default function EnergyReadingLinks({ slug }: { slug: string }) {
  const chakra = slug.includes("cakra");
  const clearing = ["karma-temizligi", "nazar-temizligi", "mekan-enerjisi-temizligi", "atalardan-gelen-negatif-bag"].includes(slug);
  return <nav className="energyReadingLinks" aria-label="Çalışmayla ilgili rehberler">
    <p>Çalışmayı seçmeden önce</p>
    <Link href="/kozmik-enerji">Online enerji çalışması nasıl ilerler? →</Link>
    {chakra ? <Link href="/cakralar">7 çakranın özellikleri →</Link> : clearing ? <Link href="/enerji-temizligi">Enerji temizliği ve arınma rehberi →</Link> : <Link href="/ruhsal-arinma">Ruhsal arınma rehberi →</Link>}
    <Link href="/calismalar">Tüm çalışmaların süre ve ücretlerini karşılaştır →</Link>
  </nav>;
}
