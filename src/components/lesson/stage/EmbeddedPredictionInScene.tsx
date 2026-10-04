"use client";

import { MathRenderer } from "@/components/lesson/MathRenderer";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import type { EmbeddedPrediction } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type EmbeddedPredictionSceneProps = {
  prediction: EmbeddedPrediction;
  numericValue: string;
  choiceId: string;
  onNumericChange: (value: string) => void;
  onChoiceChange: (id: string) => void;
  wrongAttempts: number;
  solved: boolean;
  showExplanation?: boolean;
};

export function EmbeddedPredictionInScene({
  prediction,
  numericValue,
  choiceId,
  onNumericChange,
  onChoiceChange,
  wrongAttempts,
  solved,
  showExplanation = false,
}: EmbeddedPredictionSceneProps) {
  const showHint = wrongAttempts >= 2 && !solved && prediction.hint;

  return (
    <div
      className="rounded-xl border-2 border-cobalt/20 bg-cobalt-tint/30 px-4 py-4 sm:px-5"
      data-testid="embedded-prediction"
      role="group"
      aria-label="Pregunta de predicción"
    >
      <p className="mb-3 text-center text-sm font-semibold text-ink sm:text-base">
        <MathRenderer text={prediction.prompt} />
      </p>
      {prediction.kind === "numeric" ? (
        <input
          type="text"
          inputMode="numeric"
          value={numericValue}
          onChange={(event) => onNumericChange(event.target.value)}
          disabled={solved}
          className="mx-auto block w-full max-w-[8rem] rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-center text-lg font-semibold"
          aria-label="Tu respuesta numérica"
          data-testid="embedded-predict-numeric"
        />
      ) : (
        <div className="mx-auto flex max-w-md flex-col gap-2">
          {prediction.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              disabled={solved}
              onClick={() => onChoiceChange(choice.id)}
              className={cn(
                "min-h-11 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition",
                choiceId === choice.id
                  ? "border-cobalt bg-white shadow-sm"
                  : "border-slate-200/80 bg-white/80 hover:border-cobalt/30",
              )}
              aria-pressed={choiceId === choice.id}
              data-testid={`embedded-predict-choice-${choice.id}`}
            >
              <MathRenderer text={choice.label} />
            </button>
          ))}
        </div>
      )}
      {showHint ? (
        <p className="mt-3 text-center text-sm text-ink-muted" data-testid="embedded-predict-hint">
          <MathRenderer text={prediction.hint!} />
        </p>
      ) : null}
      {showExplanation && solved && prediction.explanation ? (
        <p className="mt-3 text-center text-sm font-medium text-emerald-800">
          <MathRenderer text={prediction.explanation} />
        </p>
      ) : null}
    </div>
  );
}

export function checkEmbeddedPrediction(
  prediction: EmbeddedPrediction,
  numericValue: string,
  choiceId: string,
): boolean {
  if (prediction.kind === "numeric") {
    return checkFillInBlankAnswerFlexible(numericValue, prediction.correctAnswers);
  }
  return choiceId === prediction.correctChoiceId;
}
