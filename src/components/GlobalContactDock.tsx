"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  BIREBIR_SERVICE_CARDS,
  ENERJI_SERVICE_CARDS,
  canSubmitRandevuRequest,
  formatRandevuDate,
  randevuRequestSummary,
  randevuWhatsappHref,
} from "../lib/randevu-al/booking";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/goldkozmos?igsh=ODF4aWx1bndreDhq",
    image: "/images/services/goldblog/social/instagram.webp",
  },
  {
    name: "WhatsApp Kanalı",
    href: "https://whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s",
    image: "/images/services/goldblog/social/whatsapp.webp",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@goldkozmos",
    image: "/images/services/goldblog/social/tiktok.webp",
  },
  {
    name: "X",
    href: "https://x.com/GoldKozmos",
    image: "/images/services/goldblog/social/x.webp",
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@goldkozmos",
    image: "/images/services/goldblog/social/threads.webp",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@goldkozmos",
    image: "/images/services/goldblog/social/youtube.webp",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/0343du5jxaHZOJhqDJZKYQ",
    image: "/images/services/goldblog/social/spotify.webp",
  },
];

const whatsappActions = [
  {
    title: "Randevu Al",
    kind: "booking-page" as const,
  },
  {
    title: "Hangi Çalışma Bana Uygun?",
    kind: "whatsapp" as const,
    message:
      "Merhaba, hangi Goldkozmos çalışmasının bana uygun olduğuna karar veremedim. Kısaca bilgi almak istiyorum.",
  },
  {
    title: "Atölyeler Hakkında Bilgi",
    kind: "whatsapp" as const,
    message:
      "Merhaba, Goldkozmos Rezonans Atölyeleri hakkında bilgi almak istiyorum.",
  },
  {
    title: "Satın Alma / Erişim Desteği",
    kind: "whatsapp" as const,
    message:
      "Merhaba, satın alma veya erişim konusunda desteğe ihtiyacım var.",
  },
  {
    title: "Randevu Takvimine Göz At",
    kind: "calendar" as const,
  },
];

const whatsappNumber = "905054722153";
const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function minSelectableIso(now = new Date()) {
  const next = startOfDay(now);
  next.setDate(next.getDate() + 1);
  return toIsoDate(next);
}

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });
}

function calendarCells(year: number, month: number) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ iso: string | null; day: number | null }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ iso: null, day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      iso: `${year}-${pad(month + 1)}-${pad(day)}`,
      day,
    });
  }

  return cells;
}

