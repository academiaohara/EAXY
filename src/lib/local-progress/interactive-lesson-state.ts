"use client";

import type { LocalLessonStatus, PersistedInteractiveLessonState } from "@/lib/local-progress/types";
import { readLocalProgress, writeLocalProgress } from "@/lib/local-progress/storage";

export function furthestVisitedStepIndex(visitedSteps: boolean[]): number {
  return visitedSteps.reduce((furthest, visited, index) => (visited ? index : furthest), 0);
}

function normalizeBooleanArray(source: boolean[] | undefined, length: number): boolean[] {
  const next = Array.from({ length }, () => false);
  if (!source) {
    return next;
  }
  for (let i = 0; i < Math.min(source.length, length); i++) {
    next[i] = Boolean(source[i]);
  }
  return next;
}

export function createDefaultInteractiveLessonState(stepCount: number): PersistedInteractiveLessonState {
  const visitedSteps = normalizeBooleanArray(undefined, stepCount);
  visitedSteps[0] = true;
  return {
    stepIndex: 0,
    completedSteps: normalizeBooleanArray(undefined, stepCount),
    visitedSteps,
    stepAttempts: {},
    completed: false,
    toolState: {},
    updatedAt: Date.now(),
  };
}

export function normalizeInteractiveLessonState(
  raw: Partial<PersistedInteractiveLessonState> | null | undefined,
  stepCount: number,
): PersistedInteractiveLessonState {
  const defaults = createDefaultInteractiveLessonState(stepCount);
  if (!raw) {
    return defaults;
  }

  const visitedSteps = normalizeBooleanArray(raw.visitedSteps, stepCount);
  if (!visitedSteps.some(Boolean)) {
    visitedSteps[0] = true;
  }

  const boundedStepIndex =
    typeof raw.stepIndex === "number"
      ? Math.min(Math.max(0, raw.stepIndex), stepCount - 1)
      : defaults.stepIndex;

  return {
    stepIndex: Math.max(boundedStepIndex, furthestVisitedStepIndex(visitedSteps)),
    completedSteps: normalizeBooleanArray(raw.completedSteps, stepCount),
    visitedSteps,
    stepAttempts:
      raw.stepAttempts && typeof raw.stepAttempts === "object" ? { ...raw.stepAttempts } : {},
    completed: Boolean(raw.completed),
    toolState: raw.toolState && typeof raw.toolState === "object" ? { ...raw.toolState } : {},
    updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : Date.now(),
  };
}

export function readPersistedInteractiveLesson(
  lessonSlug: string,
  stepCount: number,
): PersistedInteractiveLessonState {
  if (typeof window === "undefined") {
    return createDefaultInteractiveLessonState(stepCount);
  }
  const store = readLocalProgress();
  const raw = store.interactiveLessons?.[lessonSlug];
  return normalizeInteractiveLessonState(raw, stepCount);
}

export function writePersistedInteractiveLesson(
  lessonSlug: string,
  state: PersistedInteractiveLessonState,
): void {
  if (typeof window === "undefined") {
    return;
  }
  const store = readLocalProgress();
  store.interactiveLessons = store.interactiveLessons ?? {};
  store.interactiveLessons[lessonSlug] = {
    ...state,
    updatedAt: Date.now(),
  };
  writeLocalProgress(store);
}

export type InteractiveLessonProgressSummary = {
  stepCount: number;
  furthestStepIndex: number;
  completedStepCount: number;
  pendingStepCount: number;
  finished: boolean;
  fullyComplete: boolean;
};

/** Estado de catálogo al cerrar la lección según los pasos marcados en verde. */
export function resolveInteractiveLessonCatalogStatus(
  completedSteps: boolean[],
  stepCount: number,
): LocalLessonStatus {
  if (stepCount <= 0) {
    return "incomplete";
  }
  const normalized = normalizeBooleanArray(completedSteps, stepCount);
  return normalized.every(Boolean) ? "completed" : "incomplete";
}

export function summarizeInteractiveLessonProgress(
  state: PersistedInteractiveLessonState,
  stepCount: number,
): InteractiveLessonProgressSummary {
  const completedStepCount = state.completedSteps.filter(Boolean).length;
  const pendingStepCount = Math.max(0, stepCount - completedStepCount);
  const furthestStepIndex = furthestVisitedStepIndex(state.visitedSteps);
  const fullyComplete = state.completed && state.completedSteps.every(Boolean);

  return {
    stepCount,
    furthestStepIndex,
    completedStepCount,
    pendingStepCount,
    finished: state.completed,
    fullyComplete,
  };
}

export function shouldOfferInteractiveLessonResume(
  state: PersistedInteractiveLessonState,
  stepCount: number,
): boolean {
  if (state.completed) {
    return true;
  }
  if (state.stepIndex > 0) {
    return true;
  }
  if (furthestVisitedStepIndex(state.visitedSteps) > 0) {
    return true;
  }
  if (state.completedSteps.some(Boolean)) {
    return true;
  }
  if (Object.keys(state.stepAttempts).length > 0) {
    return true;
  }
  if (Object.keys(state.toolState).length > 0) {
    return true;
  }
  return false;
}

export function clearPersistedInteractiveLesson(lessonSlug: string): void {
  if (typeof window === "undefined") {
    return;
  }
  const store = readLocalProgress();
  if (!store.interactiveLessons?.[lessonSlug]) {
    return;
  }
  delete store.interactiveLessons[lessonSlug];
  writeLocalProgress(store);
}
