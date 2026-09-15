import Link from "next/link";

const HUBS = [
  { href: "/tarot-kartlari", label: "Tarot Kartları" },
  { href: "/goldmind", label: "GoldMind" },
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldrituel", label: "GoldRitüel" },
  { href: "/kendini-tani", label: "Kendini Tanı" },
  { href: "/ruya-tabirleri", label: "Rüya Tabirleri" },
  { href: "/burclar", label: "Burçlar" },
  { href: "/calismalar", label: "Çalışmalar" },
] as const;

export default function HomeTopicHubs() {
  return (
    <nav className="homeTopicHubs" aria-label="Konu merkezleri">
      <p>KONU MERKEZLERİ</p>
      <ul>
        {HUBS.map((hub) => (
          <li key={hub.href}>
            <Link href={hub.href}>{hub.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
