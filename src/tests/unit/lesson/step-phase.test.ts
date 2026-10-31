import { describe, expect, it } from "vitest";
import { getLessonStepPhase } from "@/lib/lesson/step-phase";
import type { LessonStep } from "@/lib/lesson/types";

function stepOfType(type: LessonStep["type"]): LessonStep {
  return { id: "s1", title: "Paso", type } as LessonStep;
}

describe("getLessonStepPhase", () => {
  it("clasifica cada tipo de paso en su fase", () => {
    expect(getLessonStepPhase(stepOfType("concept"))).toBe("explanation");
    expect(getLessonStepPhase(stepOfType("animated_solution"))).toBe("resolution");
    expect(getLessonStepPhase(stepOfType("interactive_tool"))).toBe("exploration");
    expect(getLessonStepPhase(stepOfType("storyboard"))).toBe("explanation");
    expect(getLessonStepPhase(stepOfType("fill_in_blank"))).toBe("practice");
    expect(getLessonStepPhase(stepOfType("fraction_pick"))).toBe("practice");
    expect(getLessonStepPhase(stepOfType("classify"))).toBe("practice");
    expect(getLessonStepPhase(stepOfType("number_line_pick"))).toBe("practice");
  });
});
