const fs = require('node:fs');
const path = require('node:path');
const origin = process.argv[2] || 'http://localhost:3001';
async function run() {
  const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  const selected = urls.filter(route => /^\/(ruya-tabirleri|tarot-kartlari)(\/|$)/.test(route));
  selected.push('/burclar','/tarot-bakimi','/','/kozmik-enerji','/randevu','/calismalar/enerji-calismalari');
  const failures = [];
  let index = 0;
  await Promise.all(Array.from({length:6},async () => {
    while (index < selected.length) {
      const route = selected[index++];
      try {
        const response = await fetch(`${origin}${route}`);
        const html = await response.text();
        if (response.status !== 200) failures.push({route,error:`HTTP ${response.status}`});
        if (!/<h1(?:\s|>)/.test(html)) failures.push({route,error:'missing H1'});
        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
        if (!canonical || new URL(canonical[1]).pathname !== route) failures.push({route,error:'missing canonical'});
        if (/href="\/randevu(?:-al)?"/.test(html)) failures.push({route,error:'old appointment href'});
        for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
      } catch (error) { failures.push({route,error:error.message}); }
    }
  }));
  const result = { origin, sitemapCount:urls.length, checkedPages:selected.length, failures };
  fs.writeFileSync(path.resolve(__dirname,'../docs/symbol-pages-verification.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify(result));
  process.exit(failures.length ? 1 : 0);
}
run().catch(error=>{console.error(error.message);process.exit(1);});
