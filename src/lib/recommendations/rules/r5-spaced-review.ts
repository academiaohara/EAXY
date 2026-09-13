import { RULE_IDS, SPACED_REVIEW_DAYS } from "@/lib/recommendations/constants";
import {
  daysSince,
  getConceptTitle,
  getExercisesForConcept,
} from "@/lib/recommendations/helpers";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR5SpacedReview(context: RecommendationContext): Recommendation | null {
  for (const concept of context.concepts) {
    const snapshot = context.masteryByConcept.get(concept.id);
    const mastery = snapshot?.mastery ?? 0;

    if (mastery < 0.7 || mastery >= 0.85) {
      continue;
    }

    if (getExercisesForConcept(context.exercises, concept.id).length === 0) {
      continue;
    }

    if (!snapshot?.lastAttemptAt) {
      continue;
    }

    if (daysSince(snapshot.lastAttemptAt, context.now) <= SPACED_REVIEW_DAYS) {
      continue;
    }

    return {
      action: "practice",
      conceptId: concept.id,
      lessonId: null,
      exerciseId: null,
      priority: 60,
      explanation: {
        ruleId: RULE_IDS.R5,
        summary: `Hace tiempo que no practicas «${getConceptTitle(context.concepts, concept.id)}». Un repaso rápido lo mantendrá fresco.`,
        details: {
          conceptId: concept.id,
          daysSinceLastAttempt: daysSince(snapshot.lastAttemptAt, context.now),
        },
      },
    };
  }

  return null;
}
