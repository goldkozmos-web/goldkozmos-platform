import type { SupabaseClient } from '@supabase/supabase-js';
import { istanbulDay } from '../../data/goldAct';
import { nextWaterDue, type WaterPreferences } from './water-schedule';

export async function materializeWaterReminder(client: SupabaseClient, userId: string, preferences: WaterPreferences, now = new Date(), deliver?: () => Promise<{ sent: number }>) {
  const { data: row, error } = await client.from('water_reminder_settings').select('enabled,interval_minutes,next_due_at').eq('user_id', userId).maybeSingle();
  if (error) throw new Error('Su ayarları alınamadı.');
  if (!row?.enabled || !row.next_due_at || Date.parse(row.next_due_at) > now.getTime()) return;
  const count = await client.from('water_days').select('glasses').eq('user_id', userId).eq('day', istanbulDay()).maybeSingle();
  if (count.error) throw new Error('Su kaydı alınamadı.');
  const nextDue = nextWaterDue(now, row.interval_minutes, preferences.startHour, preferences.endHour);
  const claim = await client.from('water_reminder_settings').update({ next_due_at: nextDue }).eq('user_id', userId).eq('next_due_at', row.next_due_at).select('user_id');
  if (claim.error) throw new Error('Su hatırlatması planlanamadı.');
  if (!claim.data?.length) return;
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', hourCycle: 'h23' }).format(now));
  if (hour < preferences.startHour || hour >= preferences.endHour || (count.data?.glasses ?? 0) >= preferences.goal) return;
  if (deliver) {
    try {
      const result=await deliver();
      if(result.sent===0)throw new Error('Bildirim cihazına ulaşamadı.');
      return result.sent;
    } catch(error) {
      await client.from('water_reminder_settings').update({ next_due_at: row.next_due_at }).eq('user_id', userId).eq('next_due_at', nextDue);
      throw error;
    }
  }
  const notice = await client.from('notifications').upsert({ user_id: userId, title: 'Küçük bir su molası', body: 'Su molası zamanı. Bugünkü takibini Profilim bölümünden güncelleyebilirsin.', type: 'water', link: '/profilim?open=water', source_key: `water-reminder:${userId}:${Math.floor(Date.parse(row.next_due_at) / 1000)}` }, { onConflict: 'user_id,source_key', ignoreDuplicates: true });
  if (notice.error) {
    await client.from('water_reminder_settings').update({ next_due_at: row.next_due_at }).eq('user_id', userId).eq('next_due_at', nextDue);
    throw new Error('Su bildirimi oluşturulamadı.');
  }
}
