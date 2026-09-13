export type SubmitExerciseAttemptResult = {
  correct: boolean;
  correctAnswer: string | number;
  explanation?: string;
  mastery?: number;
  conceptSlug?: string;
};
