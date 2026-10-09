"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applyOperationAt,
  calcBinary,
  operationHighlightLevel,
  pickNextOperation,
  wrongTapMessage,
} from "@/lib/lesson/stage/jerarquia-reduce";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

export type PracticaReducirExpresionProps = {
  initialTokens: readonly string[];
  tokens: readonly string[];
  history: readonly (readonly string[])[];
  onTokensChange: (tokens: string[], historyRow: readonly string[]) => void;
  onReadyChange?: (ready: boolean) => void;
  disabled?: boolean;
};

function tokenClass(isHit: boolean, level: 1 | 2 | 3 | null): string {
  if (!isHit || level === null) {
    return "";
  }
  if (level === 1) {
    return "bg-violet-400 text-slate-900";
  }
  if (level === 2) {
    return "bg-amber-400 text-slate-900";
  }
  return "bg-cyan-400 text-slate-900";
}

export function PracticaReducirExpresion({
  initialTokens,
  tokens,
  history,
  onTokensChange,
  onReadyChange,
  disabled,
}: PracticaReducirExpresionProps) {
  const reduced = useReducedMotion();
  const [lock, setLock] = useState(false);
  const [highlight, setHighlight] = useState<{ m: number; l: 1 | 2 | 3 } | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const done = tokens.length === 1;

  useEffect(() => {
    onReadyChange?.(done);
  }, [done, onReadyChange]);

  const handleOpClick = useCallback(
    (index: number) => {
      if (disabled || lock || done) {
        return;
      }
      const pick = pickNextOperation(tokens);
      if (index !== pick.m) {
        setFeedback({ ok: false, text: wrongTapMessage(tokens, index, pick) });
        return;
      }
      setLock(true);
      const left = tokens[index - 1] ?? "";
      const operation = tokens[index] ?? "";
      const right = tokens[index + 1] ?? "";
      const result = calcBinary(left, operation, right);
      const next = applyOperationAt(tokens, index);
      const stepFeedback = `Correcto: ${left} ${operation} ${right} = ${result}. La expresión queda ${next.join(" ")}.`;
      setFeedback({ ok: true, text: stepFeedback });
      const level = operationHighlightLevel(tokens, index, pick);
      setHighlight({ m: index, l: level });
      if (reduced) {
        onTokensChange(next, tokens);
        setHighlight(null);
        setLock(false);
        if (next.length === 1) {
          setFeedback({ ok: true, text: `Resultado final: ${next[0]}.` });
        }
        return;
      }
      window.setTimeout(() => {
        onTokensChange(next, tokens);
        setHighlight(null);
        setLock(false);
        if (next.length === 1) {
          setFeedback({ ok: true, text: `Resultado final: ${next[0]}.` });
        }
      }, 650);
    },
    [disabled, done, lock, onTokensChange, reduced, tokens],
  );

  const renderRow = (row: readonly string[], isCurrent: boolean) => (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1 font-mono font-extrabold tabular-nums",
        isCurrent ? "min-h-14 text-3xl" : "min-h-11 text-xl opacity-40",
        isCurrent && done && "text-emerald-300",
      )}
    >
      {row.map((token, i) => {
        const isOp = !/\d|\(|\)/.test(token);
        const hit =
          isCurrent &&
          highlight &&
          (i === highlight.m || i === highlight.m - 1 || i === highlight.m + 1);
        const cls = tokenClass(Boolean(hit), hit ? highlight.l : null);
        if (isOp && isCurrent && !done) {
          return (
            <button
              key={`${token}-${i}`}
              type="button"
              className={cn(
                "min-h-12 min-w-11 rounded-xl border-2 border-transparent px-2 transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-wait",
                cls,
              )}
              data-testid={`jerarquia-op-${i}`}
              aria-label={`Operación ${token}`}
              aria-pressed={Boolean(hit)}
              disabled={disabled || lock || done}
              onClick={() => handleOpClick(i)}
            >
              {token}
            </button>
          );
        }
        return (
          <span key={`${token}-${i}`} className={cn("rounded-xl px-2 py-1", cls)}>
            {token}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-2" data-testid="jerarquia-practica-reducir" aria-label="Reducir expresión paso a paso">
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold" aria-label="Prioridad de las operaciones">
        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-violet-950">1 · Paréntesis</span>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-950">2 · × y ÷</span>
        <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-950">3 · + y −</span>
      </div>
      <p className="text-center text-xs text-ink-muted">Dentro del mismo nivel, empieza por la operación que está más a la izquierda.</p>
      <div className="rounded-2xl bg-slate-900 px-3 py-4 text-white">
        <div className="space-y-1">
          {history.map((row, i) => (
            <div key={`h-${i}`}>{renderRow(row, false)}</div>
          ))}
          {renderRow(tokens, true)}
        </div>
      </div>
      {feedback ? (
        <p
          className={cn("text-center text-sm font-bold", feedback.ok ? "text-emerald-800" : "text-orange-700")}
          role="status"
        >
          {feedback.text}
        </p>
      ) : null}
      {!history.length && tokens.join(" ") === initialTokens.join(" ") ? (
        <p className="text-center text-xs text-ink-muted">Pulsa la operación que harías primero.</p>
      ) : null}
    </div>
  );
}
