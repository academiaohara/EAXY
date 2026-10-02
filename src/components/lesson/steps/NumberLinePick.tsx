"use client";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell, tallFractions } from "@/components/lesson/steps/PracticeShell";
import {
  formatNumberLineValue,
  isNumberLinePickCorrect,
  numberLineTicks,
} from "@/lib/lesson/practice-check";
import { cn } from "@/lib/utils";
import type { NumberLinePickStep } from "@/lib/lesson/types";

type NumberLinePickProps = {
  step: NumberLinePickStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
};

/** Margen lateral de la recta dentro de su caja, en %. */
const PAD = 4;

export function NumberLinePick({ step, onCheck, disabled = false, compact = false }: NumberLinePickProps) {
  const subdivisions = Math.max(1, step.subdivisions ?? 1);
  const ticks = useMemo(() => numberLineTicks(step), [step]);
  const [index, setIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const locked = disabled || checked;
  const value = index === null ? null : ticks[index];
  const last = ticks.length - 1;
  const position = (i: number) => PAD + (i / last) * (100 - PAD * 2);
  const integerTicks = ticks.filter((tick) => Number.isInteger(Math.round(tick * 1e6) / 1e6)).length;
  const labelEvery = integerTicks > 16 ? 5 : integerTicks > 11 ? 2 : 1;

  const pickAt = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || locked) {
        return;
      }
      const rect = track.getBoundingClientRect();
      const ratio = ((clientX - rect.left) / rect.width) * 100;
      const raw = ((ratio - PAD) / (100 - PAD * 2)) * last;
      setIndex(Math.min(last, Math.max(0, Math.round(raw))));
    },
    [last, locked],
  );

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pickAt(event.clientX);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (locked) {
      return;
    }
    const moves: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
    if (event.key in moves) {
      event.preventDefault();
      setIndex((current) =>
        Math.min(last, Math.max(0, (current ?? Math.round(last / 2)) + moves[event.key])),
      );
    }
  }

  const handleCheck = useCallback(() => {
    if (checked || value === null) {
      return;
    }
    const correct = isNumberLinePickCorrect(step, value);
    setIsCorrect(correct);
    setChecked(true);
    onCheck(correct);
  }, [checked, onCheck, step, value]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: value === null || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, handleCheck, value]);

  useRegisterLessonStepControl(control);

  const targetIndex = ticks.findIndex((tick) => isNumberLinePickCorrect(step, tick));
  const readout = value === null ? null : formatNumberLineValue(value, subdivisions, step.readout);

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-number-line-pick">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={locked ? -1 : 0}
        aria-label="Recta numérica"
        aria-valuemin={step.min}
        aria-valuemax={step.max}
        aria-valuenow={value ?? undefined}
        aria-valuetext={readout ?? "Sin marcar"}
        onPointerDown={onPointerDown}
        onPointerMove={(event) => dragging.current && pickAt(event.clientX)}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onKeyDown={onKeyDown}
        className={cn(
          "relative mx-auto h-32 w-full max-w-3xl touch-none select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40",
          !locked && "cursor-pointer",
        )}
        data-testid="number-line-track"
      >
        <div
          className="absolute top-[58%] h-1 -translate-y-1/2 rounded-full bg-slate-300"
          style={{ left: `${PAD / 2}%`, right: `${PAD / 2}%` }}
          aria-hidden
        />
        {ticks.map((tick, i) => {
          const major = Number.isInteger(Math.round(tick * 1e6) / 1e6);
          const labelled = major && Math.round(tick) % labelEvery === 0;
          return (
            <div
              key={i}
              className="pointer-events-none absolute top-[58%] flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${position(i)}%` }}
              aria-hidden
            >
              <span
                className={cn(
                  "w-0.5 -translate-y-1/2 rounded-full",
                  major ? "h-5 bg-slate-500" : "h-3 bg-slate-400",
                )}
              />
              {labelled ? (
                <span className="mt-0.5 text-xs font-semibold tabular-nums text-ink-muted sm:text-sm">
                  {formatNumberLineValue(tick).replace("{,}", ",")}
                </span>
              ) : null}
            </div>
          );
        })}

        {checked && !isCorrect && targetIndex >= 0 ? (
          <div
            className="lesson-point-pop pointer-events-none absolute top-[58%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-500 shadow"
            style={{ left: `${position(targetIndex)}%` }}
            data-testid="number-line-target"
            aria-hidden
          />
        ) : null}

        {index !== null ? (
          <div
            className="pointer-events-none absolute top-[58%] flex flex-col items-center transition-[left] duration-150"
            style={{ left: `${position(index)}%`, transform: "translate(-50%, calc(-100% + 0.6rem))" }}
            data-testid="number-line-marker"
          >
            <span
              className={cn(
                "mb-1 rounded-lg px-2 py-0.5 text-sm font-semibold text-white shadow",
                checked ? (isCorrect ? "bg-emerald-500" : "bg-amber-500") : "bg-cobalt",
              )}
            >
              <MathRenderer text={`$${tallFractions(readout ?? "")}$`} />
            </span>
            <span
              className={cn(
                "size-5 rounded-full border-[3px] border-white shadow-md",
                checked ? (isCorrect ? "bg-emerald-500" : "bg-amber-500 animate-shake") : "bg-cobalt",
              )}
            />
          </div>
        ) : null}
      </div>

      <p className="text-center text-xs text-ink-muted">
        {index === null
          ? "Toca la recta (o arrastra) para colocar el punto. Con el teclado, usa las flechas."
          : "Puedes moverlo hasta que estés seguro."}
      </p>
    </PracticeShell>
  );
}
