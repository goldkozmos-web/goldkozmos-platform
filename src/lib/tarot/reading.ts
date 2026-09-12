import { TAROT_DECK } from "../../data/tarot/deck";
import { TAROT_TOPICS, type TarotCard, type TarotTopicId } from "../../data/tarot/types";
import { randomInt } from "node:crypto";

export function topicById(id: string) {
  return TAROT_TOPICS.find((item) => item.id === id) ?? null;
}

export function drawUniqueCards(count = 3): TarotCard[] {
  const pool = [...TAROT_DECK];
  const picked: TarotCard[] = [];
  while (picked.length < count && pool.length > 0) {
    const index = randomInt(pool.length);
    const [card] = pool.splice(index, 1);
    if (card) picked.push(card);
  }
  return picked;
}

function meaningFor(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  if (topic === "love") {
    return [card.love, card.otherFeelings, card.future][index] ?? card.love;
  }
  if (topic === "thoughts") {
    return [card.topics.thoughts, card.otherFeelings, card.advice][index] ?? card.topics.thoughts;
  }
  if (topic === "career") {
    return [card.career, card.topics.career, card.future][index] ?? card.career;
  }
  if (topic === "decision") {
    return [card.energy, card.advice, card.future][index] ?? card.advice;
  }
  if (topic === "development") {
    return [card.topics.development, card.energy, card.future][index] ?? card.general;
  }
  return [card.general, card.topics.general, card.future][index] ?? card.general;
}

function positionVerb(topic: TarotTopicId, index: number) {
  const names = topicById(topic)?.positions ?? ["Bu konum", "Bu konum", "Bu konum"];
  return names[index] ?? "Bu konum";
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  const seat = positionVerb(topic, index);
  const meaning = meaningFor(card, topic, index).trim();
  const extra =
    index === 2
      ? card.advice
      : index === 1
        ? card.energy
        : card.brief;

  return `${card.name}, “${seat}” konumunda. ${meaning} ${extra}`.replace(/\s+/g, " ").trim();
}

function pull(card: TarotCard) {
  return {
    warmth: /sıcak|açık|çekim|sevinç|bereket|netlik|umut|canlı/i.test(
      `${card.love} ${card.otherFeelings} ${card.brief}`,
    ),
    wound: /kırgın|incin|mesafe|kayb|yas|ayrılık|keskin|sınav|gölge/i.test(
      `${card.love} ${card.otherFeelings} ${card.brief} ${card.name}`,
    ),
    motion: /hareket|adım|irade|yön|zafer|geçiş|çıkış/i.test(
      `${card.advice} ${card.energy} ${card.brief}`,
    ),
    pause: /bekle|durul|içe|teslim|yavaş|koruma|sınır/i.test(
      `${card.advice} ${card.energy} ${card.brief}`,
    ),
  };
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const topicLabel = topicById(topic)?.label ?? "bu konu";
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";

  const a = pull(one);
  const b = pull(two);
  const c = pull(three);

  const feelAlign =
    topic === "thoughts"
      ? a.warmth === b.warmth
        ? `${one.name} ile ${two.name} düşünce ve duygu tarafında aynı iklimi paylaşıyor: ikisi de ${a.warmth ? "açık ve ılık" : "temkinli veya yaralı"} bir tonda.`
        : `${one.name} zihinde bir şey söylerken ${two.name} kalpte başka bir şey tutuyor. Düşünce ile duygu şu an tam örtüşmüyor.`
      : a.wound && b.warmth
        ? `${one.name} bir hassasiyeti görünür kılarken ${two.name} hâlâ sıcaklık veya açıklık taşıyor. Alan bölünmüş.`
        : `${one.name} ve ${two.name} yan yana durunca tek bir hava çıkıyor; birbirini ${a.wound && b.wound ? "ağırlaştırıyor" : "destekliyor"}.`;

  const block =
    b.pause && c.motion
      ? `Hareketi asıl ${two.name} yavaşlatıyor; ${three.name} yön açsa da tempo ${one.name} ve ${two.name} çözülmeden hızlanmaz.`
      : a.pause && !c.motion
        ? `Süreç yavaş. ${three.name} bir kapı gösterse de adım, ${one.name} durulmadan atılmıyor.`
        : c.motion
          ? `Tempo daha hızlı: ${three.name} olası yönü görünür kılıyor.`
          : `Süreç acele etmiyor. ${three.name} yönü gösterir, tempo ise ${one.name} ve ${two.name} arasındaki dengeye bağlı.`;

  const conflict =
    (a.warmth && b.wound) || (a.wound && b.warmth)
      ? `Bir çelişki var: biri bağ kurmak, diğeri korunmak istiyor.`
      : `Kartlar birbirini yalanlamıyor; gerilim varsa ölçü ve tempo gerilimi.`;

  return [
    `${topicLabel} açılımında ${one.name}, ${two.name} ve ${three.name} birlikte okunur; kartlar tek tek tekrar edilmez.`,
    feelAlign,
    conflict,
    block,
    `Olası yön ${three.name} üzerinden okunur: ${three.future} Bu bir hüküm cümlesi değil; ${one.name} ve ${two.name} şu anki duruşu, ${three.name} ise açılabilecek yolu taşır.`,
  ].join(" ");
}
