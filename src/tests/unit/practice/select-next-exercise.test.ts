import { describe, expect, it } from "vitest";
import { selectNextPracticeExercise } from "@/lib/practice/select-next-exercise";

const exercises = [
  { id: "ex-1", conceptId: "concept-a", difficulty: 1 },
  { id: "ex-2", conceptId: "concept-a", difficulty: 2 },
  { id: "ex-3", conceptId: "concept-b", difficulty: 3 },
];

describe("selectNextPracticeExercise", () => {
  it("prioriza el ejercicio solicitado si existe", () => {
    const selected = selectNextPracticeExercise(exercises, [], {}, "ex-3");
    expect(selected).toBe("ex-3");
  });

  it("elige el primer ejercicio sin acierto previo", () => {
    const selected = selectNextPracticeExercise(exercises, [
      { exerciseId: "ex-1", correct: false },
    ]);

    expect(selected).toBe("ex-1");
  });

  it("elige el primer ejercicio sin intentos si todos los previos fueron correctos", () => {
    const selected = selectNextPracticeExercise(
      exercises,
      [{ exerciseId: "ex-1", correct: true }],
    );

    expect(selected).toBe("ex-2");
  });

  it("elige un ejercicio del concepto con menor mastery cuando todo está intentado", () => {
    const selected = selectNextPracticeExercise(
      exercises,
      [
        { exerciseId: "ex-1", correct: true },
        { exerciseId: "ex-2", correct: true },
        { exerciseId: "ex-3", correct: true },
      ],
      {
        "concept-a": 0.8,
        "concept-b": 0.3,
      },
    );

    expect(selected).toBe("ex-3");
  });

  it("devuelve null si no hay ejercicios", () => {
    expect(selectNextPracticeExercise([], [])).toBeNull();
  });
});
