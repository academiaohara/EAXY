import type { ExerciseType } from "@/lib/exercise-engine/types";

/** Ejercicios de seed alineados con supabase/seed.sql para E2E mock y tests. */
export type PracticeExerciseFixture = {
  id: string;
  conceptId: string;
  conceptTitle: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

export const PRACTICE_EXERCISE_FIXTURES: PracticeExerciseFixture[] = [
  {
    id: "c1000000-0000-4000-8000-000000000001",
    conceptId: "b1000000-0000-4000-8000-000000000001",
    conceptTitle: "Ecuaciones lineales básicas",
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
    conceptId: "b1000000-0000-4000-8000-000000000001",
    conceptTitle: "Ecuaciones lineales básicas",
    type: "numeric",
    difficulty: 2,
    content: {
      question: "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
      correctAnswer: 5,
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000003",
    conceptId: "b1000000-0000-4000-8000-000000000001",
    conceptTitle: "Ecuaciones lineales básicas",
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
    conceptId: "b1000000-0000-4000-8000-000000000002",
    conceptTitle: "Ecuaciones con paréntesis",
    type: "numeric",
    difficulty: 3,
    content: {
      question: "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
      correctAnswer: 4,
    },
  },
  {
    id: "c1000000-0000-4000-8000-000000000005",
    conceptId: "b1000000-0000-4000-8000-000000000002",
    conceptTitle: "Ecuaciones con paréntesis",
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
    conceptId: "b1000000-0000-4000-8000-000000000002",
    conceptTitle: "Ecuaciones con paréntesis",
    type: "numeric",
    difficulty: 4,
    content: {
      question: "Resuelve: 5(x + 1) - 2x = 14. ¿Cuánto vale x?",
      correctAnswer: 3,
      tolerance: 0,
    },
  },
];

export function getPracticeExerciseFixtureById(
  exerciseId: string,
): PracticeExerciseFixture | undefined {
  return PRACTICE_EXERCISE_FIXTURES.find((exercise) => exercise.id === exerciseId);
}
