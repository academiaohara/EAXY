import { beforeEach, describe, expect, it } from "vitest";
import {
  mockGetAttemptedExerciseIds,
  mockSubmitExerciseAttempt,
  resetMockExerciseState,
} from "@/lib/exercises/e2e-mock";

describe("mock exercise flow", () => {
  beforeEach(() => {
    resetMockExerciseState();
  });

  it("registra intentos y actualiza mastery tras respuesta correcta", () => {
    const result = mockSubmitExerciseAttempt(
      "student-1",
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "b" },
      1200,
    );

    expect(result.correct).toBe(true);
    expect(result.mastery).toBeGreaterThan(0);
    expect(mockGetAttemptedExerciseIds("student-1").has(
      "c1000000-0000-4000-8000-000000000001",
    )).toBe(true);
  });

  it("reduce mastery tras respuesta incorrecta", () => {
    const wrong = mockSubmitExerciseAttempt(
      "student-1",
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "a" },
      800,
    );

    expect(wrong.correct).toBe(false);
    expect(wrong.mastery).toBe(0);
  });
});
