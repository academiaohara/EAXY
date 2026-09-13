import type {
  ExerciseContext,
  RecommendationAction,
  RecommendationContext,
} from "@/lib/recommendations/types";

const RECENT_ATTEMPT_HOURS = 24;

function wasAttemptedRecently(
  exerciseId: string,
  context: RecommendationContext,
): boolean {
  const cutoff = context.referenceDate.getTime() - RECENT_ATTEMPT_HOURS * 60 * 60 * 1000;

  return context.attempts.some(
    (attempt) =>
      attempt.exerciseId === exerciseId && attempt.createdAt.getTime() >= cutoff,
  );
}

function getCandidateExercises(
  conceptId: string,
  context: RecommendationContext,
): ExerciseContext[] {
  return context.exercises.filter((exercise) => exercise.conceptId === conceptId);
}

function sortByDifficulty(
  exercises: ExerciseContext[],
  direction: "asc" | "desc",
): ExerciseContext[] {
  return [...exercises].sort((a, b) =>
    direction === "asc" ? a.difficulty - b.difficulty : b.difficulty - a.difficulty,
  );
}

function pickExercise(
  candidates: ExerciseContext[],
  context: RecommendationContext,
): ExerciseContext | null {
  if (candidates.length === 0) {
    return null;
  }

  const notRecent = candidates.filter(
    (exercise) => !wasAttemptedRecently(exercise.id, context),
  );
  const pool = notRecent.length > 0 ? notRecent : candidates;

  return pool[0] ?? null;
}

export function selectExerciseForRecommendation(
  conceptId: string,
  action: RecommendationAction,
  context: RecommendationContext,
): { exerciseId: string | null; lessonId: string | null } {
  const candidates = getCandidateExercises(conceptId, context);

  if (candidates.length === 0) {
    return { exerciseId: null, lessonId: null };
  }

  let ordered = candidates;

  if (action === "recover") {
    ordered = sortByDifficulty(candidates, "asc");
  } else if (action === "advance") {
    ordered = sortByDifficulty(candidates, "asc");
  } else {
    ordered = sortByDifficulty(candidates, "desc");
  }

  const selected = pickExercise(ordered, context);

  if (!selected) {
    return { exerciseId: null, lessonId: null };
  }

  return {
    exerciseId: selected.id,
    lessonId: selected.lessonIds[0] ?? null,
  };
}
