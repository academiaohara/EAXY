import type { ExerciseRow } from "@/lib/exercise-engine/types";

/**
 * Selecciona el siguiente ejercicio de práctica: el primero sin intentos,
 * o el primero de la lista si ya se han intentado todos.
 */
export function selectPracticeExercise(
  exercises: ExerciseRow[],
  attemptedExerciseIds: Set<string>,
  preferredExerciseId?: string,
): ExerciseRow | null {
  if (exercises.length === 0) {
    return null;
  }

  if (preferredExerciseId) {
    const preferred = exercises.find((exercise) => exercise.id === preferredExerciseId);
    if (preferred) {
      return preferred;
    }
  }

  const unattempted = exercises.find((exercise) => !attemptedExerciseIds.has(exercise.id));
  return unattempted ?? exercises[0];
}
