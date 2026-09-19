"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import { cn } from "@/lib/utils";
import type { FillInBlankStep } from "@/lib/lesson/types";

type FillInBlankProps = {
  step: FillInBlankStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
};

export function FillInBlank({ step, onCheck, disabled = false }: FillInBlankProps) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleCheck() {
    if (!value.trim() || checked) {
      return;
    }
    const correct = checkFillInBlankAnswerFlexible(value, step.correctAnswers);
    setIsCorrect(correct);
    setChecked(true);
    onCheck(correct);
  }

  return (
    <div className="space-y-6" data-testid="lesson-fill-in-blank">
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

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled || checked}
            placeholder="Escribe tu respuesta"
            aria-label="Respuesta"
            className={cn(
              "min-w-[8rem] rounded-lg border border-border bg-paper-raised px-3 py-2 font-mono text-sm outline-none transition-colors focus-visible:border-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/30",
              checked && isCorrect && "border-emerald-500 bg-emerald-50",
              checked && !isCorrect && "border-destructive bg-destructive/5",
            )}
            data-testid="lesson-fill-input"
          />
        </div>

        {step.hint && !checked ? (
          <p className="text-xs text-muted-foreground">
            Pista: <MathRenderer text={step.hint} />
          </p>
        ) : null}

        {!checked ? (
          <Button
            type="button"
            onClick={handleCheck}
            disabled={!value.trim() || disabled}
            data-testid="lesson-check-button"
          >
            Comprobar
          </Button>
        ) : null}
      </div>
    </div>
  );
}
