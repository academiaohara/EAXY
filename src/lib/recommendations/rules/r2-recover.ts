import {
  RECOVER_COOLDOWN_HOURS,
  RULE_IDS,
} from "@/lib/recommendations/constants";
import {
  getAttemptsForConcept,
  getConceptTitle,
  getExercisesForConcept,
  hoursSince,
} from "@/lib/recommendations/helpers";
import { formatMasteryPercent } from "@/lib/recommendations/mastery-state";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR2Recover(context: RecommendationContext): Recommendation | null {
  const candidates = context.concepts
    .map((concept) => {
      const mastery = context.masteryByConcept.get(concept.id)?.mastery ?? 0;
      const exercises = getExercisesForConcept(context.exercises, concept.id);
      const attempts = getAttemptsForConcept(context.attempts, concept.id);

      if (mastery >= 0.4 || exercises.length === 0 || attempts.length === 0) {
        return null;
      }

      const lastAttempt = attempts[0];
      if (lastAttempt && hoursSince(lastAttempt.createdAt, context.now) < RECOVER_COOLDOWN_HOURS) {
        return null;
      }

      return { concept, mastery };
    })
    .filter((item): item is { concept: { id: string; title: string }; mastery: number } =>
      item !== null,
    )
    .sort((left, right) => left.mastery - right.mastery);

  const selected = candidates[0];
  if (!selected) {
    return null;
  }

  const percent = formatMasteryPercent(selected.mastery);

  return {
    action: "recover",
    conceptId: selected.concept.id,
    lessonId: null,
    exerciseId: null,
    priority: 90,
    explanation: {
      ruleId: RULE_IDS.R2,
      summary: `Tu dominio de «${getConceptTitle(context.concepts, selected.concept.id)}» es bajo (${percent}%). Practiquemos para reforzarlo.`,
      details: {
        conceptId: selected.concept.id,
        mastery: selected.mastery,
        masteryPercent: percent,
      },
    },
  };
}
