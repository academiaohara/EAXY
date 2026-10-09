"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applyOperationAt,
  operationHighlightLevel,
  pickNextOperation,
  wrongTapMessage,
} from "@/lib/lesson/stage/jerarquia-reduce";
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
      setFeedback(null);
      const level = operationHighlightLevel(tokens, index, pick);
      setHighlight({ m: index, l: level });
      window.setTimeout(() => {
        const next = applyOperationAt(tokens, index);
        onTokensChange(next, tokens);
        setHighlight(null);
        setLock(false);
        if (next.length === 1) {
          setFeedback({ ok: true, text: `¡Resultado: ${next[0]}!` });
        }
      }, 650);
    },
    [disabled, done, lock, onTokensChange, tokens],
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
                "min-h-12 min-w-11 rounded-xl border-2 border-transparent px-2 transition hover:border-white/40",
                cls,
              )}
              data-testid={`jerarquia-op-${i}`}
              aria-label={`Operación ${token}`}
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
          className={cn("text-center text-sm font-bold", feedback.ok ? "text-emerald-700" : "text-orange-600")}
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
