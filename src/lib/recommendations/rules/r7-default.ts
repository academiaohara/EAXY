import { getNextIncompleteLesson } from "@/lib/recommendations/helpers";
import { selectExerciseForRecommendation } from "@/lib/recommendations/content-selection";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR7Default(context: RecommendationContext): Recommendation | null {
  const nextLesson = getNextIncompleteLesson(context);

  if (!nextLesson) {
    return null;
  }

  const conceptId = nextLesson.conceptIds[0] ?? null;

  if (!conceptId) {
    return {
      action: "practice",
      conceptId: null,
      exerciseId: null,
      lessonId: nextLesson.id,
      priority: 10,
      explanation: {
        ruleId: "R7",
        summary: "Continúa con la siguiente lección del curso.",
        details: {
          lessonId: nextLesson.id,
          lessonTitle: nextLesson.title,
        },
      },
    };
  }

  const { exerciseId } = selectExerciseForRecommendation(
    conceptId,
    "practice",
    context,
  );

  return {
    action: "practice",
    conceptId,
    exerciseId,
    lessonId: nextLesson.id,
    priority: 10,
    explanation: {
      ruleId: "R7",
      summary: "Continúa con la siguiente lección del curso.",
      details: {
        lessonId: nextLesson.id,
        lessonTitle: nextLesson.title,
        conceptId,
      },
    },
  };
}
