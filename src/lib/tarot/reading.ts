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

function positionLens(topic: TarotTopicId, index: number) {
  const map: Record<TarotTopicId, string[]> = {
    love: [
      "bu kart senin şu anki bağ enerjini gösterir",
      "bu kart bağın veya karşı tarafın alanında dolaşan titreşimi taşır",
      "bu kart ilişkinin olası yönüne dair bir potansiyel açar",
    ],
    thoughts: [
      "bu kart zihinde dolaşan düşünce iklimini gösterir",
      "bu kart kalpte tutulan duygu tonunu taşır",
      "bu kart yaklaşımın ve olası hareketin ritmini anlatır",
    ],
    career: [
      "bu kart iş ve değer alanındaki mevcut durumu gösterir",
      "bu kart dikkat edilmesi gereken eşiği veya sıkışmayı taşır",
      "bu kart emeğin olası gelişim potansiyelini açar",
    ],
    general: [
      "bu kart şu anki genel enerjiyi görünür kılar",
      "bu kart sana gelen spiritüel mesajın tonunu taşır",
      "bu kart olası yönü ve açılan yolu anlatır",
    ],
    development: [
      "bu kart konunun mevcut enerjisini gösterir",
      "bu kart süreci etkileyen unsuru taşır",
      "bu kart olası sonuç ve yön potansiyelini açar",
    ],
    decision: [
      "bu kart içinde bulunduğun enerjiyi gösterir",
      "bu kart dikkat etmen gereken noktayı taşır",
      "bu kart sana açılan yolun olası ritmini anlatır",
    ],
  };
  return map[topic][index] ?? map.general[index];
}

export function cardPositionReading(
  card: TarotCard,
  topic: TarotTopicId,
  index: number,
) {
  return `${card.topics[topic]} ${positionLens(topic, index)}. Kesin bir sonuç değil; mevcut dinamiklerin ${card.name} aracılığıyla görünmesidir.`;
}

export function spreadSynthesis(cards: TarotCard[], topic: TarotTopicId) {
  const topicLabel = topicById(topic)?.label ?? "bu konu";
  const [one, two, three] = cards;
  if (!one || !two || !three) return "";
  return [
    `Bu açılım ${topicLabel} alanında ${one.name}, ${two.name} ve ${three.name} kartlarının birlikte kurduğu bir enerji haritasıdır.`,
    `${one.blend} İlk kart sahnenin zeminini kurar; ikinci kart o zemine giren ikinci bir ritim getirir; üçüncü kart ise mevcut dinamikler bu tonda sürerse açılabilecek olası yönü taşır.`,
    `${two.blend} ${one.name} ile ${two.name} yan yana durunca tek tek anlamların toplamından farklı bir iklim çıkar: biri duruşu, diğeri hareketi veya gölgeyi büyütebilir.`,
    `${three.blend} Üçüncü kart, ilk iki kartın gerilimini ya yumuşatır ya da netleştirir. Bu, “kesin gerçekleşecek” bir gelecek cümlesi değildir. Kartların gösterdiği olası yöndür.`,
    `GoldKozmos okumasında bu üçlü, korku veya müjde üretmez. Mevcut enerjiyi, alandaki ilişkiyi ve ilerleme potansiyelini daha dürüst görmek içindir.`,
  ].join(" ");
}
