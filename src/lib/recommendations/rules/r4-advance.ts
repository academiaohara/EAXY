import {
  isConceptDeveloping,
  isConceptNotStarted,
  lessonIncludesConcept,
  prerequisitesMet,
} from "@/lib/recommendations/helpers";
import { selectExerciseForRecommendation } from "@/lib/recommendations/content-selection";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR4Advance(context: RecommendationContext): Recommendation | null {
  for (const concept of context.concepts) {
    const hasPrerequisites = context.prerequisites.some(
      (edge) => edge.conceptId === concept.id,
    );

    if (!hasPrerequisites) {
      continue;
    }

    const eligible =
      isConceptNotStarted(concept) || isConceptDeveloping(concept);

    if (!eligible || !prerequisitesMet(context, concept.id)) {
      continue;
    }

    const hasIncompleteLesson = context.lessons.some(
      (lesson) =>
        lesson.pathStatus !== "completed" && lesson.conceptIds.includes(concept.id),
    );

    if (!hasIncompleteLesson) {
      continue;
    }

    const { exerciseId, lessonId } = selectExerciseForRecommendation(
      concept.id,
      "advance",
      context,
    );

    const resolvedLessonId =
      lessonId ??
      context.lessons.find(
        (lesson) =>
          lesson.pathStatus !== "completed" && lesson.conceptIds.includes(concept.id),
      )?.id ??
      null;

    if (!resolvedLessonId || !lessonIncludesConcept(resolvedLessonId, concept.id, context)) {
      continue;
    }

    return {
      action: "advance",
      conceptId: concept.id,
      exerciseId,
      lessonId: resolvedLessonId,
      priority: 70,
      explanation: {
        ruleId: "R4",
        summary: `Ya dominas los conceptos previos. ¡Siguiente paso: «${concept.title}»!`,
        details: {
          conceptId: concept.id,
          conceptTitle: concept.title,
          lessonId: resolvedLessonId,
        },
      },
    };
  }

  return null;
}