const dockStyles = `
  .goldkozmosGlobalContactDock,
  .goldkozmosGlobalContactPanel,
  .goldkozmosGlobalContactBackdrop {
    display: none;
  }

  @media (max-width: 700px) {
    .homeV3FloatingWhatsapp,
    .goldcastFloatingWhatsapp {
      display: none !important;
    }

    .siteGlobalBackToTop {
      display: none !important;
    }

    .goldkozmosGlobalContactButton,
    .goldkozmosGlobalContactButton img {
      display: none !important;
    }

    .goldkozmosGlobalBackToTop {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 3;
      width: 44px;
      height: 44px;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: pointer;
      pointer-events: auto;
      appearance: none;
      -webkit-appearance: none;
    }

    .goldkozmosGlobalBackToTop::before,
    .goldkozmosGlobalBackToTop::after {
      content: none;
      display: none;
    }

    .goldkozmosGlobalBackToTop svg {
      width: 24px;
      height: 24px;
      display: block;
      overflow: visible;
    }

    .goldkozmosGlobalContactDock {
      position: fixed;
      right: 16px;
      bottom: calc(102px + env(safe-area-inset-bottom, 0px));
      z-index: 99998;
      display: flex;
      align-items: center;
      pointer-events: none;
    }

    .goldkozmosGlobalContactBackdrop {
      position: fixed;
      inset: 0;
      z-index: 100020;
      display: block;
      margin: 0;
      padding: 0;
      border: 0;
      background: rgba(16, 10, 6, 0.52);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 280ms ease, visibility 280ms ease;
    }

    .goldkozmosGlobalContactBackdrop.isOpen {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .goldkozmosGlobalContactPanel {
      position: fixed;
      left: 50%;
      top: 50%;
      right: auto;
      bottom: auto;
      z-index: 100021;
      box-sizing: border-box;
      width: min(92vw, 440px);
      max-width: 440px;
      max-height: min(86dvh, 760px);
      padding: 0;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(232, 196, 112, 0.48);
      border-radius: 30px;
      background:
        radial-gradient(circle at 100% 0%, rgba(232, 196, 112, 0.2), transparent 36%),
        radial-gradient(circle at 0% 100%, rgba(120, 82, 28, 0.22), transparent 42%),
        linear-gradient(155deg, rgba(42, 28, 18, 0.99), rgba(18, 12, 8, 0.99));
      box-shadow:
        0 28px 72px rgba(0, 0, 0, 0.42),
        0 0 0 1px rgba(255, 232, 180, 0.06) inset,
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translate(-50%, -44%) scale(0.94);
      transform-origin: center center;
      transition:
        opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
        visibility 320ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .goldkozmosGlobalContactPanel.isOpen {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
    }

    .goldkozmosGlobalContactTop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 20px 20px 12px;
    }

    .goldkozmosGlobalContactIntro {
      padding: 0;
      min-width: 0;
    }

    .goldkozmosGlobalContactIntro small {
      display: block;
      margin-bottom: 6px;
      color: #e0b45a;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalContactIntro strong {
      display: block;
      color: #fffaf1;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 24px;
      line-height: 1.08;
      font-weight: 400;
      letter-spacing: -0.02em;
    }

    .goldkozmosGlobalContactClose {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      border: 1px solid rgba(232, 196, 112, 0.34);
      border-radius: 50%;
      background: rgba(255, 250, 241, 0.07);
      color: #f3e6cc;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms ease;
    }

    .goldkozmosGlobalContactClose:active {
      transform: scale(0.94);
    }

    .goldkozmosGlobalContactBody {
      min-height: 0;
      padding: 0 20px 20px;
      overflow-y: auto;
      overscroll-behavior: contain;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .goldkozmosGlobalWhatsappActions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .goldkozmosGlobalWhatsappAction {
      position: relative;
      isolation: isolate;
      min-height: 76px;
      padding: 16px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      overflow: hidden;
      border: 1px solid rgba(232, 196, 112, 0.28);
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255, 246, 226, 0.07), rgba(255, 250, 241, 0.03)),
        rgba(18, 12, 8, 0.35);
      box-shadow:
        inset 0 1px 0 rgba(255, 236, 196, 0.14),
        0 8px 18px rgba(0, 0, 0, 0.16);
      color: #fff8ec;
      text-decoration: none;
      cursor: pointer;
      appearance: none;
      font: inherit;
      text-align: left;
      opacity: 0;
      transform: translateY(10px) scale(0.98);
      transition:
        transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 220ms ease,
        background 220ms ease,
        box-shadow 220ms ease;
    }

    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction {
      animation: goldHelpCardIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction:nth-child(1) { animation-delay: 40ms; }
    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction:nth-child(2) { animation-delay: 90ms; }
    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction:nth-child(3) { animation-delay: 140ms; }
    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction:nth-child(4) { animation-delay: 190ms; }
    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction:nth-child(5) { animation-delay: 240ms; }

    .goldkozmosGlobalWhatsappAction::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent 20%, rgba(255, 236, 196, 0.16) 46%, transparent 72%);
      transform: translateX(-120%);
      pointer-events: none;
    }

    .goldkozmosGlobalContactPanel.isOpen .goldkozmosGlobalWhatsappAction::before {
      animation: goldHelpSheen 900ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both;
    }

    .goldkozmosGlobalWhatsappAction:first-child,
    .goldkozmosGlobalWhatsappAction.isFeatured {
      border-color: rgba(232, 196, 112, 0.55);
      background:
        linear-gradient(145deg, rgba(232, 196, 112, 0.22), rgba(255, 250, 241, 0.04) 58%);
    }

    .goldkozmosGlobalWhatsappAction span:first-child {
      position: relative;
      z-index: 1;
      max-width: none;
      flex: 1;
      color: #fffaf1;
      font-size: 13px;
      line-height: 1.28;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .goldkozmosGlobalWhatsappAction span:last-child {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      color: #e8c470;
      font-size: 15px;
      transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .goldkozmosGlobalWhatsappAction:nth-child(5) {
      grid-column: 1 / -1;
      min-height: 64px;
    }

    .goldkozmosGlobalWhatsappAction:nth-child(5) span:first-child {
      max-width: none;
    }

    .goldkozmosGlobalWhatsappAction:active {
      transform: translateY(1px) scale(0.985);
      border-color: rgba(240, 212, 138, 0.72);
      box-shadow:
        inset 0 1px 0 rgba(255, 236, 196, 0.2),
        0 4px 10px rgba(0, 0, 0, 0.18);
    }

    .goldkozmosGlobalWhatsappAction:active span:last-child {
      transform: translateX(2px);
    }

    .goldkozmosGlobalContactBack {
      align-self: flex-start;
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: #d4a552;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      cursor: pointer;
    }

    .goldkozmosGlobalCalendar {
      display: grid;
      gap: 10px;
    }

    .goldkozmosGlobalCalendarNav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .goldkozmosGlobalCalendarNav strong {
      color: #fffaf1;
      font-size: 13px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .goldkozmosGlobalCalendarNav button {
      width: 32px;
      height: 32px;
      border: 1px solid rgba(215, 171, 91, 0.22);
      border-radius: 50%;
      background: rgba(255, 250, 241, 0.05);
      color: #f3e6cc;
      cursor: pointer;
    }

    .goldkozmosGlobalCalendarNav button:disabled {
      opacity: 0.35;
      cursor: default;
    }

    .goldkozmosGlobalCalendarWeek {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 4px;
      color: rgba(255, 250, 241, 0.42);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-align: center;
    }

    .goldkozmosGlobalCalendarGrid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 4px;
    }

    .goldkozmosGlobalCalendarDay {
      min-height: 36px;
      border: 0;
      border-radius: 10px;
      background: rgba(255, 250, 241, 0.04);
      color: #fff8ec;
      font-size: 12px;
      cursor: pointer;
    }

    .goldkozmosGlobalCalendarDay.isMuted {
      visibility: hidden;
      pointer-events: none;
    }

    .goldkozmosGlobalCalendarDay:disabled {
      color: rgba(255, 250, 241, 0.28);
      background: transparent;
      cursor: default;
    }

    .goldkozmosGlobalCalendarDay.isOn {
      background: linear-gradient(180deg, #f0d48a, #c9a24a);
      color: #211812;
      font-weight: 700;
    }

    .goldkozmosGlobalServiceHead {
      margin: 4px 0 0;
      color: rgba(255, 250, 241, 0.72);
      font-size: 12px;
      line-height: 1.45;
    }

    .goldkozmosGlobalServiceHead strong {
      color: #f0d48a;
      text-transform: capitalize;
    }

    .goldkozmosGlobalServiceLabel {
      margin: 8px 0 0;
      color: #c99a47;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalServiceGrid {
      display: grid;
      gap: 6px;
    }

    .goldkozmosGlobalServiceCard {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      min-height: 52px;
      padding: 10px 12px;
      border: 1px solid rgba(215, 171, 91, 0.18);
      border-radius: 14px;
      background: rgba(255, 250, 241, 0.04);
      color: #fff8ec;
      font: inherit;
      text-align: left;
      cursor: pointer;
      appearance: none;
    }

    .goldkozmosGlobalServiceCard b {
      display: block;
      font-size: 12px;
      font-weight: 700;
    }

    .goldkozmosGlobalServiceCard small {
      display: block;
      margin-top: 3px;
      color: rgba(240, 212, 138, 0.82);
      font-size: 10px;
      font-weight: 600;
    }

    .goldkozmosGlobalServiceCard.isOn {
      border-color: #c9a24a;
      background: linear-gradient(180deg, rgba(240, 212, 138, 0.22), rgba(201, 162, 74, 0.16));
      box-shadow: 0 0 0 1px #c9a24a inset;
    }

    .goldkozmosGlobalWhatsappCta,
    .goldkozmosGlobalWhatsappCta.isOff {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 16px;
      border: 0;
      border-radius: 999px;
      font: inherit;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
    }

    .goldkozmosGlobalWhatsappCta {
      background: linear-gradient(180deg, #f0d48a, #c9a24a);
      color: #211812;
    }

    .goldkozmosGlobalWhatsappCta.isOff {
      background: rgba(255, 250, 241, 0.08);
      color: rgba(255, 250, 241, 0.42);
      cursor: not-allowed;
    }

    .goldkozmosGlobalContactDivider {
      height: 1px;
      background: rgba(215, 171, 91, 0.12);
    }

    .goldkozmosGlobalChannelsHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .goldkozmosGlobalChannelsHead span {
      color: #e0b45a;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalChannelsHead small {
      color: rgba(255, 250, 241, 0.52);
      font-size: 8px;
    }

    .goldkozmosGlobalChannels {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .goldkozmosGlobalChannelLink {
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(232, 196, 112, 0.28);
      border-radius: 50%;
      background: rgba(255, 250, 241, 0.055);
      text-decoration: none;
      overflow: hidden;
      transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease;
    }

    .goldkozmosGlobalChannelLink:active {
      transform: scale(0.94);
    }

    .goldkozmosGlobalChannelLink img {
      width: 28px;
      height: 28px;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }

    .goldkozmosGlobalContactButton {
      position: relative;
      z-index: 2;
      flex: 0 0 54px;
      width: 54px;
      height: 54px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(215, 171, 91, 0.68);
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 28%, rgba(214, 169, 82, 0.18), transparent 38%),
        #1f1510;
      box-shadow:
        0 13px 34px rgba(0, 0, 0, 0.30),
        inset 0 0 0 4px rgba(225, 179, 92, 0.035);
      cursor: pointer;
      pointer-events: auto;
    }

    .goldkozmosGlobalContactButton img {
      width: 42px;
      height: 42px;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }

    @keyframes goldHelpCardIn {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes goldHelpSheen {
      from {
        transform: translateX(-120%);
      }
      to {
        transform: translateX(120%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .goldkozmosGlobalContactBackdrop,
      .goldkozmosGlobalContactPanel,
      .goldkozmosGlobalWhatsappAction,
      .goldkozmosGlobalWhatsappAction::before,
      .goldkozmosGlobalContactClose,
      .goldkozmosGlobalChannelLink {
        animation: none !important;
        transition: none !important;
      }

      .goldkozmosGlobalWhatsappAction {
        opacity: 1;
        transform: none;
      }
    }
  }
`;

