import {
  REINFORCE_RECENT_ATTEMPTS,
  REINFORCE_SCORE_THRESHOLD,
  RULE_IDS,
} from "@/lib/recommendations/constants";
import {
  averageScore,
  getAttemptsForConcept,
  getConceptTitle,
  getExercisesForConcept,
} from "@/lib/recommendations/helpers";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR3Reinforce(context: RecommendationContext): Recommendation | null {
  for (const concept of context.concepts) {
    const mastery = context.masteryByConcept.get(concept.id)?.mastery ?? 0;

    if (mastery < 0.4 || mastery >= 0.7) {
      continue;
    }

    if (getExercisesForConcept(context.exercises, concept.id).length === 0) {
      continue;
    }

    const recentAttempts = getAttemptsForConcept(context.attempts, concept.id).slice(
      0,
      REINFORCE_RECENT_ATTEMPTS,
    );

    if (recentAttempts.length < REINFORCE_RECENT_ATTEMPTS) {
      continue;
    }

    if (averageScore(recentAttempts) >= REINFORCE_SCORE_THRESHOLD) {
      continue;
    }

    return {
      action: "reinforce",
      conceptId: concept.id,
      lessonId: null,
      exerciseId: null,
      priority: 80,
      explanation: {
        ruleId: RULE_IDS.R3,
        summary: `Has tenido dificultades recientes con «${getConceptTitle(context.concepts, concept.id)}». Un poco más de práctica ayudará.`,
        details: {
          conceptId: concept.id,
          recentAttemptCount: recentAttempts.length,
          recentAverageScore: averageScore(recentAttempts),
        },
      },
    };
  }

  return null;
}
