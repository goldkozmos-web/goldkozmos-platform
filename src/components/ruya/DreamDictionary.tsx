"use client";
import { useState } from 'react';
import Link from 'next/link';
import { foldTurkish } from '../../lib/ruya-tabirleri/search';
type Entry = { slug: string; title: string; aliases: string[]; summary: string };
const alphabet = 'A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z'.split(' ');
const themes = [
 {name:'Hayvanlar', words:'yılan|kedi|köpek|kuş|balık|at|akrep|arı|örümcek|kurt|aslan|böcek'},
 {name:'Aşk ve aile',words:'sevgili|eş|anne|baba|bebek|çocuk|aile|evlen|düğün|kardeş|ayrıl|aldat'},
 {name:'Su ve doğa',words:'su|deniz|yağmur|nehir|göl|orman|ağaç|çiçek|dağ|deprem|yangın'},
 {name:'Ev ve eşyalar',words:'ev|oda|kapı|anahtar|ayna|telefon|yatak|mutfak|pencere|asansör'},
 {name:'İş ve yolculuk',words:'iş|sınav|okul|para|altın|araba|uçak|tren|yol|otobüs|bilet'},
 {name:'Zorlayıcı rüyalar',words:'kaybol|kaç|mahsur|düş|öl|kork|kovala|ses|boğul|diş'},
];
function symbol(entry: Entry) { return entry.title.replace(/^Rüyada /, '').replace(/ Görmek$/, ''); }
function initial(entry: Entry) { return symbol(entry)[0].toLocaleUpperCase('tr-TR'); }
export default function DreamDictionary({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('');
  const [theme,setTheme] = useState('');
  const needle = foldTurkish(query).replace(/\b(ruyada|ruyamda|gordum|gormek|gordugum|bir)\b/g, '').trim();
  const tokens = needle.split(/\s+/).filter(Boolean);
  const selectedTheme=themes.find(item=>item.name===theme);
  const filtered = entries.filter(entry => (!letter || initial(entry) === letter) && (!selectedTheme || selectedTheme.words.split('|').some(word=>foldTurkish(symbol(entry)).includes(foldTurkish(word)))) && (!tokens.length || [symbol(entry), ...entry.aliases].some(value => tokens.every(token => foldTurkish(value).includes(token)))));
  const counts = new Map(alphabet.map(item => [item, entries.filter(entry => initial(entry) === item).length]));
  return <section className="symbolSection dreamDictionary dreamTextDictionary" id="ruya-sozlugu" aria-labelledby="dream-dictionary-title">
    <div className="symbolSectionHeading"><div><p className="symbolKicker">A’DAN Z’YE · {entries.length} BAŞLIK</p><h2 id="dream-dictionary-title">Rüya sözlüğü</h2></div><span>Harf seç veya sembolünü ara</span></div>
    <div className="symbolSearchBar"><label htmlFor="dream-dictionary-search">Rüyanda ne gördün?</label><input id="dream-dictionary-search" type="search" value={query} placeholder="Anahtar, uçmak, hamilelik…" onChange={event => { setQuery(event.target.value); setLetter(''); }} /></div>
    <nav className="dreamThemes" aria-label="Rüya konuları"><button type="button" aria-pressed={!theme} onClick={()=>{setTheme('');setLetter('');}}>Tüm konular</button>{themes.map(item=><button key={item.name} type="button" aria-pressed={theme===item.name} onClick={()=>{setTheme(item.name);setLetter('');setQuery('');}}>{item.name}</button>)}</nav>
    {!query&&!theme&&!letter&&<div className="dreamFeatured"><p className="symbolKicker">BİR SEMBOLDEN BAŞLA</p><div>{entries.filter(entry=>['ruyada-yilan-gormek','ruyada-dis-dokulmesi','ruyada-eski-sevgiliyi-gormek','ruyada-sinava-gec-kalmak','ruyada-telefonun-kirilmasi','ruyada-asansorde-mahsur-kalmak'].includes(entry.slug)).map(entry=><Link key={entry.slug} href={`/ruya-tabirleri/${entry.slug}`}><strong>{symbol(entry)}</strong><span>{entry.summary.slice(0,105)}{entry.summary.length>105?'…':''}</span><small>Rüyayı incele ↗</small></Link>)}</div></div>}
    <nav className="dreamAlphabet" aria-label="A’dan Z’ye rüya tabirleri"><button type="button" aria-pressed={!letter} onClick={() => setLetter('')}>Tümü<small>{entries.length}</small></button>{alphabet.map(item => <button type="button" key={item} aria-label={`${item} harfi, ${counts.get(item)} başlık`} aria-pressed={letter === item} disabled={!counts.get(item)} title={item === 'Ğ' ? 'Türkçede Ğ ile başlayan sözcük bulunmaz.' : `${item} ile başlayan ${counts.get(item)} başlık`} onClick={() => setLetter(item)}>{item}<small>{counts.get(item) || '—'}</small></button>)}</nav>
    <p className="symbolResultCount" role="status">{filtered.length} başlık{theme?` · ${theme}`:''}{letter ? ` · ${letter} harfi` : ''}{query ? ` · “${query}” araması` : ''}</p>
    <div className="dreamLetterIndex">{alphabet.map(item => {const group = filtered.filter(entry => initial(entry) === item);if (!group.length) return null;return <section className="dreamLetterGroup" key={item} aria-labelledby={`dream-letter-${item}`}><header><h3 id={`dream-letter-${item}`}>{item}</h3><span>{group.length} başlık</span></header><div className="dreamTextLinks">{group.map(entry => <Link prefetch={false} key={entry.slug} href={`/ruya-tabirleri/${entry.slug}`}><span>{symbol(entry)}</span><span aria-hidden="true">↗</span></Link>)}</div></section>;})}</div>
    {!filtered.length ? <div className="symbolEmpty"><h3>Bu ifadeyle eşleşme bulunamadı.</h3><p>“Bir evde kayboldum” yerine “ev” veya “kaybolmak” gibi bir sembol dene. Seçili konuyu kaldırarak da arayabilirsin.</p><button type="button" onClick={() => { setQuery(''); setLetter('');setTheme(''); }}>Sözlüğün tamamını göster</button></div> : null}
  </section>;
}
