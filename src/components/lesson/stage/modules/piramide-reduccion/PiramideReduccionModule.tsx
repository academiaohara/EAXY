"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import {
  evalWithParenthesisPlacement,
  listValidParenthesisSlots,
  tokensToExpression,
} from "@/lib/lesson/stage/eval-natural-expression";
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
  targetResult?: number | null;
  evaluatedResult?: number | null;
  solved?: boolean;
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
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</p>
      {rows.map((row, index) => (
        <div
          key={row.expr}
          className={cn(
            "rounded-xl border px-4 py-2.5 font-mono text-lg sm:text-xl",
            index <= activeRow
              ? "border-cobalt/40 bg-black/35 text-ink"
              : "border-transparent text-ink-muted/35",
            index === activeRow && "ring-2 ring-cobalt/30",
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
  targetResult = null,
  evaluatedResult = null,
  solved = false,
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

  const validSlots = useMemo(() => listValidParenthesisSlots(tokens), [tokens]);

  const liveValue = useMemo(() => {
    if (evaluatedResult != null) {
      return evaluatedResult;
    }
    return evalWithParenthesisPlacement(tokens, openAfter, closeBefore);
  }, [closeBefore, evaluatedResult, openAfter, tokens]);

  const expressionPreview = useMemo(
    () => tokensToExpression(tokens, openAfter, closeBefore).replace(/-/g, "−"),
    [closeBefore, openAfter, tokens],
  );

  const placementComplete = openAfter !== null && closeBefore !== null;
  const matchesTarget =
    targetResult != null && liveValue === targetResult && placementComplete;

  if (variant === "explorar-parentesis") {
    return (
      <div
        className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-2"
        data-testid="piramide-explorar-parentesis"
        aria-label="Colocar paréntesis"
      >
        <p className="text-center text-sm text-ink-muted">
          Coloca <strong>un</strong> paréntesis: abre antes de un número y cierra después de otro.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tokens.map((token, index) => {
            const canOpen = validSlots.openAfter.includes(index - 1);
            const canClose = validSlots.closeBefore.includes(index);
            const showOpen = canOpen && (openAfter === null || openAfter === index - 1);
            const showClose = canClose && (closeBefore === null || closeBefore === index);

            return (
              <span key={`${token}-${index}`} className="inline-flex items-center gap-1 sm:gap-2">
                {canOpen ? (
                  <button
                    type="button"
                    className={cn(
                      "flex h-11 min-w-11 items-center justify-center rounded-lg border-2 font-mono text-xl font-bold transition",
                      openAfter === index - 1
                        ? "border-cobalt bg-cobalt-tint text-cobalt"
                        : "border-dashed border-cobalt/35 text-ink-muted hover:border-cobalt/60",
                      !showOpen && openAfter !== null && openAfter !== index - 1 && "opacity-30",
                    )}
                    aria-label={`Abrir paréntesis antes de ${token}`}
                    onClick={() => {
                      const next = index - 1;
                      onOpenAfterChange?.(openAfter === next ? null : next);
                    }}
                  >
                    (
                  </button>
                ) : null}
                <span className="px-1 font-mono text-3xl font-bold text-ink sm:text-4xl">{token.replace(/-/g, "−")}</span>
                {canClose ? (
                  <button
                    type="button"
                    className={cn(
                      "flex h-11 min-w-11 items-center justify-center rounded-lg border-2 font-mono text-xl font-bold transition",
                      closeBefore === index
                        ? "border-cobalt bg-cobalt-tint text-cobalt"
                        : "border-dashed border-cobalt/35 text-ink-muted hover:border-cobalt/60",
                      !showClose && closeBefore !== null && closeBefore !== index && "opacity-30",
                    )}
                    aria-label={`Cerrar paréntesis después de ${token}`}
                    onClick={() => {
                      onCloseBeforeChange?.(closeBefore === index ? null : index);
                    }}
                  >
                    )
                  </button>
                ) : null}
              </span>
            );
          })}
        </div>

        <div
          className={cn(
            "rounded-2xl border px-6 py-4 text-center transition-colors",
            solved || matchesTarget
              ? "border-emerald-500/50 bg-emerald-950/40"
              : "border-[color:var(--stage-border,#334155)] bg-black/35",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Valor actual</p>
          <p className="mt-2 font-mono text-2xl font-bold text-ink sm:text-3xl" aria-live="polite">
            <MathRenderer text={`$${expressionPreview}${placementComplete ? ` = ${liveValue ?? "?"}` : ""}$`} />
          </p>
          {targetResult != null ? (
            <p className="mt-2 text-base text-ink-muted">
              Objetivo:{" "}
              <span className={cn("font-bold", matchesTarget && "text-emerald-400")}>= {targetResult}</span>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto grid w-full max-w-3xl gap-8 sm:grid-cols-2"
      data-testid="piramide-dual-parentesis"
      aria-label="Pirámides de reducción"
    >
      <PyramidColumn title="Sin paréntesis" rows={LEFT_PYRAMID} activeRow={rowLeft} />
      <PyramidColumn title="Con paréntesis" rows={RIGHT_PYRAMID} activeRow={rowRight} />
    </div>
  );
}
