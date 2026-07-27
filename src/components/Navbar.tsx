"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbarInner">
        <Link href="/" className="logo">
          Goldkozmos
          <span>Enerji Ekolü™</span>
        </Link>

        <nav className={`navLinks ${menuOpen ? "navLinksOpen" : ""}`}>
          <Link href="/">Ana Sayfa</Link>
          <Link href="/enerji-ekolu">Enerji Ekolü</Link>
          <Link href="/calismalar">Çalışmalar</Link>
          <Link href="/goldbook">GoldBook</Link>
          <Link href="/goldcast">GoldCast</Link>
          <Link href="/goldblog">GoldBlog</Link>
          <Link href="/etkinlikler">Etkinlikler</Link>
          <Link href="/hakkimda">Hakkımda</Link>

          <Link href="/randevu" className="mobileAppointmentButton">
            Randevu Al
          </Link>
        </nav>

        <Link href="/randevu" className="appointmentButton">
          Randevu Al
        </Link>

        <button
          type="button"
          className="menuButton"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç veya kapat"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}