export type PracticeExerciseSummary = {
  id: string;
  conceptId: string;
  type: string;
  difficulty: number;
};

/**
 * Elige el siguiente ejercicio de práctica: el primero sin intentos,
 * o el primero del catálogo si ya se han intentado todos.
 */
export function selectNextPracticeExercise(
  exercises: PracticeExerciseSummary[],
  attemptedExerciseIds: ReadonlySet<string>,
): PracticeExerciseSummary | null {
  if (exercises.length === 0) {
    return null;
  }

  const unattempted = exercises.find((exercise) => !attemptedExerciseIds.has(exercise.id));
  return unattempted ?? exercises[0];
}
