import { formatGroupEventDate, groupEvents } from "../../data/groupEvents";
import s from "./GroupEvents.module.css";

type Props = { selectedIds: string[]; onChange: (ids: string[]) => void; now: number; disabled?: boolean };

export default function GroupEventSelection({ selectedIds, onChange, now, disabled = false }: Props) {
  const upcoming = groupEvents.filter(event => Date.parse(event.startsAt) > now);
  const allSelected = upcoming.length > 0 && upcoming.every(event => selectedIds.includes(event.id));

  return <fieldset className={s.eventSelection} disabled={disabled}>
    <legend>Katılmak istediğin çalışmaları seç</legend>
    <button type="button" className={s.selectAll} disabled={!upcoming.length} onClick={() => onChange(allSelected ? [] : upcoming.map(event => event.id))}>
      {allSelected ? "Tümünü kaldır" : "Tüm paketleri seç"}
    </button>
    {groupEvents.map(event => <label className={s.eventOption} key={event.id}>
      <input type="checkbox" name="eventIds" value={event.id} checked={selectedIds.includes(event.id)} disabled={Date.parse(event.startsAt) <= now}
        onChange={e => onChange(e.target.checked ? [...selectedIds, event.id] : selectedIds.filter(id => id !== event.id))} />
      <span><strong>{event.title}</strong><span>{formatGroupEventDate(event.startsAt)} · 20.30 · 600 TL</span></span>
    </label>)}
    {!selectedIds.length ? <p className={s.note}>Devam etmek için en az bir çalışma seç.</p> : null}
  </fieldset>;
}
