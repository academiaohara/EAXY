export const EXERCISE_TYPES = ["multiple_choice", "numeric"] as const;

export type ExerciseType = (typeof EXERCISE_TYPES)[number];

export type MultipleChoiceContent = {
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
};

export type MultipleChoiceAnswer = {
  selectedOptionId: string;
};

export type NumericContent = {
  question: string;
  correctAnswer: number;
  tolerance?: number;
};

export type NumericAnswer = {
  value: number;
};

export type ExerciseContent = MultipleChoiceContent | NumericContent;

export type ExerciseAnswer = MultipleChoiceAnswer | NumericAnswer;

export type CheckAnswerResult = {
  correct: boolean;
  score: number;
  correctAnswer: string | number;
};

export type ExerciseRow = {
  id: string;
  concept_id: string;
  type: ExerciseType;
  difficulty: number;
  content: ExerciseContent;
};
