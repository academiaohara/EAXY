"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  buildDivisionManoGuidedSteps,
  type DivisionAlgorithmStep,
} from "@/components/lesson/stage/modules/mul-div-naturales/escolar-algorithms";
import { useRegisterLessonFooterCenter } from "@/components/lesson/LessonStepControlContext";
import { MultiplicacionManoChalkboard } from "@/components/lesson/stage/modules/mul-div-naturales/MultiplicacionManoChalkboard";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";

const ACCENT = "var(--stage-accent, #6ee7b7)";
const INK = "var(--stage-ink, #e8edf5)";
const MUTED = "var(--stage-muted, #94a3b8)";

function useControllableStepPlayback({
  autoPlay,
  reduced,
  stepCount,
  onReadyChange,
  onAnimationComplete,
  intervalMs = 1400,
}: {
  autoPlay?: boolean;
  reduced: boolean;
  stepCount: number;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
  intervalMs?: number;
}) {
  const finalPhase = Math.max(0, stepCount - 1);
  const [phase, setPhaseState] = useState(reduced ? finalPhase : 0);
  const [playing, setPlaying] = useState(Boolean(autoPlay) && !reduced);
  const timerRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const notifyComplete = useCallback(() => {
    if (completedRef.current) {
      return;
    }
    completedRef.current = true;
    onReadyChange?.(true);
    onAnimationComplete?.();
  }, [onAnimationComplete, onReadyChange]);

  const setPhase = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(finalPhase, next));
      setPhaseState(clamped);
      if (clamped >= finalPhase) {
        notifyComplete();
      } else {
        onReadyChange?.(false);
        completedRef.current = false;
      }
    },
    [finalPhase, notifyComplete, onReadyChange],
  );

  useEffect(() => {
    completedRef.current = false;
    if (reduced) {
      setPhaseState(finalPhase);
      setPlaying(false);
      notifyComplete();
      return;
    }
    if (!autoPlay) {
      setPhaseState(0);
      setPlaying(false);
      onReadyChange?.(false);
      return;
    }
    setPhaseState(0);
    setPlaying(true);
    onReadyChange?.(false);
  }, [autoPlay, finalPhase, notifyComplete, onReadyChange, reduced, stepCount]);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!playing || reduced || phase >= finalPhase) {
      if (phase >= finalPhase) {
        notifyComplete();
      }
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setPhase(phase + 1);
    }, intervalMs);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [finalPhase, intervalMs, notifyComplete, phase, playing, reduced, setPhase]);

  const handlePlayingChange = useCallback(
    (next: boolean) => {
      setPlaying(next);
      if (!next && phase >= finalPhase) {
        notifyComplete();
      }
    },
    [finalPhase, notifyComplete, phase],
  );

  return { phase, setPhase, playing, setPlaying: handlePlayingChange, stepCount };
}

function DivisionBracket({
  dividend,
  divisor,
  step,
}: {
  dividend: number;
  divisor: number;
  step: DivisionAlgorithmStep;
}) {
  const dStr = String(dividend);
  const quotient = step.quotientDigits;

  return (
    <svg
      viewBox="0 0 320 210"
      className="mx-auto h-auto w-full max-w-sm font-mono"
      role="img"
      aria-label={`División ${dividend} entre ${divisor}`}
    >
      <text x="28" y="72" fontSize="34" fontWeight="700" fill={step.highlightWorking ? ACCENT : INK}>
        {dStr}
      </text>

      <path
        d="M 118 48 L 118 132 L 268 132"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text x="132" y="72" fontSize="34" fontWeight="700" fill={ACCENT}>
        {divisor}
      </text>

      <text x="132" y="108" fontSize="30" fontWeight="700" fill={INK}>
        {quotient.split("").map((ch, i) => (
          <tspan
            key={`q-${i}`}
            fill={step.highlightQuotientIndex === i ? ACCENT : INK}
          >
            {ch}
          </tspan>
        ))}
      </text>

      {step.working ? (
        <text
          x="28"
          y="118"
          fontSize="26"
          fontWeight="600"
          fill={step.highlightWorking ? ACCENT : INK}
          className="transition-all duration-500"
        >
          {step.working}
        </text>
      ) : null}
      {step.subtract ? (
        <>
          <line x1="20" y1="142" x2="108" y2="142" stroke={MUTED} strokeWidth="1.5" />
          <text x="28" y="162" fontSize="24" fill={MUTED}>
            −{step.subtract}
          </text>
        </>
      ) : null}
      {step.remainderLine !== undefined ? (
        <>
          <line x1="20" y1="172" x2="108" y2="172" stroke={MUTED} strokeWidth="2" />
          <text x="28" y="192" fontSize="26" fontWeight="700" fill={ACCENT}>
            {step.remainderLine}
          </text>
        </>
      ) : null}
    </svg>
  );
}

