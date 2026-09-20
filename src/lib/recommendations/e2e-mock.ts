import type { RecommendationContext } from "@/lib/recommendations/types";

const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000701";

export function getE2EMockRecommendationContext(
  studentId: string,
  referenceDate = new Date(),
): RecommendationContext {
  return {
    studentId,
    referenceDate,
    concepts: [],
    prerequisites: [],
    attempts: [],
    attemptsLastHour: 0,
    lessons: [
      {
        id: DEMO_LESSON_ID,
        title: "Sistemas de ecuaciones no lineales",
        orderIndex: 1,
        moduleOrderIndex: 1,
        conceptIds: [],
        pathStatus: "not_started",
      },
    ],
    exercises: [],
    assignments: [],
  };
}
