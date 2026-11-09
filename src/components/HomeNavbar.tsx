"use client";
import { APPOINTMENT_WHATSAPP_URL } from "../lib/appointments";


import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../styles/nav-discovery.css";
import CircleBell from './community/CircleBell';
import MemberAccessLink from "./MemberAccessLink";
import { usePathname, useRouter } from "next/navigation";

export default function HomeNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const atHome = pathname === "/";

  const workshopsHref = "/kozmik-enerji";
  const worksHref = "/calismalar";
  const faqHref = atHome ? "#sss" : "/#sss";

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      searchInputRef.current?.focus();
      return;
    }
    setSearchOpen(false);
    router.push(`/arama?q=${encodeURIComponent(query)}`);
  }

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [searchOpen]);

  return (
    <header className="homeV3Nav">
      <div className="homeV3NavInner">
        <Link prefetch={false} className="homeV3Brand" href="/">
          <strong>
            GOLDKOZMOS<sup>®</sup>
          </strong>
          <span>REZONANS EKOLÜ</span>
        </Link>

        <nav className="homeV3Menu">
          <Link prefetch={false} href="/">Ana Sayfa</Link>
          <Link prefetch={false} href={workshopsHref}>Kozmik Enerji</Link>
          <Link prefetch={false} href="/kisisel-gelisim">Kişisel Gelişim</Link>
          <Link prefetch={false} href="/rezonans-egitimleri">
            Eğitimler
          </Link>
          <Link prefetch={false} href={worksHref}>Çalışmalar</Link>
          <Link prefetch={false} href="/goldblog">GoldBlog</Link>
          <details className="homeNavDiscovery" onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}>
            <summary>Keşfet <span aria-hidden="true">⌄</span></summary>
            <div className="homeNavDiscoveryLinks">
              <Link prefetch={false} href="/goldbook">GoldBook <span>Dijital kitaplar</span></Link>
              <Link prefetch={false} href="/goldcast">GoldCast <span>Sohbet ve yayınlar</span></Link>
              <Link prefetch={false} href="/goldmind">GoldMind <span>Meditasyon ve nefes</span></Link>
              <Link prefetch={false} href="/goldfrekans">GoldFrekans <span>Müzik ve doğa sesleri</span></Link>
              <Link prefetch={false} href="/goldrituel">GoldRitüel <span>Niyet ve farkındalık</span></Link>
            </div>
          </details>
          <Link prefetch={false} href="/hakkimda">Hakkımda</Link>
          <Link prefetch={false} href="/paylasim-cemberi">Paylaşım Çemberi</Link>
          <Link prefetch={false} href={faqHref}>SSS</Link>
        </nav>

        <Link prefetch={false}
          className="homeV3NavTest"
          href={APPOINTMENT_WHATSAPP_URL}
        >
          Randevu Al
          <span>→</span>
        </Link>

        <div className="homeV3NavActions">
          <span className="homeMemberAccess"><MemberAccessLink /></span>
          <CircleBell />
          <button
            type="button"
            className={`homeV3SearchButton ${searchOpen ? "isOpen" : ""}`}
            aria-label={searchOpen ? "Aramayı kapat" : "Sitede ara"}
            aria-expanded={searchOpen}
            aria-controls="homeV3SearchPanel"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`homeV3MobileMenuButton ${
              mobileMenuOpen ? "isOpen" : ""
            }`}
            aria-label={
              mobileMenuOpen
                ? "Menüyü kapat"
                : "Menüyü aç"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="homeV3MobileMenu"
            onClick={() =>
              setMobileMenuOpen((open) => !open)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id="homeV3SearchPanel" className="homeV3SearchPanel">
          <form role="search" onSubmit={submitSearch}>
            <label htmlFor="homeV3SearchInput">GoldKozmos’ta ara</label>
            <div className="homeV3SearchField">
              <input
                ref={searchInputRef}
                id="homeV3SearchInput"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Örneğin: çakra, tarot, rüya..."
                autoComplete="off"
              />
              <button type="submit">Ara</button>
            </div>
          </form>
        </div>
      ) : null}

      <div
        id="homeV3MobileMenu"
        className={`homeV3MobileMenu ${
          mobileMenuOpen ? "isOpen" : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav>
          <MemberAccessLink />
          <Link prefetch={false} href="/" onClick={closeMenu}>
            Ana Sayfa
          </Link>
          <Link prefetch={false} href={workshopsHref} onClick={closeMenu}>
            Kozmik Enerji
          </Link>
          <Link prefetch={false} href="/kisisel-gelisim" onClick={closeMenu}>
            Kişisel Gelişim
          </Link>
          <Link prefetch={false}
            href="/rezonans-egitimleri"
            onClick={closeMenu}
          >
            Eğitimler
          </Link>
          <Link prefetch={false} href={worksHref} onClick={closeMenu}>
            Çalışmalar
          </Link>
          <Link prefetch={false} href="/goldbook" onClick={closeMenu}>
            GoldBook
          </Link>
          <Link prefetch={false} href="/goldcast" onClick={closeMenu}>
            GoldCast
          </Link>
          <Link prefetch={false} href="/goldmind" onClick={closeMenu}>
            GoldMind
          </Link>
          <Link prefetch={false} href="/goldfrekans" onClick={closeMenu}>
            GoldFrekans
          </Link>
          <Link prefetch={false} href="/goldblog" onClick={closeMenu}>
            GoldBlog
          </Link>
          <Link prefetch={false} href="/hakkimda" onClick={closeMenu}>
            Hakkımda
          </Link>
          <Link prefetch={false} href={faqHref} onClick={closeMenu}>
            SSS
          </Link>
          <Link prefetch={false} href="/paylasim-cemberi" onClick={closeMenu}>
            Paylaşım Çemberi
          </Link>
          <Link prefetch={false} href="/bildirimler" onClick={closeMenu}>
            Bildirimler
          </Link>
        </nav>

        <Link prefetch={false}
          href={APPOINTMENT_WHATSAPP_URL}
          className="homeV3MobileMenuTest"
          onClick={closeMenu}
        >
          Randevu Al
          <span>→</span>
        </Link>
      </div>

      {mobileMenuOpen ? (
        <button
          type="button"
          className="homeV3MobileMenuBackdrop"
          aria-label="Menüyü kapat"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
