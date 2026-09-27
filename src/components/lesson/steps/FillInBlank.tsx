"use client";

import { useCallback, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
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

  const showContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );

  return (
    <div
      className={cn(
        showContext ? "grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12" : "space-y-4",
      )}
      data-testid="lesson-fill-in-blank"
    >
      {showContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          visuals={step.visuals}
          compact={compact}
          showTitle={false}
        />
      ) : null}

      <div className={cn(compact ? "space-y-4" : "space-y-6", !showContext && "max-w-3xl")}>
        <h3
          className={cn(
            "font-heading font-semibold leading-snug text-ink",
            compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
          )}
        >
          <MathRenderer text={step.question} />
        </h3>

        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled || checked}
            placeholder="Tu respuesta"
            aria-label="Respuesta"
            className={cn(
              "w-full max-w-xs rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-center font-mono text-lg outline-none transition-colors focus-visible:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/20",
              checked && isCorrect && "border-emerald-500 bg-emerald-50",
              checked && !isCorrect && "border-amber-400 bg-amber-50 animate-shake",
            )}
            data-testid="lesson-fill-input"
          />
        </div>
      </div>
    </div>
  );
}
