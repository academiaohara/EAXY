import type { Recommendation, RecommendationAction, ExerciseSummary } from "@/lib/recommendations/types";

export function selectExerciseForRecommendation(
  recommendation: Recommendation,
  exercises: ExerciseSummary[],
  attemptedExerciseIds: ReadonlySet<string>,
): string | null {
  if (recommendation.exerciseId) {
    return recommendation.exerciseId;
  }

  if (!recommendation.conceptId) {
    return null;
  }

  const conceptExercises = exercises
    .filter((exercise) => exercise.conceptId === recommendation.conceptId)
    .sort((left, right) => compareByAction(left, right, recommendation.action));

  const unattempted = conceptExercises.find(
    (exercise) => !attemptedExerciseIds.has(exercise.id),
  );

  return (unattempted ?? conceptExercises[0])?.id ?? null;
}

function compareByAction(
  left: ExerciseSummary,
  right: ExerciseSummary,
  action: RecommendationAction,
): number {
  if (action === "recover") {
    return left.difficulty - right.difficulty;
  }

  if (action === "advance") {
    return left.difficulty - right.difficulty;
  }

  return left.difficulty - right.difficulty;
}
