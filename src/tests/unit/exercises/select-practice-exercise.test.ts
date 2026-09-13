import { describe, expect, it } from "vitest";
import type { ExerciseRow } from "@/lib/exercise-engine/types";
import { selectPracticeExercise } from "@/lib/exercises/select-practice-exercise";

const exercises: ExerciseRow[] = [
  {
    id: "ex-1",
    concept_id: "concept-1",
    type: "multiple_choice",
    difficulty: 1,
    content: {
      question: "Pregunta 1",
      options: [{ id: "a", text: "A" }],
      correctOptionId: "a",
    },
  },
  {
    id: "ex-2",
    concept_id: "concept-1",
    type: "numeric",
    difficulty: 2,
    content: {
      question: "Pregunta 2",
      correctAnswer: 2,
    },
  },
];

describe("selectPracticeExercise", () => {
  it("devuelve el primer ejercicio sin intentos", () => {
    const result = selectPracticeExercise(exercises, new Set(["ex-2"]));
    expect(result?.id).toBe("ex-1");
  });

  it("devuelve el primero si todos están intentados", () => {
    const result = selectPracticeExercise(exercises, new Set(["ex-1", "ex-2"]));
    expect(result?.id).toBe("ex-1");
  });

  it("respeta el ejercicio preferido si existe", () => {
    const result = selectPracticeExercise(exercises, new Set(), "ex-2");
    expect(result?.id).toBe("ex-2");
  });

  it("devuelve null si no hay ejercicios", () => {
    expect(selectPracticeExercise([], new Set())).toBeNull();
  });
});
