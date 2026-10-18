"use client";

import { useCallback, useMemo, useState } from "react";
import { usePracticeSnapshotRestore } from "@/lib/lesson/use-practice-snapshot-restore";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell } from "@/components/lesson/steps/PracticeShell";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import type { FillInBlankSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import { cn } from "@/lib/utils";
import type { FillInBlankStep } from "@/lib/lesson/types";

type FillInBlankProps = {
  step: FillInBlankStep;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  compact?: boolean;
  saved?: FillInBlankSnapshot | null;
};

const fractionInputClass =
  "w-24 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-center font-mono text-xl text-slate-900 placeholder:text-slate-400 disabled:opacity-100 outline-none transition-colors focus-visible:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/20";

export function FillInBlank({
  step,
  onCheck,
  disabled = false,
  compact = false,
  saved = null,
}: FillInBlankProps) {
  const restored = saved?.kind === "fill_in_blank" ? saved : null;
  const isFraction = step.answerFormat === "fraction";
  const [value, setValue] = useState(restored?.value ?? "");
  const [checked, setChecked] = useState(Boolean(restored));
  const [isCorrect, setIsCorrect] = useState(restored?.isCorrect ?? false);

  usePracticeSnapshotRestore(restored, (snapshot) => {
    setValue(snapshot.value);
    setChecked(true);
    setIsCorrect(snapshot.isCorrect);
  });

  const [fracN = "", fracD = ""] = isFraction ? value.split("/") : [];
  const ready = isFraction ? Boolean(fracN.trim() && fracD.trim()) : Boolean(value.trim());
  const setFraction = (n: string, d: string) => setValue(n || d ? `${n}/${d}` : "");

  const handleCheck = useCallback(() => {
    if (!ready || checked) {
      return;
    }
    const correct = checkFillInBlankAnswerFlexible(value, step.correctAnswers);
    setIsCorrect(correct);
    setChecked(true);
    onCheck({
      correct,
      snapshot: { kind: "fill_in_blank", value, isCorrect: correct },
    });
  }, [checked, onCheck, ready, step.correctAnswers, value]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: !ready || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, handleCheck, ready]);

  useRegisterLessonStepControl(control);

  const stateClass = cn(
    checked && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
    checked && !isCorrect && "border-amber-400 bg-amber-50 text-amber-900 animate-shake",
  );

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-fill-in-blank">
      <form
        className="flex justify-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleCheck();
        }}
      >
        {isFraction ? (
          <div className="flex flex-col items-center gap-2" role="group" aria-label="Respuesta como fracción">
            <input
              type="text"
              inputMode="numeric"
              value={fracN}
              onChange={(event) => setFraction(event.target.value.replace(/[^0-9-]/g, ""), fracD)}
              disabled={disabled || checked}
              placeholder="?"
              aria-label="Numerador"
              autoComplete="off"
              className={cn(fractionInputClass, stateClass)}
              data-testid="lesson-fill-numerator"
            />
            <span
              aria-hidden
              className={cn(
                "h-0.5 w-24 rounded-full bg-[color:var(--stage-ink,#e8edf5)]",
                checked && isCorrect && "bg-emerald-500",
                checked && !isCorrect && "bg-amber-400",
              )}
            />
            <input
              type="text"
              inputMode="numeric"
              value={fracD}
              onChange={(event) => setFraction(fracN, event.target.value.replace(/[^0-9-]/g, ""))}
              disabled={disabled || checked}
              placeholder="?"
              aria-label="Denominador"
              autoComplete="off"
              className={cn(fractionInputClass, stateClass)}
              data-testid="lesson-fill-denominator"
            />
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled || checked}
            placeholder="Tu respuesta"
            aria-label="Respuesta"
            autoComplete="off"
            className={cn(
              "w-full max-w-xs rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-center font-mono text-lg text-slate-900 placeholder:text-slate-400 disabled:opacity-100 outline-none transition-colors focus-visible:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/20",
              checked && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
              checked && !isCorrect && "border-amber-400 bg-amber-50 text-amber-900 animate-shake",
            )}
            data-testid="lesson-fill-input"
          />
        )}
      </form>
    </PracticeShell>
  );
}
