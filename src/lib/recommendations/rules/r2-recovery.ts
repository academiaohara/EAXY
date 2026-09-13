import {
  conceptHasExercises,
  formatConceptMastery,
  getConceptById,
  hoursSince,
  isConceptStruggling,
} from "@/lib/recommendations/helpers";
import { selectExerciseForRecommendation } from "@/lib/recommendations/content-selection";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

const RECOVERY_COOLDOWN_HOURS = 24;

export function evaluateR2Recovery(context: RecommendationContext): Recommendation | null {
  const strugglingConcepts = context.concepts
    .filter(
      (concept) =>
        isConceptStruggling(concept) &&
        conceptHasExercises(concept) &&
        (concept.lastAttemptAt === null ||
          hoursSince(concept.lastAttemptAt, context.referenceDate) >= RECOVERY_COOLDOWN_HOURS),
    )
    .sort((a, b) => a.mastery - b.mastery);

  const concept = strugglingConcepts[0];

  if (!concept) {
    return null;
  }

  const { exerciseId, lessonId } = selectExerciseForRecommendation(
    concept.id,
    "recover",
    context,
  );

  return {
    action: "recover",
    conceptId: concept.id,
    exerciseId,
    lessonId,
    priority: 90,
    explanation: {
      ruleId: "R2",
      summary: `Tu dominio de «${concept.title}» es bajo (${formatConceptMastery(concept)}). Practiquemos para reforzarlo.`,
      details: {
        conceptId: concept.id,
        conceptTitle: concept.title,
        mastery: concept.mastery,
        masteryPercent: formatConceptMastery(concept),
      },
    },
  };
}
