"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { FeedbackStatus, MultipleChoiceStep } from "@/lib/lesson/types";

type MultipleChoiceProps = {
  step: MultipleChoiceStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  feedback?: FeedbackStatus | null;
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
  feedback = null,
}: MultipleChoiceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const useGrid = useOptionGrid(step.options);

  function handleCheck() {
    if (!selectedId || checked) {
      return;
    }
    const correct = selectedId === step.correctOptionId;
    setChecked(true);
    onCheck(correct);
  }

  const showContext = Boolean(step.content?.length || step.math?.length || step.warning);

  return (
    <div className="space-y-8" data-testid="lesson-multiple-choice">
      {showContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          variant="inline"
        />
      ) : null}

      <div className="space-y-6">
        <h2 className="text-center font-heading text-xl font-semibold leading-snug text-ink sm:text-2xl">
          <MathRenderer text={step.question} />
        </h2>

        <fieldset disabled={disabled || checked}>
          <legend className="sr-only">Opciones de respuesta</legend>
          <div
            className={cn(
              "grid gap-3",
              useGrid ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {step.options.map((option) => {
              const isSelected = selectedId === option.id;
              const isCorrectOption = option.id === step.correctOptionId;
              const showResult = checked || feedback !== null;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "relative flex min-h-[3.5rem] items-center justify-center rounded-xl border-2 bg-white px-4 py-3 text-center text-base font-medium transition-all",
                    isSelected && !showResult && "border-cobalt bg-cobalt-tint/30",
                    !isSelected && !showResult && "border-slate-200 hover:border-slate-300",
                    showResult && isCorrectOption && "border-emerald-500 bg-emerald-50 text-emerald-900",
                    showResult &&
                      isSelected &&
                      !isCorrectOption &&
                      "border-red-400 bg-red-50 animate-shake",
                  )}
                >
                  <span>
                    <MathRenderer text={option.text} />
                  </span>
                  {showResult && isCorrectOption ? (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckIcon className="size-3" strokeWidth={3} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>

        {step.hint && !checked ? (
          <p className="text-center text-xs text-muted-foreground">
            Pista: <MathRenderer text={step.hint} />
          </p>
        ) : null}

        {!checked && !feedback ? (
          <Button
            type="button"
            onClick={handleCheck}
            disabled={!selectedId || disabled}
            className={cn(
              "w-full rounded-full py-6 text-base font-semibold",
              !selectedId || disabled
                ? "bg-slate-100 text-slate-400 hover:bg-slate-100"
                : "bg-cobalt hover:bg-cobalt/90",
            )}
            data-testid="lesson-check-button"
          >
            Comprobar
          </Button>
        ) : null}
      </div>
    </div>
  );
}
