"use client";

import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NumericContent } from "@/lib/exercise-engine/types";
import { persistExerciseAttemptLocally } from "@/lib/exercises/persist-local-attempt";
import { submitExerciseAttempt } from "@/lib/exercises/actions";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

type NumericExerciseProps = {
  exerciseId: string;
  content: NumericContent;
  onAttemptResult?: (result: SubmitExerciseAttemptResult) => void;
};

export function NumericExercise({
  exerciseId,
  content,
  onAttemptResult,
}: NumericExerciseProps) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<SubmitExerciseAttemptResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    const numericValue = Number.parseFloat(value.replace(",", "."));

    if (Number.isNaN(numericValue)) {
      setErrorMessage("Introduce un número válido.");
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      try {
        const result = await submitExerciseAttempt(
          exerciseId,
          { value: numericValue },
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

  return (
    <div className="space-y-4" data-testid="numeric-exercise">
      <p className="text-base text-ink">{content.question}</p>

      <div className="space-y-2">
        <Label htmlFor={`numeric-${exerciseId}`}>Tu respuesta</Label>
        <div className="flex max-w-xs items-center gap-2">
          <Input
            id={`numeric-${exerciseId}`}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={isPending || feedback !== null}
            className="font-mono"
            data-testid="numeric-exercise-input"
          />
          {content.unit && <span className="text-sm text-ink-muted">{content.unit}</span>}
        </div>
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
      )}

      {feedback && (
        <div className="space-y-2" role="status" data-testid="exercise-feedback">
          <p className={`text-sm font-medium ${feedback.correct ? "text-emerald-700" : "text-destructive"}`}>
            {feedback.correct
              ? "¡Correcto!"
              : `Incorrecto. La respuesta correcta es: ${feedback.correctAnswer}${content.unit ? ` ${content.unit}` : ""}`}
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
        disabled={!value.trim() || isPending || feedback !== null}
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
