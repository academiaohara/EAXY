"use client";

import { TallyMarksView } from "@/components/lesson/tools/naturales-numeracion/scenes/TallyMarksView";

const BOXES = Array.from({ length: 12 }, (_, index) => index);

function SmallBox() {
  return (
    <svg viewBox="0 0 40 36" className="size-8 text-amber-700 sm:size-9" aria-hidden="true">
      <path d="M4 11 20 3l16 8v19H4z" fill="currentColor" opacity=".14" />
      <path d="M4 11 20 3l16 8v19H4zM4 11h32M20 3v27m-16 0 16-9 16 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function OrigenContarScene() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 py-1">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Una situación cotidiana</p>
        <h3 className="mt-1 text-xl font-bold text-ink sm:text-2xl">¿Cuántas cajas han llegado?</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
          Antes de escribir un número, alguien tuvo que contar los objetos. Una marca por cada caja permite no perder la cuenta.
        </p>
      </div>

      <div role="img" className="mx-auto grid w-full max-w-sm grid-cols-4 justify-items-center gap-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 sm:gap-3 sm:p-5" aria-label="Doce cajas en tres filas de cuatro">
        {BOXES.map((box) => (
          <div key={box} className="flex size-14 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-amber-200/80 sm:size-16">
            <SmallBox />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">Una marca por caja</p>
          <TallyMarksView count={BOXES.length} className="min-h-0 justify-center px-3 py-3 sm:justify-start" />
        </div>
        <div className="rounded-xl border border-cobalt/20 bg-cobalt-tint/50 px-5 py-3 text-center">
          <span className="block text-xs font-semibold uppercase tracking-wide text-cobalt">La cantidad</span>
          <span className="text-3xl font-black tabular-nums text-cobalt">12</span>
        </div>
      </div>

      <p className="text-center text-sm text-ink-muted">
        Contar resuelve la pregunta; los símbolos nos ayudan a guardar y comunicar el resultado.
      </p>
    </div>
  );
}
