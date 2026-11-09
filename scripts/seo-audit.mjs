import { writeFile } from 'node:fs/promises';

const origin = 'https://goldkozmos.com';
const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(25000) });
      const html = await response.text();
      const value = pattern => html.match(pattern)?.[1] ?? null;
      results.push({ url, status: response.status, redirect: response.headers.get('location'), title: value(/<title>(.*?)<\/title>/), description: value(/<meta name="description" content="([^"]*)"/), canonical: value(/<link rel="canonical" href="([^"]*)"/), robots: value(/<meta name="robots" content="([^"]*)"/), h1s: [...html.matchAll(/<h1[ >]/g)].length });
    } catch (error) { results.push({ url, error: error.message }); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
const issues = results.filter(row => row.error || row.status !== 200 || !row.title || !row.description || !row.canonical || row.h1s !== 1 || /noindex/.test(row.robots ?? ''));
const groups = key => {
  const map = new Map();
  for (const row of results) if (row[key]) map.set(row[key], [...(map.get(row[key]) ?? []), row.url]);
  return [...map].filter(([, urls]) => urls.length > 1).map(([value, urls]) => ({ value, urls }));
};
const report = { checkedAt: new Date().toISOString(), total: urls.length, issues, duplicateTitles: groups('title'), duplicateDescriptions: groups('description'), results };
await writeFile('docs/seo-audit-latest.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ total: urls.length, issues, duplicateTitles: report.duplicateTitles, duplicateDescriptionGroups: report.duplicateDescriptions.length }, null, 2));
