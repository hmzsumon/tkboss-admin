"use client";

export default function SectionCard({
  title,
  subtitle,
  right,
  children,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      {(title || subtitle || right) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && <div className="text-sm font-semibold">{title}</div>}
            {subtitle && (
              <div className="text-xs text-white/50">{subtitle}</div>
            )}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}
