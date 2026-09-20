"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { MultipleChoiceStep } from "@/lib/lesson/types";

type MultipleChoiceProps = {
  step: MultipleChoiceStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
};

export function MultipleChoice({ step, onCheck, disabled = false }: MultipleChoiceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    if (!selectedId || checked) {
      return;
    }
    const correct = selectedId === step.correctOptionId;
    setChecked(true);
    onCheck(correct);
  }

  return (
    <div className="space-y-6" data-testid="lesson-multiple-choice">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
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
                  "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-paper-raised px-4 py-3 transition-all",
                  isSelected && !checked && "border-cobalt bg-cobalt-tint/40 scale-[1.01]",
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

        {!checked ? (
          <Button
            type="button"
            onClick={handleCheck}
            disabled={!selectedId || disabled}
            data-testid="lesson-check-button"
          >
            Comprobar
          </Button>
        ) : null}
      </div>
    </div>
  );
}
