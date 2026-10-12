"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
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

function highlightGroupClass(level: 1 | 2 | 3): string {
  if (level === 1) {
    return "border-violet-300/80 bg-violet-400/95 text-slate-900 shadow-[0_0_0_1px_rgb(167_139_250/0.5)]";
  }
  if (level === 2) {
    return "border-amber-300/80 bg-amber-400/95 text-slate-900 shadow-[0_0_0_1px_rgb(251_191_36/0.5)]";
  }
  return "border-cyan-300/80 bg-cyan-400/95 text-slate-900 shadow-[0_0_0_1px_rgb(34_211_238/0.5)]";
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

  const renderRow = (row: readonly string[], isCurrent: boolean) => {
    const nodes: React.ReactNode[] = [];
    let i = 0;
    while (i < row.length) {
      const token = row[i] ?? "";
      if (isCurrent && highlight && i === highlight.m - 1) {
        const left = row[i] ?? "";
        const op = row[i + 1] ?? "";
        const right = row[i + 2] ?? "";
        nodes.push(
          <span
            key={`hl-${i}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-xl border-2 px-2.5 py-1.5",
              highlightGroupClass(highlight.l),
            )}
          >
            <span>{left}</span>
            <span>{op}</span>
            <span>{right}</span>
          </span>,
        );
        i += 3;
        continue;
      }

      const isOp = !/\d|\(|\)/.test(token);
      if (isOp && isCurrent && !done) {
        const opIndex = i;
        nodes.push(
          <button
            key={`${token}-${i}`}
            type="button"
            className="min-h-12 min-w-11 rounded-xl border-2 border-transparent px-2 transition hover:border-white/40"
            data-testid={`jerarquia-op-${opIndex}`}
            aria-label={`Operación ${token}`}
            onClick={() => handleOpClick(opIndex)}
          >
            {token}
          </button>,
        );
      } else {
        nodes.push(
          <span key={`${token}-${i}`} className="px-1">
            {token}
          </span>,
        );
      }
      i += 1;
    }

    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-1 font-mono font-extrabold tabular-nums",
          isCurrent ? "min-h-14 text-3xl" : "min-h-11 text-xl opacity-40",
          isCurrent && done && "text-emerald-300",
        )}
      >
        {nodes}
      </div>
    );
  };

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
