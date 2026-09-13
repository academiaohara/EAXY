import {
  daysSince,
  formatConceptMastery,
  isConceptProficient,
} from "@/lib/recommendations/helpers";
import { selectExerciseForRecommendation } from "@/lib/recommendations/content-selection";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

const SPACED_REVIEW_DAYS = 7;

export function evaluateR5SpacedReview(
  context: RecommendationContext,
): Recommendation | null {
  const reviewCandidates = context.concepts
    .filter(
      (concept) =>
        isConceptProficient(concept) &&
        concept.lastAttemptAt !== null &&
        daysSince(concept.lastAttemptAt, context.referenceDate) > SPACED_REVIEW_DAYS,
    )
    .sort((a, b) => {
      const aDays = a.lastAttemptAt
        ? daysSince(a.lastAttemptAt, context.referenceDate)
        : 0;
      const bDays = b.lastAttemptAt
        ? daysSince(b.lastAttemptAt, context.referenceDate)
        : 0;
      return bDays - aDays;
    });

  const concept = reviewCandidates[0];

  if (!concept) {
    return null;
  }

  const { exerciseId, lessonId } = selectExerciseForRecommendation(
    concept.id,
    "practice",
    context,
  );

  return {
    action: "practice",
    conceptId: concept.id,
    exerciseId,
    lessonId,
    priority: 60,
    explanation: {
      ruleId: "R5",
      summary: `Hace tiempo que no practicas «${concept.title}». Un repaso rápido lo mantendrá fresco.`,
      details: {
        conceptId: concept.id,
        conceptTitle: concept.title,
        mastery: concept.mastery,
        masteryPercent: formatConceptMastery(concept),
        daysSinceLastAttempt: concept.lastAttemptAt
          ? daysSince(concept.lastAttemptAt, context.referenceDate)
          : null,
      },
    },
  };
}
