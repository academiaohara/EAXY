"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

export type BloquesNumericosModuleProps = {
  stepId: string;
  scene: "conmutativa" | "asociativa" | "propiedades-suma";
  blocks: number[];
  onReadyChange?: (ready: boolean) => void;
};

type BloquesState = {
  swapped: boolean;
  groupLeft: boolean;
  orderTouched: boolean;
  groupTouched: boolean;
};

function createDefaultBloquesState(): BloquesState {
  return { swapped: false, groupLeft: true, orderTouched: false, groupTouched: false };
}

/** Mismo objeto en todos los sumandos: $8 + 6$ son 8 manzanas y 6 manzanas. */
const UNIT_EMOJI = "🍎";
const UNIT_LABEL = "manzanas";

function EmojiPile({ count, className }: { count: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        role="img"
        className="flex max-w-[6.5rem] flex-wrap justify-center gap-0.5 rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm"
        aria-label={`${count} ${UNIT_LABEL}`}
      >
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className="text-xl leading-none" aria-hidden="true">
            {UNIT_EMOJI}
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold tabular-nums text-ink-muted">{count}</span>
    </div>
  );
}

export function BloquesNumericosModule({ stepId, scene, blocks, onReadyChange }: BloquesNumericosModuleProps) {
  const [state, setState] = usePersistedLessonToolState(stepId, createDefaultBloquesState);
  const [a, b, c] = blocks.length >= 3 ? blocks : [8, 6, 3];
  const third = c ?? 0;
  const total = a + b + third;
  const showBoth = scene === "propiedades-suma";
  const ready = showBoth
    ? state.orderTouched && state.groupTouched
    : scene === "conmutativa"
      ? state.orderTouched
      : state.groupTouched;

  useEffect(() => {
    onReadyChange?.(ready);
  }, [onReadyChange, ready]);

  const first = state.swapped ? b : a;
  const second = state.swapped ? a : b;

  return (
    <div className="space-y-4" aria-label="Propiedades de la suma">
      <div className={cn("grid gap-4", showBoth && "sm:grid-cols-2")}>
        {(showBoth || scene === "conmutativa") ? (
          <section className="space-y-3 rounded-2xl border border-cobalt/20 bg-cobalt-tint/30 p-4" data-testid="bloques-numericos-conmutativa" aria-labelledby="propiedad-conmutativa-titulo">
            <div className="text-center">
              <h3 id="propiedad-conmutativa-titulo" className="font-bold text-ink">Cambiar el orden</h3>
              <p className="text-xs text-ink-muted">Las mismas manzanas, en otro orden.</p>
            </div>
            <div className="flex flex-wrap items-end justify-center gap-3">
              <EmojiPile count={first} />
              <span className="pb-5 text-xl font-bold text-ink" aria-hidden="true">+</span>
              <EmojiPile count={second} />
              <span className="pb-5 font-mono text-lg font-bold text-ink">= {a + b}</span>
            </div>
            <p className="text-center text-sm text-ink-muted">
              <MathRenderer text={`$${first} + ${second} = ${a + b}$`} />
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                aria-pressed={state.swapped}
                className="rounded-full bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2"
                onClick={() => setState((previous) => ({ ...previous, swapped: !previous.swapped, orderTouched: true }))}
              >
                Cambiar orden
              </button>
            </div>
          </section>
        ) : null}

        {(showBoth || scene === "asociativa") ? (
          <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4" data-testid="bloques-numericos-asociativa" aria-labelledby="propiedad-asociativa-titulo">
            <div className="text-center">
              <h3 id="propiedad-asociativa-titulo" className="font-bold text-ink">Cambiar la agrupación</h3>
              <p className="text-xs text-ink-muted">Primero agrupamos dos sumandos; el total no cambia.</p>
            </div>
            <div className="flex min-h-28 flex-wrap items-end justify-center gap-2 rounded-xl bg-white/80 p-3">
              {state.groupLeft ? (
                <>
                  <div className="flex items-end gap-1 rounded-xl border-2 border-dashed border-cobalt/40 bg-cobalt-tint/30 px-2 py-2">
                    <EmojiPile count={a} />
                    <span className="pb-5 font-bold" aria-hidden="true">+</span>
                    <EmojiPile count={b} />
                  </div>
                  <span className="pb-5 font-bold" aria-hidden="true">+</span>
                  <EmojiPile count={third} />
                </>
              ) : (
                <>
                  <EmojiPile count={a} />
                  <span className="pb-5 font-bold" aria-hidden="true">+</span>
                  <div className="flex items-end gap-1 rounded-xl border-2 border-dashed border-emerald-500/50 bg-emerald-50 px-2 py-2">
                    <EmojiPile count={b} />
                    <span className="pb-5 font-bold" aria-hidden="true">+</span>
                    <EmojiPile count={third} />
                  </div>
                </>
              )}
              <span className="pb-5 font-mono text-lg font-bold text-ink">= {total}</span>
            </div>
            <p className="text-center text-sm text-ink-muted">
              <MathRenderer text={state.groupLeft ? `$(${a} + ${b}) + ${third} = ${total}$` : `$${a} + (${b} + ${third}) = ${total}$`} />
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                aria-pressed={!state.groupLeft}
                className="rounded-full border border-emerald-700 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                onClick={() => setState((previous) => ({ ...previous, groupLeft: !previous.groupLeft, groupTouched: true }))}
              >
                Cambiar agrupación
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950">
        Estas propiedades valen para la <strong>suma</strong>. En una resta, cambiar el orden o los paréntesis puede cambiar el resultado.
      </p>
      <p className="text-center text-xs text-ink-muted" aria-live="polite">
        {ready ? "Comprueba: en los dos cambios se conserva el total." : "Prueba los dos controles para comparar ambas propiedades."}
      </p>
    </div>
  );
}
