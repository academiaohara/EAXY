import type { RecommendationContext } from "@/lib/recommendations/types";

const CONCEPT_BASIC = { id: "concept-basic", title: "Ecuaciones básicas" };
const CONCEPT_ADVANCED = { id: "concept-advanced", title: "Ecuaciones avanzadas" };

export function createRecommendationContext(
  overrides: Partial<RecommendationContext> = {},
): RecommendationContext {
  const now = overrides.now ?? new Date("2026-09-13T12:00:00.000Z");

  const defaultContext: RecommendationContext = {
    now,
    concepts: [CONCEPT_BASIC, CONCEPT_ADVANCED],
    masteryByConcept: new Map([
      [
        CONCEPT_BASIC.id,
        { conceptId: CONCEPT_BASIC.id, mastery: 0, lastAttemptAt: null },
      ],
      [
        CONCEPT_ADVANCED.id,
        { conceptId: CONCEPT_ADVANCED.id, mastery: 0, lastAttemptAt: null },
      ],
    ]),
    exercises: [
      { id: "ex-1", conceptId: CONCEPT_BASIC.id, difficulty: 1 },
      { id: "ex-2", conceptId: CONCEPT_BASIC.id, difficulty: 2 },
      { id: "ex-3", conceptId: CONCEPT_ADVANCED.id, difficulty: 3 },
    ],
    attempts: [],
    lessons: [
      {
        id: "lesson-1",
        title: "Lección 1",
        moduleOrderIndex: 0,
        orderIndex: 0,
        conceptIds: [CONCEPT_BASIC.id],
        progressStatus: "not_started",
      },
      {
        id: "lesson-2",
        title: "Lección 2",
        moduleOrderIndex: 0,
        orderIndex: 1,
        conceptIds: [CONCEPT_ADVANCED.id],
        progressStatus: "not_started",
      },
    ],
    prerequisites: [
      {
        conceptId: CONCEPT_ADVANCED.id,
        prerequisiteId: CONCEPT_BASIC.id,
        minMastery: 0.4,
      },
    ],
    pendingAssignments: [],
  };

  return {
    ...defaultContext,
    ...overrides,
    concepts: overrides.concepts ?? defaultContext.concepts,
    masteryByConcept: overrides.masteryByConcept ?? defaultContext.masteryByConcept,
    exercises: overrides.exercises ?? defaultContext.exercises,
    attempts: overrides.attempts ?? defaultContext.attempts,
    lessons: overrides.lessons ?? defaultContext.lessons,
    prerequisites: overrides.prerequisites ?? defaultContext.prerequisites,
    pendingAssignments: overrides.pendingAssignments ?? defaultContext.pendingAssignments,
  };
}

export { CONCEPT_BASIC, CONCEPT_ADVANCED };
