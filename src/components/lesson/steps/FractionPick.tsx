"use client";

import { useCallback, useMemo, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
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
import type { FractionPickSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import type { FractionPickStep } from "@/lib/lesson/types";

type FractionPickProps = {
  step: FractionPickStep;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  compact?: boolean;
  saved?: FractionPickSnapshot | null;
};

const UNIT_NAME: Record<FractionPickStep["shape"], string> = {
  bar: "la barra",
  circle: "la tarta",
  grid: "la cuadrícula",
  set: "el grupo",
};

export function FractionPick({
  step,
  onCheck,
  disabled = false,
  compact = false,
  saved = null,
}: FractionPickProps) {
  const wholes = fractionWholes(step);
  const restored = saved?.kind === "fraction_pick" ? saved : null;
  const [parts, setParts] = useState(() => restored?.parts ?? initialFractionParts(step));
  const [marked, setMarked] = useState<boolean[]>(
    () => restored?.marked ?? Array(wholes * initialFractionParts(step)).fill(false),
  );
  const [checked, setChecked] = useState(Boolean(restored));
  const [isCorrect, setIsCorrect] = useState(restored?.isCorrect ?? false);

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
    onCheck({
      correct,
      snapshot: { kind: "fraction_pick", parts, marked, isCorrect: correct },
    });
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
        <div className="flex flex-wrap items-center justify-center gap-3 text-base text-[color:var(--stage-ink,#0f172a)]">
          <span>Divide {UNIT_NAME[step.shape]} en</span>
          <div className="flex items-center gap-1 rounded-full border border-[color:var(--stage-border,#e2e8f0)] bg-[color:var(--frac-pill,rgb(0_0_0/0.18))] p-1">
            <button
              type="button"
              onClick={() => changeParts(parts - 1)}
              disabled={locked || parts <= FRACTION_PARTS_MIN}
              className="flex size-9 items-center justify-center rounded-full border border-[color:var(--stage-border,#e2e8f0)] bg-white/10 text-[color:var(--stage-ink,#0f172a)] transition hover:bg-white/20 disabled:opacity-40"
              aria-label="Menos partes"
              data-testid="fraction-parts-minus"
            >
              <MinusIcon className="size-4" />
            </button>
            <span
              className="min-w-10 text-center font-heading text-xl font-semibold tabular-nums text-[color:var(--stage-ink,#0f172a)]"
              aria-live="polite"
              data-testid="fraction-parts-value"
            >
              {parts}
            </span>
            <button
              type="button"
              onClick={() => changeParts(parts + 1)}
              disabled={locked || parts >= FRACTION_PARTS_MAX}
              className="flex size-9 items-center justify-center rounded-full border border-[color:var(--stage-border,#e2e8f0)] bg-white/10 text-[color:var(--stage-ink,#0f172a)] transition hover:bg-white/20 disabled:opacity-40"
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

      {checked ? (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div
            className="flex items-center gap-3 rounded-2xl border border-[color:var(--stage-border,#e2e8f0)] bg-[color:var(--frac-pill,rgb(0_0_0/0.18))] px-4 py-2"
            aria-live="polite"
            data-testid="fraction-readout"
          >
            <span className="text-base text-[color:var(--stage-muted,#526077)]">
              {step.shape === "set"
                ? `Has marcado ${markedCount} de ${parts * wholes}`
                : `Has coloreado ${markedCount} ${markedCount === 1 ? "parte" : "partes"}`}
            </span>
            <span className="text-2xl text-[color:var(--stage-ink,#0f172a)]">
              <MathRenderer text={`$${readoutTex}$`} />
            </span>
            {isCorrect && reading.simplified ? (
              <span className="text-2xl text-[color:var(--stage-accent-muted,#047857)]">
                <MathRenderer
                  text={`$= \\dfrac{${reading.simplified.numerator}}{${reading.simplified.denominator}}$`}
                />
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </PracticeShell>
  );
}
