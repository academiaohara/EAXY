import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import {
  multipleChoiceAnswerSchema,
  multipleChoiceContentSchema,
  numericAnswerSchema,
  numericContentSchema,
} from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";

export const exerciseRegistry = {
  multiple_choice: {
    contentSchema: multipleChoiceContentSchema,
    answerSchema: multipleChoiceAnswerSchema,
    checkAnswer,
  },
  numeric: {
    contentSchema: numericContentSchema,
    answerSchema: numericAnswerSchema,
    checkAnswer,
  },
} satisfies Record<
  ExerciseType,
  {
    contentSchema: typeof multipleChoiceContentSchema | typeof numericContentSchema;
    answerSchema: typeof multipleChoiceAnswerSchema | typeof numericAnswerSchema;
    checkAnswer: typeof checkAnswer;
  }
>;
