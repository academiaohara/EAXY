import type { PracticeAttemptSummary, PracticeExerciseCandidate } from "@/lib/practice/types";

function sortExercises(exercises: PracticeExerciseCandidate[]): PracticeExerciseCandidate[] {
  return [...exercises].sort((left, right) => {
    if (left.difficulty !== right.difficulty) {
      return left.difficulty - right.difficulty;
    }

    return left.id.localeCompare(right.id);
  });
}

function hasCorrectAttempt(exerciseId: string, attempts: PracticeAttemptSummary[]): boolean {
  return attempts.some((attempt) => attempt.exerciseId === exerciseId && attempt.correct);
}

function hasAnyAttempt(exerciseId: string, attempts: PracticeAttemptSummary[]): boolean {
  return attempts.some((attempt) => attempt.exerciseId === exerciseId);
}

function pickFromLowestMasteryConcept(
  exercises: PracticeExerciseCandidate[],
  masteryByConcept: Record<string, number>,
): string | null {
  const conceptIds = [...new Set(exercises.map((exercise) => exercise.conceptId))];

  if (conceptIds.length === 0) {
    return null;
  }

  const sortedConceptIds = conceptIds.sort((left, right) => {
    const leftMastery = masteryByConcept[left] ?? 0;
    const rightMastery = masteryByConcept[right] ?? 0;

    if (leftMastery !== rightMastery) {
      return leftMastery - rightMastery;
    }

    return left.localeCompare(right);
  });

  const targetConceptId = sortedConceptIds[0];
  const conceptExercises = sortExercises(
    exercises.filter((exercise) => exercise.conceptId === targetConceptId),
  );

  return conceptExercises[0]?.id ?? null;
}

/**
 * Selecciona el siguiente ejercicio de práctica libre.
 * Prioriza ejercicios sin acierto, luego sin intento, y por último el concepto con menor mastery.
 */
export function selectNextPracticeExercise(
  exercises: PracticeExerciseCandidate[],
  attempts: PracticeAttemptSummary[],
  masteryByConcept: Record<string, number> = {},
  preferredExerciseId?: string | null,
): string | null {
  if (exercises.length === 0) {
    return null;
  }

  if (preferredExerciseId && exercises.some((exercise) => exercise.id === preferredExerciseId)) {
    return preferredExerciseId;
  }

  const ordered = sortExercises(exercises);

  const withoutCorrect = ordered.find((exercise) => !hasCorrectAttempt(exercise.id, attempts));
  if (withoutCorrect) {
    return withoutCorrect.id;
  }

  const withoutAttempts = ordered.find((exercise) => !hasAnyAttempt(exercise.id, attempts));
  if (withoutAttempts) {
    return withoutAttempts.id;
  }

  return pickFromLowestMasteryConcept(ordered, masteryByConcept);
}
