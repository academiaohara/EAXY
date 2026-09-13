import { afterEach, describe, expect, it } from "vitest";
import {
  mockGetPracticeExercise,
  mockResetPracticeState,
  mockSubmitExerciseAttempt,
} from "@/lib/classrooms/e2e-mock-practice";

describe("e2e mock practice", () => {
  afterEach(() => {
    mockResetPracticeState();
  });

  it("selecciona el primer ejercicio del seed para un alumno nuevo", () => {
    const exercise = mockGetPracticeExercise("student-1");
    expect(exercise?.id).toBe("c1000000-0000-4000-8000-000000000001");
  });

  it("actualiza mastery tras un intento correcto", () => {
    const result = mockSubmitExerciseAttempt(
      "student-1",
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "b" },
      1000,
    );

    expect(result.correct).toBe(true);
    expect(result.mastery).toBe(1);
  });

  it("pasa al siguiente ejercicio tras acertar el primero", () => {
    mockSubmitExerciseAttempt(
      "student-1",
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "b" },
      1000,
    );

    const nextExercise = mockGetPracticeExercise("student-1");
    expect(nextExercise?.id).toBe("c1000000-0000-4000-8000-000000000002");
  });
});
