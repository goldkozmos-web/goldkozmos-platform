"use client";

import { useEffect, useState } from "react";

import ProfilimEmptyState from "./ProfilimEmptyState";
import {
  deleteDreamJournal,
  fetchDreamJournal,
  updateDreamJournal,
  type DreamJournalEntry,
} from "../../lib/ruya-tabirleri/journal";

function preview(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 120 ? `${clean.slice(0, 117)}…` : clean;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "—";
  return date.toLocaleDateString("tr-TR");
}

export default function RuyaGunluguPanel() {
  const [items, setItems] = useState<DreamJournalEntry[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [freshInterp, setFreshInterp] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function reload() {
    setItems(await fetchDreamJournal());
  }

  useEffect(() => {
    void reload();
  }, []);

  const current = items.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    if (current) setDraft(current.dreamText);
    setFreshInterp("");
    setStatus("");
  }, [current?.id]);

  async function reinterpret() {
    if (!current) return;
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/ruya-tabirleri/yorumla", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: current.title,
        dreamText: draft,
        relatedSlug: current.relatedDreamSlug,
      }),
    });
    const payload = (await response.json()) as {
      ready?: boolean;
      interpretation?: string;
      error?: string;
    };
    setBusy(false);
    if (!payload.ready) {
      setStatus(payload.error || "Yeni yorum üretilemedi.");
      return;
    }
    setFreshInterp(payload.interpretation ?? "");
    setStatus("Yeni yorum hazır. Kaydetmeden eski anlam değişmez.");
  }

  return (
    <div className="profilimDrawerStack">
      {items.length === 0 ? (
        <ProfilimEmptyState text="Kaydedilmiş bir rüyan yok. Rüya tabirleri sayfasından not alıp kaydedebilirsin." />
      ) : (
        <ul className="profilimDrawerList">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="profilimNeedChip"
                style={{ width: "100%", textAlign: "left" }}
                onClick={() => setOpenId(item.id)}
              >
                <strong>{item.title || "Başlıksız rüya"}</strong>
                <small>
                  {formatDate(item.dreamDate || item.createdAt)} ·{" "}
                  {preview(item.dreamText)}
                </small>
              </button>
            </li>
          ))}
        </ul>
      )}

      {current ? (
        <div className="ruyaNote" style={{ marginTop: 8 }}>
          <p className="ruyaEyebrow">DETAY</p>
          <h2>{current.title || "Rüyam"}</h2>
          <p>
            {formatDate(current.dreamDate || current.createdAt)}
          </p>
          <label>
            Rüyam
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <h2>Spiritüel Anlamı</h2>
          {current.spiritualInterpretation.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}

          {freshInterp ? (
            <>
              <h2>Yeni Yorum</h2>
              {freshInterp.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setBusy(true);
                  void updateDreamJournal(current.id, {
                    spiritualInterpretation: freshInterp,
                  }).then(async (result) => {
                    setBusy(false);
                    if (result.error) {
                      setStatus(result.error);
                      return;
                    }
                    setFreshInterp("");
                    setStatus("Yeni yorum kaydedildi.");
                    await reload();
                  });
                }}
              >
                Yeni Yorumu Kaydet
              </button>
            </>
          ) : null}

          <button
            type="button"
            className="ruyaGhost"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              void updateDreamJournal(current.id, { dreamText: draft }).then(
                async (result) => {
                  setBusy(false);
                  if (result.error) {
                    setStatus(result.error);
                    return;
                  }
                  setStatus("Rüya metni güncellendi. Eski yorum aynı kaldı.");
                  await reload();
                },
              );
            }}
          >
            Rüyayı Düzenle
          </button>
          <button
            type="button"
            className="ruyaGhost"
            disabled={busy}
            onClick={() => void reinterpret()}
          >
            Yeniden Yorumla
          </button>
          <button
            type="button"
            className="ruyaGhost"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              void deleteDreamJournal(current.id).then(async (result) => {
                setBusy(false);
                if (result.error) {
                  setStatus(result.error);
                  return;
                }
                setOpenId(null);
                await reload();
              });
            }}
          >
            Rüyayı Sil
          </button>
          {status ? <p className="ruyaStatus">{status}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
