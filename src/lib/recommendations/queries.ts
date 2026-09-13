import { getRecommendations } from "@/lib/recommendations/engine";
import { fetchRecommendationContext } from "@/lib/recommendations/fetch-context";
import { logRecommendation } from "@/lib/recommendations/log";
import type { Recommendation } from "@/lib/recommendations/types";

export async function getStudentRecommendation(
  studentId: string,
  options?: { classroomId?: string },
): Promise<Recommendation | null> {
  const context = await fetchRecommendationContext(studentId, options);
  const [recommendation] = getRecommendations(context, { ...options, limit: 1 });

  if (!recommendation) {
    return null;
  }

  await logRecommendation(studentId, recommendation);

  return recommendation;
}
