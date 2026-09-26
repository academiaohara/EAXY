"use client";

import { useCallback, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { MultipleChoiceStep } from "@/lib/lesson/types";

type MultipleChoiceProps = {
  step: MultipleChoiceStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function MultipleChoice({
  step,
  onCheck,
  disabled = false,
  compact = false,
}: MultipleChoiceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = useCallback(() => {
    if (!selectedId || checked) {
      return;
    }
    const correct = selectedId === step.correctOptionId;
    setChecked(true);
    onCheck(correct);
  }, [checked, onCheck, selectedId, step.correctOptionId]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: !selectedId || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, handleCheck, selectedId]);

  useRegisterLessonStepControl(control);

  return (
    <div className={compact ? "space-y-3" : "space-y-6"} data-testid="lesson-multiple-choice">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
        compact={compact}
        showTitle={false}
      />

      <div className="space-y-3">
        <p className="font-medium text-ink">
          <MathRenderer text={step.question} />
        </p>

        <fieldset className="space-y-2" disabled={disabled || checked}>
          <legend className="sr-only">Opciones de respuesta</legend>
          {step.options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrectOption = option.id === step.correctOptionId;

            return (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-paper-raised px-3 py-2 transition-all",
                  isSelected && !checked && "border-cobalt bg-cobalt-tint/40",
                  checked && isCorrectOption && "border-emerald-500 bg-emerald-50",
                  checked &&
                    isSelected &&
                    !isCorrectOption &&
                    "border-destructive bg-destructive/5 animate-shake",
                )}
              >
                <input
                  type="radio"
                  name={`step-${step.id}`}
                  checked={isSelected}
                  onChange={() => setSelectedId(option.id)}
                  className="mt-1 accent-cobalt"
                />
                <span className="text-sm text-ink">
                  <MathRenderer text={option.text} />
                </span>
              </label>
            );
          })}
        </fieldset>

        {step.hint && !checked ? (
          <p className="text-xs text-muted-foreground">
            Pista: <MathRenderer text={step.hint} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
