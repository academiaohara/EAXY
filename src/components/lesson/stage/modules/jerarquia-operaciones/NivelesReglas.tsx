"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

const LEVELS = [
  {
    n: 1,
    title: "Paréntesis",
    hint: "lo de dentro, primero",
    example: "( 3 − 2 )",
    tone: "border-l-violet-400 bg-violet-500/10",
    badge: "bg-violet-400 text-slate-900",
  },
  {
    n: 2,
    title: "× y ÷",
    hint: "de izquierda a derecha",
    example: "6 ÷ 3 × 2",
    tone: "border-l-amber-400 bg-amber-500/10",
    badge: "bg-amber-400 text-slate-900",
  },
  {
    n: 3,
    title: "+ y −",
    hint: "de izquierda a derecha",
    example: "7 − 2 + 1",
    tone: "border-l-cyan-400 bg-cyan-500/10",
    badge: "bg-cyan-400 text-slate-900",
  },
] as const;

export function NivelesReglas({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  return (
    <div className="space-y-3" data-testid="jerarquia-niveles" aria-label="Niveles del orden de operaciones">
      <p className="text-center text-sm font-medium text-ink">Siempre el mismo orden. Tres niveles:</p>
      {LEVELS.map((level, index) => (
        <div
          key={level.n}
          className={cn(
            "flex items-center gap-4 rounded-2xl border-2 border-slate-200 border-l-[8px] px-4 py-3",
            level.tone,
            "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both",
          )}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
              level.badge,
            )}
          >
            {level.n}
          </span>
          <div className="min-w-0 flex-1">
            <strong className="text-base text-ink">{level.title}</strong>
            <br />
            <small className="text-sm text-ink-muted">{level.hint}</small>
          </div>
          <code className="shrink-0 font-mono text-lg font-extrabold text-ink">{level.example}</code>
        </div>
      ))}
      <p className="text-center text-sm text-ink-muted">
        Los niveles de arriba se calculan antes que los de abajo.
      </p>
    </div>
  );
}
