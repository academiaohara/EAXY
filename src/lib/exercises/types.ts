import type { ExerciseRow } from "@/lib/exercise-engine/types";

export type SubmitExerciseAttemptResult = {
  correct: boolean;
  correctAnswer: string | number;
  explanation?: string;
  mastery: number;
  conceptTitle: string;
  lessonCompleted?: boolean;
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
