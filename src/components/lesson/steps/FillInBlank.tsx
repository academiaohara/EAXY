"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import { cn } from "@/lib/utils";
import type { FeedbackStatus, FillInBlankStep } from "@/lib/lesson/types";

type FillInBlankProps = {
  step: FillInBlankStep;
  onCheck: (correct: boolean) => void;
  disabled?: boolean;
  feedback?: FeedbackStatus | null;
};

export function FillInBlank({
  step,
  onCheck,
  disabled = false,
  feedback = null,
}: FillInBlankProps) {
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

  const showContext = Boolean(step.content?.length || step.math?.length || step.warning);

  return (
    <div className="space-y-8" data-testid="lesson-fill-in-blank">
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

        <div className="flex justify-center">
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
              checked && !isCorrect && "border-red-400 bg-red-50",
            )}
            data-testid="lesson-fill-input"
          />
        </div>

        {step.hint && !checked ? (
          <p className="text-center text-xs text-muted-foreground">
            Pista: <MathRenderer text={step.hint} />
          </p>
        ) : null}

        {!checked && !feedback ? (
          <Button
            type="button"
            onClick={handleCheck}
            disabled={!value.trim() || disabled}
            className={cn(
              "w-full rounded-full py-6 text-base font-semibold",
              !value.trim() || disabled
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
