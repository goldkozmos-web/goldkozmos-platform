"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { TAROT_DECK } from "../../data/tarot/deck";
import { TAROT_TOPICS, type TarotCard, type TarotTopicId } from "../../data/tarot/types";
import {
  cardPositionReading,
  spreadSynthesis,
  topicById,
} from "../../lib/tarot/reading";
import {
  tarotCardPath,
  tarotImagePath,
} from "../../lib/tarot/urls";

type Step = "topic" | "ready" | "result";

export default function TarotReading() {
  const [topic, setTopic] = useState<TarotTopicId | null>(null);
  const [step, setStep] = useState<Step>("topic");
  const [shuffling, setShuffling] = useState(false);
  const [slugs, setSlugs] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const topicMeta = topic ? topicById(topic) : null;
  const cards = useMemo(
    () =>
      slugs
        .map((slug) => TAROT_DECK.find((card) => card.slug === slug) ?? null)
        .filter((item): item is TarotCard => Boolean(item)),
    [slugs],
  );

  async function draw() {
    if (!topic) return;
    setStatus("");
    const response = await fetch("/api/tarot-bakimi/cek", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const payload = (await response.json()) as { cards?: string[]; error?: string };
    if (!response.ok || !payload.cards?.length) {
      setStatus(payload.error || "Kartlar çekilemedi.");
      return;
    }
    setSlugs(payload.cards);
    setStep("result");
  }

  return (
    <section className="tarotTool">
      <p className="tarotAsk">Tarot bakımını hangi konu için yapmak istiyorsun?</p>
      <div className="tarotTopics">
        {TAROT_TOPICS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`tarotTopic${topic === item.id ? " isOn" : ""}`}
            onClick={() => {
              setTopic(item.id);
              setStep("ready");
              setSlugs([]);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {topic && step !== "result" ? (
        <div className="tarotActions">
          <button
            type="button"
            className="tarotGhost"
            disabled={shuffling}
            onClick={() => {
              setShuffling(true);
              window.setTimeout(() => setShuffling(false), 700);
            }}
          >
            {shuffling ? "Karıştırılıyor…" : "Kartlarını Karıştır"}
          </button>
          <button type="button" onClick={() => void draw()} disabled={shuffling}>
            Kartlarını Çek
          </button>
        </div>
      ) : null}

      {status ? <p className="tarotLead">{status}</p> : null}

      {step === "result" && topicMeta && cards.length === 3 ? (
        <>
          <div className="tarotSpread">
            {cards.map((card, index) => (
              <article key={`${card.slug}-${index}`} className="tarotCardFace">
                <img src={tarotImagePath(card.slug)} alt={`${card.name} tarot kartı`} />
                <small>{topicMeta.positions[index]}</small>
                <h3>{card.name}</h3>
                <p>{cardPositionReading(card, topicMeta.id, index)}</p>
                <Link href={tarotCardPath(card.slug)}>
                  {card.name} kartının tüm anlamlarını öğren
                </Link>
              </article>
            ))}
          </div>

          <div className="tarotSynthesis">
            <h2>Bu Açılım Sana Ne Söylüyor?</h2>
            <p>{spreadSynthesis(cards, topicMeta.id)}</p>
          </div>

          <div className="tarotActions">
            <button
              type="button"
              className="tarotGhost"
              onClick={() => {
                setStep("topic");
                setTopic(null);
                setSlugs([]);
              }}
            >
              Yeni Bir Bakım Yap
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}
