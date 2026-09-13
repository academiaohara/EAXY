"use client";

import { MultipleChoiceExercise } from "@/components/exercises/multiple-choice-exercise";
import { NumericExercise } from "@/components/exercises/numeric-exercise";
import { parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type {
  ExerciseType,
  MultipleChoiceContent,
  NumericContent,
} from "@/lib/exercise-engine/types";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

type ExerciseRendererProps = {
  exerciseId: string;
  type: ExerciseType;
  content: unknown;
  onAttemptResult?: (result: SubmitExerciseAttemptResult) => void;
};

export function ExerciseRenderer({
  exerciseId,
  type,
  content,
  onAttemptResult,
}: ExerciseRendererProps) {
  const parsedContent = parseExerciseContent(type, content);

  switch (type) {
    case "multiple_choice":
      return (
        <MultipleChoiceExercise
          exerciseId={exerciseId}
          content={parsedContent as MultipleChoiceContent}
          onAttemptResult={onAttemptResult}
        />
      );
    case "numeric":
      return (
        <NumericExercise
          exerciseId={exerciseId}
          content={parsedContent as NumericContent}
          onAttemptResult={onAttemptResult}
        />
      );
    default:
      return (
        <p className="text-sm text-destructive">
          Tipo de ejercicio no soportado: {type}
        </p>
      );
  }
}
