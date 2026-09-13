export type ExerciseAttemptStatus = {
  exerciseId: string;
  hasCorrectAttempt: boolean;
};

/**
 * Una lección se considera completada cuando el estudiante
 * tiene al menos un intento correcto en cada ejercicio de la lección.
 */
export function isLessonComplete(
  exerciseStatuses: ExerciseAttemptStatus[],
): boolean {
  if (exerciseStatuses.length === 0) {
    return false;
  }

  return exerciseStatuses.every((status) => status.hasCorrectAttempt);
}

export function countCompletedExercises(
  exerciseStatuses: ExerciseAttemptStatus[],
): number {
  return exerciseStatuses.filter((status) => status.hasCorrectAttempt).length;
}
