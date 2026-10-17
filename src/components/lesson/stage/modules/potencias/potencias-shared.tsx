"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  useRegisterLessonFooterCenter,
  useRegisterLessonPresenterNavigation,
} from "@/components/lesson/LessonStepControlContext";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
import { boardSemanticColors } from "@/lib/lesson/stage/board-semantic-colors";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Semántica de color fija en toda la lección: base = ámbar, exponente = turquesa. */
export const BASE_COLOR = boardSemanticColors.amber;
export const EXP_COLOR = boardSemanticColors.teal;
export const INK = "var(--stage-ink, #e8edf5)";
export const MUTED = "var(--stage-muted, #94a3b8)";
export const BOARD = "#1a2332";

/** Entrada por montaje (tw-animate-css). Con reduced-motion no anima. */
export const ENTER = "animate-in fade-in fill-mode-both motion-reduce:animate-none";

/** 4096 → «4096»; 32768 → «32 768» (espacio fino no separable, como en los libros). */
export function fmt(n: number): string {
  const s = String(n);
  return n < 10000 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

export function fmtTex(n: number): string {
  return fmt(n).replace(/\u00a0/g, "\\,");
}

/** Potencia en LaTeX con la base en ámbar y el exponente en turquesa. */
export function texPow(base: number, exp: number): string {
  return `{\\color{${BASE_COLOR}}{${base}}}^{\\color{${EXP_COLOR}}{${exp}}}`;
}

/** LaTeX inline. OJO: en plantillas JS, `\\cdot` lleva doble barra (con una sola sale «cdot»). */
export function Tex({ t, className }: { t: string; className?: string }) {
  return <MathRenderer text={`$${t}$`} className={className} />;
}

/** Devuelve true un par de frames después de montar: permite transiciones CSS de entrada. */
export function useAppeared(): boolean {
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAppeared(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);
  return appeared;
}

/** Contador que sube hasta `target` cuando `active` pasa a true. */
export function useCountUp(target: number, active: boolean, ms = 1000): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      const reset = requestAnimationFrame(() => setValue(0));
      return () => cancelAnimationFrame(reset);
    }
    if (reduced) {
      const jump = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(jump);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, ms, reduced, target]);

  return value;
}

/**
 * Reproductor de fases estilo presentación: arranca solo, se puede pausar,
 * avanzar/retroceder con las flechas o los controles del pie, y avisa de
 * `ready` al llegar a la última fase (habilita «Continuar»).
 */
export function usePotenciasPhases({
  stepCount,
  onReadyChange,
  intervalMs = 2600,
}: {
  stepCount: number;
  onReadyChange?: (ready: boolean) => void;
  intervalMs?: number;
}) {
  const reduced = useReducedMotion();
  const finalPhase = Math.max(0, stepCount - 1);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const isPlaying = playing && phase < finalPhase && !reduced;

  const goTo = useCallback(
    (next: number) => setPhase(Math.max(0, Math.min(finalPhase, next))),
    [finalPhase],
  );

  useEffect(() => {
    if (!reduced) {
      return;
    }
    const jump = requestAnimationFrame(() => setPhase(finalPhase));
    return () => cancelAnimationFrame(jump);
  }, [finalPhase, reduced]);

  useEffect(() => {
    onReadyChange?.(phase >= finalPhase);
  }, [finalPhase, onReadyChange, phase]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const id = window.setTimeout(() => setPhase((p) => Math.min(finalPhase, p + 1)), intervalMs);
    return () => window.clearTimeout(id);
  }, [finalPhase, intervalMs, isPlaying, phase]);

  const presenterNav = useMemo(
    () => ({
      onAdvance: () => {
        setPlaying(false);
        goTo(phase + 1);
      },
      onRetreat: () => {
        setPlaying(false);
        goTo(phase - 1);
      },
      canAdvance: phase < finalPhase,
      canRetreat: phase > 0,
    }),
    [finalPhase, goTo, phase],
  );
  useRegisterLessonPresenterNavigation(presenterNav);

  const footer = useMemo(
    () => (
      <StageStepControls
        variant="presenter"
        phase={phase}
        stepCount={stepCount}
        playing={isPlaying}
        onPhaseChange={(next) => {
          setPlaying(false);
          goTo(next);
        }}
        onPlayingChange={setPlaying}
        onRestart={() => {
          goTo(0);
          setPlaying(true);
        }}
      />
    ),
    [goTo, isPlaying, phase, stepCount],
  );
  useRegisterLessonFooterCenter(footer);

  return { phase, reduced };
}

/** Marco común: escena arriba, subtítulo que cambia con cada fase abajo. */
export function SceneShell({
  caption,
  phase,
  align = "center",
  children,
}: {
  caption: string;
  phase: number;
  /** `top`: el contenido empieza arriba, pegado al cuadro de definición. */
  align?: "center" | "top";
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center gap-2">
      <div
        className={cn(
          "flex min-h-0 w-full flex-1 justify-center",
          align === "top" ? "items-start pt-3" : "items-center",
        )}
      >
        {children}
      </div>
      <div className="flex min-h-[3.5rem] shrink-0 items-start justify-center px-4">
        <p
          key={phase}
          className={cn(
            ENTER,
            "max-w-3xl text-center text-base font-medium duration-500 text-[color:var(--stage-ink,#e8edf5)]",
          )}
          aria-live="polite"
        >
          <MathRenderer text={caption} />
        </p>
      </div>
    </div>
  );
}
