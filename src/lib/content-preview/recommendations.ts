import { curriculum, getConceptBySlug } from "@/content";
import type { RecommendationContext } from "@/lib/recommendations/types";

export function getPreviewRecommendationContext(
  studentId: string,
  referenceDate = new Date(),
): RecommendationContext {
  const lessons = curriculum.modules.flatMap((courseModule) =>
    courseModule.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      orderIndex: lesson.orderIndex,
      moduleOrderIndex: courseModule.orderIndex,
      conceptIds: lesson.conceptSlugs
        .map((slug) => getConceptBySlug(slug)?.id)
        .filter((id): id is string => Boolean(id)),
      pathStatus: "not_started" as const,
    })),
  );

  const lessonIdsByConcept = new Map<string, string[]>();
  for (const lesson of lessons) {
    for (const conceptId of lesson.conceptIds) {
      const existing = lessonIdsByConcept.get(conceptId) ?? [];
      existing.push(lesson.id);
      lessonIdsByConcept.set(conceptId, existing);
    }
  }

  return {
    studentId,
    referenceDate,
    concepts: curriculum.concepts.map((concept) => ({
      id: concept.id,
      slug: concept.slug,
      title: concept.title,
      mastery: 0,
      attemptCount: 0,
      lastAttemptAt: null,
      exerciseIds: curriculum.exercises
        .filter((exercise) => exercise.conceptSlug === concept.slug)
        .map((exercise) => exercise.id),
    })),
    prerequisites: curriculum.concepts.flatMap((concept) =>
      (concept.prerequisites ?? []).map((prerequisite) => ({
        conceptId: concept.id,
        prerequisiteId: getConceptBySlug(prerequisite.slug)?.id ?? "",
        minMastery: prerequisite.minMastery,
      })),
    ),
    attempts: [],
    attemptsLastHour: 0,
    lessons,
    exercises: curriculum.exercises.map((exercise) => ({
      id: exercise.id,
      conceptId: getConceptBySlug(exercise.conceptSlug)?.id ?? "",
      difficulty: exercise.difficulty,
      lessonIds: lessonIdsByConcept.get(getConceptBySlug(exercise.conceptSlug)?.id ?? "") ?? [],
    })),
    assignments: [],
  };
}
