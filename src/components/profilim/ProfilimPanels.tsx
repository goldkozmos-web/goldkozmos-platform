"use client";

import { useMemo, useState } from "react";

import type {
  ProfilimActivity,
  ProfilimAppointment,
  ProfilimContinueItem,
  ProfilimFavorite,
  ProfilimJournalEntry,
  ProfilimLetter,
  ProfilimLibraryItem,
  ProfilimPdfAnalysis,
  ProfilimPlatformTrack,
  ProfilimPurchase,
  ProfilimTodayNeedChoiceId,
} from "../../lib/profilim/types";
import { TODAY_NEED_CHOICES, todayNeedChoiceById } from "../../lib/profilim/todayNeed";
import ProfilimEmptyState from "./ProfilimEmptyState";

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function appointmentLabel(status: string) {
  if (status === "upcoming") return "Yaklaşan";
  if (status === "past") return "Geçmiş";
  if (status === "cancelled") return "İptal";
  return status;
}

export function TodayNeedPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: ProfilimTodayNeedChoiceId) => void;
}) {
  const selected = todayNeedChoiceById(selectedId);

  return (
    <div className="profilimNeedGrid">
      {TODAY_NEED_CHOICES.map((choice) => (
        <button
          key={choice.id}
          type="button"
          className={`profilimNeedChip${selectedId === choice.id ? " isOn" : ""}`}
          onClick={() => onSelect(choice.id)}
        >
          {choice.label}
        </button>
      ))}

      {selected ? (
        <p className="profilimDrawerNote">
          {selected.label} seçildi. GoldMind, GoldBlog ve GoldBook önerileri
          bu tercihe göre bağlanacak.
        </p>
      ) : (
        <p className="profilimDrawerNote">
          Bugün nasıl ilerlemek istediğini seç.
        </p>
      )}
    </div>
  );
}

