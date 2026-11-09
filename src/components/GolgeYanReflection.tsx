"use client";
import { APPOINTMENT_WHATSAPP_URL } from "../lib/appointments";


import { useState } from "react";
import Link from "next/link";

const questions = [
  { text: "Eleştiri aldığımda kendimi hemen savunmak istiyorum.", prompt: "Savunmaya geçtiğinde hangi ihtiyacının duyulmasını istediğini düşün." },
  { text: "Birine hayır dediğimde uzun süre suçluluk duyuyorum.", prompt: "Hayır demenin hangi ilişkini ya da beklentiyi tehdit ettiğini kendine sor." },
  { text: "Başkasının başarısını görünce kendimi kıyaslarken buluyorum.", prompt: "Kıyasın altında sana ait hangi istek veya ertelenmiş hedef bulunuyor?" },
  { text: "Rahatsız olduğum bir konuyu söylemek yerine içimde tutuyorum.", prompt: "İhtiyacını bir suçlama yerine somut bir cümleyle ifade etmeyi dene." },
  { text: "Hata yaptığımda kendime, bir arkadaşıma olduğundan daha sert davranıyorum.", prompt: "Aynı durumu yaşayan bir arkadaşına söyleyeceğin cümleyi kendine de söyle." },
];
const choices = ["Nadiren", "Bazen", "Sık sık"];

export default function GolgeYanReflection() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const complete = Object.keys(answers).length === questions.length;
  return <section className="energyDiscoverySection reflectionTest" aria-label="Gölge yan farkındalık soruları">
    {!finished ? <><h2>Son dönemdeki deneyimini düşün.</h2><p>Her cümle için sana en yakın seçeneği işaretle. Bu kısa çalışma psikolojik tanı veya kişilik sınıflandırması yapmaz; günlük tepkilerine bakman için bir başlangıç sunar.</p>{questions.map((question, index) => <fieldset key={question.text}><legend>{index + 1}. {question.text}</legend><div className="energyDiscoveryActions">{choices.map((choice, value) => <button type="button" key={choice} aria-pressed={answers[index] === value} onClick={() => setAnswers(previous => ({ ...previous, [index]: value }))}>{choice}</button>)}</div></fieldset>)}<button className="reflectionFinish" type="button" disabled={!complete} onClick={() => setFinished(true)}>Yanıtlarımla devam et →</button><p role="status">{Object.keys(answers).length} / {questions.length} soru yanıtlandı.</p></> : <div role="region" aria-live="polite" aria-label="Farkındalık notların"><p className="energyDiscoveryEyebrow">KENDİNE BİR DÜŞÜNME ALANI</p><h2>Yanıtların bir başlangıç.</h2><p>Bu yanıtlar sana sabit bir etiket vermez. Aşağıdaki soruları bir deftere yazabilir, kendi deneyiminden örneklerle üzerine düşünebilirsin.</p>{questions.map((question, index) => <article key={question.text}><h3>{question.text}</h3><p>Yanıtın: {choices[answers[index]]}</p><p>{question.prompt}</p></article>)}<div className="energyDiscoveryActions"><Link href="/calismalar/birebir-seanslar">Kişisel gelişim çalışmalarını incele →</Link><Link href={APPOINTMENT_WHATSAPP_URL}>Birebir çalışma için randevu</Link></div><button type="button" onClick={() => { setFinished(false); setAnswers({}); }}>Yeniden başla</button></div>}
  </section>;
}
