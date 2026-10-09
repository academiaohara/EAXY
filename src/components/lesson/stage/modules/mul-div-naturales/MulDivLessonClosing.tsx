"use client";

import { useEffect } from "react";

const ITEMS = [
  {
    title: "Multiplicar",
    body: "Grupos iguales; puedes reagrupar factores.",
    tone: "border-sky-400/50 bg-sky-500/10",
    icon: "×",
  },
  {
    title: "Dividir",
    body: "Repartir o agrupar: el camino de vuelta de multiplicar.",
    tone: "border-violet-400/50 bg-violet-500/10",
    icon: "÷",
  },
  {
    title: "Cuando sobra algo",
    body: "El resto siempre es menor que el divisor.",
    tone: "border-amber-400/50 bg-amber-500/10",
    icon: "+",
  },
] as const;

export function MulDivLessonClosing({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  return (
    <div className="space-y-4" aria-label="Resumen de la lección" data-testid="mul-div-cierre">
      <p className="text-center text-sm font-medium text-[color:var(--stage-muted,#94a3b8)]">
        Has recorrido multiplicar y dividir con números naturales.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-center ${item.tone}`}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/25 bg-slate-900/30 font-[family-name:var(--font-caveat)] text-3xl font-bold text-[color:var(--stage-ink,#e8edf5)]"
              aria-hidden
            >
              {item.icon}
            </span>
            <h4 className="text-base font-semibold text-[color:var(--stage-ink,#e8edf5)]">{item.title}</h4>
            <p className="text-sm leading-relaxed text-[color:var(--stage-muted,#94a3b8)]">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
