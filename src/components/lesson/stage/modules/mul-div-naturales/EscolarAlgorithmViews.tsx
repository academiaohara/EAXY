"use client";

import { useEffect, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  buildDivisionAlgorithmSteps,
  buildMultiplicationAlgorithmSteps,
  type DivisionAlgorithmStep,
} from "@/components/lesson/stage/modules/mul-div-naturales/escolar-algorithms";

const ACCENT = "var(--stage-accent, #6ee7b7)";
const INK = "var(--stage-ink, #e8edf5)";
const MUTED = "var(--stage-muted, #94a3b8)";

function useStepPlayback({
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
  const [phase, setPhase] = useState(reduced ? stepCount - 1 : 0);

  useEffect(() => {
    if (!autoPlay) {
      setPhase(stepCount - 1);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setPhase(stepCount - 1);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }

    onReadyChange?.(false);
    setPhase(0);
    let current = 0;
    const timers: number[] = [];
    const tick = () => {
      current += 1;
      setPhase(current);
      if (current >= stepCount - 1) {
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      timers.push(window.setTimeout(tick, intervalMs));
    };
    timers.push(window.setTimeout(tick, intervalMs));
    return () => {
      for (const id of timers) {
        window.clearTimeout(id);
      }
    };
  }, [autoPlay, intervalMs, onAnimationComplete, onReadyChange, reduced, stepCount]);

  return phase;
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
  const qSlots = dStr.length;
  const quotient = step.quotientDigits.padEnd(qSlots, " ");

  return (
    <svg
      viewBox="0 0 320 200"
      className="mx-auto h-auto w-full max-w-md font-mono"
      role="img"
      aria-label={`División ${dividend} entre ${divisor}`}
    >
      <text x="24" y="36" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        cociente
      </text>
      {quotient.split("").map((ch, i) => (
        <text
          key={`q-${i}`}
          x={120 + i * 22}
          y="40"
          fontSize="28"
          fontWeight="700"
          fill={step.highlightQuotientIndex === i ? ACCENT : INK}
          className="transition-all duration-500"
        >
          {ch.trim() ? ch : ""}
        </text>
      ))}

      <line x1="100" y1="52" x2="280" y2="52" stroke={MUTED} strokeWidth="2" />

      <text x="24" y="88" fontSize="32" fontWeight="700" fill={INK}>
        {dStr}
      </text>

      <path
        d="M 108 56 L 108 168 L 280 168"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text x="118" y="88" fontSize="32" fontWeight="700" fill={ACCENT}>
        {divisor}
      </text>

      {step.working ? (
        <text x="24" y="128" fontSize="26" fontWeight="600" fill={INK} className="animate-in fade-in duration-500">
          {step.working}
        </text>
      ) : null}
      {step.subtract ? (
        <>
          <line x1="16" y1="138" x2="96" y2="138" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="24" y="158" fontSize="24" fill={MUTED}>
            −{step.subtract}
          </text>
        </>
      ) : null}
      {step.remainderLine !== undefined ? (
        <>
          <line x1="16" y1="168" x2="96" y2="168" stroke={MUTED} strokeWidth="2" />
          <text x="24" y="188" fontSize="26" fontWeight="700" fill={ACCENT}>
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
    () => buildDivisionAlgorithmSteps(dividend, divisor),
    [dividend, divisor],
  );
  const phase = useStepPlayback({
    autoPlay,
    reduced,
    stepCount: steps.length,
    onReadyChange,
    onAnimationComplete,
    intervalMs: 1600,
  });
  const step = steps[phase]!;

  return (
    <div className="space-y-4" data-testid="mul-div-division-mano">
      <DivisionBracket dividend={dividend} divisor={divisor} step={step} />
      <p className="text-center text-sm leading-relaxed text-[color:var(--stage-muted,#64748b)]">
        <MathRenderer text={step.caption} />
      </p>
    </div>
  );
}

export function MultiplicacionManoScene({
  multiplicand,
  multiplier,
  autoPlay,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  multiplicand: number;
  multiplier: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const steps = useMemo(
    () => buildMultiplicationAlgorithmSteps(multiplicand, multiplier),
    [multiplicand, multiplier],
  );
  const phase = useStepPlayback({
    autoPlay,
    reduced,
    stepCount: steps.length,
    onReadyChange,
    onAnimationComplete,
    intervalMs: 1300,
  });
  const step = steps[phase]!;
  const mStr = String(multiplicand);
  const tStr = String(multiplier);
  const width = Math.max(mStr.length, tStr.length) + 2;

  return (
    <div className="space-y-4" data-testid="mul-div-multiplicacion-mano">
      <div className="mx-auto w-fit rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 px-4 py-3 font-mono text-2xl font-bold tracking-wider text-[color:var(--stage-ink,#e8edf5)] sm:text-3xl">
        <div className="flex justify-end gap-1 tabular-nums">
          {mStr.split("").map((ch, i) => (
            <span key={`m-${i}`} className="inline-block w-[1.1ch] text-right">
              {ch}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-1 tabular-nums text-[color:var(--stage-accent,#6ee7b7)]">
          <span className="mr-1 text-lg">×</span>
          {tStr.split("").map((ch, i) => (
            <span key={`t-${i}`} className="inline-block w-[1.1ch] text-right">
              {ch}
            </span>
          ))}
        </div>
        <div className="my-1 border-t-2 border-[color:var(--stage-muted,#94a3b8)]" />
        {step.partialLines.map((line, row) => (
          <div
            key={`p-${row}`}
            className={cn(
              "flex justify-end gap-1 tabular-nums transition-opacity duration-500",
              line.tone === "accent" ? "text-[color:var(--stage-accent,#6ee7b7)]" : "text-[color:var(--stage-muted,#94a3b8)]",
              step.highlightRow !== undefined && row > step.highlightRow ? "opacity-30" : "opacity-100",
            )}
          >
            {line.text.padStart(width, " ").split("").map((ch, i) => (
              <span key={`${row}-${i}`} className="inline-block w-[1.1ch] text-right">
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </div>
        ))}
        {step.total ? (
          <>
            <div className="my-1 border-t-2 border-[color:var(--stage-accent,#6ee7b7)]" />
            <div className="flex justify-end gap-1 tabular-nums text-[color:var(--stage-chalk,#f8fafc)]">
              {step.total.padStart(width, " ").split("").map((ch, i) => (
                <span key={`tot-${i}`} className="inline-block w-[1.1ch] text-right">
                  {ch === " " ? "\u00a0" : ch}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <p className="text-center text-sm leading-relaxed text-[color:var(--stage-muted,#64748b)]">
        <MathRenderer text={step.caption} />
      </p>
    </div>
  );
}

export function DivisionIdentidadScene({
  autoPlay,
  reduced,
  onReadyChange,
}: {
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const [phase, setPhase] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (!autoPlay || reduced) {
      setPhase(2);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    setPhase(0);
    const t1 = window.setTimeout(() => setPhase(1), 900);
    const t2 = window.setTimeout(() => {
      setPhase(2);
      onReadyChange?.(true);
    }, 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [autoPlay, onReadyChange, reduced]);

  const mini = (D: number, d: number, c: number, r: number, exact: boolean) => (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 100" className="h-24 w-28 font-mono">
        <text x="8" y="22" fontSize="14" fill={exact ? ACCENT : "#fbbf24"} fontWeight="700">
          {String(c).padStart(2, " ")}
        </text>
        <line x1="4" y1="28" x2="112" y2="28" stroke={MUTED} strokeWidth="1.5" />
        <text x="8" y="48" fontSize="16" fill={INK} fontWeight="700">
          {D}
        </text>
        <path d="M 52 32 L 52 88 L 112 88" fill="none" stroke={exact ? ACCENT : "#fbbf24"} strokeWidth="2" />
        <text x="58" y="48" fontSize="16" fill={exact ? ACCENT : "#fbbf24"} fontWeight="700">
          {d}
        </text>
        <text x="8" y="72" fontSize="14" fill={MUTED}>
          {r === 0 ? "0" : String(r)}
        </text>
      </svg>
      <MathRenderer
        text={
          exact
            ? `$D = d \\cdot c$`
            : `$D = d \\cdot c + r$`
        }
      />
    </div>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-label="División exacta y división entera">
      <div
        className={cn(
          "rounded-xl border-2 p-4 transition duration-700",
          phase >= 1 ? "border-emerald-400/50 bg-emerald-500/10" : "border-slate-600/40 opacity-70",
        )}
      >
        <p className="mb-2 text-sm font-semibold text-emerald-300">Exacta · resto $0$</p>
        {mini(150, 6, 25, 0, true)}
        <p className="mt-2 text-center text-xs text-[color:var(--stage-muted)]">
          <MathRenderer text={`$150 = 6 \\cdot 25$`} />
        </p>
      </div>
      <div
        className={cn(
          "rounded-xl border-2 p-4 transition duration-700",
          phase >= 2 ? "border-amber-400/50 bg-amber-500/10" : "border-slate-600/40 opacity-60",
        )}
      >
        <p className="mb-2 text-sm font-semibold text-amber-200">Entera · resto $\\neq 0$</p>
        {mini(43, 8, 5, 3, false)}
        <p className="mt-2 text-center text-xs text-[color:var(--stage-muted)]">
          <MathRenderer text={`$43 = 8 \\cdot 5 + 3$`} />
        </p>
      </div>
    </div>
  );
}
