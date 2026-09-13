import type { ExerciseRow } from "@/lib/exercise-engine/types";

export type SubmitExerciseAttemptResult = {
  correct: boolean;
  correctAnswer: string | number;
  mastery: number;
  conceptTitle: string;
};

export type PracticeExerciseContext = {
  exercise: ExerciseRow;
  conceptTitle: string;
  mastery: number;
  hasAttempts: boolean;
  attemptedCount: number;
  totalExercises: number;
};

export type ConceptMasterySummary = {
  conceptId: string;
  conceptTitle: string;
  mastery: number;
  hasAttempts: boolean;
};
