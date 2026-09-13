import { describe, expect, it } from "vitest";
import {
  countCompletedExercises,
  isLessonComplete,
} from "@/lib/learning-paths/completion";

describe("isLessonComplete", () => {
  it("devuelve false sin ejercicios", () => {
    expect(isLessonComplete([])).toBe(false);
  });

  it("devuelve false si falta algún ejercicio correcto", () => {
    expect(
      isLessonComplete([
        { exerciseId: "a", hasCorrectAttempt: true },
        { exerciseId: "b", hasCorrectAttempt: false },
      ]),
    ).toBe(false);
  });

  it("devuelve true cuando todos los ejercicios tienen intento correcto", () => {
    expect(
      isLessonComplete([
        { exerciseId: "a", hasCorrectAttempt: true },
        { exerciseId: "b", hasCorrectAttempt: true },
      ]),
    ).toBe(true);
  });
});

describe("countCompletedExercises", () => {
  it("cuenta solo ejercicios con intento correcto", () => {
    expect(
      countCompletedExercises([
        { exerciseId: "a", hasCorrectAttempt: true },
        { exerciseId: "b", hasCorrectAttempt: false },
        { exerciseId: "c", hasCorrectAttempt: true },
      ]),
    ).toBe(2);
  });
});