export function DivisionManoScene({
  dividend,
  divisor,
  autoPlay,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  dividend: number;
  divisor: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const steps = useMemo(
    () => buildDivisionManoGuidedSteps(dividend, divisor),
    [dividend, divisor],
  );
  const { phase, setPhase, playing, setPlaying, stepCount } = useControllableStepPlayback({
    autoPlay: false,
    reduced,
    stepCount: steps.length,
    onReadyChange,
    onAnimationComplete,
    intervalMs: 1300,
  });
  const step = steps[phase]!;

  const handleRestart = useCallback(() => {
    setPhase(0);
    setPlaying(false);
    onReadyChange?.(false);
  }, [onReadyChange, setPhase, setPlaying]);

  const footerControls = useMemo(
    () => (
      <StageStepControls
        variant="footer"
        phase={phase}
        stepCount={stepCount}
        playing={playing}
        onPhaseChange={setPhase}
        onPlayingChange={setPlaying}
        onRestart={handleRestart}
      />
    ),
    [handleRestart, phase, playing, setPhase, setPlaying, stepCount],
  );
  useRegisterLessonFooterCenter(footerControls);

  return (
    <div className="mx-auto flex w-fit max-w-full flex-col gap-2">
      <div className="min-h-[13.5rem] w-fit rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 px-4 py-3">
        <DivisionBracket dividend={dividend} divisor={divisor} step={step} />
      </div>
      <p
        className="min-h-[4.5rem] max-w-md text-center text-sm font-medium leading-relaxed text-[color:var(--stage-ink,#e8edf5)]"
        aria-live="polite"
      >
        <MathRenderer text={step.caption} />
      </p>
    </div>
  );
}

export function MultiplicacionManoScene({
  multiplicand,
  multiplier,
  subStep = 1,
  onBoardClick,
}: {
  multiplicand: number;
  multiplier: number;
  subStep?: number;
  onBoardClick?: () => void;
  autoPlay?: boolean;
  reduced?: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  return (
    <MultiplicacionManoChalkboard
      multiplicand={multiplicand}
      multiplier={multiplier}
      subStep={subStep}
      onBoardClick={onBoardClick}
    />
  );
}

export function DivisionIdentidadScene({
  onReadyChange,
}: {
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  const mini = (D: number, d: number, c: number, r: number, exact: boolean) => (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 100" className="h-24 w-28 font-mono">
        <text x="8" y="48" fontSize="16" fill={INK} fontWeight="700">
          {D}
        </text>
        <path d="M 52 32 L 52 88 L 112 88" fill="none" stroke={exact ? ACCENT : "#fbbf24"} strokeWidth="2" />
        <text x="58" y="48" fontSize="16" fill={exact ? ACCENT : "#fbbf24"} fontWeight="700">
          {d}
        </text>
        <text x="58" y="72" fontSize="14" fill={exact ? ACCENT : "#fbbf24"} fontWeight="700">
          {c}
        </text>
        {!exact ? (
          <text x="8" y="72" fontSize="14" fill={MUTED}>
            r={r}
          </text>
        ) : null}
      </svg>
    </div>
  );

  return (
    <div className="space-y-3" aria-label="División exacta y división entera">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-emerald-400/50 bg-emerald-500/15 p-4">
          <p className="mb-2 text-sm font-semibold text-emerald-200">Exacta</p>
          {mini(150, 6, 25, 0, true)}
          <p className="mt-2 text-center text-xs leading-relaxed text-[color:var(--stage-ink,#e8edf5)]">
            <MathRenderer text={`$150 : 6 = 25$, resto $0$ → $150 = 6 \\cdot 25$.`} />
          </p>
        </div>
        <div className="rounded-xl border-2 border-amber-400/50 bg-amber-500/15 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-100">Entera</p>
          {mini(152, 6, 25, 2, false)}
          <p className="mt-2 text-center text-xs leading-relaxed text-[color:var(--stage-ink,#e8edf5)]">
            <MathRenderer text={`$152$ bombones en $6$ cajas → $25$ en cada una y **sobran 2** → $152 = 6 \\cdot 25 + 2$.`} />
          </p>
        </div>
      </div>
      <p className="text-center text-xs leading-relaxed text-[color:var(--stage-muted,#94a3b8)]">
        El resto siempre es menor que el divisor: si sobraran $6$, podrías llenar otra caja.
      </p>
    </div>
  );
}
