"use client";

import Image from "next/image";
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
  const choices = [{label: "Tümü", filter: "Tümü", icon: "✦", tone: "cream"}, ...GOLDMIND_QUICK_ACCESS.filter(item => item.label !== "Gevşeme")];
  const images: Record<string, string> = { "Tümü": "tumu", "Meditasyon": "meditasyon", "Nefes": "nefes", "Sakinleş": "sakinles", "Odaklan": "odaklan", "Uyku": "uyku" };
  const notes: Record<string, string> = { "Tümü": "Tüm alanlar", "Meditasyon": "İçsel odak", "Nefes": "Kendi ritmin", "Sakinleş": "Yavaşla", "Odaklan": "Dikkatini topla", "Uyku": "Güne bir ara" };
  return (
    <div
      className="goldmindQuickAccess"
      role="tablist"
      aria-label="Hızlı erişim"
    >
      {choices.map((item) => {
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
            onClick={() => onChange(selected ? "Tümü" : item.filter as MeditationFilter)}
          >
            <Image className="goldmindCategoryImage" src={"/images/goldmind/categories/" + images[item.label] + "-premium.webp"} alt="" fill sizes="(max-width: 700px) 30vw, 160px" />
            <span>{item.label}</span>
            <small className="goldmindQuickNote">{notes[item.label]}</small>
          </button>
        );
      })}
    </div>
  );
}
