import { curriculum, getConceptBySlug, getOrderedConcepts } from "@/content";
import { calculateMastery, roundMastery } from "@/lib/mastery/calculator";
import type { MasteryAttemptInput } from "@/lib/mastery/types";
import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import type { ExerciseType } from "@/lib/exercise-engine/types";

type MockAttempt = {
  id: string;
  studentId: string;
  exerciseId: string;
  conceptId: string;
  correct: boolean;
  createdAt: Date;
};

const attemptsByStudent = new Map<string, MockAttempt[]>();
const masteryByStudentConcept = new Map<string, number>();

function masteryKey(studentId: string, conceptId: string) {
  return `${studentId}:${conceptId}`;
}

function recalculateMockMastery(studentId: string, conceptId: string): number {
  const attempts = (attemptsByStudent.get(studentId) ?? [])
    .filter((attempt) => attempt.conceptId === conceptId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const inputs: MasteryAttemptInput[] = attempts.map((attempt) => ({
    correct: attempt.correct,
    createdAt: attempt.createdAt,
  }));

  const mastery = roundMastery(calculateMastery(inputs));
  masteryByStudentConcept.set(masteryKey(studentId, conceptId), mastery);
  return mastery;
}

export function isE2ELearningMockEnabled(): boolean {
  return isE2EMockClassroomEnabled();
}

export function mockRecordExerciseAttempt(
  studentId: string,
  exerciseId: string,
  correct: boolean,
): number {
  const exercise = curriculum.exercises.find((entry) => entry.id === exerciseId);
  if (!exercise) {
    throw new Error("Ejercicio no encontrado en el catálogo mock");
  }

  const concept = getConceptBySlug(exercise.conceptSlug);
  if (!concept) {
    throw new Error("Concepto no encontrado en el catálogo mock");
  }

  const attempt: MockAttempt = {
    id: `mock-attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    studentId,
    exerciseId,
    conceptId: concept.id,
    correct,
    createdAt: new Date(),
  };

  const existing = attemptsByStudent.get(studentId) ?? [];
  existing.push(attempt);
  attemptsByStudent.set(studentId, existing);

  return recalculateMockMastery(studentId, concept.id);
}

export function mockGetStudentMastery(studentId: string) {
  return getOrderedConcepts(curriculum).map((concept) => {
    const attempts = (attemptsByStudent.get(studentId) ?? []).filter(
      (attempt) => attempt.conceptId === concept.id,
    );
    const lastAttempt = attempts.at(-1);

    return {
      conceptId: concept.id,
      conceptSlug: concept.slug,
      mastery: masteryByStudentConcept.get(masteryKey(studentId, concept.id)) ?? 0,
      attemptCount: attempts.length,
      lastAttemptAt: lastAttempt?.createdAt ?? null,
    };
  });
}

export function mockGetRecentAttempts(studentId: string, limit = 50) {
  return [...(attemptsByStudent.get(studentId) ?? [])]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
    .map((attempt) => ({
      conceptId: attempt.conceptId,
      correct: attempt.correct,
      createdAt: attempt.createdAt,
    }));
}

export function mockGetExercise(exerciseId: string) {
  const exercise = curriculum.exercises.find((entry) => entry.id === exerciseId);
  if (!exercise) return null;

  const concept = getConceptBySlug(exercise.conceptSlug);
  if (!concept) return null;

  return {
    id: exercise.id,
    concept_id: concept.id,
    concept_slug: concept.slug,
    type: exercise.type as ExerciseType,
    difficulty: exercise.difficulty,
    content: exercise.content,
  };
}

export function mockGetExercisesForConcept(conceptSlug: string) {
  return curriculum.exercises
    .filter((exercise) => exercise.conceptSlug === conceptSlug)
    .map((exercise) => ({
      id: exercise.id,
      concept_id: getConceptBySlug(exercise.conceptSlug)!.id,
      concept_slug: exercise.conceptSlug,
      type: exercise.type as ExerciseType,
      difficulty: exercise.difficulty,
      content: exercise.content,
    }));
}

/** Reinicia el estado de aprendizaje mock (tests). */
export function resetE2ELearningMockState(): void {
  attemptsByStudent.clear();
  masteryByStudentConcept.clear();
}
