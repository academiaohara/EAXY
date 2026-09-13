import { RULE_IDS } from "@/lib/recommendations/constants";
import {
  getConceptTitle,
  prerequisitesAreMet,
  getUncompletedLessonForConcept,
} from "@/lib/recommendations/helpers";
import { getQualitativeMasteryState } from "@/lib/recommendations/mastery-state";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

export function evaluateR4Advance(context: RecommendationContext): Recommendation | null {
  for (const concept of context.concepts) {
    const snapshot = context.masteryByConcept.get(concept.id);
    const mastery = snapshot?.mastery ?? 0;
    const hasAttempts = context.attempts.some((attempt) => attempt.conceptId === concept.id);
    const hasPrerequisites = context.prerequisites.some(
      (edge) => edge.conceptId === concept.id,
    );

    const state = getQualitativeMasteryState(mastery, hasAttempts);
    const isEligible =
      state === "developing" || (state === "not_started" && hasPrerequisites);

    if (!isEligible) {
      continue;
    }

    if (!prerequisitesAreMet(concept.id, context.prerequisites, context.masteryByConcept)) {
      continue;
    }

    const lesson = getUncompletedLessonForConcept(context.lessons, concept.id);
    if (!lesson) {
      continue;
    }

    return {
      action: "advance",
      conceptId: concept.id,
      lessonId: lesson.id,
      exerciseId: null,
      priority: 70,
      explanation: {
        ruleId: RULE_IDS.R4,
        summary: `Ya dominas los conceptos previos. ¡Siguiente paso: «${getConceptTitle(context.concepts, concept.id)}»!`,
        details: {
          conceptId: concept.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        },
      },
    };
  }

  return null;
}
