import { recommendationRules } from "@/lib/recommendations/rules";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export type GetRecommendationsOptions = {
  classroomId?: string;
  limit?: number;
};

export function getRecommendations(
  context: RecommendationContext,
  options?: GetRecommendationsOptions,
): Recommendation[] {
  const scopedContext: RecommendationContext = {
    ...context,
    classroomId: options?.classroomId ?? context.classroomId,
  };

  const recommendations: Recommendation[] = [];

  for (const evaluateRule of recommendationRules) {
    const recommendation = evaluateRule(scopedContext);

    if (recommendation) {
      recommendations.push(recommendation);
      break;
    }
  }

  const limit = options?.limit ?? 1;
  return recommendations.slice(0, limit);
}
