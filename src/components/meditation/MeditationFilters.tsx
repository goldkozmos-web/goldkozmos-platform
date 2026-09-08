"use client";

import {
  GOLDMIND_QUICK_ACCESS,
  type MeditationFilter,
} from "../../data/meditation";

type MeditationFiltersProps = {
  value: MeditationFilter;
  onChange: (filter: MeditationFilter) => void;
};

export default function MeditationFilters({
  value,
  onChange,
}: MeditationFiltersProps) {
  return (
    <div
      className="goldmindQuickAccess"
      role="tablist"
      aria-label="Hızlı erişim"
    >
      {GOLDMIND_QUICK_ACCESS.map((item) => {
        const selected = item.filter === value;

        return (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`goldmindQuickCard goldmindQuickCard--${item.tone}${
              selected ? " isActive" : ""
            }`}
            onClick={() => onChange(selected ? "Tümü" : item.filter)}
          >
            <span className="goldmindQuickIcon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
