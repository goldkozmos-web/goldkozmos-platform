import "../../styles/daily-practice.css";

const GOLD_CHIPS = [
  { href: "/profilim", label: "Gold Eylem" },
  { href: "/goldblog", label: "GoldBlog" },
  { href: "/goldcast", label: "GoldCast" },
  { href: "/goldfrekans", label: "GoldFrekans" },
  { href: "/goldbook", label: "GoldBook" },
  { href: "/goldmind", label: "GoldMind" },
] as const;

export default function DailyActionCard() {
  return (
    <section className="dailyActionBand" aria-label="GoldKozmos kısayolları">
      <div className="dailyActionRail">
        {GOLD_CHIPS.map((chip, index) => (
          <a key={chip.href} className="dailyActionCard" href={chip.href}>
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
            <span className="dailyActionLabel">{chip.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
