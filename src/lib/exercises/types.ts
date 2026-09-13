export type SubmitExerciseAttemptResult = {
  correct: boolean;
  correctAnswer: string | number;
  conceptId?: string;
  conceptTitle?: string;
  mastery?: number;
};
