export const LOCAL_PROGRESS_STORAGE_KEY = "eaxy-local-progress";

export type LocalLessonStatus = "started" | "incomplete" | "completed";

export type LocalExerciseRecord = {
  attemptCount: number;
  hasCorrectAttempt: boolean;
};

import type { StepAttemptRecord } from "@/lib/lesson/step-attempt";

export type PersistedInteractiveLessonState = {
  stepIndex: number;
  completedSteps: boolean[];
  visitedSteps: boolean[];
  stepAttempts: Record<string, StepAttemptRecord>;
  stars: number;
  completed: boolean;
  toolState: Record<string, unknown>;
  updatedAt: number;
};

export type LocalProgressStore = {
  version: 1;
  lessons: Record<string, LocalLessonStatus>;
  exercises: Record<string, LocalExerciseRecord>;
  interactiveLessons?: Record<string, PersistedInteractiveLessonState>;
};

export const EMPTY_LOCAL_PROGRESS: LocalProgressStore = {
  version: 1,
  lessons: {},
  exercises: {},
  interactiveLessons: {},
};
