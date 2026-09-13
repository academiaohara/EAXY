import {
  formatConceptMastery,
  getLastAttemptsForConcept,
  isConceptDeveloping,
} from "@/lib/recommendations/helpers";
import { selectExerciseForRecommendation } from "@/lib/recommendations/content-selection";
import type { Recommendation, RecommendationContext } from "@/lib/recommendations/types";

const RECENT_ATTEMPTS_COUNT = 3;
const LOW_SCORE_THRESHOLD = 0.5;

export function evaluateR3Reinforcement(
  context: RecommendationContext,
): Recommendation | null {
  for (const concept of context.concepts) {
    if (!isConceptDeveloping(concept)) {
      continue;
    }

    const recentAttempts = getLastAttemptsForConcept(context, concept.id, RECENT_ATTEMPTS_COUNT);

    if (recentAttempts.length < RECENT_ATTEMPTS_COUNT) {
      continue;
    }

    const averageScore =
      recentAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
      recentAttempts.length;

    if (averageScore >= LOW_SCORE_THRESHOLD) {
      continue;
    }

    const { exerciseId, lessonId } = selectExerciseForRecommendation(
      concept.id,
      "reinforce",
      context,
    );

    return {
      action: "reinforce",
      conceptId: concept.id,
      exerciseId,
      lessonId,
      priority: 80,
      explanation: {
        ruleId: "R3",
        summary: `Has tenido dificultades recientes con «${concept.title}». Un poco más de práctica ayudará.`,
        details: {
          conceptId: concept.id,
          conceptTitle: concept.title,
          mastery: concept.mastery,
          masteryPercent: formatConceptMastery(concept),
          recentAverageScore: averageScore,
          recentAttemptsCount: recentAttempts.length,
        },
      },
    };
  }

  return null;
}
