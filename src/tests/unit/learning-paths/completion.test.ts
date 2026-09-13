import { describe, expect, it } from "vitest";
import { canCompleteLesson, getNextLinearLessonId } from "@/lib/learning-paths/completion";

describe("canCompleteLesson", () => {
  it("devuelve false si faltan conceptos por acertar", () => {
    expect(canCompleteLesson(["c1", "c2"], ["c1"])).toBe(false);
  });

  it("devuelve true cuando hay acierto en cada concepto", () => {
    expect(canCompleteLesson(["c1", "c2"], ["c1", "c2"])).toBe(true);
  });

  it("devuelve false si la lección no tiene conceptos", () => {
    expect(canCompleteLesson([], [])).toBe(false);
  });
});

describe("getNextLinearLessonId", () => {
  it("devuelve la primera lección no completada", () => {
    const next = getNextLinearLessonId([
      { id: "l1", orderIndex: 0, status: "completed" },
      { id: "l2", orderIndex: 1, status: "started" },
      { id: "l3", orderIndex: 2, status: null },
    ]);

    expect(next).toBe("l2");
  });

  it("devuelve null si todas están completadas", () => {
    const next = getNextLinearLessonId([
      { id: "l1", orderIndex: 0, status: "completed" },
      { id: "l2", orderIndex: 1, status: "completed" },
    ]);

    expect(next).toBeNull();
  });
});
