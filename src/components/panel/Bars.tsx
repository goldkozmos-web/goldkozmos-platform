import {money} from "@/lib/panel/model";

export default function Bars({
  title,
  values,
  currency = false,
}: {
  title: string;
  values: { label: string; value: number }[];
  currency?: boolean;
}) {
  const max = Math.max(1, ...values.map((v) => v.value));
  return (
    <article>
      <h2>{title}</h2>
      {!values.some((v) => v.value) ? (
        <p>Henüz veri yok.</p>
      ) : (
        values.map((v) => (
          <div className="panelBar" key={v.label}>
            <span>{v.label}</span>
            <div>
              <i style={{ width: `${(v.value / max) * 100}%` }} />
            </div>
            <strong>{currency ? money(v.value) : v.value}</strong>
          </div>
        ))
      )}
    </article>
  );
}