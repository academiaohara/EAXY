import type { ClassifyAssignments } from "@/lib/lesson/practice-check";
import type { FeedbackStatus } from "@/lib/lesson/types";

export type FillInBlankSnapshot = {
  kind: "fill_in_blank";
  value: string;
  isCorrect: boolean;
};

export type FractionPickSnapshot = {
  kind: "fraction_pick";
  parts: number;
  marked: boolean[];
  isCorrect: boolean;
};

export type ClassifySnapshot = {
  kind: "classify";
  assignments: ClassifyAssignments;
  mistakes: string[];
  isCorrect: boolean;
};

export type NumberLinePickSnapshot = {
  kind: "number_line_pick";
  index: number;
  isCorrect: boolean;
};

export type PredictSnapshot = {
  kind: "predict";
  numericValue?: string;
  choiceId?: string;
  isCorrect: boolean;
  revealPlayed?: boolean;
  /** Escena multiplicar-entradas: entradas mostradas (5 o 6). */
  ticketCount?: number;
};

export type ExploreSnapshot = {
  kind: "explore";
  goalMet: boolean;
  isCorrect: boolean;
};

export type PracticeStepSnapshot =
  | FillInBlankSnapshot
  | FractionPickSnapshot
  | ClassifySnapshot
  | NumberLinePickSnapshot
  | PredictSnapshot
  | ExploreSnapshot;

export type StepAttemptRecord = {
  feedback: FeedbackStatus;
  snapshot?: PracticeStepSnapshot;
};

export type StepCheckResult = {
  correct: boolean;
  snapshot?: PracticeStepSnapshot;
};
