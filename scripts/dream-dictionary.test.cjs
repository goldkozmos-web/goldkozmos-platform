const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {publishedDreams,searchDreams,dreamBySlug}=require('../src/data/ruya-tabirleri/catalog.ts');
const dreams=publishedDreams();
test('expanded dictionary has unique routes and complete readable content',()=>{
  assert.ok(dreams.length>500);
  assert.equal(new Set(dreams.map(dream=>dream.slug)).size,dreams.length);
  for(const dream of dreams){
    assert.match(dream.slug,/^[a-z0-9-]+$/);
    assert.ok(dream.intro?.trim()&&dream.spiritualMeaning?.trim()&&dream.summary?.trim());
    assert.ok(dream.variations.length);
    for(const variation of dream.variations)assert.ok(variation.heading?.trim()&&variation.body?.trim());
    assert.ok(![dream.intro,dream.spiritualMeaning,dream.summary,...dream.variations.map(item=>item.body)].join(' ').includes('undefined'));
  }
});
test('every Turkish starting letter including distinct I and İ has entries',()=>{
  for(const letter of 'A B C Ç D E F G H I İ J K L M N O Ö P R S Ş T U Ü V Y Z'.split(' ')){
    assert.ok(dreams.some(dream=>dream.title.replace(/^Rüyada /,'').toLocaleUpperCase('tr-TR').startsWith(letter)),`${letter} has no entries`);
  }
});
test('new entries can be found with natural Turkish and unaccented queries',()=>{
  for(const [query,slug] of [['rüyada bilgisayar gördüm','ruyada-bilgisayar'],['ruyada istasyon gordum','ruyada-istasyon'],['araba kaybetmek','ruyada-araba-kaybetmek'],['zümrüt','ruyada-zumrut']])assert.equal(searchDreams(query)[0]?.slug,slug);
});
test('original established dream URLs remain available',()=>{
  for(const slug of ['ruyada-yilan-gormek','ruyada-deniz-gormek','ruyada-eski-sevgiliyi-gormek'])assert.ok(dreamBySlug(slug));
});
