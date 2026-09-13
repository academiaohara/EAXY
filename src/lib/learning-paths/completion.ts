/**
 * Una lección se considera completada cuando el estudiante ha practicado
 * al menos un ejercicio de cada concepto asociado a la lección.
 */
export function isLessonComplete(
  lessonConceptIds: string[],
  practicedConceptIds: Set<string>,
): boolean {
  if (lessonConceptIds.length === 0) {
    return false;
  }

  return lessonConceptIds.every((conceptId) => practicedConceptIds.has(conceptId));
}

export function deriveLessonProgressStatus(
  learningPathStatus: "started" | "completed" | null,
): "not_started" | "started" | "completed" {
  if (learningPathStatus === "completed") {
    return "completed";
  }

  if (learningPathStatus === "started") {
    return "started";
  }

  return "not_started";
}
