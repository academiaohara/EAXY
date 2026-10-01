export const LOCAL_PROGRESS_STORAGE_KEY = "eaxy-local-progress";

export type LocalLessonStatus = "started" | "completed";

export type LocalExerciseRecord = {
  attemptCount: number;
  hasCorrectAttempt: boolean;
};

export type LocalProgressStore = {
  version: 1;
  lessons: Record<string, LocalLessonStatus>;
  exercises: Record<string, LocalExerciseRecord>;
};

export const EMPTY_LOCAL_PROGRESS: LocalProgressStore = {
  version: 1,
  lessons: {},
  exercises: {},
};
