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

export function scoreDreamQuery(
  query: string,
  haystacks: string[],
) {
  const needle = foldTurkish(query);
  if (needle.length < 2) return 0;

  let score = 0;
  for (const raw of haystacks) {
    const hay = foldTurkish(raw);
    if (!hay) continue;
    if (hay === needle) score += 12;
    else if (hay.startsWith(needle)) score += 8;
    else if (hay.includes(needle)) score += 5;
    else if (needle.split(" ").every((part) => part.length > 1 && hay.includes(part))) {
      score += 3;
    }
  }
  return score;
}
