import { DEFAULT_RULES } from "@/lib/recommendations/rules";
import type { Recommendation, StudentSnapshot } from "@/lib/recommendations/types";

export function getRecommendations(
  snapshot: StudentSnapshot,
  options?: { limit?: number },
): Recommendation[] {
  const limit = options?.limit ?? 1;
  const results: Recommendation[] = [];

  for (const rule of DEFAULT_RULES) {
    const recommendation = rule.evaluate(snapshot);
    if (recommendation) {
      results.push(recommendation);
      if (results.length >= limit) {
        break;
      }
    }
  }

  return results;
}

export function getPrimaryRecommendation(snapshot: StudentSnapshot): Recommendation | null {
  return getRecommendations(snapshot, { limit: 1 })[0] ?? null;
}
