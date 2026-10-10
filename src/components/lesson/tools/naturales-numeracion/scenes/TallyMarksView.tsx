"use client";

import { cn } from "@/lib/utils";

function TallyGroup({ size }: { size: number }) {
  const verticalCount = size === 5 ? 4 : size;

  return (
    <svg viewBox="0 0 56 48" className="h-12 w-14 shrink-0 text-slate-800" aria-hidden>
      {Array.from({ length: verticalCount }, (_, i) => (
        <line
          key={i}
          x1={10 + i * 10}
          y1={8}
          x2={10 + i * 10}
          y2={42}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {size === 5 ? (
        <line x1={6} y1={40} x2={44} y2={12} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

/** Grupos de hasta 5 marcas: a la quinta se tacha en diagonal las cuatro verticales. */
export function TallyMarksView({ count, className }: { count: number; className?: string }) {
  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;
  const sizes = [...Array.from({ length: fullGroups }, () => 5), ...(remainder > 0 ? [remainder] : [])];

  if (count === 0) {
    return (
      <div
        className={cn(
          "lesson-surface-paper flex min-h-[5rem] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-sm text-ink-muted",
          className,
        )}
      >
        Pulsa «Contar uno» para dejar la primera marca.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "lesson-surface-paper flex min-h-[5rem] flex-wrap items-end gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-5",
        className,
      )}
    >
      {sizes.map((size, index) => (
        <TallyGroup key={index} size={size} />
      ))}
    </div>
  );
}
