import "../../styles/daily-practice.css";

const GOLD_CHIPS = [
  { href: "/profilim", label: "Gold Eylem" },
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldcast", label: "GoldCast" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldmind", label: "GoldMind" },
] as const;

const BROWN_CHIPS = [
  { href: "/profilim", label: "Duygu Rehberim" },
  { href: "/profilim", label: "Notlarım" },
  { href: "/profilim", label: "Rüyalarım" },
  { href: "/calismalar/tarot", label: "Tarot" },
] as const;

function ChipRow({
  chips,
  tone,
}: {
  chips: readonly { href: string; label: string }[];
  tone: "gold" | "brown";
}) {
  return (
    <div className={`dailyActionRail${tone === "brown" ? " isBrown" : ""}`}>
      {chips.map((chip, index) => (
        <a
          key={`${tone}-${chip.label}`}
          className="dailyActionShell"
          href={chip.href}
        >
          <span
            className={`dailyActionCard${tone === "brown" ? " isBrown" : ""}`}
          >
            {tone === "gold" ? (
              <>
                <span
                  className="dailyActionWash"
                  aria-hidden="true"
                  style={{ animationDelay: `${index * 0.9}s` }}
                />
                <span
                  className="dailyActionShine"
                  aria-hidden="true"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              </>
            ) : null}
            <span className="dailyActionLabel">{chip.label}</span>
          </span>
        </a>
      ))}
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
