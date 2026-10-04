"use client";

import { useCallback, useMemo, useState } from "react";
import { usePracticeSnapshotRestore } from "@/lib/lesson/use-practice-snapshot-restore";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell } from "@/components/lesson/steps/PracticeShell";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import type { FillInBlankSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import { cn } from "@/lib/utils";
import { FichaColor, MarcoDiez } from "@/components/lesson/stage/objects";
import type { FillInBlankStep } from "@/lib/lesson/types";

type FillInBlankProps = {
  step: FillInBlankStep;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  compact?: boolean;
  saved?: FillInBlankSnapshot | null;
};

export function FillInBlank({
  step,
  onCheck,
  disabled = false,
  compact = false,
  saved = null,
}: FillInBlankProps) {
  const restored = saved?.kind === "fill_in_blank" ? saved : null;
  const [value, setValue] = useState(restored?.value ?? "");
  const [checked, setChecked] = useState(Boolean(restored));
  const [isCorrect, setIsCorrect] = useState(restored?.isCorrect ?? false);
  const [showWhy, setShowWhy] = useState(false);

  usePracticeSnapshotRestore(restored, (snapshot) => {
    setValue(snapshot.value);
    setChecked(true);
    setIsCorrect(snapshot.isCorrect);
  });

  const handleCheck = useCallback(() => {
    if (!value.trim() || checked) {
      return;
    }
    const correct = checkFillInBlankAnswerFlexible(value, step.correctAnswers);
    setIsCorrect(correct);
    setChecked(true);
    onCheck({
      correct,
      snapshot: { kind: "fill_in_blank", value, isCorrect: correct },
    });
  }, [checked, onCheck, step.correctAnswers, value]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: !value.trim() || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, handleCheck, value]);

  useRegisterLessonStepControl(control);

  const why = step.whyFichas;

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-fill-in-blank">
      {why ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="min-h-11 rounded-full border-2 border-cobalt/30 px-4 py-2 text-sm font-semibold text-cobalt hover:bg-cobalt-tint/40"
            onClick={() => setShowWhy((prev) => !prev)}
            data-testid="lesson-fill-why-button"
          >
            ¿Por qué?
          </button>
        </div>
      ) : null}
      {showWhy && why ? (
        <div
          className="flex flex-wrap items-end justify-center gap-4 rounded-xl border border-cobalt/15 bg-cobalt-tint/20 p-4"
          data-testid="lesson-fill-why-fichas"
        >
          <MarcoDiez label={`${why.a} fichas`}>
            {Array.from({ length: Math.min(why.a, 10) }).map((_, index) => (
              <FichaColor key={`a-${index}`} tone="cobalt" />
            ))}
          </MarcoDiez>
          <MarcoDiez label={`${why.b} fichas`}>
            {Array.from({ length: Math.min(why.b, 10) }).map((_, index) => (
              <FichaColor key={`b-${index}`} tone="emerald" />
            ))}
          </MarcoDiez>
          <p className="w-full text-center text-sm font-semibold text-ink">
            {why.a} + {why.b} = {why.b} + {why.a} = {why.sum}
          </p>
        </div>
      ) : null}
      <form
        className="flex justify-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleCheck();
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled || checked}
          placeholder="Tu respuesta"
          aria-label="Respuesta"
          autoComplete="off"
          className={cn(
            "w-full max-w-xs rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-center font-mono text-lg outline-none transition-colors focus-visible:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/20",
            checked && isCorrect && "border-emerald-500 bg-emerald-50",
            checked && !isCorrect && "border-amber-400 bg-amber-50 animate-shake",
          )}
          data-testid="lesson-fill-input"
        />
      </form>
    </PracticeShell>
  );
}
