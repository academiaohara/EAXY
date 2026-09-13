import {
  REST_ATTEMPTS_PER_HOUR,
  REST_WINDOW_HOURS,
  RULE_IDS,
} from "@/lib/recommendations/constants";
import { hoursSince } from "@/lib/recommendations/helpers";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR6Rest(context: RecommendationContext): Recommendation | null {
  const recentAttempts = context.attempts.filter(
    (attempt) => hoursSince(attempt.createdAt, context.now) <= REST_WINDOW_HOURS,
  );

  if (recentAttempts.length < REST_ATTEMPTS_PER_HOUR) {
    return null;
  }

  return {
    action: "rest",
    conceptId: null,
    lessonId: null,
    exerciseId: null,
    priority: 50,
    explanation: {
      ruleId: RULE_IDS.R6,
      summary: "¡Buen trabajo! Tómate un descanso o repasa lo aprendido mañana.",
      details: {
        attemptsInLastHour: recentAttempts.length,
      },
    },
  };
}
