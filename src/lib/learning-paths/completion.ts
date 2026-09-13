/**
 * Una lección se puede marcar como completada cuando el estudiante
 * tiene al menos un intento correcto en cada concepto de la lección.
 */
export function canCompleteLesson(
  lessonConceptIds: string[],
  conceptIdsWithCorrectAttempt: string[],
): boolean {
  if (lessonConceptIds.length === 0) {
    return false;
  }

  const correctSet = new Set(conceptIdsWithCorrectAttempt);
  return lessonConceptIds.every((conceptId) => correctSet.has(conceptId));
}

export function getNextLinearLessonId(
  lessons: Array<{ id: string; orderIndex: number; status: "started" | "completed" | null }>,
): string | null {
  const ordered = [...lessons].sort((left, right) => left.orderIndex - right.orderIndex);
  const nextIncomplete = ordered.find((lesson) => lesson.status !== "completed");
  return nextIncomplete?.id ?? null;
}
