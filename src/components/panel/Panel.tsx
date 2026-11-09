"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Bars from "./Bars";
import Modal from "./Modal";
import Editor from "./Editor";
import {api,download} from "@/lib/panel/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  modules,
  defaultServices,
  clientTotals,
  collision,
  istanbulDate,
  money,
  validateData,
  type Kind,
  type PanelRecord,
} from "@/lib/panel/model";
import { calendarIcs } from "@/lib/panel/calendar";
import { dashboard, weekDays, csv, parseCsv } from "@/lib/panel/metrics";
type Section = Kind | "overview" | "calendar" | "trash";
const dateLabel = (date: string) =>
  date
    ? new Date(date + "T12:00:00Z").toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
      })
    : "Tarih yok";
export default function Panel() {
  const router = useRouter();
  const [records, setRecords] = useState<PanelRecord[]>([]),
    [section, setSection] = useState<Section>("overview"),
    [ready, setReady] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState(""),
    [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [workFilter, setWorkFilter] = useState(""),
    [sidebar, setSidebar] = useState(true),
    [dark, setDark] = useState(false),
    [online, setOnline] = useState(true),
    [editing, setEditing] = useState<PanelRecord | null>(null),
    [creating, setCreating] = useState<Kind | null>(null),
    [selectedClient, setSelectedClient] = useState<string | null>(null),
    [confirmDelete, setConfirmDelete] = useState<PanelRecord | null>(null),
    [calendarDay, setCalendarDay] = useState(istanbulDate()),
    [view, setView] = useState("month"),
    [listView, setListView] = useState("list"),
    [notice, setNotice] = useState(""),
    [importRows, setImportRows] = useState<Record<string, string>[] | null>(
      null,
    ),
    [importProgress, setImportProgress] = useState(""),
    [remind, setRemind] = useState(false);
  const dirtyRef = useRef(false);
  const today = istanbulDate();
  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const data = await api();
      setRecords(data.records);
      setReady(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    const init = setTimeout(() => {
      void load();
      setOnline(navigator.onLine);
    }, 0);
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    const before = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", before);
    return () => {
      clearTimeout(init);
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
      window.removeEventListener("beforeunload", before);
    };
  }, [load]);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setDark(localStorage.getItem("gk-panel-theme") === "dark");
      } catch {}
    }, 0);
    if ("serviceWorker" in navigator)
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const client = createSupabaseBrowserClient();
    const subscription = client?.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setRecords([]);
        setReady(false);
        router.replace("/profilim");
      }
    }).data.subscription;
    return () => subscription?.unsubscribe();
  }, [router]);
  function apply(row: PanelRecord) {
    setRecords((old) => [...old.filter((r) => r.id !== row.id), row]);
    setNotice("Kaydedildi.");
  }
  function close() {
    if (
      dirtyRef.current &&
      !window.confirm(
        "Kaydedilmemiş değişiklikler var. Düzenlemeyi kapatmak istiyor musun?",
      )
    )
      return;
    dirtyRef.current = false;
    setEditing(null);
    setCreating(null);
  }
  function navigate(next: Section) {
    if (editing || creating) {
      if (
        dirtyRef.current &&
        !window.confirm(
          "Kaydedilmemiş değişiklikler var. Bölümden çıkılsın mı?",
        )
      )
        return;
      dirtyRef.current = false;
      setEditing(null);
      setCreating(null);
    }
    setSection(next);
    setSearch("");
    setFilter("");
    setFrom("");
    setTo("");
    setSelectedClient(null);
    setWorkFilter("");
    setListView("list");
  }
  async function mutate(row: PanelRecord, action: string, data = row.data) {
    try {
      const result = await api({
        kind: row.kind,
        id: row.id,
        version: row.version,
        action,
        data,
      });
      apply(result.record);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  const active = records.filter((r) => !r.deleted_at),
    stats = dashboard(records, today);
  const kind = Object.hasOwn(modules, section) ? (section as Kind) : null;
  let visible = records
    .filter((r) =>
      section === "trash" ? !!r.deleted_at : !r.deleted_at && r.kind === kind,
    )
    .filter(
      (r) =>
        (!search ||
          Object.values(r.data)
            .join(" ")
            .toLocaleLowerCase("tr-TR")
            .includes(search.toLocaleLowerCase("tr-TR"))) &&
        (!filter || r.data.status === filter) &&
        (!from ||
          (r.data.date || r.data.firstDate || r.created_at.slice(0, 10)) >=
            from) &&
        (!to ||
          (r.data.date || r.data.firstDate || r.created_at.slice(0, 10)) <= to),
    );
  if (kind === "clients" && workFilter)
    visible = visible.filter((c) =>
      active.some(
        (w) =>
          w.kind === "works" &&
          w.data.clientId === c.id &&
          w.data.title === workFilter,
      ),
    );
  if (kind === "clients" && filter)
    visible = records.filter(
      (r) =>
        !r.deleted_at &&
        r.kind === "clients" &&
        (!search ||
          Object.values(r.data)
            .join(" ")
            .toLocaleLowerCase("tr-TR")
            .includes(search.toLocaleLowerCase("tr-TR"))) &&
        active.some(
          (w) =>
            w.kind === "works" &&
            w.data.clientId === r.id &&
            w.data.status === filter,
        ) &&
        (!workFilter ||
          active.some(
            (w) =>
              w.kind === "works" &&
              w.data.clientId === r.id &&
              w.data.title === workFilter,
          )) &&
        (!from || (r.data.firstDate || r.created_at.slice(0, 10)) >= from) &&
        (!to || (r.data.firstDate || r.created_at.slice(0, 10)) <= to),
    );
  visible.sort((a, b) =>
    kind === "notes"
      ? Number(b.data.pinned === "Evet") - Number(a.data.pinned === "Evet") ||
        b.updated_at.localeCompare(a.updated_at)
      : b.updated_at.localeCompare(a.updated_at),
  );
  const scheduled = active.filter(
    (r) =>
      ["appointments", "broadcasts", "tasks", "instagram", "youtube"].includes(
        r.kind,
      ) &&
      r.data.date &&
      r.data.status !== "İptal",
  );
  const upcoming = (k: Kind) =>
    scheduled
      .filter(
        (r) =>
          r.kind === k &&
          r.data.date >= today &&
          r.data.status !== "Tamamlandı" &&
          r.data.status !== "Yayınlandı",
      )
      .sort((a, b) =>
        (a.data.date + a.data.time).localeCompare(b.data.date + b.data.time),
      )
      .slice(0, 5);
  const services = [
    ...new Set([
      ...defaultServices,
      ...active.filter((r) => r.kind === "services").map((r) => r.data.title),
    ]),
  ];
  const week = weekDays(calendarDay),
    weekTasks = active.filter(
      (r) => r.kind === "tasks" && week.includes(r.data.date),
    );
  let days = week;
  if (view === "day") days = [calendarDay];
  if (view === "month") {
    const start = calendarDay.slice(0, 7) + "-01",
      first = weekDays(start)[0];
    days = Array.from({ length: 42 }, (_, i) =>
      new Date(Date.parse(first + "T12:00:00Z") + i * 86400000)
        .toISOString()
        .slice(0, 10),
    );
  }
  const isCalendar =
    section === "calendar" ||
    ((kind === "instagram" || kind === "youtube") && listView === "calendar");
  async function move(id: string, date: string) {
    const row = active.find((r) => r.id === id);
    if (!row) return;
    const data = { ...row.data, date };
    if (
      collision(active, { ...row, data }) &&
      !window.confirm(
        "Bu saat başka bir randevu veya yayınla çakışıyor. Yine de taşınsın mı?",
      )
    )
      return;
    await mutate(row, "save", data);
  }
  async function readImport(file: File) {
    try {
      if (file.size > 2 * 1024 * 1024)
        throw Error("Dosya en fazla 2 MB olabilir.");
      let rows: string[][];
      if (file.name.toLowerCase().endsWith(".xlsx")) {
        const { readSheet } = await import("read-excel-file/browser");
        rows = (await readSheet(file)).map((row) =>
          row.map((cell) => (cell === null ? "" : String(cell))),
        );
      } else rows = parseCsv(await file.text());
      const header = rows.shift()?.map((s) =>
        s
          .replace(/^\uFEFF/, "")
          .trim()
          .toLocaleLowerCase("tr-TR"),
      );
      if (!header || !["ad soyad", "adsoyad", "title"].includes(header[0]))
        throw Error(
          "İlk sütun Ad soyad olmalı. Sıra: Ad soyad, Telefon, E-posta, Kısa notlar.",
        );
      if (rows.length > 500)
        throw Error("Bir seferde en fazla 500 danışan aktarılabilir.");
      const parsed = rows.map((r) =>
        validateData("clients", {
          title: r[0] || "",
          phone: r[1] || "",
          email: r[2] || "",
          note: r[3] || "",
        }),
      );
      const seen = new Set<string>();
      setImportRows(
        parsed.filter((r) => {
          const keys = [
            r.title.toLocaleLowerCase("tr-TR"),
            r.email?.toLowerCase(),
            r.phone?.replace(/\D/g, ""),
          ].filter(Boolean);
          if (keys.some((k) => seen.has(k))) return false;
          keys.forEach((k) => seen.add(k));
          return true;
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function confirmImport() {
    if (!importRows) return;
    setBusy(true);
    let imported = 0;
    try {
      for (const data of importRows) {
        const duplicate = active.some(
          (r) =>
            r.kind === "clients" &&
            ((data.email &&
              r.data.email?.toLowerCase() === data.email.toLowerCase()) ||
              (data.phone &&
                r.data.phone?.replace(/\D/g, "") ===
                  data.phone.replace(/\D/g, "")) ||
              r.data.title.toLocaleLowerCase("tr-TR") ===
                data.title.toLocaleLowerCase("tr-TR")),
        );
        if (duplicate) continue;
        const result = await api({ kind: "clients", data });
        apply(result.record);
        imported++;
        setImportProgress(`${imported} kayıt aktarıldı`);
        setImportRows((old) => old?.filter((r) => r !== data) || null);
      }
      setImportRows(null);
      setNotice(
        `${imported} danışan aktarıldı. Eşleşen mevcut kayıtlar atlandı.`,
      );
    } catch (e) {
      setError(
        `${imported} kayıt aktarıldı. ${(e as Error).message} Kalanları tekrar deneyebilirsin.`,
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={`businessPanel${dark ? " panelDark" : ""}`}>
      <aside className={`panelNav${sidebar ? "" : " panelNavClosed"}`}>
        <Link href="/panel" className="panelBrand">
          GK{" "}
          <span>
            GOLDKOZMOS<small>ÖZEL YÖNETİM MERKEZİ</small>
          </span>
        </Link>
        <nav aria-label="Panel bölümleri">
          {(
            [
              ["overview", "Kontrol merkezi"],
              ["clients", "Danışanlar"],
              ["works", "Çalışmalar"],
              ["calendar", "Takvim"],
              ["appointments", "Randevular"],
              ["broadcasts", "Canlı yayınlar"],
              ["tasks", "Haftalık plan"],
              ["instagram", "Instagram"],
              ["youtube", "YouTube"],
              ["notes", "Not defteri"],
              ["services", "Çalışma türleri"],
              ["trash", "Çöp kutusu"],
            ] as [Section, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              aria-current={section === key ? "page" : undefined}
              onClick={() => navigate(key)}
            >
              {label}
            </button>
          ))}
        </nav>
        <Link href="/admin">Site yönetimine dön ↗</Link>
        <Link href="/">Siteyi aç ↗</Link>
      </aside>
      <main className="panelMain">
        <header className="panelTop">
          <button
            onClick={() => setSidebar(!sidebar)}
            aria-label="Menüyü aç veya kapat"
            aria-expanded={sidebar}
          >
            ☰
          </button>
          <div>
            <span>GOLDKOZMOS · YÖNETİM</span>
            <h1>
              {kind
                ? modules[kind].label
                : section === "overview"
                  ? "Kontrol merkezi"
                  : section === "trash"
                    ? "Çöp kutusu"
                    : "Takvim"}
            </h1>
          </div>
          <button
            onClick={() => {
              setDark(!dark);
              try {
                localStorage.setItem("gk-panel-theme", dark ? "light" : "dark");
              } catch {}
            }}
          >
            {dark ? "Açık tema" : "Koyu tema"}
          </button>
          <button onClick={() => void load()} disabled={busy}>
            Yenile
          </button>
        </header>
        <p className="panelDate">
          {new Date().toLocaleDateString("tr-TR", {
            timeZone: "Europe/Istanbul",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · Türkiye saati
        </p>
        {!online && (
          <p role="alert" className="panelAlert">
            İnternet bağlantısı yok. Açık formunu kapatma; değişikliklerin henüz
            kaydedilmeyebilir.
          </p>
        )}
        {error && (
          <p role="alert" className="panelAlert">
            {error} <button onClick={() => setError("")}>Kapat</button>
          </p>
        )}
        <p role="status" className="panelNotice">
          {busy ? "İşlem sürüyor…" : notice}
        </p>
        {!ready && (
          <section className="panelEmpty">
            <h2>
              {busy
                ? "Kayıtlar yükleniyor…"
                : "Veritabanı bağlantısı bekleniyor"}
            </h2>
            <p>
              Gerçek kayıtlar yüklenmeden istatistik gösterilmez. Kayıtların
              tarayıcıda saklanmaz.
            </p>
          </section>
        )}
        {section === "overview" && ready && (
          <>
            <section className="panelMetrics">
              {[
                ["Benzersiz danışan", stats.clients],
                ["Bu ay yeni danışan", stats.newClients],
                ["Gerçekleştirilen çalışma", stats.works],
                ["Tekrar gelen danışan", stats.repeat],
                ["Aylık gelir", money(stats.monthlyIncome)],
                ["Yıllık gelir", money(stats.yearlyIncome)],
                ["Tamamlanan görev", stats.done],
                ["Bekleyen görev", stats.pending],
              ].map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </section>
            <p className="panelMuted">
              Gelir, çalışma kayıtlarına girilen ödenen tutarın ödeme tarihine
              göre hesaplanır. Site ziyaretleri ve satış bağlantısına tıklamalar
              gelir sayılmaz.
            </p>
            <section className="panelCharts">
              <Bars title="Aylara göre gelir" values={stats.monthly} currency />
              <Bars
                title="Tercih edilen çalışmalar"
                values={stats.popular.map(([label, value]) => ({
                  label,
                  value,
                }))}
              />
              <Bars
                title="Yeni ve tekrar gelen danışanlar"
                values={[
                  { label: "Bu ay yeni", value: stats.newClients },
                  { label: "Tekrar gelen (tüm dönem)", value: stats.repeat },
                ]}
              />
              <Bars title="Yayımlanan içerikler" values={stats.platforms} />
            </section>
            <section className="panelColumns">
              {(["appointments", "broadcasts"] as Kind[]).map((k) => (
                <article key={k}>
                  <h2>
                    Yaklaşan {modules[k].label.toLocaleLowerCase("tr-TR")}
                  </h2>
                  {upcoming(k).length ? (
                    upcoming(k).map((r) => (
                      <button
                        className="panelRowButton"
                        key={r.id}
                        onClick={() => setEditing(r)}
                      >
                        {r.data.title}
                        <small>
                          {dateLabel(r.data.date)} · {r.data.time}
                        </small>
                      </button>
                    ))
                  ) : (
                    <p>Planlanmış kayıt yok.</p>
                  )}
                </article>
              ))}
              <article>
                <h2>Bu haftanın içerikleri</h2>
                {scheduled
                  .filter(
                    (r) =>
                      ["instagram", "youtube"].includes(r.kind) &&
                      weekDays(today).includes(r.data.date),
                  )
                  .map((r) => (
                    <button
                      className="panelRowButton"
                      key={r.id}
                      onClick={() => setEditing(r)}
                    >
                      {r.data.title}
                      <small>
                        {modules[r.kind].label} · {dateLabel(r.data.date)}
                      </small>
                    </button>
                  ))}
              </article>
            </section>
          </>
        )}
        {(kind || section === "trash") && (
          <>
            <p>
              {kind
                ? modules[kind].hint
                : "Silinen kayıtlar burada tutulur ve geri alınabilir. Kalıcı silme bu ekrandan yapılmaz."}
            </p>
            <div className="panelTools">
              <input
                aria-label="Kayıtlarda ara"
                placeholder="Ara…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                aria-label="Duruma göre filtrele"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Tüm durumlar</option>
                {(kind === "clients"
                  ? ["Planlandı", "Devam ediyor", "Tamamlandı", "İptal"]
                  : modules[kind || "notes"].fields.find(
                      (f) => f.key === "status",
                    )?.options || []
                ).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <input
                aria-label="Başlangıç filtresi"
                type="date"
                value={from}
                onInput={(e) => setFrom(e.currentTarget.value)}
                onChange={(e) => setFrom(e.target.value)}
              />
              <input
                aria-label="Bitiş filtresi"
                type="date"
                value={to}
                onInput={(e) => setTo(e.currentTarget.value)}
                onChange={(e) => setTo(e.target.value)}
              />
              {kind === "clients" && (
                <select
                  aria-label="Çalışma türü filtresi"
                  value={workFilter}
                  onChange={(e) => setWorkFilter(e.target.value)}
                >
                  <option value="">Tüm çalışmalar</option>
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              )}
              {kind && (
                <button
                  className="panelPrimary"
                  onClick={() => setCreating(kind)}
                >
                  + Kayıt ekle
                </button>
              )}
              <button
                onClick={() => {
                  const fields = kind ? modules[kind].fields : [];
                  download(
                    `goldkozmos-${section}-${today}.csv`,
                    csv([
                      [
                        "Kayıt ID",
                        ...fields.map((f) => f.label),
                        "Oluşturuldu",
                        "Güncellendi",
                      ],
                      ...visible.map((r) => [
                        r.id,
                        ...fields.map((f) =>
                          f.type === "client"
                            ? active.find((c) => c.id === r.data[f.key])?.data
                                .title || ""
                            : r.data[f.key] || "",
                        ),
                        r.created_at,
                        r.updated_at,
                      ]),
                    ]),
                  );
                }}
              >
                CSV dışa aktar
              </button>
              {kind === "clients" && (
                <label className="panelFile">
                  Excel / CSV içe aktar
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void readImport(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
            {kind === "clients" && (
              <p className="panelMuted">
                İçe aktarma sütun sırası: Ad soyad, Telefon, E-posta, Kısa
                notlar. Önce aktarım özeti gösterilir.
              </p>
            )}
            {["instagram", "youtube"].includes(kind || "") && (
              <div className="panelTools">
                <button
                  aria-pressed={listView === "list"}
                  onClick={() => setListView("list")}
                >
                  Liste
                </button>
                <button
                  aria-pressed={listView === "calendar"}
                  onClick={() => setListView("calendar")}
                >
                  Takvim
                </button>
                <button
                  onClick={() => {
                    setListView("list");
                    setFilter("Fikir");
                  }}
                >
                  Fikir havuzu
                </button>
                <button
                  onClick={() => {
                    setListView("list");
                    setFilter("Yayınlandı");
                  }}
                >
                  Yayın arşivi
                </button>
              </div>
            )}
            {kind === "tasks" && (
              <section className="panelWeekly">
                <div>
                  <h2>Haftalık plan</h2>
                  <input
                    aria-label="Plan haftası"
                    type="date"
                    value={calendarDay}
                    onInput={(e) => setCalendarDay(e.currentTarget.value)}
                onChange={(e) => setCalendarDay(e.target.value)}
                  />
                  <p>
                    Tamamlanma:{" "}
                    {weekTasks.length
                      ? Math.round(
                          (weekTasks.filter(
                            (r) => r.data.status === "Tamamlandı",
                          ).length /
                            weekTasks.length) *
                            100,
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="panelWeekDays">
                  {week.map((d) => {
                    const items = weekTasks.filter((r) => r.data.date === d);
                    return (
                      <article
                        key={d}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          void move(e.dataTransfer.getData("text/plain"), d);
                        }}
                      >
                        <h3>
                          {new Date(d + "T12:00:00Z").toLocaleDateString(
                            "tr-TR",
                            { weekday: "short", day: "numeric" },
                          )}
                        </h3>
                        <small>
                          {
                            items.filter((r) => r.data.status === "Tamamlandı")
                              .length
                          }{" "}
                          / {items.length} tamamlandı
                        </small>
                        {items.map((r) => (
                          <button
                            key={r.id}
                            draggable
                            onDragStart={(e) =>
                              e.dataTransfer.setData("text/plain", r.id)
                            }
                            onClick={() => setEditing(r)}
                          >
                            {r.data.status === "Tamamlandı" ? "✓ " : ""}
                            {r.data.title}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setCreating("tasks");
                            setEditing({
                              id: "",
                              kind: "tasks",
                              data: { date: d },
                              version: 0,
                              created_at: "",
                              updated_at: "",
                              deleted_at: null,
                            });
                          }}
                        >
                          + Görev
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
            {!isCalendar && (
              <section className="panelRecords">
                {visible.map((r) => (
                  <article key={r.id}>
                    <div>
                      <span className="panelEyebrow">
                        {modules[r.kind].label}{" "}
                        {r.data.status && `· ${r.data.status}`}
                      </span>
                      <h2>
                        {r.data.pinned === "Evet" ? "✦ " : ""}
                        {r.data.title ||
                          active.find((c) => c.id === r.data.clientId)?.data
                            .title}
                      </h2>
                      {r.data.date && (
                        <p>
                          {dateLabel(r.data.date)} {r.data.time}
                        </p>
                      )}
                      {r.kind === "clients" && (
                        <p>
                          {clientTotals(records, r.id).works} çalışma ·{" "}
                          {clientTotals(records, r.id).sessions} seans ·{" "}
                          {money(clientTotals(records, r.id).paid)} ödeme · Son:{" "}
                          {dateLabel(clientTotals(records, r.id).last)}
                        </p>
                      )}
                      {r.kind === "works" && (
                        <p>
                          {
                            active.find((c) => c.id === r.data.clientId)?.data
                              .title
                          }{" "}
                          · {r.data.completed || 0}/{r.data.planned || 0} seans
                          <br />
                          {money(Number(r.data.paid || 0))} ödendi ·{" "}
                          {money(
                            Number(r.data.fee || 0) - Number(r.data.paid || 0),
                          )}{" "}
                          kalan ·{" "}
                          {Number(r.data.paid || 0) >= Number(r.data.fee || 0)
                            ? "Ödendi"
                            : Number(r.data.paid || 0) > 0
                              ? "Kısmi ödeme"
                              : "Bekliyor"}
                          {r.data.endDate &&
                            ` · ${Math.floor((Date.parse(r.data.endDate) - Date.parse(r.data.date)) / 86400000) + 1} gün`}
                        </p>
                      )}
                      {r.kind === "notes" && (
                        <p className="panelExcerpt">{r.data.content}</p>
                      )}
                      <small>
                        Son düzenleme:{" "}
                        {new Date(r.updated_at).toLocaleString("tr-TR", {
                          timeZone: "Europe/Istanbul",
                        })}
                      </small>
                    </div>
                    <div className="panelActions">
                      {r.deleted_at ? (
                        <button onClick={() => void mutate(r, "restore")}>
                          Geri al
                        </button>
                      ) : (
                        <>
                          {r.kind === "clients" && (
                            <button onClick={() => setSelectedClient(r.id)}>
                              Profili aç
                            </button>
                          )}
                          <button onClick={() => setEditing(r)}>Düzenle</button>
                          {r.kind === "tasks" && (
                            <button
                              onClick={() =>
                                void mutate(r, "save", {
                                  ...r.data,
                                  status:
                                    r.data.status === "Tamamlandı"
                                      ? "Planlandı"
                                      : "Tamamlandı",
                                })
                              }
                            >
                              {r.data.status === "Tamamlandı"
                                ? "Yeniden aç"
                                : "Tamamlandı"}
                            </button>
                          )}
                          <button onClick={() => setConfirmDelete(r)}>
                            Sil
                          </button>
                        </>
                      )}
                    </div>
                  </article>
                ))}
                {!visible.length && ready && (
                  <p className="panelEmpty">
                    Bu görünümde kayıt yok. İlk kaydını ekleyebilirsin.
                  </p>
                )}
              </section>
            )}
          </>
        )}
        {isCalendar && (
          <>
            <div className="panelTools">
              <input
                aria-label="Takvim tarihi"
                type="date"
                value={calendarDay}
                onInput={(e) => setCalendarDay(e.currentTarget.value)}
                onChange={(e) => setCalendarDay(e.target.value)}
              />
              {[
                ["day", "Gün"],
                ["week", "Hafta"],
                ["month", "Ay"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  aria-pressed={view === k}
                  onClick={() => setView(k)}
                >
                  {label}
                </button>
              ))}
              <label>
                <input
                  type="checkbox"
                  checked={remind}
                  onChange={(e) => setRemind(e.target.checked)}
                />{" "}
                15 dakika önce hatırlat
              </label>
              <button
                onClick={() =>
                  download(
                    "goldkozmos-takvim.ics",
                    calendarIcs(
                      scheduled.filter(
                        (r) =>
                          r.data.date >= days[0] &&
                          r.data.date <= days[days.length - 1],
                      ),
                      remind,
                    ),
                    "text/calendar;charset=utf-8",
                  )
                }
              >
                Takvim uygulamasına aktar
              </button>
              <span>
                Sürükleyerek taşı veya kaydı açıp tarihini değiştir.
                Hatırlatmalar ICS dosyasını takvim uygulamana aktardığında
                çalışır.
              </span>
            </div>
            <section
              className={`panelCalendar ${view === "day" ? "panelCalendarDay" : ""}`}
            >
              {days.map((d) => (
                <article
                  key={d}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    void move(e.dataTransfer.getData("text/plain"), d);
                  }}
                >
                  <button
                    className="panelDay"
                    onClick={() => {
                      const k =
                        kind === "instagram" || kind === "youtube"
                          ? kind
                          : "appointments";
                      setCreating(k);
                      setEditing({
                        id: "",
                        kind: k,
                        data: { date: d },
                        version: 0,
                        created_at: "",
                        updated_at: "",
                        deleted_at: null,
                      });
                    }}
                  >
                    {dateLabel(d)} +
                  </button>
                  {scheduled
                    .filter(
                      (r) =>
                        r.data.date === d &&
                        (!kind || r.kind === kind) &&
                        (!search ||
                          r.data.title
                            .toLocaleLowerCase("tr-TR")
                            .includes(search.toLocaleLowerCase("tr-TR"))) &&
                        (!filter || r.data.status === filter),
                    )
                    .map((r) => (
                      <button
                        className={`panelEvent event-${r.kind}`}
                        key={r.id}
                        draggable
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", r.id)
                        }
                        onClick={() => setEditing(r)}
                      >
                        <small>
                          {modules[r.kind].label} · {r.data.time}
                        </small>
                        {r.data.title}
                      </button>
                    ))}
                </article>
              ))}
            </section>
          </>
        )}
        <footer className="panelFooter">
          Veriler yalnızca yönetici hesabına açıktır. Hassas kayıtlar çevrimdışı
          önbelleğe alınmaz.{" "}
          <button
            onClick={() =>
              download(
                `goldkozmos-panel-yedek-${today}.json`,
                JSON.stringify(
                  { exportedAt: new Date().toISOString(), records },
                  null,
                  2,
                ),
                "application/json",
              )
            }
          >
            Tüm kayıtları yedekle (JSON)
          </button>
          <p>
            Tablet: Chrome menüsü → Ana ekrana ekle / Uygulamayı yükle. Paneli
            internet bağlantısıyla kullan.
          </p>
        </footer>
      </main>
      {(editing || creating) && (
        <Editor
          key={editing?.id || "new"}
          initial={editing}
          kind={editing?.kind || creating!}
          records={active}
          onSave={apply}
          onClose={close}
          dirtyRef={dirtyRef}
          services={services}
        />
      )}
      {confirmDelete && (
        <Modal
          title="Kaydı çöp kutusuna taşı?"
          onClose={() => setConfirmDelete(null)}
        >
          <p>
            {confirmDelete.data.title} kaydı geri alınabilir. Bağlı çalışmaları
            bulunan danışan önce o kayıtlar kaldırılmadan silinemez.
          </p>
          <button
            className="panelPrimary"
            onClick={() => {
              void mutate(confirmDelete, "trash");
              setConfirmDelete(null);
            }}
          >
            Çöp kutusuna taşı
          </button>
        </Modal>
      )}
      {selectedClient && (
        <Modal
          title={
            active.find((c) => c.id === selectedClient)?.data.title || "Danışan"
          }
          onClose={() => setSelectedClient(null)}
        >
          <p>{active.find((c) => c.id === selectedClient)?.data.note}</p>
          <p>
            {clientTotals(records, selectedClient).works} çalışma ·{" "}
            {clientTotals(records, selectedClient).sessions} seans ·{" "}
            {money(clientTotals(records, selectedClient).paid)}
          </p>
          <button
            className="panelPrimary"
            onClick={() => {
              setCreating("works");
              setEditing({
                id: "",
                kind: "works",
                data: { clientId: selectedClient },
                version: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
              });
              setSelectedClient(null);
            }}
          >
            Bu danışana çalışma ekle
          </button>
          {active
            .filter(
              (r) => r.kind === "works" && r.data.clientId === selectedClient,
            )
            .map((r) => (
              <button
                className="panelRowButton"
                key={r.id}
                onClick={() => {
                  setEditing(r);
                  setSelectedClient(null);
                }}
              >
                {r.data.title}
                <small>
                  {dateLabel(r.data.date)} · {r.data.status} ·{" "}
                  {money(Number(r.data.paid || 0))}
                </small>
              </button>
            ))}
        </Modal>
      )}
      {importRows && (
        <Modal
          title="Danışan aktarımını kontrol et"
          onClose={() => {
            if (!busy) setImportRows(null);
          }}
        >
          <p>
            {importRows.length} satır. Aynı isim, telefon veya e-posta ile
            eşleşen kayıtlar atlanır; mevcut danışanların bilgileri
            değiştirilmez.
          </p>
          {importRows.slice(0, 10).map((r, i) => (
            <p key={i}>
              {r.title} · {r.email}
            </p>
          ))}
          <p role="status">{importProgress}</p>
          <button
            disabled={busy}
            className="panelPrimary"
            onClick={() => void confirmImport()}
          >
            Aktarımı başlat
          </button>
        </Modal>
      )}
    </div>
  );
}
