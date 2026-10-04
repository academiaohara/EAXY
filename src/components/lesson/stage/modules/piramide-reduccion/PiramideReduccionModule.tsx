"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

type PyramidRow = { expr: string; highlight?: [number, number] };

export type PiramideReduccionModuleProps = {
  variant: "dual-parentesis" | "explorar-parentesis";
  tokens?: string[];
  openAfter?: number | null;
  closeBefore?: number | null;
  onOpenAfterChange?: (index: number | null) => void;
  onCloseBeforeChange?: (index: number | null) => void;
  onReadyChange?: (ready: boolean) => void;
};

const LEFT_PYRAMID: PyramidRow[] = [
  { expr: "9 − 1 + 3", highlight: [0, 2] },
  { expr: "8 + 3", highlight: [0, 2] },
  { expr: "11" },
];

const RIGHT_PYRAMID: PyramidRow[] = [
  { expr: "9 − (1 + 3)", highlight: [2, 6] },
  { expr: "9 − 4", highlight: [0, 2] },
  { expr: "5" },
];

function PyramidColumn({ title, rows, activeRow }: { title: string; rows: PyramidRow[]; activeRow: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</p>
      {rows.map((row, index) => (
        <div
          key={row.expr}
          className={cn(
            "rounded-lg border px-3 py-2 font-mono text-base sm:text-lg",
            index <= activeRow ? "border-cobalt/30 bg-white text-ink" : "border-transparent text-ink-muted/40",
            index === activeRow && "ring-2 ring-cobalt/25",
          )}
        >
          <MathRenderer text={`$${row.expr}$`} />
        </div>
      ))}
    </div>
  );
}

export function PiramideReduccionModule({
  variant,
  tokens = ["9", "-", "1", "+", "3"],
  openAfter = null,
  closeBefore = null,
  onOpenAfterChange,
  onCloseBeforeChange,
  onReadyChange,
}: PiramideReduccionModuleProps) {
  const reduced = useReducedMotion();
  const [rowLeft, setRowLeft] = useState(reduced ? 2 : 0);
  const [rowRight, setRowRight] = useState(reduced ? 2 : 0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (variant !== "dual-parentesis") {
      return;
    }
    if (reduced) {
      setRowLeft(2);
      setRowRight(2);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    let step = 0;
    const tick = () => {
      if (step > 2) {
        onReadyChange?.(true);
        return;
      }
      setRowLeft(step);
      setRowRight(step);
      step += 1;
      timers.current.push(window.setTimeout(tick, 900));
    };
    timers.current.push(window.setTimeout(tick, 350));
    return () => {
      for (const id of timers.current) {
        window.clearTimeout(id);
      }
      timers.current = [];
    };
  }, [onReadyChange, reduced, variant]);

  const displayTokens = useMemo(() => {
    const parts: { text: string; slot: number | null }[] = [];
    for (let i = 0; i < tokens.length; i++) {
      parts.push({ text: tokens[i]!, slot: i });
    }
    return parts;
  }, [tokens]);

  if (variant === "explorar-parentesis") {
    return (
      <div className="space-y-4" data-testid="piramide-explorar-parentesis" aria-label="Colocar paréntesis">
        <p className="text-center text-sm text-ink-muted">Toca entre números para abrir o cerrar un paréntesis.</p>
        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-xl sm:text-2xl">
          {displayTokens.map((part, index) => (
            <span key={`${part.text}-${index}`} className="inline-flex items-center gap-1">
              <button
                type="button"
                disabled={index === 0}
                className={cn(
                  "min-h-10 min-w-10 rounded-md border px-2 py-1 text-sm transition",
                  index > 0 && openAfter === index - 1
                    ? "border-cobalt bg-cobalt-tint font-bold text-cobalt"
                    : "border-dashed border-slate-300 text-ink-muted hover:border-cobalt/40",
                  index === 0 && "opacity-30",
                )}
                aria-label={`Abrir paréntesis antes de ${part.text}`}
                onClick={() => {
                  if (index === 0) {
                    return;
                  }
                  const next = index - 1;
                  onOpenAfterChange?.(openAfter === next ? null : next);
                }}
              >
                (
              </button>
              <span className="px-1 font-bold text-ink">{part.text}</span>
              <button
                type="button"
                className={cn(
                  "min-h-10 min-w-10 rounded-md border px-2 py-1 text-sm transition",
                  closeBefore === index
                    ? "border-cobalt bg-cobalt-tint font-bold text-cobalt"
                    : "border-dashed border-slate-300 text-ink-muted hover:border-cobalt/40",
                )}
                aria-label={`Paréntesis de cierre después de ${part.text}`}
                onClick={() => {
                  onCloseBeforeChange?.(closeBefore === index ? null : index);
                }}
              >
                )
              </button>
            </span>
          ))}
        </div>
        <p className="text-center text-sm text-ink-muted">
          Expresión:{" "}
          <MathRenderer
            text={`$${tokens.join(" ").replace(/-/g, "−")}$`}
          />
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 sm:grid-cols-2"
      data-testid="piramide-dual-parentesis"
      aria-label="Pirámides de reducción"
    >
      <PyramidColumn title="Sin paréntesis" rows={LEFT_PYRAMID} activeRow={rowLeft} />
      <PyramidColumn title="Con paréntesis" rows={RIGHT_PYRAMID} activeRow={rowRight} />
    </div>
  );
}
