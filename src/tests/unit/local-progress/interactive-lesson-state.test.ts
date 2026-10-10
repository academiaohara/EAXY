import { describe, expect, it } from "vitest";
import {
  createDefaultInteractiveLessonState,
  furthestVisitedStepIndex,
  normalizeInteractiveLessonState,
} from "@/lib/local-progress/interactive-lesson-state";

describe("normalizeInteractiveLessonState", () => {
  it("ajusta arrays al número de pasos y limita el índice", () => {
    const normalized = normalizeInteractiveLessonState(
      {
        stepIndex: 99,
        completedSteps: [true, false],
        visitedSteps: [true, true, false],
        stepAttempts: {},
        completed: false,
        toolState: { "sistemas-historia": { romanStr: "XIV" } },
        updatedAt: 1,
      },
      5,
    );

    expect(normalized.stepIndex).toBe(4);
    expect(normalized.completedSteps).toEqual([true, false, false, false, false]);
    expect(normalized.visitedSteps).toEqual([true, true, false, false, false]);
    expect(normalized.toolState).toEqual({ "sistemas-historia": { romanStr: "XIV" } });
  });

  it("reanuda en la diapositiva más avanzada visitada", () => {
    const normalized = normalizeInteractiveLessonState(
      {
        stepIndex: 1,
        completedSteps: [],
        visitedSteps: [true, true, true, false],
        stepAttempts: {},
        completed: false,
        toolState: {},
        updatedAt: 1,
      },
      4,
    );
    expect(normalized.stepIndex).toBe(2);
    expect(furthestVisitedStepIndex(normalized.visitedSteps)).toBe(2);
  });

  it("crea estado por defecto con el primer paso visitado", () => {
    const defaults = createDefaultInteractiveLessonState(3);
    expect(defaults.stepIndex).toBe(0);
    expect(defaults.visitedSteps).toEqual([true, false, false]);
  });
});
