import assert from 'node:assert/strict';
import fs from 'node:fs';
import {monthlyDailyMessage,OCTOBER_MESSAGES} from '../src/lib/daily/monthly.ts';
import {istanbulMessageDay} from '../src/lib/daily/visual.ts';
assert.equal(new Set(OCTOBER_MESSAGES).size,31);
const images=new Set<string>();
for(let i=1;i<=31;i++){const day=`2026-10-${String(i).padStart(2,'0')}`;const m=monthlyDailyMessage(day);assert.equal(m.assignedOn,day);assert.equal(m.body,OCTOBER_MESSAGES[i-1]);assert.ok(fs.existsSync('public'+m.image));images.add(m.image)}
assert.equal(images.size,31);
assert.equal(istanbulMessageDay(new Date('2026-10-08T20:59:59Z')),'2026-10-08');
assert.equal(istanbulMessageDay(new Date('2026-10-08T21:00:00Z')),'2026-10-09');
assert.ok(monthlyDailyMessage('2026-11-30').body);
console.log('31 unique messages and images, month fallback and Istanbul midnight passed.');
