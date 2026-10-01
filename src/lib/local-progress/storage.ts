"use client";

import type { LessonSummary, ModuleSummary } from "@/lib/curriculum/types";
import {
  EMPTY_LOCAL_PROGRESS,
  LOCAL_PROGRESS_STORAGE_KEY,
  type LocalExerciseRecord,
  type LocalLessonStatus,
  type LocalProgressStore,
} from "@/lib/local-progress/types";

function parseStore(raw: string | null): LocalProgressStore {
  if (!raw) {
    return { ...EMPTY_LOCAL_PROGRESS };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LocalProgressStore>;
    if (parsed.version !== 1 || typeof parsed.lessons !== "object" || typeof parsed.exercises !== "object") {
      return { ...EMPTY_LOCAL_PROGRESS };
    }
    return {
      version: 1,
      lessons: parsed.lessons ?? {},
      exercises: parsed.exercises ?? {},
    };
  } catch {
    return { ...EMPTY_LOCAL_PROGRESS };
  }
}

export function readLocalProgress(): LocalProgressStore {
  if (typeof window === "undefined") {
    return { ...EMPTY_LOCAL_PROGRESS };
  }
  return parseStore(window.localStorage.getItem(LOCAL_PROGRESS_STORAGE_KEY));
}

function writeLocalProgress(store: LocalProgressStore): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LOCAL_PROGRESS_STORAGE_KEY, JSON.stringify(store));
}

export function setLocalLessonStatus(lessonId: string, status: LocalLessonStatus): void {
  const store = readLocalProgress();
  store.lessons[lessonId] = status;
  writeLocalProgress(store);
  window.dispatchEvent(new CustomEvent("eaxy-local-progress-updated"));
}

export function recordLocalExerciseAttempt(exerciseId: string, correct: boolean): LocalExerciseRecord {
  const store = readLocalProgress();
  const current = store.exercises[exerciseId] ?? { attemptCount: 0, hasCorrectAttempt: false };
  const next: LocalExerciseRecord = {
    attemptCount: current.attemptCount + 1,
    hasCorrectAttempt: current.hasCorrectAttempt || correct,
  };
  store.exercises[exerciseId] = next;
  writeLocalProgress(store);
  window.dispatchEvent(new CustomEvent("eaxy-local-progress-updated"));
  return next;
}

export function mergeLessonPathStatus(
  lessonId: string,
  serverStatus: LessonSummary["pathStatus"],
  store: LocalProgressStore,
): LessonSummary["pathStatus"] {
  const local = store.lessons[lessonId];
  if (local === "completed" || serverStatus === "completed") {
    return "completed";
  }
  if (local === "started" || serverStatus === "started") {
    return "started";
  }
  return serverStatus;
}

export function applyLocalProgressToModules(
  modules: ModuleSummary[],
  store: LocalProgressStore,
): ModuleSummary[] {
  return modules.map((courseModule) => ({
    ...courseModule,
    lessons: courseModule.lessons.map((lesson) => ({
      ...lesson,
      pathStatus: mergeLessonPathStatus(lesson.id, lesson.pathStatus, store),
    })),
  }));
}

export function applyLocalProgressToLessonExercises<
  T extends { id: string; attemptCount: number; hasCorrectAttempt: boolean },
>(exercises: T[], store: LocalProgressStore): T[] {
  return exercises.map((exercise) => {
    const local = store.exercises[exercise.id];
    if (!local) {
      return exercise;
    }
    return {
      ...exercise,
      attemptCount: Math.max(exercise.attemptCount, local.attemptCount),
      hasCorrectAttempt: exercise.hasCorrectAttempt || local.hasCorrectAttempt,
    };
  });
}
