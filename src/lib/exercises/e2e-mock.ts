import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import { parseExerciseAnswer, parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { calculateMastery, roundMastery } from "@/lib/mastery/calculator";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

type MockExercise = {
  id: string;
  concept_id: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

type MockConcept = {
  id: string;
  slug: string;
  title: string;
};

type MockAttempt = {
  exercise_id: string;
  concept_id: string;
  correct: boolean;
  created_at: string;
};

export const MOCK_CONCEPTS: MockConcept[] = [
  {
    id: "b1000000-0000-4000-8000-000000000001",
    slug: "linear-equations-basic",
    title: "Ecuaciones lineales básicas",
  },
  {
    id: "b1000000-0000-4000-8000-000000000002",
    slug: "linear-equations-parentheses",
    title: "Ecuaciones con paréntesis",
  },
];

export const MOCK_EXERCISES: MockExercise[] = [
  {
    id: "c1000000-0000-4000-8000-000000000001",
    concept_id: "b1000000-0000-4000-8000-000000000001",
    type: "multiple_choice",
    difficulty: 1,
    content: {
      question: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
      options: [
        { id: "a", text: "x = 2" },
        { id: "b", text: "x = 3" },
        { id: "c", text: "x = 4" },
        { id: "d", text: "x = 6" },
      ],
      correctOptionId: "b",
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000002",
    concept_id: "b1000000-0000-4000-8000-000000000001",
    type: "numeric",
    difficulty: 2,
    content: {
      question: "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
      correctAnswer: 5,
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000003",
    concept_id: "b1000000-0000-4000-8000-000000000001",
    type: "multiple_choice",
    difficulty: 2,
    content: {
      question: "¿Qué operación debes hacer primero para resolver 4x + 8 = 20?",
      options: [
        { id: "a", text: "Dividir ambos lados entre 4" },
        { id: "b", text: "Restar 8 a ambos lados" },
        { id: "c", text: "Sumar 8 a ambos lados" },
        { id: "d", text: "Multiplicar ambos lados por 4" },
      ],
      correctOptionId: "b",
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000004",
    concept_id: "b1000000-0000-4000-8000-000000000002",
    type: "numeric",
    difficulty: 3,
    content: {
      question: "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
      correctAnswer: 4,
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000005",
    concept_id: "b1000000-0000-4000-8000-000000000002",
    type: "multiple_choice",
    difficulty: 3,
    content: {
      question: "Al resolver 3(x - 2) = 9, ¿cuál es el valor correcto de x?",
      options: [
        { id: "a", text: "x = 1" },
        { id: "b", text: "x = 3" },
        { id: "c", text: "x = 5" },
        { id: "d", text: "x = 7" },
      ],
      correctOptionId: "c",
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000006",
    concept_id: "b1000000-0000-4000-8000-000000000002",
    type: "numeric",
    difficulty: 4,
    content: {
      question: "Resuelve: 5(x + 1) - 2x = 14. ¿Cuánto vale x?",
      correctAnswer: 3,
      tolerance: 0,
    },
  },
];

const mockAttemptsByStudent = new Map<string, MockAttempt[]>();
const mockMasteryByStudent = new Map<string, Map<string, number>>();

export function mockListExercises(): MockExercise[] {
  return [...MOCK_EXERCISES];
}

export function mockGetExerciseById(exerciseId: string): MockExercise | null {
  return MOCK_EXERCISES.find((exercise) => exercise.id === exerciseId) ?? null;
}

export function mockGetConceptById(conceptId: string): MockConcept | null {
  return MOCK_CONCEPTS.find((concept) => concept.id === conceptId) ?? null;
}

export function mockListConcepts(): MockConcept[] {
  return [...MOCK_CONCEPTS];
}

export function mockGetAttemptedExerciseIds(studentId: string): Set<string> {
  const attempts = mockAttemptsByStudent.get(studentId) ?? [];
  return new Set(attempts.map((attempt) => attempt.exercise_id));
}

export function mockGetConceptMastery(studentId: string, conceptId: string): number {
  return mockMasteryByStudent.get(studentId)?.get(conceptId) ?? 0;
}

export function mockStudentHasAttemptsForConcept(
  studentId: string,
  conceptId: string,
): boolean {
  const attempts = mockAttemptsByStudent.get(studentId) ?? [];
  return attempts.some((attempt) => attempt.concept_id === conceptId);
}

function recalculateMockConceptMastery(studentId: string, conceptId: string): number {
  const attempts = (mockAttemptsByStudent.get(studentId) ?? []).filter(
    (attempt) => attempt.concept_id === conceptId,
  );

  const mastery = roundMastery(
    calculateMastery(
      attempts.map((attempt) => ({
        correct: attempt.correct,
        createdAt: new Date(attempt.created_at),
      })),
    ),
  );

  const studentMastery = mockMasteryByStudent.get(studentId) ?? new Map<string, number>();
  studentMastery.set(conceptId, mastery);
  mockMasteryByStudent.set(studentId, studentMastery);

  return mastery;
}

export function mockSubmitExerciseAttempt(
  studentId: string,
  exerciseId: string,
  answer: unknown,
  _timeSpentMs: number,
): SubmitExerciseAttemptResult {
  const exercise = mockGetExerciseById(exerciseId);

  if (!exercise) {
    throw new Error("Ejercicio no encontrado");
  }

  const content = parseExerciseContent(exercise.type, exercise.content);
  const parsedAnswer = parseExerciseAnswer(exercise.type, answer);
  const result = checkAnswer(exercise.type, content, parsedAnswer);

  const attempts = mockAttemptsByStudent.get(studentId) ?? [];
  attempts.push({
    exercise_id: exerciseId,
    concept_id: exercise.concept_id,
    correct: result.correct,
    created_at: new Date().toISOString(),
  });
  mockAttemptsByStudent.set(studentId, attempts);

  const mastery = recalculateMockConceptMastery(studentId, exercise.concept_id);
  const concept = mockGetConceptById(exercise.concept_id);

  return {
    correct: result.correct,
    correctAnswer: result.correctAnswer,
    explanation: result.explanation,
    mastery,
    conceptTitle: concept?.title ?? "Concepto",
  };
}

/** Reinicia estado en memoria entre tests. */
export function resetMockExerciseState(): void {
  mockAttemptsByStudent.clear();
  mockMasteryByStudent.clear();
}
