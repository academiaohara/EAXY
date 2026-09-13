import { multipleChoiceAnswerSchema, multipleChoiceContentSchema } from "@/lib/exercise-engine/schemas/multiple-choice";
import { numericAnswerSchema, numericContentSchema } from "@/lib/exercise-engine/schemas/numeric";
import type { ExerciseAnswer, ExerciseContent, ExerciseType } from "@/lib/exercise-engine/types";

export function parseExerciseContent(
  type: ExerciseType,
  content: unknown,
): ExerciseContent {
  switch (type) {
    case "multiple_choice":
      return multipleChoiceContentSchema.parse(content);
    case "numeric":
      return numericContentSchema.parse(content);
    default:
      throw new Error(`Tipo de ejercicio no soportado: ${type}`);
  }
}

export function parseExerciseAnswer(
  type: ExerciseType,
  answer: unknown,
): ExerciseAnswer {
  switch (type) {
    case "multiple_choice":
      return multipleChoiceAnswerSchema.parse(answer);
    case "numeric":
      return numericAnswerSchema.parse(answer);
    default:
      throw new Error(`Tipo de ejercicio no soportado: ${type}`);
  }
}

export {
  multipleChoiceAnswerSchema,
  multipleChoiceContentSchema,
  numericAnswerSchema,
  numericContentSchema,
};
