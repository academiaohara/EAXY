import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONTENT_LESSON_IDS } from "@/lib/content/fixtures";
import {
  mockGetLearningPathMap,
  mockResetLearningPathState,
  mockStartLesson,
} from "@/lib/classrooms/e2e-mock-learning-paths";
import {
  mockResetPracticeState,
  mockSubmitExerciseAttempt,
} from "@/lib/classrooms/e2e-mock-practice";
import { completeLessonForStudent } from "@/lib/learning-paths/queries";

describe("learning paths mock + completion", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("E2E_MOCK_CLASSROOM", "true");
  });

  afterEach(() => {
    mockResetPracticeState();
    mockResetLearningPathState();
    vi.unstubAllEnvs();
  });

  it("registra started al abrir una lección", () => {
    mockStartLesson("student-1", CONTENT_LESSON_IDS.linearBasic);
    expect(mockGetLearningPathMap("student-1")[CONTENT_LESSON_IDS.linearBasic]).toBe("started");
  });

  it("completa la lección cuando hay acierto en todos sus conceptos", async () => {
    mockStartLesson("student-1", CONTENT_LESSON_IDS.linearBasic);
    mockSubmitExerciseAttempt(
      "student-1",
      "c1000000-0000-4000-8000-000000000001",
      { selectedOptionId: "b" },
      1000,
    );

    const result = await completeLessonForStudent("student-1", CONTENT_LESSON_IDS.linearBasic);
    expect(result.success).toBe(true);
    expect(mockGetLearningPathMap("student-1")[CONTENT_LESSON_IDS.linearBasic]).toBe("completed");
  });

  it("rechaza completar si falta acierto en algún concepto", async () => {
    mockStartLesson("student-1", CONTENT_LESSON_IDS.parentheses);

    const result = await completeLessonForStudent("student-1", CONTENT_LESSON_IDS.parentheses);

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Aún no has acertado/);
  });
});
