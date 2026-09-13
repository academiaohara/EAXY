import { evaluateR1PendingAssignment } from "@/lib/recommendations/rules/r1-pending-assignment";
import { evaluateR2Recover } from "@/lib/recommendations/rules/r2-recover";
import { evaluateR3Reinforce } from "@/lib/recommendations/rules/r3-reinforce";
import { evaluateR4Advance } from "@/lib/recommendations/rules/r4-advance";
import { evaluateR5SpacedReview } from "@/lib/recommendations/rules/r5-spaced-review";
import { evaluateR6Rest } from "@/lib/recommendations/rules/r6-rest";
import { evaluateR7DefaultCourse } from "@/lib/recommendations/rules/r7-default-course";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

const evaluators = [
  evaluateR1PendingAssignment,
  evaluateR2Recover,
  evaluateR3Reinforce,
  evaluateR4Advance,
  evaluateR5SpacedReview,
  evaluateR6Rest,
  evaluateR7DefaultCourse,
] as const;

export function getRecommendations(
  context: RecommendationContext,
  options?: { limit?: number },
): Recommendation[] {
  const limit = options?.limit ?? 1;
  const recommendations: Recommendation[] = [];

  for (const evaluate of evaluators) {
    const recommendation = evaluate(context);
    if (recommendation) {
      recommendations.push(recommendation);
      if (recommendations.length >= limit) {
        break;
      }
    }
  }

  return recommendations;
}

export function getPrimaryRecommendation(
  context: RecommendationContext,
): Recommendation | null {
  return getRecommendations(context, { limit: 1 })[0] ?? null;
}
