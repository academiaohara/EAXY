"use client";

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StageStepControlsProps = {
  phase: number;
  stepCount: number;
  playing: boolean;
  onPhaseChange: (next: number) => void;
  onPlayingChange: (playing: boolean) => void;
  className?: string;
};

export function StageStepControls({
  phase,
  stepCount,
  playing,
  onPhaseChange,
  onPlayingChange,
  className,
}: StageStepControlsProps) {
  const atStart = phase <= 0;
  const atEnd = phase >= stepCount - 1;

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      role="group"
      aria-label="Controles de animación"
    >
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/40 disabled:opacity-40"
        aria-label="Retroceder un paso"
        disabled={atStart}
        onClick={() => onPhaseChange(Math.max(0, phase - 1))}
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[color:var(--stage-accent,#6ee7b7)] text-slate-900 transition hover:opacity-90"
        aria-label={playing ? "Pausar animación" : "Reproducir animación"}
        onClick={() => onPlayingChange(!playing)}
      >
        {playing ? <PauseIcon className="h-5 w-5" aria-hidden /> : <PlayIcon className="h-5 w-5" aria-hidden />}
      </button>
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/40 disabled:opacity-40"
        aria-label="Avanzar un paso"
        disabled={atEnd}
        onClick={() => onPhaseChange(Math.min(stepCount - 1, phase + 1))}
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden />
      </button>
      <span className="min-w-[3.5rem] text-center text-xs font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
        {phase + 1}/{stepCount}
      </span>
    </div>
  );
}
