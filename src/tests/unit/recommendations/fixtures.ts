import type { RecommendationContext } from "@/lib/recommendations/types";

export const CONCEPT_A = "concept-a";
export const CONCEPT_B = "concept-b";
export const LESSON_1 = "lesson-1";
export const LESSON_2 = "lesson-2";
export const EXERCISE_A1 = "exercise-a1";
export const EXERCISE_A2 = "exercise-a2";
export const EXERCISE_B1 = "exercise-b1";

const REFERENCE_DATE = new Date("2026-09-13T12:00:00Z");

export function createBaseContext(
  overrides: Partial<RecommendationContext> = {},
): RecommendationContext {
  return {
    studentId: "student-1",
    referenceDate: REFERENCE_DATE,
    concepts: [
      {
        id: CONCEPT_A,
        slug: "concept-a",
        title: "Concepto A",
        mastery: 0,
        attemptCount: 0,
        lastAttemptAt: null,
        exerciseIds: [EXERCISE_A1, EXERCISE_A2],
      },
      {
        id: CONCEPT_B,
        slug: "concept-b",
        title: "Concepto B",
        mastery: 0,
        attemptCount: 0,
        lastAttemptAt: null,
        exerciseIds: [EXERCISE_B1],
      },
    ],
    prerequisites: [
      {
        conceptId: CONCEPT_B,
        prerequisiteId: CONCEPT_A,
        minMastery: 0.4,
      },
    ],
    attempts: [],
    attemptsLastHour: 0,
    lessons: [
      {
        id: LESSON_1,
        title: "Lección 1",
        orderIndex: 0,
        moduleOrderIndex: 0,
        conceptIds: [CONCEPT_A],
        pathStatus: "not_started",
      },
      {
        id: LESSON_2,
        title: "Lección 2",
        orderIndex: 1,
        moduleOrderIndex: 0,
        conceptIds: [CONCEPT_B],
        pathStatus: "not_started",
      },
    ],
    exercises: [
      { id: EXERCISE_A1, conceptId: CONCEPT_A, difficulty: 1, lessonIds: [LESSON_1] },
      { id: EXERCISE_A2, conceptId: CONCEPT_A, difficulty: 2, lessonIds: [LESSON_1] },
      { id: EXERCISE_B1, conceptId: CONCEPT_B, difficulty: 2, lessonIds: [LESSON_2] },
    ],
    assignments: [],
    ...overrides,
  };
}

export function daysAgo(days: number): Date {
  return new Date(REFERENCE_DATE.getTime() - days * 24 * 60 * 60 * 1000);
}

export function hoursAgo(hours: number): Date {
  return new Date(REFERENCE_DATE.getTime() - hours * 60 * 60 * 1000);
}
