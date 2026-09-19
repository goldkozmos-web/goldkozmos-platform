import { foldTurkish } from "./search";

const SUFFIXES = [
  "larindan",
  "lerinden",
  "larinda",
  "lerinde",
  "larini",
  "lerini",
  "larina",
  "lerine",
  "lardan",
  "lerden",
  "larda",
  "lerde",
  "lari",
  "leri",
  "lar",
  "ler",
  "imiz",
  "umuz",
  "siniz",
  "iniz",
  "inden",
  "indan",
  "inde",
  "inda",
  "inin",
  "ine",
  "ina",
  "ini",
  "unu",
  "iye",
  "yla",
  "yle",
  "mek",
  "mak",
  "yor",
  "mis",
  "mus",
  "dim",
  "dum",
  "ken",
  "im",
  "um",
  "in",
  "un",
  "le",
  "la",
  "i",
  "u",
  "e",
  "a",
];

const STOP = new Set([
  "ruya",
  "ruyamda",
  "ruyada",
  "gormek",
  "gordum",
  "gordum",
  "goruyorum",
  "vardi",
  "vardim",
  "bir",
  "ve",
  "ile",
  "icin",
  "gibi",
  "cok",
  "daha",
  "benim",
  "beni",
  "bana",
  "onun",
  "onu",
  "bu",
  "su",
  "o",
  "mi",
  "mu",
  "ne",
  "anlama",
  "gelir",
  "tabiri",
  "yorumu",
]);

function harden(stem: string) {
  if (stem.endsWith("g") && stem.length > 3) return stem.slice(0, -1) + "k";
  if (stem.endsWith("c") && stem.length > 3) return stem.slice(0, -1) + "c";
  if (stem.endsWith("d") && stem.length > 3) return stem.slice(0, -1) + "t";
  if (stem.endsWith("b") && stem.length > 3) return stem.slice(0, -1) + "p";
  return stem;
}

export function stemCandidates(folded: string) {
  const out = new Set<string>([folded]);
  let cur = folded;
  for (const suffix of SUFFIXES) {
    if (cur.length - suffix.length < 3) continue;
    if (!cur.endsWith(suffix)) continue;
    cur = cur.slice(0, -suffix.length);
    out.add(cur);
    out.add(harden(cur));
  }
  return [...out];
}

export function tokenizeQuery(query: string) {
  return foldTurkish(query)
    .split(" ")
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && !STOP.has(part));
}

export function normalizeDreamQuery(query: string) {
  return tokenizeQuery(query).join(" ");
}
