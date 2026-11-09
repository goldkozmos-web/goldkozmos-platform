"use client";
import {useCallback,useEffect,useRef,useState} from "react";
import {modules,validateData,collision,type Kind,type PanelRecord} from "@/lib/panel/model";
import {api} from "@/lib/panel/client";
import Modal from "./Modal";

export default function Editor({
  initial,
  kind,
  records,
  onSave,
  onClose,
  dirtyRef,
  services,
}: {
  initial: PanelRecord | null;
  kind: Kind;
  records: PanelRecord[];
  onSave: (r: PanelRecord) => void;
  onClose: () => void;
  dirtyRef: React.RefObject<boolean>;
  services: string[];
}) {
  const [data, setData] = useState<Record<string, string>>(() =>
      Object.fromEntries(
        modules[kind].fields.map((f) => [
          f.key,
          initial?.data[f.key] || f.options?.[0] || "",
        ]),
      ),
    ),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false),
    [saved, setSaved] = useState("");
  const current = useRef(initial),
    busy = useRef(false),
    latest = useRef(data),
    revision = useRef(0),
    form = useRef<HTMLFormElement>(null);
  const save = useCallback(
    async (auto = false) => {
      if (busy.current) return;
      try {
        const clean = validateData(kind, latest.current);
        if (
          collision(records, {
            id: current.current?.id || "",
            kind,
            data: clean,
          }) &&
          !auto &&
          !window.confirm(
            "Aynı saatte başka bir randevu veya yayın var. Yine de kaydedilsin mi?",
          )
        )
          return;
        busy.current = true;
        setSaving(true);
        setError("");
        const rev = revision.current;
        const result = await api({
          kind,
          id: current.current?.id || undefined,
          version: current.current?.version,
          data: clean,
        });
        current.current = result.record;
        onSave(result.record);
        if (rev === revision.current) {
          dirtyRef.current = false;
          setSaved("Tüm değişiklikler kaydedildi.");
        } else setSaved("Yeni değişiklikler kaydedilmeyi bekliyor.");
      } catch (e) {
        setError((e as Error).message);
      } finally {
        busy.current = false;
        setSaving(false);
      }
    },
    [kind, records, onSave, dirtyRef],
  );
  useEffect(() => {
    if (kind !== "notes" || !dirtyRef.current || !data.title || saving || error)
      return;
    const timer = setTimeout(() => void save(true), 1800);
    return () => clearTimeout(timer);
  }, [data, kind, save, dirtyRef, saving, error]);
  return (
    <Modal
      title={`${modules[kind].label} · ${initial?.id ? "Düzenle" : "Yeni kayıt"}`}
      onClose={onClose}
    >
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <div className="panelForm">
          {modules[kind].fields.map((f) => (
            <label
              key={f.key}
              className={f.type === "textarea" ? "panelWide" : ""}
            >
              {f.label}
              {f.required ? " *" : ""}
              {f.type === "textarea" ? (
                <textarea
                  rows={f.key === "content" ? 14 : 4}
                  maxLength={30000}
                  value={data[f.key]}
                  onChange={(e) => change(f.key, e.target.value)}
                />
              ) : f.type === "select" ||
                f.type === "client" ||
                f.type === "service" ? (
                <select
                  aria-label={f.label}
                  required={f.required}
                  value={data[f.key]}
                  onChange={(e) => change(f.key, e.target.value)}
                >
                  <option value="">Seç…</option>
                  {(f.type === "client"
                    ? records
                        .filter((r) => r.kind === "clients")
                        .map((r) => ({ value: r.id, label: r.data.title }))
                    : (f.type === "service" ? services : f.options || []).map(
                        (s) => ({ value: s, label: s }),
                      )
                  ).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  onInput={["date", "time"].includes(f.type || "") ? (e) => change(f.key, e.currentTarget.value) : undefined}
                  required={f.required}
                  min={f.type === "number" ? 0 : undefined}
                  step={f.type === "number" ? "any" : undefined}
                  maxLength={500}
                  value={data[f.key]}
                  onChange={(e) => change(f.key, e.target.value)}
                />
              )}
            </label>
          ))}
        </div>
        {collision(records, { id: initial?.id || "", kind, data }) && (
          <p className="panelAlert">
            Bu saat başka bir randevu veya yayınla çakışıyor.
          </p>
        )}
        {error && (
          <p role="alert" className="panelAlert">
            {error}
          </p>
        )}
        <p role="status">
          {saving
            ? "Kaydediliyor…"
            : saved || "Değişikliklerin henüz kaydedilmedi."}
        </p>
        <div className="panelActions">
          <button className="panelPrimary" disabled={saving} type="submit">
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
          <button type="button" onClick={onClose}>
            Kapat
          </button>
        </div>
      </form>
    </Modal>
  );
  function change(key: string, value: string) {
    if(latest.current[key] === value) return;
    const next = { ...latest.current, [key]: value };
    latest.current = next;
    revision.current++;
    dirtyRef.current = true;
    setError("");
    setSaved("");
    setData(next);
  }
}
