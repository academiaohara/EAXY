import { describe, expect, it } from "vitest";
import {
  deriveLessonProgressStatus,
  isLessonComplete,
} from "@/lib/learning-paths/completion";

describe("isLessonComplete", () => {
  it("requiere al menos un concepto practicado por cada concepto de la lección", () => {
    const lessonConcepts = ["c1", "c2"];
    expect(isLessonComplete(lessonConcepts, new Set(["c1"]))).toBe(false);
    expect(isLessonComplete(lessonConcepts, new Set(["c1", "c2"]))).toBe(true);
  });

  it("devuelve false si la lección no tiene conceptos", () => {
    expect(isLessonComplete([], new Set(["c1"]))).toBe(false);
  });
});

describe("deriveLessonProgressStatus", () => {
  it("mapea estados de learning_paths a progreso de UI", () => {
    expect(deriveLessonProgressStatus(null)).toBe("not_started");
    expect(deriveLessonProgressStatus("started")).toBe("started");
    expect(deriveLessonProgressStatus("completed")).toBe("completed");
  });
});
