import type { ExerciseType } from "@/lib/exercise-engine/types";

export type PracticeExerciseCandidate = {
  id: string;
  conceptId: string;
  difficulty: number;
};

export type PracticeAttemptSummary = {
  exerciseId: string;
  correct: boolean;
};

export type PracticeExercise = {
  id: string;
  conceptId: string;
  conceptTitle: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

export type ConceptMasterySummary = {
  conceptId: string;
  conceptTitle: string;
  mastery: number;
};
