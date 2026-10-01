"use client";

import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import type { MultipleChoiceContent } from "@/lib/exercise-engine/types";
import { persistExerciseAttemptLocally } from "@/lib/exercises/persist-local-attempt";
import { submitExerciseAttempt } from "@/lib/exercises/actions";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

type MultipleChoiceExerciseProps = {
  exerciseId: string;
  content: MultipleChoiceContent;
  onAttemptResult?: (result: SubmitExerciseAttemptResult) => void;
};

export function MultipleChoiceExercise({
  exerciseId,
  content,
  onAttemptResult,
}: MultipleChoiceExerciseProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<SubmitExerciseAttemptResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!selectedOptionId) {
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      try {
        const result = await submitExerciseAttempt(
          exerciseId,
          { selectedOptionId },
          Date.now() - startedAt,
        );
        persistExerciseAttemptLocally(exerciseId, result);
        setFeedback(result);
        onAttemptResult?.(result);
      } catch (error) {
        setFeedback(null);
        setErrorMessage(
          error instanceof Error ? error.message : "No se pudo enviar la respuesta.",
        );
      }
    });
  }

  const selectedLabel = content.options.find(
    (option) => option.id === feedback?.correctAnswer,
  )?.text;

  return (
    <div className="space-y-4" data-testid="multiple-choice-exercise">
      <p className="text-base text-ink">{content.question}</p>

      <fieldset className="space-y-2" disabled={isPending || feedback !== null}>
        <legend className="sr-only">Opciones de respuesta</legend>
        {content.options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-paper-raised px-3 py-2 transition-colors",
              selectedOptionId === option.id && "border-cobalt bg-cobalt-tint/40",
            )}
          >
            <input
              type="radio"
              name={`exercise-${exerciseId}`}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => setSelectedOptionId(option.id)}
              className="mt-1 accent-cobalt"
            />
            <span className="text-sm text-ink">{option.text}</span>
          </label>
        ))}
      </fieldset>

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
      )}

      {feedback && (
        <div className="space-y-2" role="status" data-testid="exercise-feedback">
          <p className={`text-sm font-medium ${feedback.correct ? "text-emerald-700" : "text-destructive"}`}>
            {feedback.correct
              ? "¡Correcto!"
              : `Incorrecto. La respuesta correcta es: ${selectedLabel ?? feedback.correctAnswer}`}
          </p>
          {feedback.explanation && (
            <p className="rounded-lg bg-muted/60 px-3 py-2 text-sm text-ink-muted">{feedback.explanation}</p>
          )}
          {feedback.mastery !== undefined && (
            <p className="text-xs text-ink-muted">
              Dominio actualizado: {Math.round(feedback.mastery * 100)} %
            </p>
          )}
        </div>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedOptionId || isPending || feedback !== null}
        data-testid="exercise-submit-button"
      >
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
            Comprobando...
          </>
        ) : (
          "Comprobar"
        )}
      </Button>
    </div>
  );
}
