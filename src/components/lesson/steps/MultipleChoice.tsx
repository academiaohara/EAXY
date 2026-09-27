"use client";

import { useCallback, useMemo, useState } from "react";
import { CheckIcon } from "lucide-react";
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

function useOptionGrid(options: MultipleChoiceStep["options"]): boolean {
  if (options.length === 4) {
    return true;
  }
  return options.every((option) => option.text.length <= 24);
}

export function MultipleChoice({
  step,
  onCheck,
  disabled = false,
  compact = false,
}: MultipleChoiceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const useGrid = useOptionGrid(step.options);

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

  const showContext = Boolean(step.content?.length || step.math?.length || step.warning);

  return (
    <div
      className={cn(
        showContext ? "grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12" : "space-y-4",
      )}
      data-testid="lesson-multiple-choice"
    >
      {showContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
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

        <fieldset disabled={disabled || checked}>
          <legend className="sr-only">Opciones de respuesta</legend>
          <div
            className={cn(
              "grid gap-3",
              useGrid ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
            )}
          >
            {step.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isCorrectOption = option.id === step.correctOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "relative flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 bg-white px-3 py-2.5 text-center text-sm font-medium shadow-sm transition-all sm:min-h-[3.75rem] sm:text-base",
                    isSelected && !checked && "border-cobalt bg-cobalt-tint/30",
                    !isSelected &&
                      !checked &&
                      "border-slate-200 hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md",
                    checked && isCorrectOption && "border-emerald-500 bg-emerald-50 text-emerald-900",
                    checked &&
                      isSelected &&
                      !isCorrectOption &&
                      "border-red-400 bg-red-50 animate-shake",
                  )}
                >
                  <span>
                    <MathRenderer text={option.text} />
                  </span>
                  {checked && isCorrectOption ? (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckIcon className="size-3" strokeWidth={3} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
