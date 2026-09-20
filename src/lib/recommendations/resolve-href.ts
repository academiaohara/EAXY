import { curriculum, getConceptById } from "@/content";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import type { Recommendation } from "@/lib/recommendations/types";

export function resolveRecommendationHref(recommendation: Recommendation): string | null {
  if (recommendation.action === "rest") {
    return null;
  }

  if (recommendation.exerciseId) {
    return `/aprender/ejercicio/${recommendation.exerciseId}`;
  }

  if (recommendation.lessonId) {
    return resolveLessonHref(recommendation.lessonId);
  }

  if (recommendation.conceptId) {
    const concept = getConceptById(recommendation.conceptId, curriculum);
    if (concept) {
      return `/practicar/${concept.slug}`;
    }
  }

  return "/practicar";
}
