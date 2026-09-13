import { RULE_IDS } from "@/lib/recommendations/constants";
import { getNextIncompleteLesson } from "@/lib/recommendations/helpers";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR7DefaultCourse(context: RecommendationContext): Recommendation | null {
  const lesson = getNextIncompleteLesson(context.lessons);
  if (!lesson) {
    return null;
  }

  const conceptId = lesson.conceptIds[0] ?? null;

  return {
    action: "practice",
    conceptId,
    lessonId: lesson.id,
    exerciseId: null,
    priority: 10,
    explanation: {
      ruleId: RULE_IDS.R7,
      summary: "Continúa con la siguiente lección del curso.",
      details: {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        conceptId,
      },
    },
  };
}
