"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

export type AnimPlayerProps = {
  /** Texto accesible de la animación completa. */
  label: string;
  /** Un texto por paso: lo que el alumno debe mirar / entender en ese momento. */
  captions: string[];
  /** Dibuja el lienzo para un paso (0…captions.length-1). Debe usar transiciones CSS. */
  render: (beat: number) => ReactNode;
  /** Milisegundos que se queda cada paso en reproducción automática. */
  beatMs?: number;
  /** Empieza solo al montarse (salvo con «reducir movimiento»). */
  autoplay?: boolean;
  /** Se llama cada vez que cambia el paso visible. */
  onBeatChange?: (beat: number) => void;
  className?: string;
};

/**
 * Reproductor de animaciones por pasos: cada paso es un estado del lienzo y las
 * transiciones CSS hacen el movimiento (estilo Manim: aparecer, desplazar, fundir).
 * El alumno puede pausar, retroceder, avanzar o reiniciar sin salir de la diapositiva.
 */
export function AnimPlayer({
  label,
  captions,
  render,
  beatMs = 2600,
  autoplay = true,
  onBeatChange,
  className,
}: AnimPlayerProps) {
  const reduced = useReducedMotion();
  const total = Math.max(1, captions.length);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(autoplay);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.min(total - 1, Math.max(0, next));
      setBeat(clamped);
      onBeatChange?.(clamped);
    },
    [onBeatChange, total],
  );

  // Con «reducir movimiento» no hay reproducción automática; al llegar al final, tampoco.
  const isPlaying = playing && !reduced && beat < total - 1;

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = window.setTimeout(() => goTo(beat + 1), beatMs);
    return () => window.clearTimeout(timer);
  }, [beat, beatMs, goTo, isPlaying]);

  const handlePhase = useCallback(
    (next: number) => {
      setPlaying(false);
      goTo(next);
    },
    [goTo],
  );

  const handleRestart = useCallback(() => {
    goTo(0);
    setPlaying(true);
  }, [goTo]);

  return (
    <figure
      className={cn(
        "lesson-slide lesson-anim flex w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--stage-border,#3d4f66)] bg-black/25",
        className,
      )}
      data-testid="lesson-anim"
      data-beat={beat}
      aria-label={label}
    >
      <div className="relative w-full" role="img" aria-label={label}>
        {render(beat)}
      </div>
      <figcaption className="flex items-center gap-3 border-t border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-4 py-2.5">
        <p
          className="min-h-[2.75rem] flex-1 text-[0.95rem] leading-snug text-[color:var(--stage-ink,#fff)]"
          aria-live="polite"
          data-testid="lesson-anim-caption"
        >
          <MathRenderer text={captions[beat] ?? ""} emphasis="mark-alternate" />
        </p>
        <StageStepControls
          variant="embedded"
          phase={beat}
          stepCount={total}
          playing={isPlaying}
          onPhaseChange={handlePhase}
          onPlayingChange={setPlaying}
          onRestart={handleRestart}
        />
      </figcaption>
    </figure>
  );
}
