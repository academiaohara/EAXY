"use client";

import { useCallback, useMemo, useState } from "react";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell } from "@/components/lesson/steps/PracticeShell";
import { FractionFigure } from "@/components/lesson/visuals/FractionFigure";
import {
  describeMarkedFraction,
  FRACTION_PARTS_MAX,
  FRACTION_PARTS_MIN,
  fractionWholes,
  initialFractionParts,
  isFractionPickCorrect,
} from "@/lib/lesson/practice-check";
import { cn } from "@/lib/utils";
import type { FractionPickStep } from "@/lib/lesson/types";

type FractionPickProps = {
  step: FractionPickStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
};

const UNIT_NAME: Record<FractionPickStep["shape"], string> = {
  bar: "la barra",
  circle: "la tarta",
  grid: "la cuadrícula",
  set: "el grupo",
};

export function FractionPick({ step, onCheck, disabled = false, compact = false }: FractionPickProps) {
  const wholes = fractionWholes(step);
  const [parts, setParts] = useState(() => initialFractionParts(step));
  const [marked, setMarked] = useState<boolean[]>(() => Array(wholes * initialFractionParts(step)).fill(false));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const markedCount = marked.filter(Boolean).length;
  const locked = disabled || checked;
  const reading = describeMarkedFraction(parts, markedCount);

  const changeParts = useCallback(
    (next: number) => {
      const clamped = Math.min(FRACTION_PARTS_MAX, Math.max(FRACTION_PARTS_MIN, next));
      setParts(clamped);
      setMarked(Array(wholes * clamped).fill(false));
    },
    [wholes],
  );

  const toggle = useCallback((index: number) => {
    setMarked((prev) => prev.map((on, i) => (i === index ? !on : on)));
  }, []);

  const handleCheck = useCallback(() => {
    if (checked || markedCount === 0) {
      return;
    }
    const markedIndices = marked.flatMap((on, index) => (on ? [index] : []));
    const correct = isFractionPickCorrect(step, parts, markedCount, markedIndices);
    setIsCorrect(correct);
    setChecked(true);
    onCheck(correct);
  }, [checked, marked, markedCount, onCheck, parts, step]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: markedCount === 0 || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, handleCheck, markedCount]);

  useRegisterLessonStepControl(control);

  const readoutTex =
    step.shape === "set"
      ? `\\dfrac{${reading.numerator}}{${parts * wholes}}`
      : `\\dfrac{${reading.numerator}}{${reading.denominator}}`;

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-fraction-pick">
      {step.adjustableParts ? (
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-ink sm:text-base">
          <span>Divide {UNIT_NAME[step.shape]} en</span>
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => changeParts(parts - 1)}
              disabled={locked || parts <= FRACTION_PARTS_MIN}
              className="flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-cobalt-tint disabled:opacity-40"
              aria-label="Menos partes"
              data-testid="fraction-parts-minus"
            >
              <MinusIcon className="size-4" />
            </button>
            <span
              className="min-w-10 text-center font-heading text-xl font-semibold tabular-nums"
              aria-live="polite"
              data-testid="fraction-parts-value"
            >
              {parts}
            </span>
            <button
              type="button"
              onClick={() => changeParts(parts + 1)}
              disabled={locked || parts >= FRACTION_PARTS_MAX}
              className="flex size-9 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-cobalt-tint disabled:opacity-40"
              aria-label="Más partes"
              data-testid="fraction-parts-plus"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          <span>partes iguales</span>
        </div>
      ) : null}

      <FractionFigure
        shape={step.shape}
        parts={parts}
        wholes={wholes}
        marked={marked}
        onToggle={toggle}
        disabled={locked}
        columns={step.columns}
        itemLabel={step.itemLabel}
        labels={step.adjustableParts ? undefined : step.labels}
        tone={checked ? (isCorrect ? "emerald" : "amber") : "cobalt"}
        status={checked ? (isCorrect ? "correct" : "incorrect") : null}
      />

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border px-4 py-2 transition-colors",
            markedCount > 0 ? "border-cobalt/25 bg-cobalt-tint/40" : "border-slate-200 bg-slate-50",
          )}
          aria-live="polite"
          data-testid="fraction-readout"
        >
          <span className="text-sm text-ink-muted">
            {step.shape === "set"
              ? `Has marcado ${markedCount} de ${parts * wholes}`
              : `Has coloreado ${markedCount} ${markedCount === 1 ? "parte" : "partes"}`}
          </span>
          <span className="text-xl">
            <MathRenderer text={`$${readoutTex}$`} />
          </span>
          {checked && isCorrect && reading.simplified ? (
            <span className="text-xl text-emerald-700">
              <MathRenderer
                text={`$= \\dfrac{${reading.simplified.numerator}}{${reading.simplified.denominator}}$`}
              />
            </span>
          ) : null}
        </div>
        {!locked && markedCount > 0 ? (
          <button
            type="button"
            onClick={() => setMarked((prev) => prev.map(() => false))}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:bg-slate-100 hover:text-ink"
            data-testid="fraction-clear"
          >
            <RotateCcwIcon className="size-3.5" aria-hidden />
            Borrar
          </button>
        ) : null}
      </div>
    </PracticeShell>
  );
}
