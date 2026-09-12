import "../../styles/daily-practice.css";

const GOLD_CHIPS = [
  { href: "/profilim", label: "GoldAct" },
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldcast", label: "GoldCast" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldmind", label: "GoldMind" },
] as const;

const BROWN_CHIPS = [
  { href: "/profilim?open=duyguRehberi", label: "Duygu rehberi" },
  { href: "/profilim?open=journal", label: "Not al" },
  { href: "/ruya-tabirleri", label: "Rüya tabiri" },
  { href: "/calismalar/tarot", label: "Tarot bak" },
  { href: "/calismalar/enerji", label: "Ritüeller" },
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
        {chips.map((chip, index) => (
          <a
            key={`${tone}-${chip.label}`}
            className="dailyActionShell"
            href={chip.href}
          >
            <span
              className={`dailyActionCard${tone === "brown" ? " isBrown" : ""}`}
            >
              <span
                className={
                  tone === "brown"
                    ? "dailyActionWash dailyActionWash--brown"
                    : "dailyActionWash"
                }
                aria-hidden="true"
                style={{ animationDelay: `${index * 0.9}s` }}
              />
              <span
                className={
                  tone === "brown"
                    ? "dailyActionShine dailyActionShine--brown"
                    : "dailyActionShine"
                }
                aria-hidden="true"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
              <span className="dailyActionLabel">{chip.label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function DailyActionCard() {
  return (
    <section className="dailyActionBand" aria-label="GoldKozmos kısayolları">
      <ChipRow chips={GOLD_CHIPS} tone="gold" />
      <ChipRow chips={BROWN_CHIPS} tone="brown" />
    </section>
  );
}
