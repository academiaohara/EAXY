"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { SlideBlock } from "@/lib/lesson/types";

type Props = {
  block: Extract<SlideBlock, { kind: "anim" }>;
  /** Título de la diapositiva: etiqueta pequeña sobre la explicación. */
  titulo: string;
};

/**
 * Diapositiva de teoría con la misma disposición que la mesa de dibujo: un lienzo grande con la animación (solo ilustraciones de
 * apoyo) y, a la derecha, la explicación del paso actual, que cambia al avanzar.
 */
export function AnimLienzo({ block, titulo }: Props) {
  const built = useMemo(() => buildSlideAnim(block.scene, block.params, block.captions), [block.scene, block.params, block.captions]);
  const reducido = useReducedMotion();
  const total = Math.max(1, built.captions.length);
  const [paso, setPaso] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(true);
  const beatMs = block.beatMs ?? built.beatMs ?? 5600;
  const activo = reproduciendo && !reducido && paso < total - 1;

  const ir = useCallback((n: number) => setPaso(Math.min(total - 1, Math.max(0, n))), [total]);

  useEffect(() => {
    if (!activo) return;
    const t = window.setTimeout(() => setPaso((p) => Math.min(total - 1, p + 1)), beatMs);
    return () => window.clearTimeout(t);
  }, [activo, paso, beatMs, total]);

  const texto = built.captions[paso] ?? "";
  const btn =
    "inline-flex items-center gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <section className="grid h-full min-h-0 gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8" data-testid="anim-lienzo" data-beat={paso}>
      <div className="flex min-h-0 min-w-0 items-center justify-center" role="img" aria-label={built.label}>
        <div className="w-full overflow-hidden rounded-2xl border border-[color:var(--stage-border,#3d4f66)] bg-black/25 [&_svg]:max-h-[70vh]">{built.render(paso)}</div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-col py-2">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden pt-[6%]" aria-live="polite">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--stage-muted,#b8c2d0)]" data-testid="anim-lienzo-titulo">
              {titulo}
            </p>
            <MathRenderer
              text={texto}
              emphasis="mark-alternate"
              className={`mt-3 block font-semibold leading-snug text-[color:var(--stage-ink,#fff)] [text-wrap:pretty] ${texto.length > 150 ? "text-[1.2rem]" : "text-[1.5rem]"}`}
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 pt-3" data-testid="anim-lienzo-repro">
          <button type="button" className={btn} onClick={() => setReproduciendo((v) => !v)} data-testid="anim-lienzo-pausa" aria-label={activo ? "Pausar la animación" : "Reanudar la animación"}>
            {activo ? <PauseIcon className="size-4" aria-hidden /> : <PlayIcon className="size-4" aria-hidden />}
            {activo ? "Pausar" : "Reanudar"}
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => {
              setPaso(0);
              setReproduciendo(true);
            }}
            data-testid="anim-lienzo-repetir"
            aria-label="Repetir la animación"
          >
            <RotateCcwIcon className="size-4" aria-hidden />
            Repetir
          </button>
        </div>
        <div className={`flex shrink-0 items-center gap-3 pt-3 ${total <= 1 ? "hidden" : ""}`} data-testid="anim-lienzo-nav">
          <button
            type="button"
            className={btn}
            disabled={paso === 0}
            onClick={() => {
              setReproduciendo(false);
              ir(paso - 1);
            }}
            data-testid="anim-lienzo-anterior"
          >
            <ChevronLeftIcon className="size-4" aria-hidden />
            Anterior
          </button>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--stage-accent,#58c4dd)]" data-testid="anim-lienzo-paso">
            Paso {paso + 1} de {total}
          </span>
          {total <= 12 ? (
            <div className="flex items-center gap-1.5" aria-hidden>
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`size-2 rounded-full ${i === paso ? "bg-[#58c4dd]" : i < paso ? "bg-[#58c4dd]/50" : "bg-white/20"}`} />
              ))}
            </div>
          ) : null}
          <button
            type="button"
            className={btn}
            disabled={paso === total - 1}
            onClick={() => {
              setReproduciendo(false);
              ir(paso + 1);
            }}
            data-testid="anim-lienzo-siguiente"
          >
            Siguiente
            <ChevronRightIcon className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