export default function GlobalContactDock() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"menu" | "calendar">("menu");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [cursor, setCursor] = useState(() => {
    const min = minSelectableIso();
    const [year, month] = min.split("-").map(Number);
    return { year, month: month - 1 };
  });

  const minIso = minSelectableIso();
  const cells = useMemo(
    () => calendarCells(cursor.year, cursor.month),
    [cursor.month, cursor.year],
  );

  const ready = canSubmitRandevuRequest(selectedDate, selectedService);

  function resetPanel() {
    setOpen(false);
    setStep("menu");
    setSelectedDate(null);
    setSelectedService(null);
  }

  useEffect(() => {
    resetPanel();
  }, [pathname]);

  useEffect(() => {
    const toggleWhatsApp = () => {
      setOpen((current) => {
        if (current) {
          setStep("menu");
          setSelectedDate(null);
          setSelectedService(null);
        }
        return !current;
      });
    };
    const closeWhatsApp = () => resetPanel();

    window.addEventListener("goldkozmos:toggle-whatsapp", toggleWhatsApp);
    window.addEventListener("goldkozmos:close-whatsapp", closeWhatsApp);

    return () => {
      window.removeEventListener(
        "goldkozmos:toggle-whatsapp",
        toggleWhatsApp,
      );
      window.removeEventListener(
        "goldkozmos:close-whatsapp",
        closeWhatsApp,
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        resetPanel();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const prevMonthDisabled =
    cursor.year < Number(minIso.slice(0, 4)) ||
    (cursor.year === Number(minIso.slice(0, 4)) &&
      cursor.month <= Number(minIso.slice(5, 7)) - 1);

  /*
    Mobilde bottom bar WhatsApp paneli bu dock’tan açılır.
    Yuvarlak WhatsApp butonu yok; yalnızca yukarı-ok durur.
  */

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <style>{dockStyles}</style>

      <button
        type="button"
        className={`goldkozmosGlobalContactBackdrop${open ? " isOpen" : ""}`}
        aria-label="WhatsApp yardımını kapat"
        tabIndex={open ? 0 : -1}
        onClick={resetPanel}
      />

      <div
        className={`goldkozmosGlobalContactPanel ${open ? "isOpen" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="goldkozmosWhatsappHelpTitle"
        aria-hidden={!open}
      >
        <div className="goldkozmosGlobalContactTop">
          <div className="goldkozmosGlobalContactIntro">
            <small>WHATSAPP</small>
            <strong id="goldkozmosWhatsappHelpTitle">
              {step === "calendar"
                ? selectedService
                  ? "Talebi ilet"
                  : selectedDate
                    ? "Çalışmayı seç"
                    : "Randevu günü seç"
                : "Nasıl yardımcı olabilirim?"}
            </strong>
          </div>
          <button
            type="button"
            className="goldkozmosGlobalContactClose"
            aria-label="Kapat"
            onClick={resetPanel}
          >
            ×
          </button>
        </div>

        <div className="goldkozmosGlobalContactBody">
          {step === "menu" ? (
            <div className="goldkozmosGlobalWhatsappActions">
              {whatsappActions.map((action) => {
                if (action.kind === "booking-page") {
                  return (
                    <button
                      key={action.title}
                      type="button"
                      className="goldkozmosGlobalWhatsappAction isFeatured"
                      onClick={() => {
                        resetPanel();
                        router.push("/randevu-al");
                      }}
                    >
                      <span>{action.title}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  );
                }

                if (action.kind === "calendar") {
                  return (
                    <button
                      key={action.title}
                      type="button"
                      className="goldkozmosGlobalWhatsappAction"
                      onClick={() => {
                        setSelectedDate(null);
                        setSelectedService(null);
                        setStep("calendar");
                      }}
                    >
                      <span>{action.title}</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  );
                }

                return (
                  <a
                    key={action.title}
                    className="goldkozmosGlobalWhatsappAction"
                    href={whatsappHref(action.message)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={resetPanel}
                  >
                    <span>{action.title}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="goldkozmosGlobalCalendar">
              <button
                type="button"
                className="goldkozmosGlobalContactBack"
                onClick={() => {
                  setSelectedDate(null);
                  setSelectedService(null);
                  setStep("menu");
                }}
              >
                ← Seçeneklere dön
              </button>

              <div className="goldkozmosGlobalCalendarNav">
                <button
                  type="button"
                  aria-label="Önceki ay"
                  disabled={prevMonthDisabled}
                  onClick={() =>
                    setCursor((current) => {
                      const date = new Date(current.year, current.month - 1, 1);
                      return {
                        year: date.getFullYear(),
                        month: date.getMonth(),
                      };
                    })
                  }
                >
                  ‹
                </button>
                <strong>{monthLabel(cursor.year, cursor.month)}</strong>
                <button
                  type="button"
                  aria-label="Sonraki ay"
                  onClick={() =>
                    setCursor((current) => {
                      const date = new Date(current.year, current.month + 1, 1);
                      return {
                        year: date.getFullYear(),
                        month: date.getMonth(),
                      };
                    })
                  }
                >
                  ›
                </button>
              </div>

              <div className="goldkozmosGlobalCalendarWeek">
                {WEEKDAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="goldkozmosGlobalCalendarGrid">
                {cells.map((cell, index) => {
                  if (!cell.iso || !cell.day) {
                    return (
                      <span
                        key={`empty-${index}`}
                        className="goldkozmosGlobalCalendarDay isMuted"
                      />
                    );
                  }

                  const disabled = cell.iso < minIso;

                  return (
                    <button
                      key={cell.iso}
                      type="button"
                      className={`goldkozmosGlobalCalendarDay${
                        selectedDate === cell.iso ? " isOn" : ""
                      }`}
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(cell.iso);
                        setSelectedService(null);
                      }}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              {selectedDate ? (
                <div className="goldkozmosGlobalServices">
                  <p className="goldkozmosGlobalServiceHead">
                    <strong>{formatRandevuDate(selectedDate)}</strong>
                    <br />
                    {randevuRequestSummary(selectedDate, selectedService)}
                  </p>

                  <p className="goldkozmosGlobalServiceLabel">Birebir</p>
                  <div className="goldkozmosGlobalServiceGrid">
                    {BIREBIR_SERVICE_CARDS.map((service) => (
                      <button
                        key={service.name}
                        type="button"
                        className={`goldkozmosGlobalServiceCard${
                          selectedService === service.name ? " isOn" : ""
                        }`}
                        onClick={() => setSelectedService(service.name)}
                      >
                        <span>
                          <b>{service.name}</b>
                          <small>
                            {service.duration} · {service.format}
                          </small>
                        </span>
                        {selectedService === service.name ? (
                          <span aria-hidden="true">✓</span>
                        ) : null}
                      </button>
                    ))}
                  </div>

                  <p className="goldkozmosGlobalServiceLabel">
                    Enerji çalışmaları
                  </p>
                  <div className="goldkozmosGlobalServiceGrid">
                    {ENERJI_SERVICE_CARDS.map((service) => (
                      <button
                        key={service.name}
                        type="button"
                        className={`goldkozmosGlobalServiceCard${
                          selectedService === service.name ? " isOn" : ""
                        }`}
                        onClick={() => setSelectedService(service.name)}
                      >
                        <span>
                          <b>{service.name}</b>
                          <small>
                            {service.duration} · {service.format}
                          </small>
                        </span>
                        {selectedService === service.name ? (
                          <span aria-hidden="true">✓</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {ready && selectedDate && selectedService ? (
                <a
                  className="goldkozmosGlobalWhatsappCta"
                  href={randevuWhatsappHref(selectedDate, selectedService)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={resetPanel}
                >
                  WhatsApp’tan talep ilet
                </a>
              ) : (
                <button
                  type="button"
                  className="goldkozmosGlobalWhatsappCta isOff"
                  disabled
                >
                  {selectedDate
                    ? "Çalışmayı seçince açılır"
                    : "Önce günü seç"}
                </button>
              )}
            </div>
          )}

          <div className="goldkozmosGlobalContactDivider" aria-hidden="true" />

          <div className="goldkozmosGlobalChannelsHead">
            <span>Kanallarım</span>
            <small>Goldkozmos’u takip et</small>
          </div>

          <div className="goldkozmosGlobalChannels">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                className="goldkozmosGlobalChannelLink"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                title={social.name}
                onClick={resetPanel}
              >
                <img src={social.image} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="goldkozmosGlobalContactDock">
        <button
          type="button"
          className="goldkozmosGlobalBackToTop"
          aria-label="Sayfanın başına dön"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient
                id="goldkozmosBackToTopArrowFill"
                x1="12"
                y1="4"
                x2="12"
                y2="21"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#fff8e4" />
                <stop offset="36%" stopColor="#f0d08a" />
                <stop offset="72%" stopColor="#d4a24a" />
                <stop offset="100%" stopColor="#9a6d24" />
              </linearGradient>
            </defs>
            <path
              fill="url(#goldkozmosBackToTopArrowFill)"
              d="M12 4.6 5.35 11.25a1.15 1.15 0 0 0 1.63 1.62L10.85 9v9.25a1.15 1.15 0 0 0 2.3 0V9l3.87 3.87a1.15 1.15 0 1 0 1.63-1.62L12 4.6z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
