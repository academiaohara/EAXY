import { describe, expect, it } from "vitest";
import { selectNextPracticeExercise } from "@/lib/exercises/practice";

const catalog = [
  { id: "ex-1", conceptId: "c-1", type: "multiple_choice", difficulty: 1 },
  { id: "ex-2", conceptId: "c-1", type: "numeric", difficulty: 2 },
  { id: "ex-3", conceptId: "c-2", type: "numeric", difficulty: 3 },
];

describe("selectNextPracticeExercise", () => {
  it("devuelve null si el catálogo está vacío", () => {
    expect(selectNextPracticeExercise([], new Set())).toBeNull();
  });

  it("devuelve el primer ejercicio sin intentos", () => {
    const result = selectNextPracticeExercise(catalog, new Set(["ex-1"]));
    expect(result?.id).toBe("ex-2");
  });

  it("devuelve el primero del catálogo si todos tienen intentos", () => {
    const result = selectNextPracticeExercise(
      catalog,
      new Set(["ex-1", "ex-2", "ex-3"]),
    );
    expect(result?.id).toBe("ex-1");
  });

  it("devuelve el primer ejercicio cuando no hay intentos previos", () => {
    const result = selectNextPracticeExercise(catalog, new Set());
    expect(result?.id).toBe("ex-1");
  });
});
