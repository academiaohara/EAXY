"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StageStepControlsProps = {
  phase: number;
  stepCount: number;
  playing: boolean;
  onPhaseChange: (next: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onRestart?: () => void;
  variant?: "default" | "embedded" | "footer" | "presenter";
  className?: string;
};

export function StageStepControls({
  phase,
  stepCount,
  playing,
  onPhaseChange,
  onPlayingChange,
  onRestart,
  variant = "default",
  className,
}: StageStepControlsProps) {
  const atStart = phase <= 0;
  const atEnd = phase >= stepCount - 1;
  const embedded = variant === "embedded";
  const footer = variant === "footer";
  const presenter = variant === "presenter";

  const btnBase = presenter
    ? "inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--stage-border,#475569)] text-[color:var(--stage-muted,#94a3b8)] transition hover:border-cobalt/45 hover:text-[color:var(--stage-ink,#e8edf5)] disabled:opacity-35"
    : footer
    ? "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
    : embedded
      ? "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/35 text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/55 disabled:opacity-35"
      : "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/40 disabled:opacity-40";

  const btnAccent = presenter
    ? "inline-flex size-9 items-center justify-center rounded-full bg-cobalt text-white transition hover:bg-cobalt/90"
    : footer
    ? "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-cobalt text-white shadow-sm transition hover:bg-cobalt/90"
    : embedded
      ? "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--stage-accent,#6ee7b7)]/90 text-slate-900 transition hover:bg-[color:var(--stage-accent,#6ee7b7)]"
      : "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-[color:var(--stage-accent,#6ee7b7)] text-slate-900 transition hover:opacity-90";

  const iconClass = embedded ? "h-3.5 w-3.5" : presenter ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        embedded ? "gap-0.5" : "flex-wrap justify-center gap-2",
        (footer || presenter) && "gap-1.5",
        className,
      )}
      role="group"
      aria-label="Controles de animación"
      data-testid="lesson-animation-controls"
    >
      <button
        type="button"
        className={btnBase}
        aria-label="Retroceder un paso"
        disabled={atStart}
        onClick={() => onPhaseChange(Math.max(0, phase - 1))}
      >
        <ChevronLeftIcon className={iconClass} aria-hidden />
      </button>
      {atEnd && onRestart ? (
        <button
          type="button"
          className={btnAccent}
          aria-label="Reiniciar animación"
          onClick={onRestart}
        >
          <RotateCcwIcon className={iconClass} aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          className={btnAccent}
          aria-label={playing ? "Pausar animación" : "Reproducir animación"}
          onClick={() => onPlayingChange(!playing)}
        >
          {playing ? (
            <PauseIcon className={iconClass} aria-hidden />
          ) : (
            <PlayIcon className={iconClass} aria-hidden />
          )}
        </button>
      )}
      <button
        type="button"
        className={btnBase}
        aria-label="Avanzar un paso"
        disabled={atEnd}
        onClick={() => onPhaseChange(Math.min(stepCount - 1, phase + 1))}
      >
        <ChevronRightIcon className={iconClass} aria-hidden />
      </button>
      <span
        className={cn(
          "text-center font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]",
          embedded
            ? "min-w-[2.25rem] pl-0.5 text-[10px]"
            : footer
              ? "min-w-[3.5rem] text-xs text-slate-500"
              : presenter
                ? "min-w-[2.75rem] text-[11px]"
                : "min-w-[3.5rem] text-xs",
        )}
      >
        {phase + 1}/{stepCount}
      </span>
    </div>
  );
}
