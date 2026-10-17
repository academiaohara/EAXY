"use client";

import { cn } from "@/lib/utils";

const STAGE_PANEL =
  "rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

function TallyGroup({ size }: { size: number }) {
  const verticalCount = size === 5 ? 4 : size;

  return (
    <svg
      viewBox="0 0 56 48"
      className="h-12 w-14 shrink-0 text-[color:var(--stage-ink,#e8edf5)]"
      aria-hidden
    >
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
          STAGE_PANEL,
          "flex min-h-[5rem] items-center justify-center border-dashed px-4 py-6 text-sm text-[color:var(--stage-muted,#94a3b8)]",
          className,
        )}
      >
        Añade marcas con +1 o +5.
      </div>
    );
  }

  return (
    <div
      className={cn(
        STAGE_PANEL,
        "flex min-h-[5rem] flex-wrap items-end gap-x-8 gap-y-4 px-4 py-5",
        className,
      )}
    >
      {sizes.map((size, index) => (
        <TallyGroup key={index} size={size} />
      ))}
    </div>
  );
}
