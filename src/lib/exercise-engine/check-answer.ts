import type {
  CheckAnswerResult,
  ExerciseAnswer,
  ExerciseContent,
  ExerciseType,
  MultipleChoiceAnswer,
  MultipleChoiceContent,
  NumericAnswer,
  NumericContent,
} from "@/lib/exercise-engine/types";

function checkMultipleChoice(
  content: MultipleChoiceContent,
  answer: MultipleChoiceAnswer,
): CheckAnswerResult {
  const correct = answer.selectedOptionId === content.correctOptionId;

  return {
    correct,
    score: correct ? 1 : 0,
    correctAnswer: content.correctOptionId,
  };
}

function checkNumeric(content: NumericContent, answer: NumericAnswer): CheckAnswerResult {
  const tolerance = content.tolerance ?? 0;
  const correct = Math.abs(answer.value - content.correctAnswer) <= tolerance;

  return {
    correct,
    score: correct ? 1 : 0,
    correctAnswer: content.correctAnswer,
  };
}

export function checkAnswer(
  type: ExerciseType,
  content: ExerciseContent,
  answer: ExerciseAnswer,
): CheckAnswerResult {
  switch (type) {
    case "multiple_choice":
      return checkMultipleChoice(content as MultipleChoiceContent, answer as MultipleChoiceAnswer);
    case "numeric":
      return checkNumeric(content as NumericContent, answer as NumericAnswer);
    default:
      throw new Error(`Tipo de ejercicio no soportado: ${type}`);
  }
}
