"use client";

import { Ficha1 } from "@/components/lesson/stage/objects/Ficha1";
import { Ficha10 } from "@/components/lesson/stage/objects/Ficha10";
import { Ficha100 } from "@/components/lesson/stage/objects/Ficha100";
import type { FichaCounts } from "@/lib/lesson/stage/fichas-math";
import { cn } from "@/lib/utils";

type FichaPileProps = {
  kind: keyof FichaCounts;
  count: number;
  className?: string;
  compact?: boolean;
};

function FichaIcon({ kind }: { kind: keyof FichaCounts }) {
  if (kind === "hundreds") {
    return <Ficha100 />;
  }
  if (kind === "tens") {
    return <Ficha10 />;
  }
  return <Ficha1 />;
}

export function FichaPile({ kind, count, className, compact }: FichaPileProps) {
  const label =
    kind === "hundreds" ? "Centenas" : kind === "tens" ? "Decenas" : "Unidades";
  const shown = compact ? Math.min(count, 6) : Math.min(count, 8);
  const extra = count - shown;

  return (
    <div className={cn("flex min-w-0 flex-1 flex-col items-center gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      <div className="flex min-h-11 flex-wrap items-center justify-center gap-1 sm:gap-1.5">
        {Array.from({ length: shown }).map((_, index) => (
          <FichaIcon key={`${kind}-${index}`} kind={kind} />
        ))}
        {extra > 0 ? (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-ink-muted">
            +{extra}
          </span>
        ) : null}
      </div>
      <span className="text-sm font-semibold tabular-nums text-ink">{count}</span>
    </div>
  );
}

export function FichaPilesRow({
  counts,
  className,
  compact,
}: {
  counts: FichaCounts;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("grid w-full grid-cols-3 gap-2 sm:gap-4", className)}>
      <FichaPile kind="hundreds" count={counts.hundreds} compact={compact} />
      <FichaPile kind="tens" count={counts.tens} compact={compact} />
      <FichaPile kind="ones" count={counts.ones} compact={compact} />
    </div>
  );
}
