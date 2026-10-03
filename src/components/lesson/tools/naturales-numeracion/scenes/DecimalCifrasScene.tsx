"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type DecimalCifrasSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function DecimalCifrasScene({ onReadyChange }: DecimalCifrasSceneProps) {
  const [seen, setSeen] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    onReadyChange(seen.size === DIGITS.length);
  }, [onReadyChange, seen.size]);

  return (
    <div className="space-y-5">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-cobalt">
        Nosotros: sistema decimal
      </p>
      <p className="text-center text-sm text-ink-muted">
        Pulsa cada cifra. Son diez signos distintos; con ellos escribimos cualquier cantidad usando la{" "}
        <strong>posición</strong>.
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {DIGITS.map((digit) => {
          const active = seen.has(digit);
          return (
            <button
              key={digit}
              type="button"
              onClick={() => setSeen((prev) => new Set(prev).add(digit))}
              className={cn(
                "flex size-12 items-center justify-center rounded-xl border-2 text-xl font-bold tabular-nums transition-all sm:size-14 sm:text-2xl",
                active
                  ? "scale-105 border-cobalt bg-cobalt text-white shadow-md"
                  : "border-slate-200 bg-white text-ink hover:border-cobalt/50",
              )}
              aria-pressed={active}
            >
              {digit}
            </button>
          );
        })}
      </div>
      <p className="text-center text-sm tabular-nums text-ink-muted">
        {seen.size}/{DIGITS.length} cifras exploradas
      </p>
    </div>
  );
}
