"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

const MIN_DREAM = 80;

export default function RuyaNoteForm({
  relatedSlug,
}: {
  relatedSlug?: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [dreamDate, setDreamDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [dreamText, setDreamText] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [showInterp, setShowInterp] = useState(false);

  const canInterpret = dreamText.trim().length >= MIN_DREAM;

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  async function interpret() {
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/ruya-tabirleri/yorumla", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title,
          dreamText,
          relatedSlug,
        }),
      });
      const payload = (await response.json()) as {
        interpretation?: string;
        ready?: boolean;
        error?: string;
      };
      setShowInterp(true);
      if (!response.ok) {
        setInterpretation("");
        setStatus(payload.error || "Yorum alınamadı.");
        return;
      }
      if (!payload.ready) {
        setInterpretation("");
        setStatus(
          payload.error ||
            "Spiritüel yorum sağlayıcısı henüz bağlanmadı. Sunucuya DREAM_INTERPRET_API_KEY eklendiğinde bu alan gerçek yorum üretir.",
        );
        return;
      }
      setInterpretation(payload.interpretation ?? "");
      setStatus("Yorum hazır. Kaydetmek istersen aşağıdaki düğmeyi kullan.");
    } catch {
      setStatus("Yorum isteği gönderilemedi.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!supabase) {
      setStatus("Kayıt için giriş yapmalısın.");
      return;
    }
    if (!interpretation.trim() || !dreamText.trim()) {
      setStatus("Kaydetmek için rüya ve spiritüel yorum birlikte olmalı.");
      return;
    }
    setBusy(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      router.push("/profilim");
      return;
    }
    const { error } = await supabase.from("dream_journal_entries").insert({
      user_id: user.id,
      title: title.trim() || null,
      dream_date: dreamDate || null,
      dream_text: dreamText.trim(),
      spiritual_interpretation: interpretation.trim(),
      related_dream_slug: relatedSlug ?? null,
    });
    setBusy(false);
    if (error) {
      setStatus("Kaydedilemedi. Giriş yaptığından ve tablonun hazır olduğundan emin ol.");
      return;
    }
    setStatus("Rüyan ve anlamı Rüya Günlüğün’e kaydedildi.");
  }

  return (
    <section className="ruyaNote" id="ruya-not">
      <p className="ruyaEyebrow">KİŞİSEL ALAN</p>
      <h2>Rüyalarını Not Al</h2>
      <p>
        Rüyanı hatırladığın kadar ayrıntılı yaz. Gördüğün kişileri, mekanları,
        renkleri, sembolleri ve önemli detayları ekleyebilirsin.
      </p>

      <label>
        Rüya başlığı (opsiyonel)
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Rüya tarihi
        <input
          type="date"
          value={dreamDate}
          onChange={(event) => setDreamDate(event.target.value)}
        />
      </label>
      <label>
        Rüyan
        <textarea
          value={dreamText}
          onChange={(event) => setDreamText(event.target.value)}
        />
      </label>

      <button type="button" disabled={!canInterpret || busy} onClick={() => void interpret()}>
        Spiritüel Anlamını Yorumla
      </button>
      {!canInterpret ? (
        <p className="ruyaStatus">
          Yorum için rüyanı daha ayrıntılı yaz (en az birkaç cümle).
        </p>
      ) : null}

      {showInterp ? (
        <div className="ruyaInterp">
          <h2>Rüyanın Spiritüel Anlamı</h2>
          {interpretation
            ? interpretation.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))
            : null}
          {interpretation ? (
            <button type="button" disabled={busy} onClick={() => void save()}>
              Bu Rüyayı ve Anlamını Kaydet
            </button>
          ) : null}
        </div>
      ) : null}

      {status ? <p className="ruyaStatus">{status}</p> : null}
    </section>
  );
}
