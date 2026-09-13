import { getAuthenticatedUserId } from "@/lib/auth/session";
import { getPracticeExerciseById } from "@/lib/exercises/queries";
import { loadRecommendationContext } from "@/lib/recommendations/context-loader";
import { getPrimaryRecommendation } from "@/lib/recommendations/engine";
import { logRecommendation } from "@/lib/recommendations/log";
import { selectExerciseForRecommendation } from "@/lib/recommendations/select-exercise";
import type { Recommendation } from "@/lib/recommendations/types";
import type { PracticeExercise } from "@/lib/exercises/queries";
import {
  isE2EMockClassroomEnabled,
  mockGetAttemptedExerciseIds,
} from "@/lib/classrooms/e2e-mock";

export type PracticeSession = {
  recommendation: Recommendation | null;
  exercise: PracticeExercise | null;
};

export async function getRecommendedPracticeSession(
  explicitExerciseId?: string,
): Promise<PracticeSession | null> {
  const studentId = await getAuthenticatedUserId();
  if (!studentId) {
    return null;
  }

  if (explicitExerciseId) {
    const exercise = await getPracticeExerciseById(explicitExerciseId);
    return {
      recommendation: null,
      exercise,
    };
  }

  const context = await loadRecommendationContext(studentId);
  const recommendation = getPrimaryRecommendation(context);

  if (!recommendation) {
    return {
      recommendation: null,
      exercise: null,
    };
  }

  await logRecommendation(studentId, recommendation);

  if (recommendation.action === "rest") {
    return {
      recommendation,
      exercise: null,
    };
  }

  const attemptedExerciseIds = isE2EMockClassroomEnabled()
    ? mockGetAttemptedExerciseIds(studentId)
    : new Set(
        context.attempts.map((attempt) => attempt.exerciseId),
      );

  const selectedExerciseId = selectExerciseForRecommendation(
    recommendation,
    context.exercises,
    attemptedExerciseIds,
  );

  if (!selectedExerciseId) {
    return {
      recommendation,
      exercise: null,
    };
  }

  const exercise = await getPracticeExerciseById(selectedExerciseId);

  return {
    recommendation: {
      ...recommendation,
      exerciseId: selectedExerciseId,
    },
    exercise,
  };
}
