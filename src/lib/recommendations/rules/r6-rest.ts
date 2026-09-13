import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

const REST_THRESHOLD_ATTEMPTS = 5;

export function evaluateR6Rest(context: RecommendationContext): Recommendation | null {
  if (context.attemptsLastHour < REST_THRESHOLD_ATTEMPTS) {
    return null;
  }

  return {
    action: "rest",
    conceptId: null,
    exerciseId: null,
    lessonId: null,
    priority: 50,
    explanation: {
      ruleId: "R6",
      summary:
        "¡Buen trabajo! Tómate un descanso o repasa lo aprendido mañana.",
      details: {
        attemptsLastHour: context.attemptsLastHour,
        threshold: REST_THRESHOLD_ATTEMPTS,
      },
    },
  };
}
