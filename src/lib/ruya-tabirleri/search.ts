export function foldTurkish(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const NOISE =
  /\b(gordum|gorduk|gormek|goruyorum|gorunce|gorunen|ne anlama gelir|ne demek|tabiri|tabir|ruyasi|ruyamda|ruyada|ruya)\b/g;

export function softenDreamQuery(query: string) {
  const folded = foldTurkish(query);
  const stripped = folded.replace(NOISE, " ").replace(/\s+/g, " ").trim();
  return stripped.length >= 2 ? stripped : folded;
}

export function uniqueTerms(values: Array<string | undefined>) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const item = value?.trim();
    if (!item) continue;
    const key = foldTurkish(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export function scoreDreamQuery(query: string, haystacks: string[]) {
  const exact = foldTurkish(query);
  const soft = softenDreamQuery(query);
  if (exact.length < 2 && soft.length < 2) return 0;

  let score = 0;
  for (const raw of haystacks) {
    const hay = foldTurkish(raw);
    if (!hay) continue;
    score = Math.max(score, scorePair(exact, hay), scorePair(soft, hay));
  }
  return score;
}

function hasWord(hay: string, token: string) {
  return (
    hay === token ||
    hay.startsWith(`${token} `) ||
    hay.endsWith(` ${token}`) ||
    hay.includes(` ${token} `)
  );
}

function scorePair(needle: string, hay: string) {
  if (!needle) return 0;
  if (hay === needle) return 24;
  if (needle.length >= 4 && (hay.startsWith(needle) || needle.startsWith(hay))) return 16;
  if (hasWord(hay, needle)) return 18;
  if (needle.length >= 4 && hay.includes(needle)) return 12;
  const tokens = needle.split(" ").filter((part) => part.length > 1);
  if (tokens.length > 1 && tokens.every((part) => hasWord(hay, part) || hay.includes(part))) {
    return 10;
  }
  if (tokens.length === 1 && hasWord(hay, tokens[0])) return 8;
  return 0;
}
