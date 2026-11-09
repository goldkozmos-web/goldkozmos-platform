export function reminderDueStamp(day: string, time: string | null) {
  const value=(time||"09:00:00").slice(0,8);
  return Date.parse(`${day}T${value.length===5?value+":00":value}+03:00`);
}
export function nextReminderDay(day: string, rule: string, now: number, time: string | null) {
  if (rule === "none") return day;
  let date=new Date(`${day}T12:00:00Z`);
  if(!Number.isFinite(date.getTime()))return day;
  for(let index=0;index<3660;index++){
    if(rule==="monthly"){
      const original=date.getUTCDate(),month=date.getUTCMonth()+1,year=date.getUTCFullYear();
      const end=new Date(Date.UTC(year,month+1,0)).getUTCDate();
      date=new Date(Date.UTC(year,month,Math.min(original,end),12));
    }else date.setUTCDate(date.getUTCDate()+(rule==="weekly"?7:1));
    const next=date.toISOString().slice(0,10);
    if(reminderDueStamp(next,time)>now)return next;
  }
  return day;
}
