import type {
  AttemptSnapshot,
  ConceptMasterySnapshot,
  ConceptPrerequisite,
  ConceptSummary,
  ExerciseSummary,
  LessonSnapshot,
} from "@/lib/recommendations/types";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export function hoursSince(date: Date, now: Date): number {
  return (now.getTime() - date.getTime()) / MS_PER_HOUR;
}

export function daysSince(date: Date, now: Date): number {
  return (now.getTime() - date.getTime()) / MS_PER_DAY;
}

export function getConceptTitle(concepts: ConceptSummary[], conceptId: string): string {
  return concepts.find((concept) => concept.id === conceptId)?.title ?? "este concepto";
}

export function getExercisesForConcept(
  exercises: ExerciseSummary[],
  conceptId: string,
): ExerciseSummary[] {
  return exercises.filter((exercise) => exercise.conceptId === conceptId);
}

export function getAttemptsForConcept(
  attempts: AttemptSnapshot[],
  conceptId: string,
): AttemptSnapshot[] {
  return attempts
    .filter((attempt) => attempt.conceptId === conceptId)
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
}

export function getLastAttemptForConcept(
  attempts: AttemptSnapshot[],
  conceptId: string,
): AttemptSnapshot | null {
  return getAttemptsForConcept(attempts, conceptId)[0] ?? null;
}

export function prerequisitesAreMet(
  conceptId: string,
  prerequisites: ConceptPrerequisite[],
  masteryByConcept: Map<string, ConceptMasterySnapshot>,
): boolean {
  const required = prerequisites.filter((edge) => edge.conceptId === conceptId);

  return required.every((edge) => {
    const snapshot = masteryByConcept.get(edge.prerequisiteId);
    return (snapshot?.mastery ?? 0) >= edge.minMastery;
  });
}

export function getLinearLessons(lessons: LessonSnapshot[]): LessonSnapshot[] {
  return [...lessons].sort((left, right) => {
    if (left.moduleOrderIndex !== right.moduleOrderIndex) {
      return left.moduleOrderIndex - right.moduleOrderIndex;
    }

    return left.orderIndex - right.orderIndex;
  });
}

export function getNextIncompleteLesson(lessons: LessonSnapshot[]): LessonSnapshot | null {
  return getLinearLessons(lessons).find((lesson) => lesson.progressStatus !== "completed") ?? null;
}

export function getLessonForConcept(
  lessons: LessonSnapshot[],
  conceptId: string,
): LessonSnapshot | null {
  return (
    getLinearLessons(lessons).find((lesson) => lesson.conceptIds.includes(conceptId)) ?? null
  );
}

export function getUncompletedLessonForConcept(
  lessons: LessonSnapshot[],
  conceptId: string,
): LessonSnapshot | null {
  const lesson = getLessonForConcept(lessons, conceptId);
  if (!lesson || lesson.progressStatus === "completed") {
    return null;
  }

  return lesson;
}

export function averageScore(attempts: AttemptSnapshot[]): number {
  if (attempts.length === 0) {
    return 0;
  }

  const total = attempts.reduce((sum, attempt) => sum + (attempt.correct ? 1 : 0), 0);
  return total / attempts.length;
}
