"use client";

import { useEffect } from "react";

const LEVELS = [
  { n: 1, title: "Paréntesis", hint: "Primero, lo de dentro", tone: "border-violet-300 bg-violet-50 text-violet-950", marker: "bg-violet-600 text-white" },
  { n: 2, title: "× y ÷", hint: "Después, producto y división", tone: "border-amber-300 bg-amber-50 text-amber-950", marker: "bg-amber-300 text-amber-950" },
  { n: 3, title: "+ y −", hint: "Por último, suma y resta", tone: "border-cyan-300 bg-cyan-50 text-cyan-950", marker: "bg-cyan-700 text-white" },
] as const;

export function NivelesReglas({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  return (
    <div className="space-y-4" data-testid="jerarquia-niveles" role="group" aria-label="Niveles del orden de operaciones">
      <p className="text-center text-sm font-medium text-ink">Resolvemos una expresión siguiendo siempre el mismo orden:</p>

      <ol className="grid gap-2 sm:grid-cols-3">
        {LEVELS.map((level) => (
          <li key={level.n} className={`flex items-center gap-3 rounded-xl border-2 px-3 py-3 ${level.tone}`}>
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${level.marker}`} aria-hidden="true">
              {level.n}
            </span>
            <span>
              <strong className="block text-sm">{level.title}</strong>
              <span className="text-xs">{level.hint}</span>
            </span>
          </li>
        ))}
      </ol>

      <section className="rounded-2xl border border-slate-200 bg-white p-4" aria-labelledby="orden-ejemplo-titulo">
        <h3 id="orden-ejemplo-titulo" className="text-center text-xs font-bold uppercase tracking-wide text-ink-muted">El mismo orden en una cuenta</h3>
        <p className="my-3 text-center font-mono text-2xl font-black tabular-nums text-ink">4 + (3 − 2) × 3</p>
        <ol className="mx-auto max-w-xl space-y-2 text-sm">
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-violet-50 px-3 py-2">
            <span><strong className="text-violet-900">1 · Paréntesis:</strong> 3 − 2 = 1</span>
            <code className="font-bold text-violet-950">4 + 1 × 3</code>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 px-3 py-2">
            <span><strong className="text-amber-950">2 · Multiplicación:</strong> 1 × 3 = 3</span>
            <code className="font-bold text-amber-950">4 + 3</code>
          </li>
          <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-cyan-50 px-3 py-2">
            <span><strong className="text-cyan-950">3 · Suma:</strong> 4 + 3 = 7</span>
            <code className="font-bold text-cyan-950">Resultado: 7</code>
          </li>
        </ol>
      </section>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-ink-muted">
        <strong className="text-ink">Si tienen la misma prioridad, vamos de izquierda a derecha:</strong>
        <span className="mt-1 block font-mono font-bold tabular-nums text-ink">6 ÷ 3 × 2 = 2 × 2 = 4</span>
        <span className="block text-xs">La división va antes porque aparece antes, no porque tenga más prioridad. Igual ocurre con la suma y la resta:</span>
        <span className="block font-mono font-bold tabular-nums text-ink">7 − 2 + 1 = 5 + 1 = 6</span>
      </div>
    </div>
  );
}
