"use client";

export type TabItem<T extends string> = { key: T; label: string };

export default function TabsMini<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (k: T) => void;
  items: TabItem<T>[];
}) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={[
            "rounded-lg px-3 py-2 text-xs font-semibold border",
            value === it.key
              ? "border-teal-400/40 bg-teal-400/10 text-teal-200"
              : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
          ].join(" ")}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
