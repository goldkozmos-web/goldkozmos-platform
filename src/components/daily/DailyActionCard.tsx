import Image from "next/image";
import QuickNoteCard from './QuickNoteCard';
import "../../styles/daily-practice.css";

const GOLD_CHIPS = [
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldcast", label: "GoldCast" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldmind", label: "GoldMind" },
  { href: "/goldrituel", label: "GoldRitüel" },
] as const;

const BROWN_CHIPS = [
  { href: "/guides/duygu-rehberi.pdf", label: "Duygu rehberi" },
  { href: "/profilim?open=journal", label: "Not al" },
  { href: "/ruya-tabirleri", label: "Rüya tabiri" },
  { href: "/tarot-bakimi", label: "Tarot bak" },
  { href: "/burclar", label: "Burçlar" },
] as const;

function ChipRow({
  chips,
  tone,
}: {
  chips: readonly { href: string; label: string }[];
  tone: "gold" | "brown";
}) {
  return (
    <div className={`dailyActionScroller${tone === "brown" ? " isBrown" : ""}`}>
      <div className="dailyActionRail">
        {chips.map((chip) => chip.label === "Not al" ? <QuickNoteCard key="quick-note"/> : (
          <a
            key={`${tone}-${chip.label}`}
            className="dailyActionShell"
            href={chip.href}
            download={chip.label === "Duygu rehberi" ? "GoldKozmos-Duygu-Rehberi.pdf" : undefined}
            aria-label={chip.label === "Duygu rehberi" ? "Duygu rehberi PDF indir" : undefined}
          >
            <span
              className={`dailyActionCard${tone === "brown" ? " isBrown" : ""}`}
            >
              <span className="dailyActionArtwork" aria-hidden="true"><Image src={SHORTCUT_ARTWORK[chip.label]} alt="" fill sizes="(max-width:700px) 150px, 190px" /></span>
              <span className="dailyActionLabel">{chip.label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

const SHORTCUT_ARTWORK: Record<string, string> = {
  GoldBlog: "/images/platform/goldblog-premium.webp",
  GoldCast: "/images/platform/goldcast-premium.webp",
  GoldFrekans: "/images/platform/goldfrekans-premium.webp",
  GoldBook: "/images/platform/goldbook-premium.webp",
  GoldMind: "/images/platform/goldmind-premium.webp",
  GoldRitüel: "/images/home/shortcuts/goldrituel.webp",
  "Duygu rehberi": "/images/home/shortcuts/duygu-rehberi.webp",
  "Not al": "/images/home/shortcuts/not-al.webp",
  "Rüya tabiri": "/images/home/shortcuts/ruya-tabiri.webp",
  "Tarot bak": "/images/home/shortcuts/tarot.webp",
  "Burçlar": "/images/goldmind/categories/tumu-premium.webp",
};

export default function DailyActionCard() {
  return (
    <section className="dailyActionBand" aria-label="GoldKozmos kısayolları">
      <ChipRow chips={GOLD_CHIPS} tone="gold" />
      <ChipRow chips={BROWN_CHIPS} tone="brown" />
    </section>
  );
}