export function ProgressPanel({
  tracks,
  completedCount,
  xp,
}: {
  tracks: ProfilimPlatformTrack[];
  completedCount: number;
  xp: number;
}) {
  return (
    <div className="profilimDrawerStack">
      <div className="profilimStatRow">
        <div>
          <strong>{completedCount}</strong>
          <span>Tamamlanan</span>
        </div>
        <div>
          <strong>{xp}</strong>
          <span>XP</span>
        </div>
      </div>

      {tracks.map((track) => (
        <div key={track.id} className="profilimTrack">
          <div className="profilimTrackMeta">
            <span>{track.label}</span>
            <strong>%{Math.round(track.progress * 100)}</strong>
          </div>
          <div className="profilimLevelBar">
            <span
              className="profilimLevelBarFill"
              style={{ width: `${Math.round(track.progress * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContinuePanel({
  items,
}: {
  items: ProfilimContinueItem[];
}) {
  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Yarım kalan bir çalışman yok. Bir içerik açınca burada durur." />
    );
  }

  return (
    <ul className="profilimDrawerList">
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.href} className="profilimContinueRow">
            <strong>{item.title}</strong>
            {item.platform ? <span>{item.platform}</span> : null}
            <div className="profilimLevelBar">
              <span
                className="profilimLevelBarFill"
                style={{ width: `${Math.round(item.progress * 100)}%` }}
              />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function FavoritesPanel({ items }: { items: ProfilimFavorite[] }) {
  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Henüz favorin yok. GoldBlog, GoldMind ve GoldCast içeriklerini kaydedince burada toplanır." />
    );
  }

  return (
    <ul className="profilimDrawerList">
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.href}>
            <span>{item.kind}</span>
            <strong>{item.title}</strong>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PurchasesPanel({ items }: { items: ProfilimPurchase[] }) {
  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Satın alınmış bir çalışma henüz yok. Aldığın ürün ve hizmetler burada kart olarak durur." />
    );
  }

  return (
    <ul className="profilimDrawerList">
      {items.map((item) => (
        <li key={item.id} className="profilimPurchaseCard">
          <span>{item.kind}</span>
          <strong>{item.title}</strong>
        </li>
      ))}
    </ul>
  );
}

export function PdfPanel({ items }: { items: ProfilimPdfAnalysis[] }) {
  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Sana atanmış bir PDF analiz yok. Analizler hazır olunca Görüntüle ve İndir burada durur." />
    );
  }

  return (
    <ul className="profilimDrawerList">
      {items.map((item) => (
        <li key={item.id} className="profilimPdfCard">
          <strong>{item.title}</strong>
          <div className="profilimPdfActions">
            {item.viewUrl ? (
              <a href={item.viewUrl} target="_blank" rel="noreferrer">
                Görüntüle
              </a>
            ) : null}
            {item.downloadUrl ? (
              <a href={item.downloadUrl} download>
                İndir
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AppointmentsPanel({
  items,
}: {
  items: ProfilimAppointment[];
}) {
  const groups = useMemo(() => {
    const upcoming = items.filter((item) => item.status === "upcoming");
    const past = items.filter((item) => item.status === "past");
    const cancelled = items.filter((item) => item.status === "cancelled");
    const other = items.filter(
      (item) =>
        item.status !== "upcoming" &&
        item.status !== "past" &&
        item.status !== "cancelled",
    );
    return { upcoming, past, cancelled, other };
  }, [items]);

  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Planlanmış bir randevun yok. Tarih, saat ve hizmet adı burada görünecek." />
    );
  }

  const blocks = [
    { label: "Yaklaşan", items: groups.upcoming },
    { label: "Geçmiş", items: groups.past },
    { label: "İptal", items: groups.cancelled },
    { label: "Diğer", items: groups.other },
  ];

  return (
    <div className="profilimDrawerStack">
      {blocks.map((block) =>
        block.items.length ? (
          <section key={block.label}>
            <p className="profilimDrawerEyebrow">{block.label}</p>
            <ul className="profilimDrawerList">
              {block.items.map((item) => (
                <li key={item.id} className="profilimAppointmentCard">
                  <span className="profilimStatus">
                    {appointmentLabel(item.status)}
                  </span>
                  <strong>{item.title}</strong>
                  <small>{formatWhen(item.startsAt)}</small>
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </div>
  );
}

export function LibraryPanel({ items }: { items: ProfilimLibraryItem[] }) {
  if (items.length === 0) {
    return (
      <ProfilimEmptyState text="Kütüphanen boş. Satın aldığın GoldBook ve dijital içerikler kapaklarıyla burada durur." />
    );
  }

  return (
    <ul className="profilimLibraryGrid">
      {items.map((item) => (
        <li key={item.id}>
          {item.coverUrl ? (
            <img src={item.coverUrl} alt="" />
          ) : (
            <span className="profilimLibraryCover" aria-hidden="true" />
          )}
          <strong>{item.title}</strong>
          {item.href ? (
            <a href={item.href}>{item.kind === "GoldBook" ? "Oku" : "Devam Et"}</a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function JournalPanel({
  items,
  onCreate,
}: {
  items: ProfilimJournalEntry[];
  onCreate: (body: string) => void;
}) {
  const [body, setBody] = useState("");

  return (
    <div className="profilimDrawerStack">
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          const next = body.trim();
          if (!next) return;
          onCreate(next);
          setBody("");
        }}
      >
        <label>
          Yeni kayıt
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={4}
            placeholder="Bugün ne hissediyorsun?"
          />
        </label>
        <button type="submit">Kaydet</button>
      </form>

      {items.length === 0 ? (
        <ProfilimEmptyState text="Henüz bir günlük kaydın yok. İlk notunu yazdığında burada durur." />
      ) : (
        <ul className="profilimDrawerList">
          {items.map((item) => (
            <li key={item.id}>
              <small>{formatWhen(item.createdAt)}</small>
              <p>{item.body || item.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LetterPanel({
  items,
  onCreate,
}: {
  items: ProfilimLetter[];
  onCreate: (title: string, body: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="profilimDrawerStack">
      <form
        className="profilimCompose"
        onSubmit={(event) => {
          event.preventDefault();
          const nextTitle = title.trim() || "Kendime mektup";
          const nextBody = body.trim();
          if (!nextBody) return;
          onCreate(nextTitle, nextBody);
          setTitle("");
          setBody("");
        }}
      >
        <label>
          Başlık
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Mektubun adı"
          />
        </label>
        <label>
          Mektup
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={5}
            placeholder="Kendine ne söylemek istersin?"
          />
        </label>
        <button type="submit">Kaydet</button>
      </form>

      {items.length === 0 ? (
        <ProfilimEmptyState text="Kendine yazılmış bir mektup yok. İlk mektubun burada durur." />
      ) : (
        <ul className="profilimDrawerList">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <small>{formatWhen(item.createdAt)}</small>
              {item.body ? <p>{item.body}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function JourneyPanel({
  items,
  levelLabel,
  xp,
}: {
  items: ProfilimActivity[];
  levelLabel: string;
  xp: number;
}) {
  return (
    <div className="profilimDrawerStack">
      <div className="profilimStatRow">
        <div>
          <strong>{levelLabel}</strong>
          <span>Seviye</span>
        </div>
        <div>
          <strong>{xp}</strong>
          <span>Toplam XP</span>
        </div>
      </div>

      {items.length === 0 ? (
        <ProfilimEmptyState text="Tamamladığın adımlar burada birikir. Gelişim geçmişin henüz boş." />
      ) : (
        <ol className="profilimDrawerList">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.kind}</span>
              <strong>{item.title}</strong>
              <small>
                {formatWhen(item.completedAt)} · {item.xp} XP
              </small>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
