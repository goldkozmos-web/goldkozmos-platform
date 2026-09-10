"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

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
    opensCalendar: true,
    message: "",
  },
  {
    title: "Hangi Çalışma Bana Uygun?",
    opensCalendar: false,
    message:
      "Merhaba, hangi Goldkozmos çalışmasının bana uygun olduğuna karar veremedim. Kısaca bilgi almak istiyorum.",
  },
  {
    title: "Atölyeler Hakkında Bilgi",
    opensCalendar: false,
    message:
      "Merhaba, Goldkozmos Rezonans Atölyeleri hakkında bilgi almak istiyorum.",
  },
  {
    title: "Satın Alma / Erişim Desteği",
    opensCalendar: false,
    message:
      "Merhaba, satın alma veya erişim konusunda desteğe ihtiyacım var.",
  },
  {
    title: "Randevu Takvimine Göz At",
    opensCalendar: true,
    message: "",
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

function formatRequestDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function appointmentRequestMessage(iso: string) {
  return `Merhaba, ${formatRequestDate(iso)} için randevu almak istiyorum. Uygun saatleri ve benim için uygun çalışma alanını konuşmak istiyorum.`;
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
      transition: opacity 180ms ease, visibility 180ms ease;
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
      width: 90vw;
      max-width: 420px;
      max-height: min(82dvh, 720px);
      padding: 0;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(213, 168, 82, 0.38);
      border-radius: 28px;
      background:
        radial-gradient(circle at 100% 0%, rgba(205, 158, 73, 0.13), transparent 34%),
        linear-gradient(145deg, rgba(36, 24, 16, 0.99), rgba(20, 14, 10, 0.99));
      box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.38),
        inset 0 1px 0 rgba(255, 255, 255, 0.035);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translate(-50%, -46%) scale(0.96);
      transform-origin: center center;
      transition: opacity 180ms ease, visibility 180ms ease, transform 220ms ease;
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
      padding: 18px 18px 10px;
    }

    .goldkozmosGlobalContactIntro {
      padding: 0;
      min-width: 0;
    }

    .goldkozmosGlobalContactIntro small {
      display: block;
      margin-bottom: 5px;
      color: #c99a47;
      font-size: 7px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalContactIntro strong {
      display: block;
      color: #fffaf1;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 22px;
      line-height: 1.05;
      font-weight: 400;
    }

    .goldkozmosGlobalContactClose {
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      margin: 0;
      padding: 0;
      border: 1px solid rgba(215, 171, 91, 0.28);
      border-radius: 50%;
      background: rgba(255, 250, 241, 0.06);
      color: #f3e6cc;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
    }

    .goldkozmosGlobalContactBody {
      min-height: 0;
      padding: 0 18px 18px;
      overflow-y: auto;
      overscroll-behavior: contain;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .goldkozmosGlobalWhatsappActions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }

    .goldkozmosGlobalWhatsappAction {
      min-height: 56px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border: 1px solid rgba(215, 171, 91, 0.16);
      border-radius: 14px;
      background: rgba(255, 250, 241, 0.035);
      color: #fff8ec;
      text-decoration: none;
      cursor: pointer;
      appearance: none;
      font: inherit;
      text-align: left;
      transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .goldkozmosGlobalWhatsappAction:first-child,
    .goldkozmosGlobalWhatsappAction.isFeatured {
      border-color: rgba(215, 171, 91, 0.42);
      background: linear-gradient(135deg, rgba(195, 145, 58, 0.16), rgba(255, 250, 241, 0.035));
    }

    .goldkozmosGlobalWhatsappAction span:first-child {
      max-width: 118px;
      font-size: 9.5px;
      line-height: 1.25;
      font-weight: 600;
    }

    .goldkozmosGlobalWhatsappAction span:last-child {
      flex: 0 0 auto;
      color: #d6a54d;
      font-size: 12px;
    }

    .goldkozmosGlobalWhatsappAction:nth-child(5) {
      grid-column: 1 / -1;
    }

    .goldkozmosGlobalWhatsappAction:nth-child(5) span:first-child {
      max-width: none;
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

    .goldkozmosGlobalWhatsappCta {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 16px;
      border-radius: 999px;
      background: linear-gradient(180deg, #f0d48a, #c9a24a);
      color: #211812;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
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
      color: #d4a552;
      font-size: 7.5px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .goldkozmosGlobalChannelsHead small {
      color: rgba(255, 250, 241, 0.48);
      font-size: 7px;
    }

    .goldkozmosGlobalChannels {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      flex-wrap: wrap;
    }

    .goldkozmosGlobalChannelLink {
      flex: 0 0 28px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(215, 171, 91, 0.20);
      border-radius: 50%;
      background: rgba(255, 250, 241, 0.045);
      text-decoration: none;
      overflow: hidden;
    }

    .goldkozmosGlobalChannelLink img {
      width: 22px;
      height: 22px;
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
  }
`;

export default function GlobalContactDock() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"menu" | "calendar">("menu");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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

  function resetPanel() {
    setOpen(false);
    setStep("menu");
    setSelectedDate(null);
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
                ? "Randevu günü seç"
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
              {whatsappActions.map((action) =>
                action.opensCalendar ? (
                  <button
                    key={action.title}
                    type="button"
                    className={`goldkozmosGlobalWhatsappAction${
                      action.title === "Randevu Al" ? " isFeatured" : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(null);
                      setStep("calendar");
                    }}
                  >
                    <span>{action.title}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ) : (
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
                ),
              )}
            </div>
          ) : (
            <div className="goldkozmosGlobalCalendar">
              <button
                type="button"
                className="goldkozmosGlobalContactBack"
                onClick={() => {
                  setSelectedDate(null);
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
                      onClick={() => setSelectedDate(cell.iso)}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              {selectedDate ? (
                <a
                  className="goldkozmosGlobalWhatsappCta"
                  href={whatsappHref(appointmentRequestMessage(selectedDate))}
                  target="_blank"
                  rel="noreferrer"
                  onClick={resetPanel}
                >
                  WhatsApp’tan Randevu Talebi Oluştur
                </a>
              ) : null}
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
