const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  module._compile(compiled.outputText, filename);
};
const { publishedDreams, searchDreams } = require('../src/data/ruya-tabirleri/catalog.ts');
const { zodiacReadings, compatibilityReading } = require('../src/data/zodiacReadings.ts');
const { TAROT_DECK } = require('../src/data/tarot/deck.ts');
const dreams = publishedDreams();
assert.equal(dreams.length, 250);
assert.equal(new Set(dreams.map(item => item.slug)).size, dreams.length);
for (const dream of dreams) {
  assert(dream.title && dream.summary && dream.intro && dream.spiritualMeaning);
  assert(dream.variations.length >= 2);
  assert(dream.faqs.every(item => item.question && item.answer));
}
for (const query of ['Rüyada anahtar görmek', 'hamilelik', 'ruzgar', 'saç dökülmesi', 'zeytin', 'yılan']) {
  assert(searchDreams(query).length > 0, query);
}
for (const first of zodiacReadings) for (const second of zodiacReadings) {
  const result = compatibilityReading(first, second);
  assert(result.title && result.love && result.challenge && result.pattern);
  assert.deepEqual(result, compatibilityReading(second, first));
}
assert.equal(TAROT_DECK.length, 78);
assert.equal(new Set(TAROT_DECK.map(item => item.slug)).size, 78);
for (const card of TAROT_DECK) for (const field of ['generalMeaning','reversedMeaning','loveMeaning','careerMeaning','symbols']) assert(card[field]?.trim(), `${card.slug}: ${field}`);
for (const card of TAROT_DECK.filter(item => item.arcana === 'minor')) assert(card.generalMeaning.length > 100 && card.reversedMeaning.length > 100, card.slug);
const appointmentFiles = ['src/app/HomePageClient.tsx','src/components/HomeNavbar.tsx','src/components/FooterSection.tsx','src/components/GlobalContactDock.tsx','src/app/kozmik-enerji/page.tsx','src/app/calismalar/detay/[slug]/page.tsx'];
for (const file of appointmentFiles) {
  const source = fs.readFileSync(path.resolve(__dirname, '..', file),'utf8');
  assert(!/href="\/randevu(?:-al)?"|router\.push\("\/randevu-al"\)/.test(source), file);
  assert(source.includes('APPOINTMENT_WHATSAPP_URL'), file);
}
console.log(JSON.stringify({dreams:dreams.length,tarotCards:TAROT_DECK.length,zodiacPairs:144,appointmentLinks:'WhatsApp',status:'passed'}));
