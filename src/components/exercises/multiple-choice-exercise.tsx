"use client";

import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import type { MultipleChoiceContent } from "@/lib/exercise-engine/types";
import { submitExerciseAttempt } from "@/lib/exercises/actions";

type MultipleChoiceExerciseProps = {
  exerciseId: string;
  content: MultipleChoiceContent;
  onAttemptComplete?: (result: { mastery: number; conceptTitle: string }) => void;
};

export function MultipleChoiceExercise({
  exerciseId,
  content,
  onAttemptComplete,
}: MultipleChoiceExerciseProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    correctAnswer: string | number;
    mastery: number;
    conceptTitle: string;
  } | null>(null);
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
        setFeedback(result);
        onAttemptComplete?.({
          mastery: result.mastery,
          conceptTitle: result.conceptTitle,
        });
      } catch (error) {
        setFeedback(null);
        setErrorMessage(
          error instanceof Error ? error.message : "No se pudo enviar la respuesta.",
        );
      }
    });
  }

  const selectedLabel = content.options.find((option) => option.id === feedback?.correctAnswer)?.text;

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
        <p
          className={`text-sm ${feedback.correct ? "text-emerald-700" : "text-destructive"}`}
          role="status"
          data-testid="exercise-feedback"
        >
          {feedback.correct
            ? "Correcto."
            : `Incorrecto. La respuesta correcta es: ${selectedLabel ?? feedback.correctAnswer}`}
        </p>
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
