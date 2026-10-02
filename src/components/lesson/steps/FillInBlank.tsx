"use client";

import { useCallback, useMemo, useState } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell } from "@/components/lesson/steps/PracticeShell";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import { cn } from "@/lib/utils";
import type { FillInBlankStep } from "@/lib/lesson/types";

type FillInBlankProps = {
  step: FillInBlankStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function FillInBlank({
  step,
  onCheck,
  disabled = false,
  compact = false,
}: FillInBlankProps) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = useCallback(() => {
    if (!value.trim() || checked) {
      return;
    }
    const correct = checkFillInBlankAnswerFlexible(value, step.correctAnswers);
    setIsCorrect(correct);
    setChecked(true);
    onCheck(correct);
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

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-fill-in-blank">
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
