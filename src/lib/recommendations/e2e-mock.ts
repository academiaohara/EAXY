import type { RecommendationContext } from "@/lib/recommendations/types";

const CONCEPT_BASIC = "b1000000-0000-4000-8000-000000000001";
const CONCEPT_PARENTHESES = "b1000000-0000-4000-8000-000000000002";
const LESSON_ID = "a3000000-0000-4000-8000-000000000001";

const EXERCISES = [
  { id: "c1000000-0000-4000-8000-000000000001", conceptId: CONCEPT_BASIC, difficulty: 1 },
  { id: "c1000000-0000-4000-8000-000000000002", conceptId: CONCEPT_BASIC, difficulty: 2 },
  { id: "c1000000-0000-4000-8000-000000000003", conceptId: CONCEPT_BASIC, difficulty: 2 },
  { id: "c1000000-0000-4000-8000-000000000004", conceptId: CONCEPT_PARENTHESES, difficulty: 3 },
  { id: "c1000000-0000-4000-8000-000000000005", conceptId: CONCEPT_PARENTHESES, difficulty: 3 },
  { id: "c1000000-0000-4000-8000-000000000006", conceptId: CONCEPT_PARENTHESES, difficulty: 4 },
];

export function getE2EMockRecommendationContext(
  studentId: string,
  referenceDate = new Date(),
): RecommendationContext {
  return {
    studentId,
    referenceDate,
    concepts: [
      {
        id: CONCEPT_BASIC,
        slug: "linear-equations-basic",
        title: "Ecuaciones lineales básicas",
        mastery: 0,
        attemptCount: 0,
        lastAttemptAt: null,
        exerciseIds: EXERCISES.filter((e) => e.conceptId === CONCEPT_BASIC).map((e) => e.id),
      },
      {
        id: CONCEPT_PARENTHESES,
        slug: "linear-equations-parentheses",
        title: "Ecuaciones con paréntesis",
        mastery: 0,
        attemptCount: 0,
        lastAttemptAt: null,
        exerciseIds: EXERCISES.filter((e) => e.conceptId === CONCEPT_PARENTHESES).map((e) => e.id),
      },
    ],
    prerequisites: [
      {
        conceptId: CONCEPT_PARENTHESES,
        prerequisiteId: CONCEPT_BASIC,
        minMastery: 0.4,
      },
    ],
    attempts: [],
    attemptsLastHour: 0,
    lessons: [
      {
        id: LESSON_ID,
        title: "Ecuaciones de primer grado",
        orderIndex: 0,
        moduleOrderIndex: 0,
        conceptIds: [CONCEPT_BASIC, CONCEPT_PARENTHESES],
        pathStatus: "not_started",
      },
    ],
    exercises: EXERCISES.map((exercise) => ({
      id: exercise.id,
      conceptId: exercise.conceptId,
      difficulty: exercise.difficulty,
      lessonIds: [LESSON_ID],
    })),
    assignments: [],
  };
}
