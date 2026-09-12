"use client";

import "../../styles/daily-practice.css";

export default function DailyActionCard() {
  return (
    <section className="dailyActionBand">
      <a className="dailyActionCard" href="/profilim">
        <span className="dailyActionWash" aria-hidden="true" />
        <h2>Gold Eylem</h2>
      </a>
    </section>
  );
}
